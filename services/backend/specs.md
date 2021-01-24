# API documentation

API provides single route:

- ```parse data``` - receives **POST** request with *json* data.
----------------------
## Request params
Route parses 2 **optional** parameters: ```sort_key``` and ```asc```.
### sort_key
Use one of values from the list:
- 'title' 
- 'cost'
- 'price'
- 'weight'
- 'image_link'
- 'website_url'
- 'website_title'
- 'manufacturer'

Response will contain requested data sorted by a certain key.

**Default**: 'cost'.

### asc
Defines ascending or descending sorting mode.

Parses 2 possible boolean values: ```True``` or ```False```.

**Default**: false.

### Example
``` json
{
"sort_key" : "manufacturer",
"asc"      : "True"
}
```
---------------
## Response params

### Response code: 202 Accepted

Getting this response means that requested data is outdated and requested process of updating. 

Check current route again to receive data after parsing was finished.  

### Response code: 200 OK

*Вы сдали лабу №4. Поздравляю.*

Returns json-body with ```"product"``` key. Values of mentioned key - list of Product object.

#### Keys of Product instance:
- title : displayed title
- price : overall cost of 1 entity
- cost : cost of 1 kg
- weight : weight of certain entity
- image_link : link to external image of product
- website_url : website url with product
- website_title : displaying title of certain website
- manufacturer : company

#### Example

```json
{
  "products": [
    {
      "title": "Крупагречневая",
      "cost": 33.0,
      "price": 33.0,
      "weight": 1.0,
      "image_link": "https://img3.zakaz.ua/upload.version_1.0.b54f68939f3b3d20ad6dce5aeed1aa1a.150x150.jpeg",
      "website_url": "https://auchan.zakaz.ua/ru/categories/buckwheat-auchan/",
      "website_title": "Ашан",
      "manufacturer": "---"
    },
    {
      "title": "Крупа гречневая ядрица быстроразваривающаяся",
      "cost": 35.3,
      "price": 35.3,
      "weight": 1.0,
      "image_link": "https://img3.zakaz.ua/20200528.1590593836.ad72436478c_2020-05-28_Auchan_Pavlo_Yulia_Alexey/20200528.1590593836.SNCPSG10.obj.0.1.jpg.oe.jpg.pf.jpg.150nowm.jpg.150x.jpg",
      "website_url": "https://auchan.zakaz.ua/ru/categories/buckwheat-auchan/",
      "website_title": "Ашан",
      "manufacturer": "Каждый"
    },
    {
      "title": "Крупа гречневая",
      "cost": 36.19,
      "price": 36.19,
      "weight": 1.0,
      "image_link": "https://img3.zakaz.ua/20151006.1444124985.ad72436478c_2015-10-06_Yana/20151006.1444124985.SNCPSG10.obj.0.1.jpg.oe.jpg.pf.jpg.150nowm.jpg.150x.jpg",
      "website_url": "https://novus.zakaz.ua/ru/categories/buckwheat/",
      "website_title": "NOVUS",
      "manufacturer": "Marka Promo"
    }
  ]
}
```