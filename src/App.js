import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'



import Home from './pages/Home'




class App extends Component {




  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <Route path='/' component={Home} />
        </BrowserRouter>


      </div>

    )
  }
}




export default App;
