import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Dashboard from './Pages/Dashboard/Dashboard'
import { Layout } from 'antd';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AddProduct from "./Pages/Products/AddProduct";
import ProductList from "./Pages/Products/ProductList";
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';


const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Registration />}></Route>
          <Route path='/forgot' element={<ForgotPassword />}></Route>
          <Route path='*' element={<Dashboard />}></Route>

        </Routes>


      </BrowserRouter>




      {/* <Dashboard /> */}
    </div >
  );
}

export default App;
