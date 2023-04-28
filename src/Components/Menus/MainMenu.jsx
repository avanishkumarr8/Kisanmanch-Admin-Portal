import React from 'react'
import PropTypes from 'prop-types'
import {
  MailOutlined, SettingOutlined, AppstoreOutlined,
  BarChartOutlined, PlusOutlined, UnorderedListOutlined,
  ShoppingOutlined, UserOutlined,
  CheckOutlined, CloseOutlined, MinusOutlined,
  SnippetsOutlined, UsergroupDeleteOutlined, FundViewOutlined, TeamOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';

import { Link, Outlet } from "react-router-dom";
import { useState } from 'react'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Analytics', 'g1', null, [], 'group'),
  getItem(<Link to="/dashboard"  >
    Dashboard
  </Link>, 'sub1', <BarChartOutlined />),


  getItem('Products', 'g2', null, [], 'group'),
  getItem('Products', 'sub2', <AppstoreOutlined />, [
    getItem(<Link to="/product/add"  >Add Product </Link>, 'productadd', <PlusOutlined />
    ), getItem(<Link to="/product/list"  > Product List </Link>, 'productlist', <UnorderedListOutlined />
    ),


  ]),


  getItem('Categories', 'g3', null, [], 'group'),
  getItem('Categories', 'sub3', <SettingOutlined />, [
    getItem(<Link to="/category/add"  > Add Category </Link>, 'categoryadd', <PlusOutlined />),
    getItem(<Link to="/category/addsub"  > Add SubCategory </Link>, 'categoryaddsub', <PlusOutlined />),
    getItem(<Link to="/category/list"  > Category List </Link>, 'categorylist', <UnorderedListOutlined />),
    getItem(<Link to="/category/sublist"  > SubCategory List </Link>, 'Subcategorylist', <UnorderedListOutlined />),

  ]),


  getItem('Orders ', 'g4', null, [], 'group'),
  getItem('Orders', 'sub4', <ShoppingOutlined />, [
    getItem(<Link to="/order/list"  > Order List </Link>, 'orderlist', <UnorderedListOutlined />),
    getItem(<Link to="/order/appRejec"  > To Approve/Reject </Link>, 'orderapprejec', <PlusOutlined />),
    getItem(<Link to="/order/approved"  > Approved </Link>, 'operapproved', <CheckOutlined />),
    getItem(<Link to="/order/rejected"  > Rejected </Link>, 'orderrejected', <CloseOutlined />),
    getItem(<Link to="/order/cancelled"  > Cancelled </Link>, 'ordercancelled', <MinusOutlined />),
    getItem(<Link to="/order/Completed"  > Completed </Link>, 'orderpending', <PlusOutlined />),
    getItem(<Link to="/order/reports"  > Reports </Link>, 'orderreports', <SnippetsOutlined />),

  ]),
  getItem('Sales', 'g5', null, [], 'group'),
  getItem(<Link to="/sales/hist"  >
    Sales History
  </Link>, 'sub5', <FundViewOutlined />),
  // getItem('Sales', 'sub5', <SettingOutlined />, [
  //   getItem(<Link to="/sales/hist"  > Sales History </Link>, 'saleshist', <PlusOutlined />),
  //   getItem(<Link to="/sales/analytics"  > Sales Analytics </Link>, 'salesanaly', <UnorderedListOutlined />),
  // ]),

  getItem('Settings', 'g6', null, [], 'group'),
  getItem('Users', 'sub6', <UserOutlined />, [
    getItem(<Link to="/user/list"  > User List </Link>, 'userlist', <UsergroupDeleteOutlined />),
    // getItem(<Link to="/user/settings"  > Settings </Link>, 'usersettings', <SettingOutlined />),

  ]),
  getItem('Entities', 'g7', null, [], 'group'),
  getItem('Entities', 'sub7', <TeamOutlined />, [
    getItem(<Link to="/entity/buyers"  >Buyers</Link>, 'buyers', <TeamOutlined />
    ), getItem(<Link to="/entity/sellers"  > Sellers</Link>, 'sellers', <TeamOutlined />
    ),



  ]),


];



const MainMenu = props => {
  const [key, setKey] = useState("");

  const onClick = ({ _item, key, _keyPath, _domEvent }) => {
    console.log(key);
    setKey(key);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
        height: "110vh",
        overflowY: "scroll"
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      selectedKeys={[key]}

      mode="inline"
      items={items}
    >

    </Menu>)
}

MainMenu.propTypes = {}

export default MainMenu