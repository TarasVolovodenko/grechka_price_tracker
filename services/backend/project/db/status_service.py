"""
This module is responsible for maintaining class RedisStatusService

RedisStatusService
+get_status: Status
+set_status: Status
"""

from .abc_redis_service import AbstractKeyValueService
from .statuses import *
from . import EVAL_TIME_STEP
from time import time
from aioredis.errors import RedisError


class RedisStatusService(AbstractKeyValueService):
    """
    Class implements parsing status caching and checking.
    """

    @classmethod
    async def check_status(cls, eval_time: float = EVAL_TIME_STEP) -> RedisStatus:
        """
        Gets current status of data, saved via "status_timestamp" field.
        Indicates current timestamp or status "Parsing data." : str if update on progress.
        :param eval_time: time interval(s). During this interval data would be recognized as reliable.
        :return: RedisStatus class.
        """
        try:
            timestamp = await cls._get("status_timestamp")
            print(timestamp)
            if timestamp == str(RedisOnProcess()):
                return RedisOnProcess()
            elif time() - float(timestamp) < eval_time:
                return RedisUpToDate()
            else:
                return RedisOutdated()
        except ValueError:
            return RedisOutdated()
        except TypeError:
            return RedisOutdated()
        except RedisError:
            return RedisOutdated()
        except UnicodeDecodeError:
            return RedisOutdated()

    @classmethod
    async def set_status(cls, status: RedisStatus) -> bool:
        """
        Sets current sata status.
        :param status: RedisStatus instance.
        :return: is transaction finished correctly.
        """
        try:
            if isinstance(status, RedisOutdated):
                return True
            elif isinstance(status, RedisOnProcess):
                return await cls._set("status_timestamp", str(RedisOnProcess()))
            elif isinstance(status, RedisUpToDate):
                return await cls._set("status_timestamp", str(time()))
        except RedisError:
            return False
