from fastapi import APIRouter

from app.api.v1 import caveats
from app.api.v1 import macaroons
from app.api.v1 import pictures
from app.api.v1 import users
from app.api.v1 import auth


api_router = APIRouter()
api_router.include_router(caveats.router, prefix="/caveats", tags=["caveats"])
api_router.include_router(macaroons.router, prefix="/macaroons", tags=["macaroons"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(pictures.router, prefix="/pictures", tags=["pictures"])
api_router.include_router(users.router, prefix="/users", tags=["users"])