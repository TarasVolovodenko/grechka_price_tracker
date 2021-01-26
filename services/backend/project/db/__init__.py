"""
This module is for all Redis-based data processing logic.
You may catch runtime errors as aioredis.RedisError - via Base class.
"""

# During this interval of time data is considering as valid and updated.
EVAL_TIME_STEP = 10*60
