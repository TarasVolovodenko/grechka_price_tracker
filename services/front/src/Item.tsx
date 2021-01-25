import React from 'react';

class ItemComponent extends React.Component<{
    title: string;
    cost: number
    price: number;
    weight: number;
    image_link: string;
    website_url: string;
    website_title: string;
    manufacturer: string;
  }> {

    render() {
      let store = <img></img>;
      if(this.props.website_title == "Ашан"){
        store = <img src = "https://img4.zakaz.ua/store_logos/auchan.svg" alt = "Ашан" />
      }
      else if(this.props.website_title == "NOVUS"){
        store = <img src = "https://img4.zakaz.ua/store_logos/novus.svg" alt = "NOVUS" />
      }
      else if(this.props.website_title == "ЕКО ЛАВКА"){
        store = <img src = "https://eco-lavca.ua/wp-content/uploads/2018/12/logo_green_text.svg" alt = "ЕКО ЛАВКА" />
      }
      else if(this.props.website_title == "Rozetka"){
        store = <img src = "https://xl-static.rozetka.com.ua/assets/img/design/logo_n.svg" alt = "Rozetka" />
      }

        return (
            <a className="container container-md item main-a" href={this.props.website_url} target="_blank">
            <div className="row" >
  
              <div className="col-md-2 col-sm-2 col-4 col-xs-6 col1 align-self-center" >
                <img src={this.props.image_link} alt={this.props.title}/>
              </div>
  
              <div className= "col col-md-10 col-sm-10 col-8 col-xs-6 col2 align-self-center">
                <div className= "row">
                  <div className= "new-r w-100"></div>
                  <div className="col-md-3 col">
                    <p className= "name">{this.props.title}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col-1">
                    <p>{this.props.weight}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col-2 col-sm-1.5">
                    <p>{this.props.price}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col-2 col-sm-1.5">
                    <p>{this.props.cost}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p className = "manufacturer">{this.props.manufacturer}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col-2 col-sm-2">
                    <div className = "store">{store}</div>
                  </div>
                </div>
              </div>
          </div>
         </a>
        );
    }
}

export default ItemComponent