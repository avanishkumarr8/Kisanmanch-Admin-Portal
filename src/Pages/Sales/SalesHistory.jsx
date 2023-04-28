import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeFilled } from '@ant-design/icons';
import { Button, Input, Space, Table, Divider, Pagination, Tag, Modal, Form, Row, Col, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;



const SalesHistory = props => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
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


    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    const columns = [
        {
            title: 'Order No',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Customer Name',
            dataIndex: 'customername',
            key: 'customername',

            ...getColumnSearchProps('customername'),
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => <a>{text}</a>,

            ...getColumnSearchProps('name'),
        },
        {
            title: 'Delivery Address',
            dataIndex: 'address',
            key: 'address',

            ...getColumnSearchProps('address'),
        },
        {
            title: 'Order Date & Time',
            dataIndex: 'odatetime',
            key: 'odatetime',

            ...getColumnSearchProps('odatetime'),
        },
        {
            title: 'Total Price',
            dataIndex: 'totalprice',
            key: 'totalprice',

            ...getColumnSearchProps('totalprice'),
            sorter: (a, b) => a.totalprice - b.totalprice,
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',

            ...getColumnSearchProps('contact'),
        },
        {
            title: 'Action',
            key: 'action',
            width: "15%",
            render: (record) => {

                return <>
                    <EditOutlined onClick={() => {
                        onEditList(record)
                    }} style={{ marginLeft: 12, fontSize: 20 }} />
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

    const [data, setData] = useState([
        {
            key: '1',
            name: 'Growth Power',
            address: 'Banglore',
            customername: 'Vishal',
            odatetime: '22-06-22',
            id: '1',
            tags: ['Pending'],
            totalprice: 6087,
            contact: 9876006655,
            quantity: 14,
        },
        {
            key: '2',
            name: 'ECO-ENRICH',
            address: 'Noida',
            customername: 'Adil',
            odatetime: '22-06-22',
            id: '2',
            tags: ['Completed'],
            totalprice: 2007,
            contact: 9876006655,
            quantity: 10,
        },
        {
            key: '3',
            name: 'prayer 12L',
            address: 'Pune',
            customername: 'Mugeesh',
            odatetime: '22-06-22',
            id: '3',
            tags: ['Rejected'],
            totalprice: 1996,
            contact: 9876006655,
            quantity: 20,
        },
        {
            key: '4',
            name: 'KNAPSACK Sprayer',
            address: 'Mumbai',
            customername: 'Hari',
            odatetime: '22-06-22',
            id: '4',
            tags: ['Pending'],
            totalprice: 2000,
            contact: 9876006655,
            quantity: 14,
        },
        {
            key: '5',
            name: 'Growth Power',
            address: 'Banglore',
            customername: 'Vishal',
            odatetime: '22-06-22',
            id: '5',
            tags: ['Pending'],
            totalprice: 6087,
            contact: 9876006655,
            quantity: 17,
        },
        {
            key: '6',
            name: 'ECO-ENRICH',
            address: 'Noida',
            customername: 'Adil',
            odatetime: '22-06-22',
            id: '6',
            tags: ['Completed'],
            totalprice: 2007,
            contact: 9876006655,
            quantity: 6,
        },
        {
            key: '7',
            name: 'prayer 12L',
            address: 'Pune',
            customername: 'Mugeesh',
            odatetime: '22-06-22',
            id: '7',
            tags: ['Rejected'],
            totalprice: 1996,
            contact: 9876006655,
            quantity: 4,
        },
        {
            key: '8',
            name: 'KNAPSACK Sprayer',
            address: 'Mumbai',
            customername: 'Hari',
            odatetime: '22-06-22',
            id: '8',
            tags: ['Pending'],
            totalprice: 2000,
            contact: 9876006655,
            quantity: 19,
        },
        {
            key: '9',
            name: 'Growth Power',
            address: 'Banglore',
            customername: 'Vishal',
            odatetime: '22-06-22',
            id: '9',
            tags: ['Pending'],
            totalprice: 6087,
            contact: 9876006655,
            quantity: 1,
        },
        {
            key: '10',
            name: 'ECO-ENRICH',
            address: 'Noida',
            customername: 'Adil',
            odatetime: '22-06-22',
            id: '10',
            tags: ['Completed'],
            totalprice: 2007,
            contact: 9876006655,
            quantity: 2,
        },
        {
            key: '11',
            name: 'prayer 12L',
            address: 'Pune',
            customername: 'Mugeesh',
            odatetime: '22-06-22',
            id: '11',
            tags: ['Rejected'],
            totalprice: 1996,
            contact: 9876006655,
            quantity: 40,
        },
        {
            key: '12',
            name: 'KNAPSACK Sprayer',
            address: 'Mumbai',
            customername: 'Hari',
            odatetime: '22-06-22',
            id: '12',
            tags: ['Pending'],
            totalprice: 2000,
            contact: 9876006655,
            quantity: 18,
        },
    ]);

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

    const productItem = () => {
        setProductItemVisible(true)
    }


    const onEditList = (record) => {
        setIsEditing(true)
        setEditOrder({ ...record })
    }
    const onEditDList = (record) => {
        setIsEditings(true)
        setEditOrder({ ...record })
    }

    const resetProductItem = () => {
        setProductItemVisible(false)
    }

    const resetEditing = () => {
        setIsEditing(false)
        setIsEditings(false)
        setEditOrder(null)
    }
    const [ProductItemVisible, setProductItemVisible] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isEditings, setIsEditings] = useState(false)
    const [editOrder, setEditOrder] = useState(null)

    return (
        // <div>OrderList</div>
        <div style={{ background: 'white', paddingLeft: "20px", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px" }}>
            <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>Sales History List</Divider>


            <Table columns={columns} dataSource={data} pagination={true} style={{ paddingLeft: "10px", paddingRight: 10, paddingBottom: 10 }} />

            <Modal visible={isEditing}
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
                okText="Save"
                title="Edit"
                width="80%">
                {/* <Divider orientation='left'>{editOrder?.name}</Divider> */}
                <Form layout='vertical'>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Order No.">
                                <Input value={editOrder?.id} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, id: e.target.value }
                                    })
                                }} />
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 10 }}>
                            <FormItem label="Customer Name">
                                <Input value={editOrder?.customername} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, customername: e.target.value }
                                    })
                                }} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Date">
                                <Input value={editOrder?.odatetime} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, odatetime: e.target.value }
                                    })
                                }} />
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 10 }}>
                            <FormItem label="Contact">
                                <Input value={editOrder?.contact} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, contact: e.target.value }
                                    })
                                }} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Address">
                                <Input value={editOrder?.address} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, address: e.target.value }
                                    })
                                }} />
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 10 }}>
                            <FormItem label="Status">
                                <Select placeholder="Select Status" style={{ width: '100%' }}>
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
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={6} style={{ paddingLeft: 10 }}>
                            <FormItem label="Quantity">
                                <Input value={editOrder?.quantity} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, quantity: e.target.value }
                                    })
                                }} disabled />
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
                                <Input value={editOrder?.totalprice} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, totalprice: e.target.value }
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
            <Modal visible={isEditings}
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
                                <Input value={editOrder?.id} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, id: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 10 }}>
                            <FormItem label="Customer Name">
                                <Input value={editOrder?.customername} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, customername: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Date">
                                <Input value={editOrder?.odatetime} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, odatetime: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 10 }}>
                            <FormItem label="Contact">
                                <Input value={editOrder?.contact} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, contact: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Address">
                                <Input value={editOrder?.address} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, address: e.target.value }
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
                                <Input value={editOrder?.name} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, name: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={6} style={{ paddingLeft: 10 }}>
                            <FormItem label="Quantity">
                                <Input value={editOrder?.quantity} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, quantity: e.target.value }
                                    })
                                }} disabled />
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
                                <Input value={editOrder?.totalprice} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, totalprice: e.target.value }
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
            {/* <Modal visible={ProductItemVisible}
        onCancel={() => {
          resetProductItem()
        }}
        onOk={() => {
                   resetProductItem()
        }
        }
        okText="Save"
        title="View"
        width="80%">
        
        <Form layout='vertical'>
          <Row>
            <Col span={6}>
              <FormItem label="Product Name">
                <Input value={editOrder?.customername} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, customername: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Quantity">
                <Input value={editOrder?.name} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, name: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>


            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Per Unit Price">
                <Input value={editOrder?.address} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, address: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
            <Col span={6} style={{ paddingLeft: 10 }}>
              <FormItem label="Total Price">
                <Input value={editOrder?.totalprice} onChange={(e) => {
                  setEditOrder(pre => {
                    return { ...pre, totalprice: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal> */}

        </div>
    )
}

SalesHistory.propTypes = {}

export default SalesHistory