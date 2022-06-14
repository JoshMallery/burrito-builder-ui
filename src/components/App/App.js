import React, { Component } from 'react';
import './App.css';
import apiCalls from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
    this.postOrder = this.postOrder.bind(this)
  }

  componentDidMount() {
    apiCalls.getOrders()
      .then(response => this.setState({orders:response.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

 postOrder(order) {
    apiCalls.addOrder(order)
      .then(response => this.setState({orders:[...this.state.orders,response]}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm postOrder={this.postOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
