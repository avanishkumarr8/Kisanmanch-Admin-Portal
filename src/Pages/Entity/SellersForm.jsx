import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Divider,
    Upload,

    Row, Col,

    Checkbox
} from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

const fileList = [

];

const SellersForm = () => {

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
            <Divider orientation="left" style={{ padding: "10px" }}>Seller Registration</Divider>

            <div style={{ marginLeft: "30px", marginRight: "30px" }}>
                <div>
                    <Form layout='vertical'>
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
                                        addonAfter={suffixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                    <Upload
                                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture"
                                        defaultFileList={[...fileList]}
                                        className="upload-list-inline"
                                        accept='.png,.jpg,.jpeg'
                                        multiple
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
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
                                    <Upload
                                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture"
                                        defaultFileList={[...fileList]}
                                        className="upload-list-inline"
                                        accept='.png,.jpg,.jpeg'
                                        multiple
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
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
                                    <Upload
                                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture"
                                        defaultFileList={[...fileList]}
                                        className="upload-list-inline"
                                        accept='.png,.jpg,.jpeg'
                                        multiple
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
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
                                    <Upload
                                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture"
                                        defaultFileList={[...fileList]}
                                        className="upload-list-inline"
                                        accept='.png,.jpg,.jpeg'
                                        multiple
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
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
                                        addonAfter={suffixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                    <Upload
                                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture"
                                        defaultFileList={[...fileList]}
                                        className="upload-list-inline"
                                        accept='.png,.jpg,.jpeg'
                                        multiple
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="Harvest/Supply_Month"
                                    label="Harvest/Supply Month"
                                    rules={[

                                        {
                                            required: true,
                                            message: 'Please input Harvest/Supply Month!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select">
                                        <Option value="January">January</Option>
                                        <Option value="February">February</Option>
                                        <Option value="March">March</Option>
                                        <Option value="April">April</Option>
                                        <Option value="May">May</Option>
                                        <Option value="June">June</Option>
                                        <Option value="July">July</Option>
                                        <Option value="August">August</Option>
                                        <Option value="Septembar">Septembar</Option>
                                        <Option value="October">October</Option>
                                        <Option value="November">November</Option>
                                        <Option value="December">December</Option>
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

export default SellersForm