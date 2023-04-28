import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Divider, Col, Row, Card, Progress, Table, Button, Tag, Space, Input, Form, Modal, DatePicker, Statistic, Spin } from 'antd'
import { SearchOutlined, EditOutlined, EyeFilled } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { getAllCount, getAllOrderTable, getOrderViaId } from '../../Services/DashboardServices'



const MainDashboard = props => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [productCount, setProductCount] = useState();
  const [categoryCount, setCategoryCount] = useState();
  const [pendingorderCount, setPendingOrderCount] = useState();
  const [totalorderCount, setTotalOrderCount] = useState();
  const [spin, SetSpin] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    const TotalCount = await getAllCount();

    setCategoryCount(TotalCount.item2);
    setProductCount(TotalCount.item1)
    setPendingOrderCount(TotalCount.item3)
    setTotalOrderCount(TotalCount.item4)


    try {

      const allOrder = await getAllOrderTable()

      if (allOrder) {
        setData(allOrder);
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
  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        maskClosable={false}
        title="Orders"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        width="80%"
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Row>
            <Col span={12}><Form.Item
              name="title"
              label="Customer Name"
              rules={[
                {
                  required: true,
                  message: 'Please input the Customer Name!',
                },
              ]}
            >
              <Input />
            </Form.Item></Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item name="productname" label="Product Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the Product Name!',
                  },
                ]}>
                <Input type="textarea" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name="address" label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input the Address!',
                  },
                ]}>
                <Input type="textarea" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item name="date" label="Date"
                rules={[
                  {
                    required: true,
                    message: 'Please input the Date!',
                  },
                ]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>

            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item name="totalprice" label="Total Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input the Total Price !',
                  },
                ]}>
                <Input type="textarea" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item name="contact" label="Contact"
                rules={[
                  {
                    required: true,
                    message: 'Please input the Contact !',
                  },
                ]}>
                <Input type="textarea" />
              </Form.Item>
            </Col>
          </Row>








        </Form>
      </Modal>
    );
  };



  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };


  const columns = [
    {
      title: 'Order No',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      sorter: (a, b) => a.orderNumber - b.orderNumber,
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',

      ...getColumnSearchProps('customerName'),
    },
    // {
    //   title: 'Product Name',
    //   dataIndex: 'name',
    //   key: 'name',
    //   // render: (text) => <a>{text}</a>,

    //   ...getColumnSearchProps('name'),
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
    {
      title: 'Status',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      width: 5,
      ...getColumnSearchProps('orderStatus'),
      render: (record) => {
        let color = ""
        let status = ""
        if (record === 0) {
          color = "yellow";
          status = "Pending"
        }
        if (record === 1) {
          color = "green";
          status = "Approved"
        }
        if (record === 4) {
          color = "red";
          status = "Cancelled"
        }
        if (record === 3) {
          color = "blue";
          status = "Completed"
        }
        if (record === 2) {
          color = "red";
          status = "Rejected"
        }

        return <>
          <Tag color={color} key={record}>
            {status}
          </Tag>
        </>
      }


    },
    {
      title: 'Action',
      key: 'action',
      width: "15%",
      render: (record) => {

        return <>

          {/* <DeleteOutlined onClick={() => {
            onDeleteList(record)
          }} style={{ color: "red", marginLeft: 12, fontSize: 20 }} /> */}
          <EyeFilled onClick={() => {
            onEditDList(record)
          }} style={{ color: "blue", marginLeft: 12, fontSize: 20 }} />
        </>
      }

    },
  ];


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
    <div>
      <Row>
        <Col>
          <div style={{ height: 40 }}></div>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* <Col xs={6}>
          <Row justify='center'>
            <Col xs={20}>
              <Card>

                <Progress type="dashboard"
                  strokeColor={{
                    '80%': '#f20202',
                    '0%': '#fc8686',
                    '100%': '#f72b07'
                  }}
                  percent={99.9}></Progress>
                <strong >Income Target</strong>

              </Card>
            </Col>
          </Row>
        </Col> */}
        <Col xs={6} justify='center' style={{ paddingLeft: "20px" }}>
          <Card title="Total Products">

            <Statistic style={{ marginTop: "-10px", marginBottom: "-10px" }} value={productCount} />
          </Card>
        </Col>
        <Col xs={6}>
          <Card title="Total Categories"  >
            {/* <Progress type="dashboard" percent={30} size="small"
              strokeColor={{
                '0%': '#07f74b',
                '80%': '#67f58f',
                '100%': '#a3f7bb'
              }} /> */}
            <Statistic style={{ marginTop: "-10px", marginBottom: "-10px" }} value={categoryCount} />
          </Card>
        </Col>
        <Col xs={6}>
          <Card title="Total Pendings"  >
            {/* <Progress type="dashboard" percent={50} size="small" status="active" /> */}
            <Statistic style={{ marginTop: "-10px", marginBottom: "-10px" }} value={pendingorderCount} />
          </Card>
        </Col>
        <Col xs={6}>
          <Card title="Total Orders"  >
            {/* <Progress type="dashboard" percent={70} size="small" status="active" /> */}
            <Statistic style={{ marginTop: "-10px", marginBottom: "-10px" }} value={totalorderCount} />
          </Card>
        </Col>

      </Row>
      <div style={{ background: "white", paddingLeft: "20px", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px", overflow: "auto" }}>
        <Divider orientation='left'>Total Orders</Divider>
        {spin
          ? (<Table columns={columns} dataSource={data} pagination={true} style={{ padding: "10px" }} />)
          : (<div class="center">
            <div class="ring"></div>
            <span>loading...</span>
          </div>)}

      </div >

      <Modal visible={isEditings}
        maskClosable={false}
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => {
          // setData((pre) => {
          //   return pre.map((order) => {
          //     if (order.id === editOrder.id) {
          //       return editOrder;
          //     } else {
          //       return order;
          //     }
          //   })

          // })
          resetEditing()
        }
        }
        okText="Ok"
        title="View"
        width="80%">
        {/* <Divider orientation='left'>{editOrder?.name}</Divider> */}
        <Form layout='vertical'>
          <Row>
            <Col span={12}><Form.Item

              label="Customer Name"

            >
              <Input value={editOrder?.customerName} readOnly />
            </Form.Item></Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item label="Product Name"
              >
                <Input value={editOrder?.products[0].productName} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Address"
              >
                <Input type="textarea" value={editOrder?.deliveryAddress} readOnly />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item label="Date"
              >
                <Input style={{ width: "100%" }} value={editOrder?.orderDate} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row>

            <Col span={12} >
              <Form.Item label="Total Price"
              >
                <Input value={editOrder?.orderTotalPrice} readOnly />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item label="Contact"
              >
                <Input value={editOrder?.customerPhone} readOnly />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>





    </div >

  )
}

MainDashboard.propTypes = {}

export default MainDashboard