import React, { useState } from 'react'
import './ForgotPassword.css'
import { Button, Form, Input, Anchor } from 'antd';
import img1 from '../../Assets/Images/logo.png';
const { Link } = Anchor;

const ForgotPassword = () => {
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
        <div className='forgot-body'>
            <div className='forgot-container' >
                <div>
                    <img src={img1} height={50} width={200} style={{ marginRight: "22px" }} />
                </div>
                <br />

                <Form
                    name="login-form"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <h1>Forgot Password</h1>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    // style={{ padding: 10 }}
                    >
                        <Input

                            style={{ width: "400px", borderRadius: "4px" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Otp"
                        label="Otp"
                        rules={[{ required: true, message: 'Please input OTP!' }]}
                    // style={{ padding: 10 }}
                    >
                        <Input

                            style={{ width: "400px", borderRadius: "4px" }}
                        />
                    </Form.Item>

                    {/* <Form.Item
                            name="Otp"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            style={{ padding: 10 }}
                        >
                            <Input type='password'
                                placeholder="OTP"
                                style={{ width: "100%", height: 30 }}
                            />
                        </Form.Item> */}



                    <Form.Item>
                        <Button type="default" htmlType="submit" className="forgot-form-button">
                            Submit
                        </Button>
                    </Form.Item>

                    <a href="/" style={{ float: "right" }}>Back</a>


                </Form>
            </div>
        </div>
    )
}

export default ForgotPassword