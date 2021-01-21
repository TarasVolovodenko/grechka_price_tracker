from project import create_app
from pytest import fixture


@fixture
async def app():
    app = await create_app()

    return app


async def test_hello(aiohttp_client, loop, app):
    client = await aiohttp_client(app)

    resp = await client.get('/health')
    assert resp.status == 200
    text = await resp.text()
    assert "Healthy!" in text
