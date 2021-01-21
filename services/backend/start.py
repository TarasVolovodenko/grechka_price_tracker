import asyncio  # noqa
import uvloop  # noqa

uvloop.install()

from project import create_app  # noqa
