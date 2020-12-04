from fastapi import APIRouter

router = APIRouter()


@router.get("/index/")
async def index_page(url: str):
    return {"text": "INDEXING"}


@router.get("/search/")
async def search_pages(search: str):
    return {"search": search}
