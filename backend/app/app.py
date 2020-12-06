from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from .routes import router as events_router


origins = [
    "http://localhost:3000",
    "localhost:3000"
]


def create_app():
    fast_api_application = FastAPI(title="Google Clone API")

    fast_api_application.include_router(events_router)

    fast_api_application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"])

    return fast_api_application


app = create_app()
