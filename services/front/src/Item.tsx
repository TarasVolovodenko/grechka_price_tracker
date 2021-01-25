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
        return (
            <a className="container container-md item" href={this.props.website_url}>
            <div className="row" >
  
              <div className="col-md-2 col-sm-2 col-4 col-xs-6 col1 align-self-center" >
                <a className = "imlink" href={this.props.website_url}><img src={this.props.image_link} alt={this.props.title}/></a>
              </div>
  
              <div className= "col col-md-10 col-sm-10 col-8 col-xs-6 col2 align-self-center">
                <div className= "row">
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p className= "name">{this.props.title}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p>{this.props.cost}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p>{this.props.weight}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p>{this.props.manufacturer}</p>
                  </div>
                </div>
              </div>
          </div>
         </a>
        );
    }
}

export default ItemComponent