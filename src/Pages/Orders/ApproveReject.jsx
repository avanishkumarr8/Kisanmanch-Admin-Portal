import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Divider, Tag, Modal, Form, Row, Col, Select, notification, Tooltip } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { getPendingOrders, updateOrder, rejectOrders, approveOrders } from '../../Services/OrderSevices';
const { Option } = Select;





const ApproveReject = props => {
  const [spin, SetSpin] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [order, setOrder] = useState()
  const [orderNo, setOrderNo] = useState()
  const [cName, setCName] = useState()
  const [date, setDate] = useState()
  const [address, setAddress] = useState()
  const [status, setStatus] = useState()
  const [totalprice, setTotalprice] = useState()
  const [id, setId] = useState()
  const [mobUserId, setMobUserId] = useState()
  const [loadings, setLoadings] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [isEditings, setIsEditings] = useState(false)
  const [editOrder, setEditOrder] = useState(null)



  const fetchData = async () => {
    try {

      const allOrder = await getPendingOrders()
      console.log(allOrder)
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
    }, 6000);
    // setIsEditing(false)
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


  // const [visible, setVisible] = useState(false);



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
          <Tooltip placement="topLeft" title="Approve">
            <CheckOutlined style={{ color: "green", fontSize: 20 }} onClick={() => {
              approveOrder(record)
            }} />
          </Tooltip>
          <Tooltip placement="topLeft" title="Reject">
            <CloseOutlined style={{ color: "red", marginLeft: 25, fontSize: 20 }} onClick={() => {
              rejectOrder(record)
            }} />
          </Tooltip>
        </>
      }

    },];



  const approveOrder = (record) => {
    Modal.success({
      title: 'Are you sure,you want to Approve this order?',
      okCancel: "Cancel",
      okText: 'Confirm',
      okType: 'danger',
      onOk: async () => {
        const allOrder = await approveOrders(record.orderId)


        if (allOrder) {
          setData(allOrder);
        }
        notification.success({
          message: 'Successfully Approved',
        });
      }
    })
  }
  const rejectOrder = (record) => {
    Modal.error({
      title: 'Are you sure,you want to Reject this order?',
      okCancel: "Cancel",
      okText: 'Confirm',
      okType: 'Success',
      onOk: async () => {
        const allOrder = await rejectOrders(record.orderId)


        if (allOrder) {
          setData(allOrder);
        }
        notification.success({
          message: 'Successfully Rejected',
        });
      }
    })
  }




  const resetEditing = () => {
    setIsEditing(false)
    setIsEditings(false)
    setEditOrder(null)
  }



  const putValues = async () => {
    const putorder = await updateOrder(id, orderNo, address, status, totalprice, date, mobUserId)
    if (putorder) {
      setData(putorder);
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
    // <div>ApproveReject</div>
    <div style={{ background: 'white', paddingLeft: "20px", height: "100%", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px", overflow: "auto" }}>
      <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>ApproveReject List</Divider>
      {spin
        ? (<Table columns={columns} dataSource={data} pagination={true} style={{ paddingLeft: "10px", paddingRight: 10, paddingBottom: 10 }} />)
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
        okText="Save"
        title="Edit"
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
                  setOrderNo(e.target.value)
                }} />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Customer Name">
                <Input value={editOrder?.customerName} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, customerName: e.target.value }
                  })
                }} />
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
                  setDate(e.target.value)
                }} />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Contact">
                <Input value={editOrder?.customerPhone} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, customerPhone: e.target.value }
                  })

                }} />
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
                  setAddress(e.target.value)
                }} />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Status">
                <Select placeholder="Select Status" style={{ width: '100%' }} value={editOrder?.orderStatus} onChange={(e) => {
                  setAddress(e.target.value)
                }}>
                  <Option value={2}>Approved</Option>
                  <Option value={1}>Rejected</Option>
                  <Option value={0}>Pending</Option>
                </Select>

              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="Payment Details">
                <Select placeholder="Select Status" style={{ width: '100%' }}>
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
                <Input value={editOrder?.name} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, name: e.target.value }
                  })
                }} />
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Quantity">
                <Input value={editOrder?.quantity} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, quantity: e.target.value }
                  })
                }} />
              </FormItem>
            </Col>


            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Price Per Unit">
                <Input value={editOrder?.totalprice} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, totalprice: e.target.value }
                  })
                }} />
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Total Price">
                <Input value={editOrder?.orderTotalPrice} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, orderTotalPrice: e.target.value }
                  })
                  setTotalprice(e.target.value)
                }} />
              </FormItem>
            </Col>
          </Row>
          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ float: "right", marginTop: 10, marginBottom: "-30px" }} loading={loadings[0]} onClick={() => {
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
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}

        title="View"
        width="80%">


        <Form layout='vertical'>
          <Row>
            <Col span={12}>
              <FormItem label="Order No.">
                <Input value={editOrder?.orderNumber} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, orderNumber: e.target.value }
                  })
                }} readOnly />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Customer Name">
                <Input value={editOrder?.customerName} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, customerName: e.target.value }
                  })
                }} readOnly />
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
                }} readOnly />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Contact">
                <Input value={editOrder?.customerPhone} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, customerPhone: e.target.value }
                  })
                }} readOnly />
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
                }} readOnly />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Status">
                <Select placeholder="Select Status" style={{ width: '100%' }} value={editOrder?.orderStatus} disabled>
                  <Option value={2}>Approved</Option>
                  <Option value={1}>Rejected</Option>
                  <Option value={0}>Pending</Option>
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
                <Input value={editOrder?.name} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, name: e.target.value }
                  })
                }} readOnly />
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Quantity">
                <Input value={editOrder?.quantity} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, quantity: e.target.value }
                  })
                }} readOnly />
              </FormItem>
            </Col>


            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Price Per Unit">
                <Input readOnly />
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Total Price">
                <Input value={order?.orderTotalPrice} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, orderTotalPrice: e.target.value }
                  })
                }} readOnly />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>

    </div>
  )
}

ApproveReject.propTypes = {}

export default ApproveReject