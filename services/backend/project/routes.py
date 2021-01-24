from aiohttp.web import Application # noqa
from .product import Product
from aiohttp import web  # noqa
from .data_service import get_data


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


async def frontend_test(request):
    # Getting request params as json
    # request_data = await request.json()

    res = await get_data()
    res_dict = list(map(lambda x: dict(x._asdict()), res)) # noqa
    res_sorted = sorted(res_dict, key=lambda x: x["cost"])
    data = {
        "products":  res_sorted
    }
    return web.json_response(data) # noqa


def setup_routes(app: Application):
    # pass
    # app.router.add_get('/profiling_route', profiling_route)
    app.router.add_get('/frontend_test', frontend_test)
