"""
This module contain all necessary functions for web requests to specific sites
"""
import aiohttp


async def get_html(link: str):
    """
    Runs GET request to the specific site and returns it's content.
    :param link: url of the site to parse.
    :return: html body.
    """
    async with aiohttp.ClientSession() as session:
        async with session.get(link) as resp:
            status = resp.status
            status_ok = resp.ok
            response = await resp.text()

    if status_ok:
        return response
    else:
        raise ConnectionError(status + " " + link)
