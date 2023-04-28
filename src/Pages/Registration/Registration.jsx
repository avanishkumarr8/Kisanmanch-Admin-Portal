import React, { useState } from 'react'
import './Registration.css'
import Navbar from "./Navbar";
import {
    Button, Checkbox, Form, Input, Card, Anchor, Col, Row, InputNumber,
    Select,
    Divider,
    Upload,
} from 'antd';
import { Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { postBuyer, postSeller } from '../../Services/RegisterServices';

const { TabPane } = Tabs;

const { Link } = Anchor;
const { Option } = Select;
const fileList = [

];

const Registration = () => {
    const [isContainerActive, setIsContainerActive] = useState(false);
    const [form] = Form.useForm();
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

    const [checked, setChecked] = useState(false);

    const suffixSelector1 = (
        <Form.Item name="suffix1" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector2 = (
        <Form.Item name="suffix2" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector3 = (
        <Form.Item name="suffix3" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector4 = (
        <Form.Item name="suffix4" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector5 = (
        <Form.Item name="suffix5" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector6 = (
        <Form.Item name="suffix6" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector7 = (
        <Form.Item name="suffix7" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector8 = (
        <Form.Item name="suffix8" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector9 = (
        <Form.Item name="suffix9" noStyle>
            <Select
                placeholder="Select"
                style={{
                    width: 70,
                }}
            >
                <Option value="KG">KG</Option>
                <Option value="TON">TON</Option>
            </Select>
        </Form.Item>
    );
    const validation = (rule, value, callback) => {
        if (checked) {
            return callback();
        }
        return callback("Please agree Terms of Use & Privacy policy");
    };
    const onCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };

    async function submitData(values) {

        const res = await postBuyer(values);
        form.resetFields();

    }
    async function submitData1(values) {

        const res = await postSeller(values);
        form.resetFields();

    }
    return (
        <>
            <Navbar />
            <Row >

                <Col span={8} offset={10}>   </Col>
                <Col span={22} offset={1}>
                    <Tabs defaultActiveKey="1" right>
                        <TabPane tab="Administrator" key="1">
                            <Form
                                name="login-form"
                                layout='vertical'
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                form={form}
                            >

                                <h1 textalign="center">Administrator Account</h1>
                                <Row>

                                    <Col span={12} style={{ paddingRight: "10px" }}>
                                        <Form.Item
                                            name="firstname"
                                            label="FirstName"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                        // style={{ padding: 10 }}
                                        >
                                            <Input


                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ paddingLeft: "10px" }}>
                                        <Form.Item
                                            name="lastname"
                                            label="LastName"
                                            rules={[{ required: true, message: 'Please input your lastname!' }]}
                                        // style={{ padding: 5 }}
                                        >
                                            <Input


                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col span={12} style={{ paddingRight: "10px" }}>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your email!',
                                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                                }
                                            ]}
                                        // style={{ padding: 5 }}
                                        >
                                            <Input


                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ paddingLeft: "10px" }}>
                                        <Form.Item
                                            name="mobile"
                                            label="Mobile"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your mobile!',
                                                    pattern: /^[0-9]{10,10}$/
                                                }]}
                                        // style={{ padding: 5 }}
                                        >
                                            <Input
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col span={12} style={{ paddingRight: "10px" }}>
                                        <Form.Item
                                            name="password"
                                            label="Password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        // style={{ padding: 10 }}
                                        >
                                            <Input type='password' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ paddingLeft: "10px" }}>
                                        <Form.Item
                                            name="confirmpassword"
                                            label="Confirm Password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your confirmpassword!",
                                                    // pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                                                },

                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue("password") === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            "Password and Confirm Password did not match",
                                                        );
                                                    },
                                                }),
                                            ]}>
                                            <Input type='password'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col offset={10}>
                                        <Form.Item>
                                            <Button type="default" htmlType="submit" style={{ backgroundColor: "Green", color: "white", width: "10em", fontSize: "20px", padding: " 0 0 0 0" }} size={"large"}>
                                                Register
                                            </Button>
                                        </Form.Item>        </Col>
                                </Row>
                            </Form>
                        </TabPane>
                        <TabPane tab="Buyer" key="2">
                            <div className='scroll-div'>
                                <Form layout='vertical' form={form} onFinish={(values) => {

                                    // console.log(values)
                                    submitData(values)

                                }}>
                                    <h1 textalign="center">Buyer Registration</h1>
                                    <Row>
                                        <Col span={8}>
                                            <Form.Item
                                                name="Business_Entity_Type"
                                                label="Business Entity Type"
                                            // rules={[

                                            //     {
                                            //         required: true,
                                            //         message: 'Please input Business Entity Type!',
                                            //     },
                                            // ]}
                                            >
                                                <Select placeholder="Select">
                                                    <Option value="Category 1">Propritory</Option>
                                                    <Option value="Category 2">PVT Ltd</Option>
                                                    <Option value="Category 3">LLP</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Business_Type"
                                                label="Business Type"
                                            // rules={[
                                            //     {
                                            //         required: true,
                                            //         message: 'Please select Business Type!',
                                            //     },
                                            // ]}
                                            >
                                                <Select placeholder="Select">
                                                    <Option value="Category 1">Category 1</Option>
                                                    <Option value="Category 2">Category 2</Option>
                                                    <Option value="Category 3">Category 3</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>


                                        <Col span={8} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Business_Name"
                                                label="Business Name"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Business Name!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={8} >
                                            <Form.Item
                                                name="Contact_Person_Name"
                                                label="Contact Person Name"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Contact Person Name!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Contact_Person_Phone"
                                                label="Contact Person Phone"

                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Contact_Person_Mobile"
                                                label="Contact Person Mobile"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Contact Person Mobile!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber style={{
                                                    width: '100%',
                                                }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Registered_Address"
                                                label="Registered Address"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Registered Address!',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea showCount maxLength={100} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Pin"
                                                label="PIN"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input PIN!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Pan"
                                                label="PAN"

                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="GSTIN"
                                                label="GSTIN"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input GSTIN!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="FSSAI_No"
                                                label="FSSAI NO"

                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Divider orientationMargin={50}>
                                        Monthly Business Demand
                                    </Divider>

                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Fruits"
                                                label="Fruits"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Fruits!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector1}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Vegitables"
                                                label="Vegitables"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Vegitables!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector2}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Exotic_Vegitable"
                                                label="Exotic Vegitable"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Exotic Vegitable!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector3}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Dry_Fruits"
                                                label="Dry Fruits"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Dry Fruits!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector4}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        <Form.Item
                                            name="agree"
                                            valuePropName="checked"
                                            noStyle
                                            rules={[{ validator: validation }]}
                                        >
                                            <Checkbox checked={checked} onChange={onCheckboxChange}>
                                                By clicking "Register", you agree to Kisan Manch Terms of Use and Privacy Policy. You consent to receive phone calls and SMS messages from Kisan Manch to provide updates on your order and/or for marketing purposes. Message frequency depends on your activity. You may opt-out by texting "STOP". Message and data rates may apply.
                                            </Checkbox>
                                        </Form.Item>
                                    </Form.Item>


                                    <Row>
                                        <Col span={12} offset={16}>
                                            <Form.Item >
                                                <Button type="default" htmlType="submit" style={{ backgroundColor: "Green", color: "white", width: "10em", fontSize: "20px", padding: " 0 0 0 0" }} size={"large"}>
                                                    Register
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>
                        </TabPane>
                        <TabPane tab="Seller" key="3">
                            <h1 textalign="center">Seller Registration</h1>

                            <div className='scroll-div'>
                                <Form layout='vertical' form={form} onFinish={(values) => {

                                    // console.log(values)
                                    submitData1(values)

                                }}>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Organization_Name"
                                                label="Organization Name"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Organization_Name!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Organization_Type"
                                                label="Organization Type"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select Organization Type!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Select">
                                                    <Option value="FPO">FPO</Option>
                                                    <Option value="Propritorship">Propritorship</Option>
                                                    <Option value="CFarmer Cooperative">Farmer Cooperative</Option>
                                                    <Option value="Farmer">Farmer</Option>
                                                    <Option value="PVT Ltd">PVT Ltd</Option>
                                                    <Option value="LLP">LLP</Option>
                                                    <Option value="Other">Other</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Contact_Person_Name"
                                                label="Contact Person Name"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Contact Person Name!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Contact_Person_Mobile"
                                                label="Contact Person Mobile"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Contact Person Mobile!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Address"
                                                label="Address"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Address!',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea showCount maxLength={100} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Pin"
                                                label="PIN"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input PIN!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>

                                    </Row>



                                    <Divider orientationMargin={50}>
                                        Crops Available for Supply
                                    </Divider>

                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Fruits"
                                                label="Fruits"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Fruits!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector5}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                                {/* <Upload
                                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture"
                                                    defaultFileList={[...fileList]}
                                                    className="upload-list-inline"
                                                    accept='.png,.jpg,.jpeg'
                                                    multiple
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                                </Upload> */}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Vegitables"
                                                label="Vegitables"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Vegitables!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector6}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                                {/* <Upload
                                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture"
                                                    defaultFileList={[...fileList]}
                                                    className="upload-list-inline"
                                                    accept='.png,.jpg,.jpeg'
                                                    multiple
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                                </Upload> */}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Exotic_Vegitable"
                                                label="Exotic Vegitable"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Exotic Vegitable!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector7}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                                {/* <Upload
                                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture"
                                                    defaultFileList={[...fileList]}
                                                    className="upload-list-inline"
                                                    accept='.png,.jpg,.jpeg'
                                                    multiple
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                                </Upload> */}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Dry_Fruits"
                                                label="Dry Fruits"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Dry Fruits!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector8}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                                {/* <Upload
                                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture"
                                                    defaultFileList={[...fileList]}
                                                    className="upload-list-inline"
                                                    accept='.png,.jpg,.jpeg'
                                                    multiple
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                                </Upload> */}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Others"
                                                label="Others"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input Others!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    addonAfter={suffixSelector9}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                                {/* <Upload
                                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture"
                                                    defaultFileList={[...fileList]}
                                                    className="upload-list-inline"
                                                    accept='.png,.jpg,.jpeg'
                                                    multiple
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                                </Upload> */}
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Harvest_Supply_Month"
                                                label="Harvest/Supply Month"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Harvest/Supply Month!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Select">
                                                    <Option value="01">January</Option>
                                                    <Option value="02">February</Option>
                                                    <Option value="03">March</Option>
                                                    <Option value="04">April</Option>
                                                    <Option value="05">May</Option>
                                                    <Option value="06">June</Option>
                                                    <Option value="07">July</Option>
                                                    <Option value="08">August</Option>
                                                    <Option value="09">Septembar</Option>
                                                    <Option value="10">October</Option>
                                                    <Option value="11">November</Option>
                                                    <Option value="12">December</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ paddingLeft: "10px" }}>
                                            <Form.Item
                                                name="Msg_for_KM_Team"
                                                label="Message for Kisan Manch Team"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please input Message!',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea showCount maxLength={100} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        <Form.Item
                                            name="agree"
                                            valuePropName="checked"
                                            noStyle
                                            rules={[{ validator: validation }]}
                                        >
                                            <Checkbox checked={checked} onChange={onCheckboxChange}>
                                                By clicking "Register", you agree to Kisan Manch Terms of Use and Privacy Policy. You consent to receive phone calls and SMS messages from Kisan Manch to provide updates on your order and/or for marketing purposes. Message frequency depends on your activity. You may opt-out by texting "STOP". Message and data rates may apply.
                                            </Checkbox>
                                        </Form.Item>
                                    </Form.Item>


                                    <Row>
                                        <Col span={12} offset={16}>
                                            <Form.Item >
                                                <Button type="default" htmlType="submit" style={{ backgroundColor: "Green", color: "white", width: "10em", fontSize: "20px", padding: " 0 0 0 0" }} size={"large"}>
                                                    Register
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <Row >

                <div className='register-body' >
                    <div className='register-container' >





                    </div>
                </div>


            </Row>
        </>
    )
}

export default Registration