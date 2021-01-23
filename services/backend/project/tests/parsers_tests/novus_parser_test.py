from ...scrapper.parsers.novus_parser import NovusParser


async def test_get_works(new_loop):
    assert len(await NovusParser.get_products()) != 0
