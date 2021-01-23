"""
Abstract class, that defines website bs4 parser interface.
"""
import asyncio

from abc import ABC, abstractmethod
from typing import List
from bs4 import BeautifulSoup
from functools import partial

from ...product import Product
from ..webclient import get_html


class BaseParser(ABC):
    """
    Base for DOM object processing classes.
    Contains fields and methods, such as^
    - url : link
    """
    _WEBSITE_URL = ""
    _WEBSITE_TITLE = ""

    @classmethod
    def website_url(cls) -> str:
        """
        Getter for _URL.
        :return: value of website URL related to certain cls.
        """
        return cls._WEBSITE_URL

    @classmethod
    def website_title(cls) -> str:
        """
        Getter for _WEBSITE_TITLE.
        :return: value of website displaying name.
        """
        return cls._WEBSITE_TITLE

    @classmethod
    async def _get_soup(cls) -> BeautifulSoup:
        html = await get_html(cls.website_url())
        # Async version
        soup = await asyncio.get_running_loop().run_in_executor(None, partial(BeautifulSoup, html, 'lxml'))
        # Sync version
        # soup = BeautifulSoup(html, 'lxml')
        return soup

    @classmethod
    @abstractmethod
    async def get_products(cls) -> List[Product]:
        pass
