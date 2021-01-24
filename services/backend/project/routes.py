from aiohttp.web import Application # noqa


async def profiling_route(_):
    from aiohttp import web # noqa
    from .data_service import get_data
    import time
    from asyncio import sleep
    times = []
    for i in range(10):
        t1 = time.time()
        res = await get_data()
        t2 = time.time()
        print("Overall", len(res), t2-t1)
        times.append(t2-t1)
        await sleep(0.5)
    print(sum(times)/10, "Mean time")
    return web.Response(text=str(dict(res._asdict()))) # noqa


async def frontend_test(_):
    from aiohttp import web # noqa
    from .data_service import get_data
    res = await get_data()
    data = {
        "products": list(map(lambda x: dict(x._asdict()), res)) # noqa
    }
    return web.json_response(data) # noqa


def setup_routes(app: Application):
    # pass
    # app.router.add_get('/profiling_route', profiling_route)
    app.router.add_get('/frontend_test', frontend_test)
