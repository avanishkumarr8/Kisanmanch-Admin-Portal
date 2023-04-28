import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Divider, Pagination, Tag, Modal, Form, Row, Col, Select, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { getAllCompletedOrders } from '../../Services/OrderSevices';
const { Option } = Select;



const Completed = props => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [spin, SetSpin] = useState(false);

  const fetchData = async () => {
    try {

      const allCompletedOrder = await getAllCompletedOrders()
      console.log(allCompletedOrder)
      if (allCompletedOrder) {
        setData(allCompletedOrder);
        SetSpin(true)
      }
    } catch (e) {
      console.log(e)
    }
  }


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  useEffect(() => {

    fetchData();

  }, []);

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
  // const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  //   const [form] = Form.useForm();
  //   return (
  //     <Modal
  //       visible={visible}
  //       title="Product Details"
  //       okText="Update"
  //       cancelText="Cancel"
  //       onCancel={onCancel}
  //       onOk={() => {
  //         form
  //           .validateFields()
  //           .then((values) => {
  //             form.resetFields();
  //             onCreate(values);
  //           })
  //           .catch((info) => {
  //             console.log('Validate Failed:', info);
  //           });
  //       }}
  //     >
  //       <Form
  //         form={form}
  //         layout="vertical"
  //         name="form_in_modal"
  //         initialValues={{
  //           modifier: 'public',
  //         }}
  //       >
  //         <Form.Item
  //           name="title"
  //           label="Product Name"
  //           rules={[
  //             {
  //               required: true,
  //               message: 'Please input the title of collection!',
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item name="description" label="Description">
  //           <Input type="textarea" />
  //         </Form.Item>
  //         <Form.Item name="modifier" className="collection-create-form_last-form-item">
  //           <Radio.Group>
  //             <Radio value="public">Public</Radio>
  //             <Radio value="private">Private</Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //       </Form>
  //     </Modal>
  //   );
  // };

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',

      ...getColumnSearchProps('customerName'),
    },
    // {
    //   title: 'Product Name',
    //   dataIndex: 'products[0].[productName]',
    //   key: 'products[0].[productName]',
    //   // render: (text) => <a>{text}</a>,

    //   ...getColumnSearchProps('products[0].[productName]'),
    // },
    {
      title: 'Delivery Address',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',

      ...getColumnSearchProps('deliveryAddress'),
    },

    {
      title: 'Order Date & Time',
      dataIndex: 'orderDate',
      key: 'orderDate',


      ...getColumnSearchProps('orderDate'),
      render: (record) => {

        function formatDate(string) {
          var options = { year: 'numeric', month: 'long', day: 'numeric' };
          return new Date(string).toLocaleDateString([], options);
        }
        return <>
          <div>{formatDate(record)}</div>

        </>
      }
    },

    {
      title: 'Total Price',
      dataIndex: 'orderTotalPrice',
      key: 'orderTotalPrice',

      ...getColumnSearchProps('orderTotalPrice'),
      sorter: (a, b) => a.orderTotalPrice - b.orderTotalPrice,
    },
    {
      title: 'Contact',
      dataIndex: 'customerPhone',
      key: 'customerPhone',

      ...getColumnSearchProps('customerPhone'),
    },
    // {
    //   title: 'Payment',
    //   dataIndex: 'payment',
    //   key: 'payment',

    //   ...getColumnSearchProps('payment'),
    // },


    {
      title: 'Action',
      key: 'action',
      width: "15%",
      render: (record) => {

        return <>
          {/* <EditOutlined onClick={() => {
            onEditList(record)
          }} style={{ marginLeft: 12, fontSize: 20 }} /> */}
          {/* <DeleteOutlined onClick={() => {
            onDeleteList(record)
          }} style={{ color: "red", marginLeft: 12, fontSize: 20 }} /> */}
          <EyeFilled onClick={() => {
            onEditDList(record)
          }} style={{ color: "blue", marginLeft: 30, fontSize: 20 }} />
        </>
      }

    },
  ];

  const onDeleteList = (record) => {
    Modal.confirm({
      title: 'Are you sure,you want to delete this Order record?',
      okText: 'Confirm',
      okType: 'danger',
      onOk: () => {
        setData(pre => {
          return (
            pre.filter((order) => order.id !== record.id)
          )
        })
      }
    })

  }

  const onEditList = (record) => {
    setIsEditing(true)
    setEditOrder({ ...record })
  }
  const onEditDList = (record) => {
    setIsEditings(true)
    setEditOrder({ ...record })
  }

  const resetEditing = () => {
    setIsEditing(false)
    setIsEditings(false)
    setEditOrder(null)
  }
  const [isEditing, setIsEditing] = useState(false)
  const [isEditings, setIsEditings] = useState(false)
  const [editOrder, setEditOrder] = useState(null)

  return (
    // <div>OrderList</div>
    <div style={{ background: 'white', paddingLeft: "20px", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px" }}>
      <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>Completed List</Divider>
      {spin
        ? (<Table columns={columns} dataSource={data} pagination={true} style={{ paddingLeft: "10px", paddingRight: 10, paddingBottom: 10 }} />)
        : (<div class="center">
          <div class="ring"></div>
          <span>loading...</span>
        </div>)}

      <Modal
        maskClosable={false}
        visible={isEditings}
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => {
          setData((pre) => {
            return pre.map((order) => {
              if (order.id === editOrder.id) {
                return editOrder;
              } else {
                return order;
              }
            })

          })
          resetEditing()
        }
        }
        okText="Ok"
        title="View"
        width="80%">
        {/* <Divider orientation='left'>{editOrder?.name}</Divider> */}
        <Form layout='vertical'>
          <Row>
            <Col span={12}>
              <FormItem label="Order No.">
                <Input value={editOrder?.orderNumber} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, orderNumber: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Customer Name">
                <Input value={editOrder?.customerName} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, customerName: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="Date">
                <Input value={editOrder?.orderDate} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, orderDate: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Contact">
                <Input value={editOrder?.customerPhone} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, customerPhone: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="Address">
                <Input value={editOrder?.deliveryAddress} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, deliveryAddress: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Status">
                <Select placeholder="Select Status" style={{ width: '100%' }} disabled>
                  <Option value="Approved">Approved</Option>
                  <Option value="Rejected">Rejected</Option>
                  <Option value="Pending">Pending</Option>
                </Select>

              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="Payment Details">
                <Select placeholder="Select Status" style={{ width: '100%' }} disabled>
                  <Option value="COD">COD</Option>
                  <Option value="UPI">UPI</Option>
                  <Option value="Card">Card</Option>
                  <Option value="Internet Banking">Internet Banking</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Divider orientation='left'>Product Item</Divider>
          <Row>
            <Col span={6}>
              <FormItem label="Product Name">
                <Input value={editOrder?.products[0].productName
                } disabled />
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Quantity">
                <Input value={editOrder?.products[0].quantity
                } disabled />
              </FormItem>
            </Col>


            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Price Per Unit">
                <Input value={editOrder?.totalprice} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, totalprice: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Total Price">
                <Input value={editOrder?.orderTotalPrice} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, orderTotalPrice: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
          </Row>
          {/* <Row>
            <Col span={12} offset={6}>
              <Button style={{ width: "100%", backgroundColor: "red" }} type="primary" onClick={() => {
                productItem()
              }}>Product Item</Button>
            </Col>
          </Row> */}
        </Form>
      </Modal>

    </div>
  )
}

Completed.propTypes = {}

export default Completed