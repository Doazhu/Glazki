from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from databases import Database
from passlib.context import CryptContext
import sqlite3

app = FastAPI()
database = Database('sqlite:///users.db')
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Модель данных пользователя
class User(BaseModel):
    username: str
    email: str
    password: str

# Создание таблицы при запуске
@app.on_event("startup")
async def startup():
    await database.connect()
    query = """
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
    )
    """
    await database.execute(query=query)

# Эндпоинт регистрации
@app.post("/register", status_code=201)
async def register(user: User):
    # Проверка уникальности имени пользователя и email
    query = "SELECT * FROM users WHERE username = :username OR email = :email"
    existing_user = await database.fetch_one(query=query, values={"username": user.username, "email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Имя пользователя или email уже существует")
    
    # Хеширование пароля
    hashed_password = pwd_context.hash(user.password)
    
    # Сохранение пользователя
    query = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)"
    await database.execute(query=query, values={"username": user.username, "email": user.email, "password": hashed_password})
    
    return {"message": "Пользователь успешно зарегистрирован"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)