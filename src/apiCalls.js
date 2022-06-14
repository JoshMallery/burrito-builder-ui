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
  }

};

export default apiCalls
