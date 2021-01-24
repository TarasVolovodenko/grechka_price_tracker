import React, { useEffect } from 'react';
import './App.css';
import ItemComponent from './Item';
import axios, {AxiosResponse} from 'axios';
import Navigation from './OnlyNav';
import { Http2ServerResponse } from 'http2';


interface Item {
  id: number;
  title: string;
  body: string;
  userId: number;
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
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res=>{
      this.setState({items:
        res.data.map( (item: Item) =>  <ItemComponent id={item.id} title={item.title} body={item.body} userId={item.userId} /> )
      })
    })
    .catch(err=>console.log(err))
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
