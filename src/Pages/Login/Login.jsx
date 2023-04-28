import React, { useState } from 'react'
import './Login.css'

import { Button, Checkbox, Form, Input, Card, Anchor, Col, Row } from 'antd';
import img1 from '../../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';

const { Link } = Anchor;

const Login = () => {
    const navigate = useNavigate();
  
    const coursesPage = () => {
        navigate("/dashboard")
    }
    const [isContainerActive, setIsContainerActive] = useState(false);
    const container = () => {
        document.getElementById('container');
    }
    const SignUpShow = () => {
        setIsContainerActive(true);
    }
    const SignInShow = () => {
        setIsContainerActive(false);
    }
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        // setIsClicked(true);
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login-body'>
            <div className='container' >
                <div>
                    <img src={img1} height={50} width={200} style={{ marginLeft: "25%" }} />
                </div>
                <br />

                <Form
                    name="login-form"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <h1 textalign="center" style={{ marginLeft: "40%" }}>Login</h1>

                    <Form.Item
                        name="firstname"
                        label="User Name"
                        rules={[{ required: true, message: 'Please input your User Name!' }]}
                        style={{ marginBottom: "2%" }}
                    >
                        <Input

                            style={{ width: "400px", borderRadius: "4px" }}
                        />
                    </Form.Item>


                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    style={{ marginBottom: -1 }}
                    >
                        <Input type='password'

                            style={{ width: "400px", borderRadius: "4px" }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"                 
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                  <Button type="default" htmlType="submit"  onClick={()=>{coursesPage()}}    to={'/login'}   className="login-form-button">
                            Login
                        </Button>
                    </Form.Item>

                    <a href="/forgot">Forgot Password?</a>
                    <a href="/register" style={{ float: "right" }}>Register</a>



                </Form>

                {/* </div> */}
            </div>
        </div>
    )
}

export default Login