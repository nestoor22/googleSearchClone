from typing import Set
import asyncio

import requests
from bs4 import BeautifulSoup

from app.database import database_connection


class WebPageIndexing:

    def __init__(self, url: str, max_recursion_level: int = 1):
        self.web_site_url = url
        self.max_recursion_level = max_recursion_level
        self._indexed_links = set()
        self._beautiful_soup_obj: BeautifulSoup
        self._pages_collection = database_connection.get_collection('webPages')

    async def index_web_site(self):
        is_indexed = await self._is_page_already_indexed(self.web_site_url)
        if is_indexed:
            return {"status_code": 200, "message": "Already indexed"}

        await self._index_page(self.web_site_url, 1)

        return {"status_code": 200, "message": "Success"}

    async def _index_page(self, url, recursion_level: int):
        indexing_result = self._get_indexing_info(url)

        if not indexing_result:
            return

        internal_links = self._get_internal_links()
        indexing_result["internal_links"] = len(internal_links)

        await self._save_indexing_results(indexing_result)

        if recursion_level < self.max_recursion_level:
            return await asyncio.gather(
                *[self._index_page(url, recursion_level+1)
                  for url in internal_links],
                return_exceptions=True
            )

        return {"status_code": 200, "message": "Indexed"}

    def _load_page_content(self, url) -> BeautifulSoup or None:
        try:
            response = requests.get(url)
        except requests.RequestException:
            return None

        if response.status_code == 200:
            self._beautiful_soup_obj = BeautifulSoup(
                response.content.decode("utf-8"), features="html.parser")

            return self._beautiful_soup_obj

        return None

    def _get_indexing_info(self, url):
        if not self._load_page_content(url):
            return None

        return {
            "text": self._get_tags_content(),
            "title": self._get_title(),
            "web_site_url": self.web_site_url,
            "page_url": url
        }

    def _get_internal_links(self) -> Set[str]:
        internal_links = set()
        links = self._beautiful_soup_obj.find_all("a", href=True)

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

    def _get_tags_content(self) -> str:
        return self._beautiful_soup_obj.text.replace("\n", "").strip()

    def _get_title(self) -> str:
        title = self._beautiful_soup_obj.find("title")

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
