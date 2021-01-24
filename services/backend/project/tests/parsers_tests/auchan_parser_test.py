from ...scrapper.parsers.auchan_parser import AuchanParser

async def test_get_works(new_loop):
    assert len(await AuchanParser.get_products()) != 0