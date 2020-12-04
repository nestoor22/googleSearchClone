from fastapi import FastAPI

from .routes import router as events_router


def create_app():
    fast_api_application = FastAPI(title="Google Clone API")

    fast_api_application.include_router(events_router)

    return fast_api_application


app = create_app()
