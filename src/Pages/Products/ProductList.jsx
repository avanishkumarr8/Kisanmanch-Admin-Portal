
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeFilled, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Divider, Pagination, Modal, Form, Row, Col, InputNumber, Select, DatePicker, Spin, Upload, Image } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { deleteProduct, getAllProducts, getProductsViaId, updateProduct } from "../../Services/ProductServices";
import { notification } from 'antd';
import { getAllCategory } from '../../Services/CategoryServices';
import moment from 'moment';

const { Option } = Select;
const fileList = [

];


const ProductList = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [spin, setSpin] = useState(false)
  const [spinn, setSpinn] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditings, setIsEditings] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [data, setData] = useState([]);
  const [allCategory, setAllCategory] = useState([])
  const [productName, setProductName] = useState()
  const [productDesc, setProductDesc] = useState()
  const [prodCategory, setProdCategory] = useState()
  const [techSpec, setTechSpec] = useState()
  const [quan, setQuan] = useState()
  const [prize, setPrize] = useState()
  const [disc, setDisc] = useState()
  const [sGst, setSGst] = useState()
  const [iGst, setIGst] = useState()
  const [sku, setSku] = useState()
  const [skuSize, setSkuSize] = useState()
  const [hsnCode, setHsnCode] = useState()
  const [shipCost, setShipCost] = useState()
  const [prodLit, setProdLit] = useState()
  const [prodId, setProdId] = useState()
  const [disease, setDisease] = useState()
  const [dosage, setDosage] = useState()
  const [app, setApp] = useState()
  const [pick, setPick] = useState()
  const [country, setCountry] = useState()
  const [pinCode, setPinCode] = useState()
  const [brand, setBrand] = useState()
  const [imageShow, setImageShow] = useState(false)
  const [imageBase64, setImageBase64] = useState()

  const [loadings, setLoadings] = useState([]);

  const fetchData = async () => {
    try {

      const allProducts = await getAllProducts()

      if (allProducts) {
        setData(allProducts)
        setSpin(true)
      }

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {

    fetchData();

  }, []);
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
    // setIsEditing(false)
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              setSearchText("");
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    // {
    //   title: 'Sr No',
    //   dataIndex: 'srno',
    //   key: 'srno',

    //   ...getColumnSearchProps('srno'),
    //   sorter: (a, b) => a.srno - b.srno,
    // },
    {
      title: 'Product Id',
      dataIndex: 'id',
      key: 'id',


      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },

    {
      title: 'Product Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '20%',
      ...getColumnSearchProps('categoryName'),

    },
    {
      title: 'Product Price',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      ...getColumnSearchProps('price'),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      width: '15%',
      ...getColumnSearchProps('brand'),

    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: '15%',
      ...getColumnSearchProps('country'),

    },

    {
      title: 'Action',
      key: 'action',
      width: "25%",
      render: (record) => {

        return <>
          <EditOutlined onClick={() => {
            onEditList(record)
          }} style={{ fontSize: 20, marginLeft: 12 }} />
          <DeleteOutlined onClick={() => {
            onDeleteList(record)
          }} style={{ color: "red", marginLeft: 12, fontSize: 20 }} />
          <EyeFilled onClick={() => {
            onEditDList(record)
          }} style={{ color: "blue", marginLeft: 12, fontSize: 20 }} />
        </>
      }

    },
  ];


  const onDeleteList = (record) => {
    Modal.confirm({
      title: 'Are you sure,you want to delete this product record?',
      okText: 'Confirm',
      okType: 'danger',
      onOk: async () => {
        const allProducts = await deleteProduct(record.id)

        if (allProducts) {
          setData(allProducts);
        }
        notification.success({
          message: 'Successfully Deleted',
        });
      }
    })

  }

  const onEditList = async (record) => {

    setSpinn(true)
    setIsEditing(true)
    const allProducts = await getProductsViaId(record.id)

    if (allProducts) {

      setEditProduct({ ...allProducts })

      setPinCode(allProducts.pinCode)
      setCountry(allProducts.country)
      setPick(allProducts.retail_PickUpPoint)
      setApp(allProducts.application)
      setDosage(allProducts.dosage)
      setDisease(allProducts.targetCrops)
      setProdLit(allProducts.product_Literatur)
      setShipCost(allProducts.deliveryCost)
      setHsnCode(allProducts.hsN_Code)
      setSkuSize(allProducts.skU_Size)
      setSku(allProducts.sku)
      setIGst(allProducts.igst)
      setSGst(allProducts.sgst)
      setPrize(allProducts.price)
      setProdId(record.id)
      setTechSpec(allProducts.techical_Specifications)
      setProdCategory(allProducts.categoryID)
      setProductDesc(allProducts.description)
      setProductName(allProducts.name)
      setBrand(allProducts.brand)
    }
    const allCategory = await getAllCategory()

    if (allCategory) {
      setAllCategory(allCategory);
    }
  }
  const onEditDList = async (record) => {
    setIsEditings(true)
    const allProducts = await getProductsViaId(record.id)

    if (allProducts) {
      setEditProduct({ ...allProducts })
      setSpinn(true)

    }
    const allCategory = await getAllCategory()

    if (allCategory) {
      setAllCategory(allCategory);
    }


  }

  const resetEditing = () => {
    setIsEditing(false)
    setIsEditings(false)
    setEditProduct(null)
    setSpinn(false)
  }
  const uploadImage = async (e) => {
    setImageBase64(e)
    setImageShow(true)

  }

  const putValues = async () => {
    const putProd = await updateProduct(pinCode, country, pick, app, dosage, disease, prodLit, shipCost, hsnCode, skuSize, sku, iGst, sGst, disc, prize, quan, techSpec, prodCategory, productDesc, productName, prodId, imageBase64)
    if (putProd) {
      setData(putProd);
      resetEditing();
      notification.success({
        message: 'Successfully Updated',
      });
    } else {
      resetEditing();
      notification.error({
        message: 'Something Error',

      });
    }
  }

  return (
    <>

      <div style={{ background: 'white', paddingLeft: "20px", height: "100%", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px", overflow: "auto" }}>
        <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>Product List</Divider>
        {spin
          ? (<Table columns={columns} dataSource={data} pagination={true} style={{ paddingLeft: "10px", paddingRight: 10, paddingBottom: 10, width: "100%" }} />)
          : (<div class="center">
            <div class="ring"></div>
            <span>loading...</span>
          </div>)}

        <Modal visible={isEditing}
          maskClosable={false}
          onCancel={() => {
            resetEditing()
          }}

          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          title="Edit"
          width="80%">
          {/* <Divider orientation='left'>{editProduct?.productname}</Divider> */}
          <Form layout='vertical'>
            <Spin tip="Loading..." hidden={spinn} style={{ marginLeft: "50%" }}></Spin>

            <Row>
              <Col span={12}>
                <Form.Item

                  label="Product id"
                  hidden

                >
                  <Input value={editProduct?.id} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, id: e.target.value }
                    })
                    setProdId(e.target.id)
                  }} />
                </Form.Item>
                <Form.Item

                  label="Product Name"

                >
                  <Input value={editProduct?.name} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, name: e.target.value }
                    })
                    setProductName(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Product Category"

                >
                  <Select placeholder="select" value={editProduct?.categoryID} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, name: e.target.value }
                    })
                    setProdCategory(e.target.value)
                  }} >
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
              <Col span={12}>
                <Form.Item

                  label="Product Description"


                >
                  <Input.TextArea showCount maxLength={100} value={editProduct?.description} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, description: e.target.value }
                    })
                    setProductDesc(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Technical Specification"

                >
                  <Input.TextArea showCount maxLength={100} value={editProduct?.techical_Specifications} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, techical_Specifications: e.target.value }
                    })
                    setTechSpec(e.target.value)
                  }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item

                  label="Quantity"


                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={editProduct?.quantity} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, quantity: e.target.value }
                    })
                    setTechSpec(e.target.value)
                  }} />
                </Form.Item>

              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Price"

                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} value={editProduct?.price} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, price: e.target.value }
                      })
                      setPrize(e.target.value)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Discount"
                  type="number"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} onChange={(e) => {

                    setDisc(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Discounted Price"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item

                  label="SGST"

                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} value={editProduct?.sgst} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, sgst: e.target.value }
                      })
                      setSGst(e.target.value)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="IGST"

                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} value={editProduct?.igst} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, igst: e.target.value }
                      })
                      setIGst(e.target.value)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="GST"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={editProduct?.gst} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, gst: e.target.value }
                    })

                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Total Price"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item

                  label="SKU"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={editProduct?.sku} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, sku: e.target.value }
                    })
                    setSku(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="SKU Size"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={editProduct?.skU_Size} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, skU_Size: e.target.value }
                    })
                    setSkuSize(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="HSN Code"

                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} value={editProduct?.hsN_Code} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, hsN_Code: e.target.value }
                      })
                      setHsnCode(e.target.value)
                    }}
                  />
                </Form.Item>

              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Delivery/shipment Cost"

                >
                  <InputNumber

                    style={{
                      width: '100%',
                    }} value={editProduct?.deliveryCost} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, deliveryCost: e.target.value }
                      })
                      setShipCost(e.target.value)
                    }}
                  />
                </Form.Item>

              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item

                  label="Product Literatur"

                >
                  <Input.TextArea rows={2} showCount maxLength={100} value={editProduct?.product_Literatur} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, product_Literatur: e.target.value }
                    })
                    setProdLit(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Delivery Time"

                >
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" defaultValue={moment(editProduct?.deliveryTime, "YYYY-MM-DD")} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Target Crops and Disease"

                >
                  <Input value={editProduct?.targetCrops} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, targetCrops: e.target.value }
                    })
                    setDisease(e.target.value)
                  }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item

                  label="Dosage"

                >
                  <Input value={editProduct?.dosage} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, dosage: e.target.value }
                    })
                    setDosage(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Application"

                >
                  <Input value={editProduct?.application} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, application: e.target.value }
                    })
                    setApp(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Retail Pick up Point for Product"

                >
                  <Input value={editProduct?.retail_PickUpPoint} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, retail_PickUpPoint: e.target.value }
                    })
                    setPick(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Country"

                >
                  <Input value={editProduct?.country} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, country: e.target.value }
                    })
                    setCountry(e.target.value)
                  }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6} >
                <Form.Item

                  label="Pincode"

                >
                  <Input value={editProduct?.pinCode} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, pinCode: e.target.value }
                    })
                    setPinCode(e.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Brand"

                >
                  <Input value={editProduct?.brand} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, brand: e.target.value }
                    })
                    setBrand(e.target.id)
                  }} />
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
                  <Row>

                    <Image
                      width={200}
                      src={`${global.BaseUrl}/${editProduct?.picture1}`}
                      hidden={imageShow}
                    />
                  </Row>

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
            {/* <Row>
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
                    // action={(e) => { uploadPDF(e) }}
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
            </Row> */}
            <Form.Item >
              <Button type="primary" htmlType="submit" style={{ float: "right", marginTop: 10, marginBottom: "-30px" }} onClick={() => {
                putValues()
                enterLoading(0)

              }} >
                Save
              </Button>

            </Form.Item>

          </Form>

        </Modal>
        <Modal visible={isEditings}
          maskClosable={false}
          onCancel={() => {
            resetEditing()
          }}
          onOk={() => {
            setData((pre) => {
              return pre.map((product) => {
                if (product.productcode === editProduct.productcode) {
                  return editProduct;
                } else {
                  return product;
                }
              })

            })
            resetEditing()
          }
          }
          okText="Save"
          title="View"
          width="80%">
          {/* <Divider orientation='left'>{editProduct?.productname}</Divider> */}
          <Form layout='vertical'>
            <Spin tip="Loading..." hidden={spinn} style={{ marginLeft: "50%" }}></Spin>

            <Row>
              <Col span={12}>
                <Form.Item

                  label="Product Name"

                >
                  <Input value={editProduct?.name} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, name: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Product Category"

                >
                  <Select placeholder="select" value={editProduct?.categoryID} readOnly>
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
              <Col span={12}>
                <Form.Item

                  label="Product Description"


                >
                  <Input.TextArea showCount maxLength={100} value={editProduct?.description} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, description: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Technical Specification"

                >
                  <Input.TextArea showCount maxLength={100} value={editProduct?.techical_Specifications} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, techical_Specifications: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item

                  label="Quantity"


                >
                  <InputNumber style={{
                    width: '100%',
                  }} readOnly />
                </Form.Item>

              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Price"

                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} value={editProduct?.price} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, price: e.target.value }
                      })
                    }} readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Discount"
                  type="number"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Discounted Price"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item

                  label="SGST"

                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} value={editProduct?.sgst} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, sgst: e.target.value }
                      })
                    }} readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="IGST"

                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} value={editProduct?.igst} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, igst: e.target.value }
                      })
                    }} readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="GST"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={editProduct?.gst} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, gst: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Total Price"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item

                  label="SKU"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={editProduct?.sku} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="SKU Size"

                >
                  <InputNumber style={{
                    width: '100%',
                  }} value={editProduct?.skU_Size} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="HSN Code"

                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }} value={editProduct?.hsN_Code} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, hsN_Code: e.target.value }
                      })
                    }} readOnly
                  />
                </Form.Item>

              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Delivery/shipment Cost"

                >
                  <InputNumber

                    style={{
                      width: '100%',
                    }} value={editProduct?.deliveryCost} onChange={(e) => {
                      setEditProduct(pre => {
                        return { ...pre, deliveryCost: e.target.value }
                      })
                    }} readOnly
                  />
                </Form.Item>

              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item

                  label="Product Literatur"

                >
                  <Input.TextArea rows={2} showCount maxLength={100} value={editProduct?.product_Literatur} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, product_Literatur: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Delivery Time"

                >
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Target Crops and Disease"

                >
                  <Input value={editProduct?.targetCrops} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, targetCrops: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item

                  label="Dosage"

                >
                  <Input value={editProduct?.dosage} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, dosage: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Application"

                >
                  <Input value={editProduct?.application} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, application: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Retail Pick up Point for Product"

                >
                  <Input value={editProduct?.retail_PickUpPoint} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, retail_PickUpPoint: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Country"

                >
                  <Input value={editProduct?.country} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, country: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6} >
                <Form.Item

                  label="Pincode"

                >
                  <Input value={editProduct?.pinCode} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, pinCode: e.target.value }
                    })
                  }} readOnly />
                </Form.Item>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px" }}>
                <Form.Item

                  label="Brand"

                >
                  <Input value={editProduct?.brand} onChange={(e) => {
                    setEditProduct(pre => {
                      return { ...pre, brand: e.target.value }
                    })

                  }} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} >

                <Form.Item
                  name="Product_Image"
                  label="Product Image"
                >
                  <Row>

                    <Image
                      width={200}
                      src={`${global.BaseUrl}/${editProduct?.picture1}`}

                    />
                  </Row>
                  {/* 
                  <Upload

                    // action={(e) => { uploadImage(e) }}
                    maxCount={3}
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
            {/* <Row>
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
                    // action={(e) => { uploadPDF(e) }}
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
            </Row> */}


          </Form>

        </Modal>

      </div>

    </>

  )
}

ProductList.propTypes = {}

export default ProductList