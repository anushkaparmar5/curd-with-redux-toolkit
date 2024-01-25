import React from 'react'
import Header from './Components/Header'
import Users from './Components/Users'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <div>
      <Header />
      <div className='container'>
        <Users />
      </div>
    </div>
  )
}

export default App