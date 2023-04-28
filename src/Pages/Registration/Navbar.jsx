import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button, Row, Col } from 'antd';
import img1 from '../../Assets/Images/logo.png';

class Navbar extends Component {
  state = {
    current: 'mail',
    visible: false
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
onClose = () => {
    this.setState({
      visible: false,
    });
  };
render() {
    return (
       
           
        <nav className="menuBar" > <br/>   <div className="menuCon">
        <Row style={{marginTop:"-20px"}}> <Col span={7} offset={11}>
        <img src={img1} height={80} width={240} style={{ marginBottom: "-40px" }} />
      
            <div className="leftMenu">
            </div>
            </Col>
        <Col span={6}>

            
            <div className="rightMenu">
            <LeftMenu />

            </div>
            </Col>
            
          </Row>
          
</div>
        </nav>  
    );
  }
}
export default Navbar;