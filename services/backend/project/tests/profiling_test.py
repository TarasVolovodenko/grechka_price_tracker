import asyncio
import cProfile
import io
import pstats
from pstats import SortKey

from ..data_service import get_data


def test_profiling():
    pr = cProfile.Profile()
    pr.enable()
    asyncio.run(get_data())
    pr.disable()
    s = io.StringIO()
    sortby = SortKey.TIME
    ps = pstats.Stats(pr, stream=s).sort_stats(sortby)
    ps.print_stats()
    print(s.getvalue())
