"""
Main loop, collecting data and processing all operations.
"""
import asyncio

from typing import List

from .product import Product
from .scrapper.parsers.ekolavka_parser import EkolavkaParser
from .scrapper.parsers.auchan_parser import AuchanParser
from .scrapper.parsers.novus_parser import NovusParser


async def get_data() -> List[Product]:
    """
    Tricky endpoint for data collection operation and Redis caching.
    :return: ready to use array of all products for webclient
    """
    parse_results = await asyncio.gather(EkolavkaParser.get_products(),
                                         AuchanParser.get_products(),
                                         NovusParser.get_products(), return_exceptions=True)
    final_products_array = []
    for result in parse_results:
        if type(result) == list:
            final_products_array.extend(result)

    return final_products_array
