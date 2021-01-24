import re

from ...product import Product
from .abc_parser import BaseParser, run_in_executor

from typing import List
from bs4 import BeautifulSoup


class NovusParser(BaseParser):
    """
    Class implements NOVUS website parsing functions.
    """

    _WEBSITE_URL = "https://novus.zakaz.ua/ru/categories/buckwheat/"
    _WEBSITE_TITLE = "NOVUS"

    @classmethod
    async def get_products(cls) -> List[Product]:
        """
        Parse from Novus website such fields as:
            - title : displayed title
            - price : overall cost of 1 entity
            - cost : cost of 1 kg
            - weight : weight of certain entity
            - image_link : link to external image of product
            - website_url : website url with product
            - website_title : displaying title of certain website
            - manufacturer : company
        :return: list of instance of Product.
        """
        soup: BeautifulSoup = await cls._get_soup()
        items_html = await run_in_executor(soup.find, class_=['products-box__list'])
        products: List[Product] = []
        for item in items_html.find_all(class_="product-tile"):
            product_company = ''.join(re.findall(r"\s[А-ЯA-Z]+[а-яА-ЯA-Za-z\'\"()]*",
                                                 item['title'])).strip()
            product_title: str = re.findall(r"[\D]*", item['title'])[0].replace(" " + product_company, "")\
                .replace(" день", "").strip()
            product_image_link = item.find(class_='product-tile__image').img['src']
            product_price = float(item.find(class_="product-tile__details")
                                      .find(class_="Price__value_caption").text)
            product_weight_str = item.find(class_="product-tile__weight").text
            if re.match(r"[\d]* кг", product_weight_str):
                product_weight = float(product_weight_str.split(" кг")[0])
            elif re.match(r"[\d]* г", product_weight_str):
                product_weight = round(float(product_weight_str.split(" г")[0])/1000, 2)
            else:
                raise ValueError
            product_cost = round(product_price/product_weight, 2)
            products.append(Product(product_title, product_cost, product_price, product_weight,
                                    product_image_link, cls.website_url(), cls.website_title(), product_company))
        return products
