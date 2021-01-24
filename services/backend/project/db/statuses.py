"""
Here you may find all Redis cache statuses realizations:

- up-to-date
- on-process
- outdated
"""
from abc import ABC, abstractmethod


class RedisStatus(ABC):
    """
    Base class for all Redis cache statuses
    """

    @abstractmethod
    def __str__(self):
        """
        Method provides user-friendly status display.
        :return: string representation of Redis status.
        """
        pass


class RedisUpToDate(RedisStatus):
    """
    Redis status indicates everything is up to date.
    """

    def __str__(self):
        return "All data is up to date."


class RedisOnProcess(RedisStatus):
    """
    Redis status indicates data is currently processing.
    """

    def __str__(self):
        return "Parsing data."


class RedisOutdated(RedisStatus):
    """
    Redis status indicates data need to be updated
    """
    def __str__(self):
        return "Data is irrelevant."
