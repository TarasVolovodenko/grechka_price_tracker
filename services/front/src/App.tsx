import React, { useEffect } from 'react';
import './App.css';
import ItemComponent from './Item';
import axios from 'axios';
import Navigation from './OnlyNav';


interface Item {
  id: number;
  title: string;
  body: string;
  userId: number;
};


class App extends React.Component<{}, {items: ItemComponent[]}> {
  
  constructor() {
    super({})
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts/5')
    .then(res=>{
      this.setState({items: 
        res.data.map( (item: Item) =>  <ItemComponent id={item.id} title={item.title} body={item.body} userId={item.userId} /> )
      })
    })
    .catch(err=>console.log(err))
  }

  render() {
    return (
      <div>
        
        {this.state.items.map( (item) => item)}
        <Navigation />
      </div>
    );
  }
}

export default App;
