import React from 'react';

class ItemComponent extends React.Component<{
    id: number;
    title: string;
    body: string;
    userId: number;
  }> {

    render() {
        return (
            <div className="container container-md">
            <div className="row" >
  
              <div className="col-md-2 col-sm-2 col-4 col-xs-6 col1 align-self-center" >
                <img src = "favicon.ico" alt="item" />
              </div>
  
              <div className= "col col-md-10 col-sm-10 col-8 col-xs-6 col2 align-self-center">
                <div className= "row">
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p className= "name">{this.props.body}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p>{this.props.id}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p>{this.props.userId}</p>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col">
                    <p>{this.props.title}</p>
                  </div>
                </div>
              </div>
          </div>
          </div>
        );
    }
}

export default ItemComponent