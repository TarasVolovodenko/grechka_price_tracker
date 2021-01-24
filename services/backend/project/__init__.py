from aiohttp import web
from .routes import setup_routes


async def index(_):
    """
    Test route for app status assurance.
    :return: response 200 Healthy
    """
    return web.Response(text="Healthy!")


async def create_app():
    app = web.Application()
    app.router.add_get('/health', index)
    setup_routes(app)

    return app

