"""
Abstract class, that defines website bs4 parser interface.
"""

from abc import ABC, abstractmethod
from . import Product
from typing import List


class BaseParser(ABC):
    """
    Base for DOM object processing classes.
    Contains fields and methods, such as^
    - url : link
    """
    _URL = ""

    @property
    def url(self):
        """
        Getter for _URL.
        :return: value of website URL related to certain cls.
        """
        return self._URL

    @abstractmethod
    async def get_products(self) -> List[Product]:
        pass
