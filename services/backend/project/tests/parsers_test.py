from ..scrapper.parsers.novus_parser import NovusParser
from ..scrapper.parsers.ekolavka_parser import EkolavkaParser
from ..scrapper.parsers.auchan_parser import AuchanParser
from ..data_service import get_data


async def test_novus_works(new_loop): # noqa
    assert len(await NovusParser.get_products()) != 0


async def test_ekolavka_works(new_loop): # noqa
    assert len(await EkolavkaParser.get_products()) != 0


async def test_auchan_works(new_loop): # noqa
    assert len(await AuchanParser.get_products()) != 0


async def test_all_right(new_loop): # noqa
    l1 = await NovusParser.get_products()
    l2 = await EkolavkaParser.get_products()
    l3 = await AuchanParser.get_products()
    l_res = await get_data()

    assert len(l1) != 0
    assert len(l2) != 0
    assert len(l3) != 0
    assert len(l1) + len(l2) + len(l3) == len(l_res)
