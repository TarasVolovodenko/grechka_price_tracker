import React, { useEffect } from 'react';
import './App.css';
import ItemComponent from './Item';
import axios, {AxiosResponse} from 'axios';
import Navigation from './OnlyNav';
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


class App extends React.Component<{}, {items: ItemComponent[]}> {
  paging: React.RefObject<Navigation>;
  
  constructor() {
    super({})
    this.state = {
      items: [],
    };
    this.paging = React.createRef();
  }

  // resultAsList(res: AxiosResponse<Item[]|Item>): Item[] {
  //   if (res.data instanceof )
  // }

  componentDidMount() {
    const config = {
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
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
    return ([...Array(10)].map( (x, i) => this.state.items[i + index*10] ))
  }

  render() {
    return <div>
        {this.showPage(0)}
        {/* { this.state.items.map( (item) => item) } */}
        <Navigation maxPages={4} ref={this.paging}/>
      </div>
  }
}

export default App;
