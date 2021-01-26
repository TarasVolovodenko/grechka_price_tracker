import React, { useEffect } from 'react';
import './App.css';
import ItemComponent from './Item';
import axios, {AxiosResponse} from 'axios';
/*import Navigation from './OnlyNav';*/
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



class App extends React.Component<{}, {items: ItemComponent[], show: boolean}> {
  
  constructor() {
    super({})
    this.state = {
      items: [],
      show: false
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
  render() {
    let button = <button type="button" className="btn btn-light" onClick = {this.handleShowMore}>Показать больше</button>;
    if(this.state.show === true){
      button = <button type="button" className="btn btn-light" onClick = {this.handleHide}>Скрыть</button>
    }

    return <div>
        {this.showPage(0)}
        {button}
      </div>
  }
}

export default App;
