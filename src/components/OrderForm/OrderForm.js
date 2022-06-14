import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error:false
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if(this.state.name && this.state.ingredients.length) {
      this.setState({error:false});
      this.props.postOrder({name: this.state.name, ingredients: this.state.ingredients});
      this.clearInputs();
    } else {
    this.setState({error:true})
    }
  }

  handleNameChange = e => {
    this.setState({ name:e.target.value})
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ ingredients:[...this.state.ingredients, e.target.name] })
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <>
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
      {this.state.error && <h1>A Name and at least one ingredient is needed to submit an order!</h1>}
      </>
    )
  }
}

export default OrderForm;
