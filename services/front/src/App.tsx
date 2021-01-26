import React, { useEffect } from 'react';
import './App.css';
import ItemComponent from './Item';
import axios, {AxiosResponse} from 'axios';
interface Item {
  title: string;
  cost: number
  price: number;
  weight: number;
  image_link: string;
  website_url: string;
  website_title: string;
  manufacturer: string;
};



class App extends React.Component<{}, {items: ItemComponent[], show: boolean, sort: string}> {
  
  constructor() {
    super({})
    this.state = {
      items: [],
      show: false, 
      sort: "cost"
    };
  }

  componentDidMount() {
    const config = {
    };
    axios.post('http://localhost:1228/parse_data', {"sort_key": "cost", "asc": "False"}, config)
    .then( res =>{
      this.setState({
        items: res.data.products.map( (item: Item) =>  <ItemComponent 
          title={item.title}
          cost={item.cost}
          price={item.price}
          weight={item.weight}
          image_link={item.image_link}
          website_url={item.website_url}
          website_title={item.website_title}
          manufacturer={item.manufacturer}
        /> )
      })
    })
    .catch((err: any)=>console.log(err))
  }

  showPage(index : number) : ItemComponent[] {
    if(!this.state.show){
      return ([...Array(10)].map( (x, i) => this.state.items[i + index*10] ))
    }
    else{
      return (this.state.items.map( (x, i) => this.state.items[i + index*10] ))
    }
  }
handleShowMore = () =>{
  this.setState({
    show: true
  })
}
handleHide = () =>{
  this.setState({
    show: false
  })
}


handleSortFalse = (key: any) => {
  this.setState({
    sort: key
  })
  const config = {
  };
  axios.post('http://localhost:1228/parse_data', {"sort_key": this.state.sort, "asc": "False"}, config)
  .then( res =>{
    this.setState({
      items: res.data.products.map( (item: Item) =>  <ItemComponent 
        title={item.title}
        cost={item.cost}
        price={item.price}
        weight={item.weight}
        image_link={item.image_link}
        website_url={item.website_url}
        website_title={item.website_title}
        manufacturer={item.manufacturer}
      /> )
    })
  })
}
handleSortTrue = (key: any) =>{
  const config = {
  };
  axios.post('http://localhost:1228/parse_data', {"sort_key": key, "asc": "True"}, config)
  .then( res =>{
    this.setState({
      items: res.data.products.map( (item: Item) =>  <ItemComponent 
        title={item.title}
        cost={item.cost}
        price={item.price}
        weight={item.weight}
        image_link={item.image_link}
        website_url={item.website_url}
        website_title={item.website_title}
        manufacturer={item.manufacturer}
      /> )
    })
  })
}



  render() {

    let button = <button type="button" className="btn btn-light" onClick = {this.handleShowMore}>Показать больше</button>;
    if(this.state.show === true){
      button = <button type="button" className="btn btn-light" onClick = {this.handleHide}>Скрыть</button>
    }

    return <div>
        
        <a className="container container-md item main-a menu">
            <div className="row" >
  
              <div className="col-md-2 col-sm-2 col-4 col-xs-6 col1 align-self-center col1-menu" >
              </div>
  
              <div className= "col col-md-10 col-sm-10 col-8 col-xs-6 col2 align-self-center">
              <div className= "row">
                  <div className= "new-r w-100"></div>
                  <div className="col-md col col-menu">
                    <p>Название</p>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortFalse("title")}>&#8593;</button>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortTrue("title")}>&#8595;</button>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col col-menu">
                    <p>Масса</p>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortFalse("weight")} >&#8593;</button>
                    <button  type="button" className ="btn btn-light btn-sm"onClick = {() => this.handleSortTrue("weight")}>&#8595;</button>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col col-sm col-menu">
                    <p>Цена, грн</p>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortFalse("cost")}>&#8593;</button>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortTrue("cost")}>&#8595;</button>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col col-sm col-menu">
                    <p>Цена за кг</p>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortFalse("price")}>&#8593;</button>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortTrue("price")}>&#8595;</button>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col col-menu">
                    <p className = "manufacturer">Поставщик</p>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortFalse("manufacturer")}>&#8593;</button>
                    <button type="button" className ="btn btn-light btn-sm" onClick = {() => this.handleSortTrue("manufacturer")}>&#8595;</button>
                  </div>
                  <div className= "new-r w-100"></div>
                  <div className="col-1 col-sm-2">
                    <div className = "store"></div>
                  </div>
                </div>
              </div>
          </div>
         </a>


        {this.showPage(0)}
        {button}
      </div>
  }
}

export default App;
