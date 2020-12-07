import asyncio
from typing import Set

from aiohttp import ClientSession
from bs4 import BeautifulSoup

from app.database import database_connection


class WebPageIndexing:

    def __init__(self, url: str, max_recursion_level: int = 1):
        self.web_site_url = url
        self.max_recursion_level = max_recursion_level
        self._indexed_links = set()
        self._pages_collection = database_connection.get_collection('webPages')

    async def index_web_site(self):
        is_indexed = await self._is_page_already_indexed(self.web_site_url)
        if is_indexed:
            return {"status_code": 200, "message": "Already indexed"}

        await self._index_page(self.web_site_url, 1)

        return {"status_code": 200, "message": "Success"}

    async def _index_page(self, url, recursion_level: int):
        beautiful_soup_obj = await self._load_page_content(url)

        indexing_result = await self._get_indexing_info(
            url, beautiful_soup_obj)

        if not indexing_result:
            return False

        internal_links = await self._get_internal_links(beautiful_soup_obj)
        indexing_result["internal_links"] = len(internal_links)

        await self._save_indexing_results(indexing_result)

        if recursion_level < self.max_recursion_level:
            return await asyncio.gather(
                *[self._index_page(url, recursion_level+1)
                  for url in internal_links],
                return_exceptions=True
            )

        return True

    @staticmethod
    async def _load_page_content(url: str) -> BeautifulSoup or None:
        async with ClientSession() as session:
            async with session.get(url) as response:
                html = await response.text()
                if response.status == 200:
                    beautiful_soup_obj = BeautifulSoup(
                        html, features="html.parser")

                    return beautiful_soup_obj

        return None

    async def _get_indexing_info(
            self, url: str, beautiful_soup_obj: BeautifulSoup
    ) -> dict:
        if not beautiful_soup_obj:
            return {}

        return {
            "text": await self._get_tags_content(beautiful_soup_obj),
            "title": await self._get_title(beautiful_soup_obj),
            "web_site_url": self.web_site_url,
            "page_url": url
        }

    async def _get_internal_links(
            self, beautiful_soup_obj: BeautifulSoup
    ) -> Set[str]:

        internal_links = set()
        links = beautiful_soup_obj.find_all("a", href=True)

        for link in links:
            href = link["href"]

            if href in self._indexed_links:
                continue

            if href.startswith('#') or href.startswith('javascript'):
                self._indexed_links.add(href)
                continue
            elif href.startswith('//'):
                link = f"https:{href}"
            elif not href.startswith('http'):
                link = f"{self.web_site_url}{href}"
            else:
                self._indexed_links.add(href)
                continue

            internal_links.add(link)
            self._indexed_links.add(href)

        return internal_links

    @staticmethod
    async def _get_tags_content(beautiful_soup_obj: BeautifulSoup) -> str:
        return beautiful_soup_obj.text.replace("\n", "").strip()

    @staticmethod
    async def _get_title(beautiful_soup_obj: BeautifulSoup) -> str:
        title = beautiful_soup_obj.find("title")

        if title:
            return title.text.strip()

        return ''

    async def _save_indexing_results(self, results: dict):
        return await self._pages_collection.insert_one(document=results)

    async def _is_page_already_indexed(self, url) -> bool:
        web_page_record = await self._pages_collection.find_one(
            {"web_site_url": url})

        if web_page_record:
            return True

        return False
