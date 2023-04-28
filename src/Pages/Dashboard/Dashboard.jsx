import React from 'react'
import MainMenu from '../../Components/Menus/MainMenu';
import { Layout, Row, Col, notification } from 'antd';
import logo from "../../Assets/Images/logo.png";
import { Link, Outlet } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AddProduct from "../Products/AddProduct";
import ProductList from "../Products/ProductList";
import MainDashboard from './MainDashboard';
import AddCategory from '../Category/AddCategory';
import AddSubCategory from '../Category/AddSubCategory';
import CategoryList from '../Category/CategoryList';
import SubCategoryList from '../Category/SubCategoryList';

import OrderList from '../Orders/OrderList';
import ApproveReject from '../Orders/ApproveReject';
import Approved from '../Orders/Approved';
import Rejected from '../Orders/Rejected';
import Cancelled from '../Orders/Cancelled';
import Completed from '../Orders/Completed';
import Reports from '../Orders/Reports';
import SalesHistory from "../Sales/SalesHistory";
import SalesAnalytics from "../Sales/SalesAnalytics";
import UserList from '../Users/UserList';
import Registration from '../Registration/Registration';
import Settings from '../Users/Settings';
import { Button, Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined, BellFilled } from '@ant-design/icons';
import Login from '../Login/Login';
import Buyers from '../Entity/Buyers';
import Sellers from '../Entity/Sellers';
import SellersForm from '../Entity/SellersForm';
import BuyersForm from '../Entity/BuyersForm';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a href="#">
            Profile Info
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a href="/">
            Logout
          </a>
        ),
      },
    ]}
  />
);
const notifications = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a href="#">
            Notification 1
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a href="#">
            Notification 2
          </a>
        ),
      },
    ]}
  />
);
const Dashboard = () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <>
      {/* <BrowserRouter> */}
      <Layout>
        <Header style={{
          "backgroundImage": "linear-gradient(-45deg,#2ed693 ,rgb(255,255,255), rgb(246,144,30) )",
          "height": "55px",
          "boxShadow": "500px"

        }}>
          {/* <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Registration />}></Route>
              


            </Routes> */}



          <nav>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginLeft: -55, marginTop: -7 }}>
              <Col span={1}>              <img className='left' src={logo} height={50} width={200} />
              </Col>
              <Col span={21}>

              </Col>
              <Col span={1} style={{ paddingLeft: 20 }}>
                <Dropdown overlay={notifications} placement="bottom">
                  <Avatar size={40} style={{ backgroundColor: '#42da9d' }} icon={<BellFilled />} />
                </Dropdown>
              </Col>
              <Col span={1}>
                <Dropdown overlay={menu} placement="bottom">
                  {/* <Button>bottom</Button> */}
                  {/* <Avatar size={30} icon={<UserOutlined />} /> */}
                  <Avatar size={45} style={{ backgroundColor: '#42da9d' }} icon={<UserOutlined />} />
                </Dropdown>
              </Col>
            </Row>
          </nav>
        </Header>
        <Layout>
          {/* <BrowserRouter> */}
          <Sider>
            <MainMenu />
          </Sider>
          <Content style={{ paddingLeft: 60, paddingRight: 5, paddingTop: 10, height: "100vh" }}>

            <Routes>
              <Route path="/dashboard" element={<MainDashboard />} />

              {/*-----Product Routes-----*/}
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/list" element={<ProductList />} />

              {/*-----Category Routes-----*/}
              <Route path="/category/add" element={<AddCategory />} />
              <Route path="/category/addsub" element={<AddSubCategory />} />
              <Route path="/category/list" element={<CategoryList />} />
              <Route path="/category/sublist" element={<SubCategoryList />} />


              {/*-----Order Routes-----*/}
              <Route path="/order/list" element={<OrderList></OrderList>} />
              <Route path="/order/appRejec" element={<ApproveReject></ApproveReject>} />
              <Route path="/order/Completed" element={<Completed></Completed>} />
              <Route path="/order/Approved" element={<Approved></Approved>} />
              <Route path="/order/Rejected" element={<Rejected></Rejected>} />
              <Route path="/order/Cancelled" element={<Cancelled></Cancelled>} />
              <Route path="/order/Reports" element={<Reports></Reports>} />

              {/*-----Sales Routes-----*/}
              <Route path="/sales/hist" element={<SalesHistory></SalesHistory>} />


              {/*-----User Routes-----*/}
              <Route path="/user/list" element={<UserList></UserList>} />

              {/*-----Entity Routes-----*/}
              <Route path="/entity/buyers" element={<Buyers />} />
              <Route path="/entity/sellers" element={<Sellers />} />

            </Routes>

          </Content>
          {/* </BrowserRouter> */}
        </Layout>
      </Layout>
      {/* </BrowserRouter> */}
    </>
  )
}

export default Dashboard