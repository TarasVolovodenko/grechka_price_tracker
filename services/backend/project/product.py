"""
Product NamedTuple. Defines structure of parsing result.
"""
import collections

Product = collections.namedtuple("Product", ['title', 'price', 'weight'])
# TODO: extend with additional columns
