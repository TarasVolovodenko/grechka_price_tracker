import asyncio
from pytest import fixture


@fixture
def new_loop():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    loop.close()
