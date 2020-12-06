from motor.motor_asyncio import AsyncIOMotorClient

from .config import DATABASE_HOST, DATABASE_PORT


class MongoDBConnection:
    MONGO_DETAILS = f"mongodb://{DATABASE_HOST}:{DATABASE_PORT}"

    def __init__(self):
        self.client = AsyncIOMotorClient(self.MONGO_DETAILS)
        self.database = self.client["webPages"]

    def get_collection(self, collection_name: str):
        return self.database.get_collection(collection_name)


database_connection = MongoDBConnection()
