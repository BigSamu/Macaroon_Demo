
   
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import schemas, crud
from app.api.deps import get_db

router = APIRouter()

@router.get("", response_model=List[schemas.CaveatResponse])
def read_all_caveats(db: Session = Depends(get_db)) -> Any:
    """
    Retrieve all caveats.
    """
    caveats = crud.caveat.get_all(db)
    return caveats

@router.get("/{caveat_id}", response_model=schemas.CaveatResponse)
def read_one_caveat(caveat_id:int, db: Session = Depends(get_db)) -> Any:
    """
    Retrieve one caveat.
    """
    caveat = crud.caveat.get_one(db, model_id=caveat_id)
    if not caveat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The caveat with this ID does not exist in the system.",
        )
    return caveat


@router.get("/by_location/{caveat_location}", response_model=List[schemas.CaveatResponse])
def read_all_caveats_by_location(caveat_location: str, db: Session = Depends(get_db)) -> Any:
    """
    Retrieve all caveats by location.
    """
    caveats = crud.caveat.get_all_by_location(db, location=caveat_location)
    return caveats

@router.post("", response_model=schemas.CaveatResponse)
def create_caveat(*, db: Session = Depends(get_db), caveat_in: schemas.CaveatCreate) -> Any:
    """
    Create new caveats.
    """
    caveat = crud.caveat.create(db, obj_in=caveat_in)
    return caveat

@router.post("/in_list", response_model=List[schemas.CaveatResponse])
def create_all_caveats_in_list(*, db: Session = Depends(get_db), caveat_list_in: List[schemas.CaveatCreate]) -> Any:
    """
    Create all caveats in list.
    """
    caveats = crud.caveat.create_all_in(db, list_obj_in=caveat_list_in)
    return caveats

@router.put("/in_list", response_model=List[schemas.CaveatResponse])
def upsert_all_caveats_in_list(*, db: Session = Depends(get_db), caveat_list_in: List[schemas.CaveatUpdate]) -> Any:
    """
    Upsert all caveats in list.
    """
    caveats = crud.caveat.upsert_all_in(db, list_obj_in=caveat_list_in)
    return caveats

@router.put("/{caveat_id}", response_model=schemas.CaveatResponse)
def update_caveat(*, caveat_id: int, db: Session = Depends(get_db), caveat_in: schemas.CaveatUpdate) -> Any:
    """
    Update existing caveats.
    """
    caveat = crud.caveat.get_one(db, model_id=caveat_id)
    if not caveat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The caveat with this ID does not exist in the system.",
        )
    caveat = crud.caveat.update(db, db_obj=caveat, obj_in=caveat_in)
    return caveat

@router.delete("", response_model=schemas.Message)
def delete_all_caveats(*, db: Session = Depends(get_db)) -> Any:
    """
    Delete all caveats.
    """
    caveats = crud.caveat.get_all(db)
    if not caveats:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="It doesn't exist any caveat in the system.",
        )
    rows_deleted=crud.caveat.remove_all(db)
    return {"message": f"{rows_deleted} caveats were deleted."}

@router.delete("/not_in_list", response_model=schemas.Message)
def delete_all_caveats_not_in(*, db: Session = Depends(get_db), caveat_list_in: List[schemas.CaveatUpdate]) -> Any:
    """
    Delete all caveats not in list.
    """
    caveats = crud.caveat.get_all(db)
    if not caveats:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="It doesn't exist any caveat in the system.",
        )
    rows_deleted=crud.caveat.remove_all_not_in(db, caveat_list_in)
    return {"message": f"{rows_deleted} caveats were deleted."}

@router.delete("/{caveat_id}", response_model=schemas.Message)
def delete_one_caveat(*, caveat_id: int, db: Session = Depends(get_db)) -> Any:
    """
    Delete existing caveat.
    """
    caveat = crud.caveat.get_one(db, model_id=caveat_id)
    if not caveat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The caveat with this ID does not exist in the system.",
        )
    crud.caveat.remove_one(db, model_id=caveat.id)
    return {"message": f"Caveat with ID = {caveat_id} deleted."}

