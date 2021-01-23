from ..scrapper.webclient import get_html
from aiohttp.client_exceptions import ClientConnectionError # noqa


async def test_200(new_loop): # noqa
    result = await get_html('https://blank.org/')
    assert result == """<html>

<head>
<title>
blank
</title>
</head>

<body bgcolor=#ffffff text=#2222ff link=#ff0000 vlink=#880000 alink=#00ff00>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<center>
<a style="text-decoration:none" href="blank.html">.</a>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
</center>
</body>
</html>
"""


async def test_timeout_error(new_loop): # noqa
    try:
        await get_html('https://www.eurplate.org/something_bad')
    except ClientConnectionError as e:
        assert e is not None
