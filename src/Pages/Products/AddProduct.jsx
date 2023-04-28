// import React from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Divider,
  Upload,
  DatePicker,
  Row, Col,
  message
} from 'antd';
import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { getAllCategory } from '../../Services/CategoryServices';
import { getAllSubCategory  } from '../../Services/CategoryServices';
import { getAllSubSubCategory } from '../../Services/CategoryServices'
import { postProduct } from '../../Services/ProductServices';
const { Option } = Select;

const fileList = [

];


const AddProduct = (props) => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [form] = Form.useForm();
  const [allCategory, setAllCategory] = useState([])
  const [allSubCategory, setAllSubCategory] = useState([])
  const [allSubSubCategory, setAllSubSubCategory] = useState([])
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [sgst, setSgst] = useState();
  const [igst, setIgst] = useState();
  const [gst, setGst] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [dPrice, setDPrice] = useState(0);
  const [loadings, setLoadings] = useState([]);
  const [imageBase64, setImageBase64] = useState()
  const [pdfBase64, setPdfBase64] = useState()

  const fetchData = async () => {
    try {

      const allCategory = await getAllCategory()

      if (allCategory) {
        setAllCategory(allCategory);
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {

    fetchData();

  }, []);

  const fetchData1 = async () => {
    try {

      const allSubCategory = await getAllSubCategory()

      if (allSubCategory) {
        setAllSubCategory(allSubCategory);
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {

    fetchData1();

  }, []);

  const fetchData2 = async () => {
    try {

      const allSubSubCategory = await getAllSubSubCategory()

      if (allSubSubCategory) {
        setAllSubSubCategory(allSubSubCategory);
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {

    fetchData2();

  }, []);


 
  const uploadImage = async (e) => {
    setImageBase64(e)

  }
  const uploadPDF = async (e) => {
    setPdfBase64(e)

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

    const res = await postProduct(values, imageBase64, pdfBase64);
    form.resetFields();

  }

  const calcDPrice = () => {
    const TQP = quantity * price;
    const Disprice = TQP * discount / 100;
    const DTP = TQP - Disprice;
    console.log("DTP", DTP)
    setDPrice(DTP)


    const tGst = sgst + igst;
    setGst(tGst)

    const DGST = DTP * tGst / 100;

    const TotalP = DTP + DGST;
    setTotalPrice(TotalP)


  }





  return (
    <div style={{ background: "white", marginLeft: "20px", marginRight: "20px", marginBottom: "20px", overflow: "auto" }}>
      <Divider orientation="left" style={{ padding: "10px" }}>Add Product</Divider>

      <div style={{ marginLeft: "30px", marginRight: "30px" }}>
        <div>
          <Form
            form={form}
            layout='vertical'
            onFinish={(values) => {

              // console.log(values)
              submitData(values)

            }}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="Product_Name"
                  label="Product Name"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Product Name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Product_Category"
                  label="Product Category"
                
                >
                  <Select placeholder="select" >
                    {allCategory.map((category, index) => {
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
            <Col span={12} >
                <Form.Item
                  name="Product_SubCategory"
                  label="Product_SubCategory"
                
                >
                  <Select placeholder="select" >
                    {allSubCategory.map((category, index) => {
                      return (
                        < Option key={index} value={category.id} >
                          {category.name}
                        </Option>
                      );
                    })}

                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Product_SubSubCategory"
                  label="Product_SubSubCategory"
                
                >
                  <Select placeholder="select" >
                    {allSubSubCategory.map((category, index) => {
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
              <Col span={12}>
                <Form.Item
                  name="Product_Description"
                  label="Product Description"

                  rules={[
                    {
                      required: true,
                      message: 'Please input Product Description',
                    },

                  ]}
                >
                  <Input.TextArea showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Technical_Specification"
                  label="Technical Specification"

                >
                  <Input.TextArea showCount maxLength={100} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item
                  name="Quantity"
                  label="Quantity"
                  type="number"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Quantity!',
                    },
                  ]}
                >
                  <InputNumber style={{
                    width: '100%',
                  }} onChange={(e) => {
                    console.log("quantity", e)
                    setQuantity(e)
                    calcDPrice()
                  }} />
                </Form.Item>

              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Price"
                  label="Price"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Price!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} onChange={(e) => {
                      console.log("Price", e)
                      setPrice(e)
                      calcDPrice()
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Discount"
                  label="Discount"
                  type="number"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Discount!',
                    },
                  ]}
                >
                  <InputNumber style={{
                    width: '100%',
                  }} onChange={(e) => {
                    console.log("discount", e)
                    setDiscount(e)
                    calcDPrice()
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Discounted_Price"
                  label="Discounted Price"
                  type="number"
                  rules={[

                    {

                      message: 'Please input your Discounted Price!',
                    },
                  ]}
                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={dPrice} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item
                  name="SGST"
                  label="SGST"
                  rules={[
                    {
                      required: true,
                      message: 'Please input SGST!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} onChange={(e) => {
                      setSgst(e)
                      calcDPrice()
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="IGST"
                  label="IGST"
                  rules={[
                    {
                      required: true,
                      message: 'Please input IGST!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} onChange={(e) => {
                      setIgst(e)
                      calcDPrice()
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="GST"
                  label="GST"
                  type="number"
                  rules={[

                    {

                      message: 'Please input your GST!',
                    },
                  ]}
                >
                  <InputNumber style={{
                    width: '100%',
                  }} defaultValue={gst} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Total_Price"
                  label="Total Price"
                  type="number"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={totalPrice} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item
                  name="SKU"
                  label="SKU"
                  rules={[
                    {
                      required: true,
                      message: 'Please select SKU!',
                    },
                  ]}
                >
                  <InputNumber style={{
                    width: '100%',
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="SKU_Size"
                  label="SKU Size"
                  rules={[
                    {
                      required: true,
                      message: 'Please select SKU Size!',
                    },
                  ]}
                >
                  <InputNumber style={{
                    width: '100%',
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="HSN_Code"
                  label="HSN Code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input HSN Code!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>

              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Delivery_shipment_Cost"
                  label="Delivery/shipment Cost"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Delivery/shipment Cost!',
                    },
                  ]}
                >
                  <InputNumber

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
                  name="Product_Literatur"
                  label="Product Literatur"

                >
                  <Input.TextArea rows={2} showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Delivery_Time"
                  label="Delivery Time"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Delivery Time!',
                    },
                  ]}
                >
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Target_Crops_and_Disease"
                  label="Target Crops and Disease"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Target Crops and Disease!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item
                  name="Dosage"
                  label="Dosage"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Dosage!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Application"
                  label="Application"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Application!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Retail_Pick_up_Point_for_Product"
                  label="Retail Pick up Point for Product"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Retail Pick up Point for Product!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Country"
                  label="Country"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Country!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6} >
                <Form.Item
                  name="Pincode"
                  label="Pincode"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Pincode!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item
                  name="Brand"
                  label="Brand"
                  rules={[

                    {
                      required: true,
                      message: 'Please input your Brand!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} >

                <Form.Item
                  name="Product_Image"
                  label="Product Image"
                  rules={[

                    {
                      required: true,
                      message: 'Please Upload Product Image!',
                    },
                  ]}>

                  <Upload

                    action={(e) => { uploadImage(e) }}
                    maxCount={3}
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
              <Col span={12} >

                <Form.Item
                  name="Product_File"
                  label="Product File"
                  rules={[

                    {
                      required: true,
                      message: 'Please Upload Product File!',
                    },
                  ]}>

                  <Upload
                    action={(e) => { uploadPDF(e) }}
                    maxCount={1}
                    listType="picture"
                    defaultFileList={[...fileList]}
                    className="upload-list-inline"
                    accept='.pdf'
                    multiple
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
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
                    Add Product
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

        </div>
      </div>


    </div >
  )
}

AddProduct.propTypes = {}

export default AddProduct