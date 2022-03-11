
   
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import schemas, crud
from app.api.deps import get_db

router = APIRouter()

@router.get("", response_model=List[schemas.UserResponse])
def read_all_users(db: Session = Depends(get_db)) -> Any:
    """
    Retrieve all users.
    """
    users = crud.user.get_all(db)
    return users

@router.get("/{user_id}", response_model=schemas.UserResponse)
def read_one_user(user_id:int, db: Session = Depends(get_db)) -> Any:
    """
    Retrieve one user.
    """
    user = crud.user.get_one(db, model_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this ID does not exist in the system.",
        )
    return user


@router.get("/by_username/{user_username}", response_model=List[schemas.UserResponse])
def read_all_users_by_username(user_username: str, db: Session = Depends(get_db)) -> Any:
    """
    Retrieve all users by username.
    """
    users = crud.user.get_all_by_username(db, username=user_username)
    return users

@router.post("", response_model=schemas.UserResponse)
def create_user(*, db: Session = Depends(get_db), user_in: schemas.UserCreate) -> Any:
    """
    Create new users.
    """
    user = crud.user.create(db, obj_in=user_in)
    return user

@router.put("/{user_id}", response_model=schemas.UserResponse)
def update_user(*, user_id: int, db: Session = Depends(get_db), user_in: schemas.UserUpdate) -> Any:
    """
    Update existing users.
    """
    user = crud.user.get_one(db, model_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this ID does not exist in the system.",
        )
    user = crud.user.update(db, db_obj=user, obj_in=user_in)
    return user

@router.delete("", response_model=schemas.Message)
def delete_all_users(*, db: Session = Depends(get_db)) -> Any:
    """
    Delete all users.
    """
    users = crud.user.get_all(db)
    if not users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="It doesn't exist any user in the system.",
        )
    rows_deleted=crud.user.remove_all(db)
    return {"message": f"{rows_deleted} users were deleted."}


@router.delete("/{user_id}", response_model=schemas.Message)
def delete_one_user(*, user_id: int, db: Session = Depends(get_db)) -> Any:
    """
    Delete existing user.
    """
    user = crud.user.get_one(db, model_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this ID does not exist in the system.",
        )
    crud.user.remove_one(db, model_id=user.id)
    return {"message": f"User with ID = {user_id} deleted."}

