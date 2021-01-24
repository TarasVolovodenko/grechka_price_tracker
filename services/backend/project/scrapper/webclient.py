"""
This module contain all necessary functions for web requests to specific sites
"""
import aiohttp

from aiohttp import ClientError
from asyncio import sleep


async def get_html(link: str):
    """
    Runs GET request to the specific site and returns it's content.
    :param link: url of the site to parse.
    :return: html body.
    """
    for _ in range(2):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(link, ssl=False) as resp:
                    status = resp.status
                    status_ok = resp.ok
                    response = await resp.text()
            if status_ok:
                return response
            else:
                raise ConnectionError(str(status) + " " + link)
        except ClientError as e:
            # TODO: log an error
            await sleep(0.1)
    raise ConnectionError(str(status) + " " + link)

