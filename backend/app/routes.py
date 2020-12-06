from fastapi import APIRouter
from typing import List

from .models import IndexingResultModel, SearchResultsModel
from .services.indexing_service import WebPageIndexing
from .services.search_service import SearchService


router = APIRouter()


@router.get("/index", response_model=IndexingResultModel)
async def index_page(q: str, max_recursion: int = 3):
    indexing_result = await WebPageIndexing(q, max_recursion).index_web_site()
    return indexing_result


@router.get("/search", response_model=List[SearchResultsModel])
async def search_pages(q: str):
    pages_info = await SearchService(q).get_search_results()

    return pages_info
