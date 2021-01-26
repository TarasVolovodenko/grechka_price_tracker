import asyncio

from ..db.status_service import RedisStatusService
from ..db.statuses import *
from ..db.instance_service import RedisInstanceService
from ..data_service import get_data


async def test_redis_status_setting(new_loop): # noqa
    assert await RedisStatusService.set_status(RedisUpToDate())
    assert isinstance(await RedisStatusService.check_status(5), RedisUpToDate)
    await asyncio.sleep(5)
    assert isinstance(await RedisStatusService.check_status(5), RedisOutdated)

async def test_redis_in_progress(new_loop): # noqa
    assert await RedisStatusService.set_status(RedisOnProcess())
    assert isinstance(await RedisStatusService.check_status(5), RedisOnProcess)


async def test_set_data(new_loop):
    data = await get_data()
    res_dict = list(map(lambda x: dict(x._asdict()), data))  # noqa
    await RedisInstanceService.set_latest(res_dict)
    assert res_dict == await RedisInstanceService.get_latest()
