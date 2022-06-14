const apiCalls = {

  getOrders() {
    return fetch('http://localhost:3001/api/v1/orders')
        .then(response => response.json())
  },

  addOrder(order) {
    return fetch('http://localhost:3001/api/v1/orders',{
        body: JSON.stringify(order) ,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
  },

  removeOrder(id) {
    return fetch(`http://localhost:3001/api/v1/orders/${id}`,{
        method: 'DELETE'
    })
        // .then(response => console.log(response.status))
  }

};

export default apiCalls
