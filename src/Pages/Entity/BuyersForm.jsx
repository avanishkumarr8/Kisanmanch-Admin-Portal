import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Divider,

    Row, Col,

    Checkbox
} from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const BuyersForm = () => {

    const [checked, setChecked] = useState(false);

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
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


    return (
        <div style={{ background: "white", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
            <Divider orientation="left" style={{ padding: "10px" }}>Buyer Registration</Divider>

            <div style={{ marginLeft: "30px", marginRight: "30px" }}>
                <div>
                    <Form layout='vertical'>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="Business_Entity_Type"
                                    label="Business Entity Type"
                                    rules={[

                                        {
                                            required: true,
                                            message: 'Please input Business Entity Type!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select">
                                        <Option value="Category 1">Propritory</Option>
                                        <Option value="Category 2">PVT Ltd</Option>
                                        <Option value="Category 3">LLP</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ paddingLeft: "10px" }}>
                                <Form.Item
                                    name="Business_Type"
                                    label="Business Type"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Business Type!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select">
                                        <Option value="Category 1">Category 1</Option>
                                        <Option value="Category 2">Category 2</Option>
                                        <Option value="Category 3">Category 3</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
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
                            <Col span={12} style={{ paddingLeft: "10px" }}>
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
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="Contact_Person_Phone"
                                    label="Contact Person Phone"

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
                                        addonAfter={suffixSelector}
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
                                        addonAfter={suffixSelector}
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
                                        addonAfter={suffixSelector}
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
                                        addonAfter={suffixSelector}
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
                                    <Button type="primary" htmlType="submit">
                                        Register
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                </div>
            </div>


        </div>
    )
}

export default BuyersForm