from fastapi import APIRouter
from typing import List

from .models import IndexingResultModel, SearchResultsModel

router = APIRouter()


@router.get("/index/", response_model=IndexingResultModel)
async def index_page(url: str):
    return {"text": "INDEXING"}


@router.get("/search/", response_model=List[SearchResultsModel])
async def search_pages(search: str):
    return {"search": search}
