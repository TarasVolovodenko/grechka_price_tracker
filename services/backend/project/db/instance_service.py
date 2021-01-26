"""
This module is responsible for maintaining RedisInstanceService class with the next blueprint:

RedisInstanceService
+ get_latest: List[Product]
+ set_latest: bool

"""
import json

from .abc_redis_service import AbstractKeyValueService
from aioredis.errors import RedisError
from typing import List


class RedisInstanceService(AbstractKeyValueService):
    """
    Class implements caching data in Redis kv.
    """

    @classmethod
    async def get_latest(cls) -> List[dict]:
        try:
            products = json.loads(await cls._get("products"))
            return products
        except RedisError:
            raise ConnectionError

    @classmethod
    async def set_latest(cls, products: List[dict]) -> bool:
        try:
            return await cls._set("products", json.dumps(products))
        except RedisError:
            raise ConnectionError
