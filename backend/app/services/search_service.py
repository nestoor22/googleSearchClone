from typing import List

from app.database import database_connection


class RelevanceCoeficientsVariables:
    WORD_IN_TITLE = 1
    LINK_OCCURRENCE = 0.5
    WORD_OCCURRENCE = 0.2


class SearchService:

    def __init__(self, search_item: str):
        self.search_item = search_item
        self._pages_collection = database_connection.get_collection('webPages')

    async def get_search_results(
            self, offset: int = 0, limit: int = 10) -> List[dict]:

        relevent_pages = await self._get_relevant_pages()

        return sorted(
            relevent_pages,
            key=lambda page: page["relevance"],
            reverse=True
        )[offset:limit]

    async def _get_relevant_pages(self) -> List[dict]:
        result = []
        pages = self._pages_collection.find(
            {"$or": [
                {"title": {
                    "$regex": self.search_item,
                    "$options": "i"}
                },
                {"text": {
                    "$regex": self.search_item,
                    "$options": "i"}
                }
            ]}
        )
        async for page in pages:
            relevance = self._compute_relevance_number(page)
            if relevance > 0:
                result.append({
                    "relevance": relevance,
                    "title": page["title"],
                    "web_page_url": page["page_url"]
                })

        return result

    def _compute_relevance_number(self, page_info: dict) -> float:
        relevance_number = 0

        if self.search_item.lower() in page_info["title"].lower():
            relevance_number += RelevanceCoeficientsVariables.WORD_IN_TITLE

        total_words_occurence = page_info["text"].count(self.search_item)

        relevance_number += \
            RelevanceCoeficientsVariables.WORD_OCCURRENCE * \
            total_words_occurence

        return relevance_number
