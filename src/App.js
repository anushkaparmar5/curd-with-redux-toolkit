import React from 'react'
import Header from './Components/Header'
import Users from './Components/Users'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Header />
      <div className='container'>
        <Users />
      </div>
    </Provider>
  )
}

export default App