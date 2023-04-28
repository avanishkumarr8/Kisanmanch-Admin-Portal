import React, { useState, useForm } from 'react'
import { Input, Upload, Button, Divider, Form, Row, Col } from "antd";
import { UploadOutlined, } from '@ant-design/icons';
import { postCategory } from '../../Services/CategoryServices';
// import { useForm } from 'antd/lib/form/Form';


const AddCategory = () => {

  const [imageBase64, setImageBase64] = useState()
  const [form] = Form.useForm();


  const [loadings, setLoadings] = useState([]);

  const fileList = [

  ];


  const uploadImage = async (e) => {

    setImageBase64(e)

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
    }, 5000);

  };

  async function submitData(values) {

    const res = await postCategory(values, imageBase64);
    form.resetFields();
  }

  return (
    <div style={{ background: "white", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
      <Divider orientation="left" style={{ padding: "10px" }}>Add Category</Divider>
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
                name="Category_Name"
                label="Category Name"
                rules={[

                  {
                    required: true,
                    message: 'Please input your Category Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingLeft: "10px" }}>
              <Form.Item
                name="Category_Description"
                label="Category Description"


              >
                <Input.TextArea showCount maxLength={100} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="Category_Icon"
                label="Category Icon"
                rules={[

                  {
                    required: true,
                    message: 'Please Upload Category Icon!',
                  },
                ]}>

                <Upload
                  action={(e) => { uploadImage(e) }}
                  maxCount={1}
                  listType="picture"
                  className="upload-list-inline"
                  accept='.png,.jpg,.jpeg'

                  // fileList={[...fileList]}
                  defaultFileList={[...fileList]}
                // beforeUpload={(file) => {
                //   console.log({file});
                //   return false;
                // }}
                >
                  <Button icon={<UploadOutlined />} >Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12} offset={16}>
              <Form.Item >

                <Button type="primary" htmlType="submit" loading={loadings[0]} onClick={() => {

                  enterLoading(0)
                }}>

                  Add Category
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default AddCategory