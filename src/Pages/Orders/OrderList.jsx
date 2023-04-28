import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Divider, Tag, Modal, Form, Row, Col, Select, notification, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { getAllOrderTable, getOrderViaId, deleteOrder, updateOrder } from '../../Services/OrderSevices';
const { Option } = Select;





const OrderList = props => {
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
  const [totalP, setTotalP] = useState()
  const [allProducts, setAllProducts] = useState([])



  const fetchData = async () => {
    try {

      const allOrder = await getAllOrderTable()
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

          <EyeFilled onClick={() => {
            onEditDList(record)
          }} style={{ color: "blue", fontSize: 20 }} />
        </>
      }

    },
  ];



  const onDeleteList = (record) => {
    Modal.confirm({
      title: 'Are you sure,you want to delete this Order record?',
      okText: 'Confirm',
      okType: 'danger',
      onOk: async () => {
        const allOrder = await deleteOrder(record.orderId)

        if (allOrder) {
          setData(allOrder);
        }
        notification.success({
          message: 'Successfully Deleted',
        });
      }
    })
  }




  const onEditList = async (record) => {
    setIsEditing(true)
    setEditOrder({ ...record })
    const allOrders = await getOrderViaId(record.orderId)
    console.log(allOrders)
    if (allOrders) {
      setOrder({ ...allOrders })
    }
    setDate(record.orderDate)
    setAddress(record.deliveryAddress)
    setStatus(record.orderStatus)
    setTotalprice(allOrders.orderTotalPrice)
    setOrderNo(record.orderNumber)
    setId(record.orderId)
    setMobUserId(allOrders.mobileUserId)


  }
  const onEditDList = async (record) => {
    setIsEditings(true)
    setEditOrder({ ...record })
    // console.log(editOrder)

    const allOrders = await getOrderViaId(record.orderId)
    // console.log(allOrders.orderItems[0].product.price)
    if (allOrders) {
      setOrder({ ...allOrders })
      setAllProducts(allOrders.orderItems)

    }



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
    // <div>OrderList</div>
    <div style={{ background: 'white', paddingLeft: "20px", height: "100%", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px", overflow: "auto" }}>
      <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>Order List</Divider>
      {spin
        ? (<Table columns={columns} dataSource={data} pagination={true} style={{ paddingLeft: "10px", paddingRight: 10, paddingBottom: 10 }} />)
        : (<div class="center">
          <div class="ring"></div>
          <span>loading...</span>
        </div>)}


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
                <Select placeholder="Select Status" style={{ width: '100%' }} value={editOrder?.orderStatus}>
                  <Option value={1}>Approved</Option>
                  <Option value={2}>Rejected</Option>
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
          {allProducts?.map((orders, index) => {
            return (
              <Row>
                <Col span={6}>
                  <FormItem label="Product Name">
                    <Input value={orders.product.name} disabled />
                  </FormItem>
                </Col>
                <Col span={6} style={{ paddingLeft: 10 }}>
                  <FormItem label="Quantity">
                    <Input value={orders.quantity} disabled />
                  </FormItem>
                </Col>


                <Col span={6} style={{ paddingLeft: 10 }}>
                  <FormItem label="Price Per Unit">
                    <Input value={orders?.product.price} disabled />
                  </FormItem>
                </Col>
                <Col span={6} style={{ paddingLeft: 10 }}>
                  <FormItem label="Total Price">
                    <Input value={orders?.product.price * orders.quantity} onChange={(e) => {
                      setEditOrder(pre => {
                        return { ...pre, orderTotalPrice: e.target.value }
                      })
                    }} disabled />
                  </FormItem>
                </Col>
              </Row>
            );
          })}
          <Divider orientation='left'>Order History</Divider>
          {order?.orderStatusList.map(item => {
            return <Row>
              <Col span={8}>
                <FormItem label="Status">
                  <Input value={item?.orderStatusValue

                  } disabled />
                </FormItem>
              </Col>
              <Col span={8} style={{ paddingLeft: 10 }}>
                <FormItem label="Date">
                  <Input value={item?.orderStatusDate
                  } disabled />
                </FormItem>
              </Col>
            </Row>
          })}

        </Form>
      </Modal>

    </div>
  )
}

OrderList.propTypes = {}

export default OrderList