import React, { useState, useEffect } from 'react'
import { Input, Button, Divider, Form, Row, Col, Radio, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { postSubCategory, postSubSubCategory, getAllCategory, getAllSubCategory } from '../../Services/CategoryServices';
const { Option } = Select;

const AddSubCategory = () => {

    const [catDisplay, setCatDisplay] = useState(false)
    const [catSubDisplay, setCatSubDisplay] = useState(true)
    const [loadings, setLoadings] = useState([]);
    const [radioName, setRadioName] = useState('');
    const [parentCategory, setParentCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [form] = Form.useForm();
    const fetchParentCategory = async () => {
        const allCategory = await getAllCategory()
        console.log(allCategory)
        if (allCategory) {
            setParentCategory(allCategory);
        }
    }

    const fetchSubCategory = async () => {
        const allsubCategory = await getAllSubCategory()
        console.log(allsubCategory)
        if (allsubCategory) {
            setSubCategory(allsubCategory);
        }
    }
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 4000);
        // setIsEditing(false)
    };

    useEffect(() => {

        fetchParentCategory();
        fetchSubCategory();

    }, []);

    const handleChange = (e) => {
        // console.log(e.target.value)
        if (e.target.value == "Parent") {
            // setDropdownName("Parent Category")
            setRadioName('Parent')
            setCatDisplay(false)
            setCatSubDisplay(true)
        } else if (e.target.value == "Child") {
            // setDropdownName("Parent SubCategory")
            setRadioName('Child')
            setCatDisplay(true)
            setCatSubDisplay(false)
        }
    }
    async function submitData(values) {

        if (radioName === 'Parent') {
            const res = await postSubCategory(values)

        } else {
            const res = await postSubSubCategory(values)
        }
        form.resetFields();
    }

    return (
        <div style={{ background: "white", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
            <Divider orientation="left" style={{ padding: "10px" }}>Add SubCategory</Divider>
            <div style={{ marginLeft: "30px", marginRight: "30px" }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        submitData(values)
                    }}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="Sub_Category_Name"
                                label="Sub Category Name"
                                rules={[

                                    {
                                        required: true,
                                        message: 'Please input your SubCategory Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <Form.Item
                                name="Sub_Category_Description"
                                label="Sub Category Description"


                            >
                                <Input.TextArea showCount maxLength={100} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item label="Type">
                                <Radio.Group name='typegrp' onChange={(e) => {
                                    handleChange(e)
                                }}>
                                    <Radio value="Parent"> Main </Radio>
                                    <Radio value="Child"> Child </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="Category"
                                label="Category"

                                hidden={catDisplay}
                            >
                                <Select placeholder="select" >
                                    {parentCategory.map((category, index) => {
                                        return (
                                            < Option key={index} value={category.id} >
                                                {category.name}
                                            </Option>
                                        );
                                    })}

                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="SubCategory"
                                label="SubCategory"

                                hidden={catSubDisplay}
                            >
                                <Select placeholder="select" >
                                    {subCategory.map((category, index) => {
                                        return (
                                            < Option key={index} value={category.id} >
                                                {category.name}
                                            </Option>
                                        );
                                    })}

                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={16}>
                            <Form.Item >
                                <Button type="primary" htmlType="submit" loading={loadings[0]} onClick={() => enterLoading(0)}>
                                    Add SubCategory
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div >
    )
}

export default AddSubCategory