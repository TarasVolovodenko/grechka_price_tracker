import asyncio

from ..db.status_service import RedisStatusService
from ..db.statuses import *


async def test_redis_status_setting(new_loop): # noqa
    assert await RedisStatusService.set_status(RedisUpToDate())
    assert isinstance(await RedisStatusService.check_status(5), RedisUpToDate)
    await asyncio.sleep(5)
    assert isinstance(await RedisStatusService.check_status(5), RedisOutdated)

async def test_redis_in_progress(new_loop): # noqa
    assert await RedisStatusService.set_status(RedisOnProcess())
    assert isinstance(await RedisStatusService.check_status(5), RedisOnProcess)
