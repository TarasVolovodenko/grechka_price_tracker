"""
Main loop, collecting data and processing all operations.
"""
import asyncio

from typing import List
from json import JSONDecodeError

from .product import Product
from .scrapper.parsers.ekolavka_parser import EkolavkaParser
from .scrapper.parsers.auchan_parser import AuchanParser
from .scrapper.parsers.novus_parser import NovusParser

from .db.status_service import RedisStatusService
from .db.instance_service import RedisInstanceService
from .db.statuses import *

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


async def update_data_loop() -> List[dict]:
    status = await RedisStatusService.check_status()
    if isinstance(status, RedisUpToDate):
        try:
            return await RedisInstanceService.get_latest()
        except JSONDecodeError:
            pass
        except ValueError:
            pass
        except ConnectionError:
            pass
    data = await get_data()
    res_dict = list(map(lambda x: dict(x._asdict()), data))  # noqa
    asyncio.create_task(RedisInstanceService.set_latest(res_dict))
    asyncio.create_task(RedisStatusService.set_status(RedisUpToDate()))
    return res_dict
