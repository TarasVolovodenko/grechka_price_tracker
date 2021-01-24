import re

from ...product import Product
from .abc_parser import BaseParser, run_in_executor

from typing import List
from bs4 import BeautifulSoup


class EkolavkaParser(BaseParser):
    """
    Class implements Eko-Lavka website parsing functions
    """

    _WEBSITE_URL = "https://eco-lavca.ua/uk/?s=%D0%BA%D1%80%D1%83%D0%BF%D0%B0" \
                   "+%D0%B3%D1%80%D0%B5%D1%87%D0%B0%D0%BD%D0%B0&post_type=product"
    _WEBSITE_TITLE = "ЕКО ЛАВКА"

    @classmethod
    async def get_products(cls) -> List[Product]:
        """
        Parse from Eko-Lavka website such fields as:
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
        products: List[Product] = []
        items = await run_in_executor(soup.find_all, class_="product-grid-item")
        for item in items:
            product_title: str = item.find("h3", "product-title").a.text
            if product_title.find("Крупа гречана") != -1:
                product_company, product_weight_str = item.find(class_="product-subtitle").text.split(",")
                product_image_link = item.find(class_="attachment-shop_catalog")['src']
                product_price = float(item.find(class_="woocommerce-Price-amount").text[:5].replace(",", "."))
                if re.match(r" [\d]* кг", product_weight_str):
                    product_weight = float(product_weight_str.split(" кг")[0])
                elif re.match(r" [\d]* г", product_weight_str):
                    product_weight = round(float(product_weight_str.split(" г")[0])/1000, 2)
                else:
                    raise ValueError
                product_cost = round(product_price/product_weight, 2)
                products.append(Product(product_title, product_cost, product_price, product_weight,
                                        product_image_link, cls.website_url(), cls.website_title(), product_company))
        return products
