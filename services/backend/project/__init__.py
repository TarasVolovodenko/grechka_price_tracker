import aiohttp_cors
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
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
            allow_methods=["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"]
        )
    })
    for route in list(app.router.routes()):
        cors.add(route)
    return app

