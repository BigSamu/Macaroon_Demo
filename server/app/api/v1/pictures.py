
   
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import schemas, crud
from app.api.deps import get_db

router = APIRouter()

@router.get("", response_model=List[schemas.PictureResponse])
def read_all_pictures(db: Session = Depends(get_db)) -> Any:
    """
    Retrieve all pictures.
    """
    pictures = crud.picture.get_all(db)
    return pictures

@router.get("/{picture_id}", response_model=schemas.PictureResponse)
def read_one_picture(picture_id:int, db: Session = Depends(get_db)) -> Any:
    """
    Retrieve one picture.
    """
    picture = crud.picture.get_one(db, model_id=picture_id)
    if not picture:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The picture with this ID does not exist in the system.",
        )
    return picture


@router.get("/by_title/{picture_title}", response_model=List[schemas.PictureResponse])
def read_all_pictures_by_title(picture_title: str, db: Session = Depends(get_db)) -> Any:
    """
    Retrieve all pictures by title.
    """
    pictures = crud.picture.get_all_by_title(db, title=picture_title)
    return pictures

@router.post("", response_model=schemas.PictureResponse)
def create_picture(*, db: Session = Depends(get_db), picture_in: schemas.PictureCreate) -> Any:
    """
    Create new pictures.
    """
    picture = crud.picture.create(db, obj_in=picture_in)
    return picture

@router.put("/{picture_id}", response_model=schemas.PictureResponse)
def update_picture(*, picture_id: int, db: Session = Depends(get_db), picture_in: schemas.PictureUpdate) -> Any:
    """
    Update existing pictures.
    """
    picture = crud.picture.get_one(db, model_id=picture_id)
    if not picture:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The picture with this ID does not exist in the system.",
        )
    picture = crud.picture.update(db, db_obj=picture, obj_in=picture_in)
    return picture

@router.delete("", response_model=schemas.Message)
def delete_all_pictures(*, db: Session = Depends(get_db)) -> Any:
    """
    Delete all pictures.
    """
    pictures = crud.picture.get_all(db)
    if not pictures:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="It doesn't exist any picture in the system.",
        )
    rows_deleted=crud.picture.remove_all(db)
    return {"message": f"{rows_deleted} pictures were deleted."}


@router.delete("/{picture_id}", response_model=schemas.Message)
def delete_one_picture(*, picture_id: int, db: Session = Depends(get_db)) -> Any:
    """
    Delete existing picture.
    """
    picture = crud.picture.get_one(db, model_id=picture_id)
    if not picture:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The picture with this ID does not exist in the system.",
        )
    crud.picture.remove_one(db, model_id=picture.id)
    return {"message": f"Picture with ID = {picture_id} deleted."}

