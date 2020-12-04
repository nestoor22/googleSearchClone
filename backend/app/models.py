from pydantic import BaseModel, Field


class IndexingResultModel(BaseModel):
    status_code: int = Field()
    message: str = Field()

    class Config:
        schema_extra = {
            "example": {
                "status_code": 200,
                "message": "Success"
            }
        }


class SearchResultsModel(BaseModel):
    web_site_url: str = Field()
    title: str = Field()

    class Config:
        schema_extra = {
            "example": {
                "web_site_url": "https://google.com",
                "title": "Google"
            }
        }
