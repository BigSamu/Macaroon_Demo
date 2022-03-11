
import secrets

from pydantic import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FastAPI"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    SQLALCHEMY_DATABASE_URI: str = "mysql+pymysql://root:root@127.0.0.1:3306/demo_macaroons"

    class Config:
        env_file = ".env"


settings = Settings()