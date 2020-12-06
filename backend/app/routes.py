from fastapi import APIRouter
from typing import List

from .models import IndexingResultModel, SearchResultsModel
from .services.indexing_service import WebPageIndexing


router = APIRouter()


@router.get("/index/", response_model=IndexingResultModel)
async def index_page(url: str, max_recursion: int = 3):
    indexing_result = await WebPageIndexing(url, max_recursion).index_web_site()
    return indexing_result


@router.get("/search/", response_model=List[SearchResultsModel])
async def search_pages(search: str):
    return {"search": search}
