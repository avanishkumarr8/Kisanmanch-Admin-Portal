import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Space, Table, Divider, Modal, Row, Col, Form, Select, InputNumber, Spin } from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { getAllBuyersList } from '../../Services/EntityServices';
import { useEffect } from 'react';

const { Option } = Select;

const Buyers = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isDetails, setIsDetails] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [data, setData] = useState([]);
    const [editOrder, setEditOrder] = useState(null);
    const [isEditings, setIsEditings] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [spin, setSpin] = useState(false);

    const fetchData = async () => {
        try {
            const allBuyers = await getAllBuyersList()
            console.log(allBuyers)
            if (allBuyers) {
                setData(allBuyers);
                setSpin(true);
            }
        }
        catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);
    const resetEditing = () => {
        setIsEditing(false)
        setIsEditings(false)
        setEditOrder(null)
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

    const columns = [
        {
            title: 'Buyer ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Buyer Name',
            dataIndex: 'buyerName',
            key: 'buyerName',

            ...getColumnSearchProps('buyerName'),
        },
        {
            title: 'Business Name',
            dataIndex: 'businessType',
            key: 'businessType',

            ...getColumnSearchProps('businessType'),
        },
        {
            title: 'Contact',
            dataIndex: 'contactPersonMobile',
            key: 'contactPersonMobile',

            ...getColumnSearchProps('contactPersonMobile'),
        },
        {
            title: 'PIN',
            dataIndex: 'pin',
            key: 'pin',

            ...getColumnSearchProps('pin'),
        },

        {
            title: 'Action',
            key: 'action',
            width: "15%",
            render: (record) => {

                return <>
                    <Button type='primary' onClick={() => {
                        onViewList(record)
                    }}>Details</Button>
                </>
            }

        },
    ]

    const onViewList = (record) => {
        setIsEditings(true)
        setEditOrder({ ...record })
    }
    const resetDetails = () => {
        setIsDetails(false)

    }

    const suffixSelector1 = (
        <Form.Item name="suffix1" noStyle>
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
    const suffixSelector2 = (
        <Form.Item name="suffix2" noStyle>
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
    const suffixSelector3 = (
        <Form.Item name="suffix3" noStyle>
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
    const suffixSelector4 = (
        <Form.Item name="suffix4" noStyle>
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
    return (
        <div style={{ background: 'white', paddingLeft: "20px", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px" }}>
            <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>Buyers List</Divider>
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


                title="Details"
                width="80%">
                {/* <Divider orientation='left'>{editOrder?.name}</Divider> */}
                <Form layout='vertical'>


                    <Row>
                        <Col span={8}>
                            <FormItem label="Business Entity Type">
                                <Input value={editOrder?.businessEntityType} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, businessEntityType: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={8} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Business Type">
                                <Input value={editOrder?.businessType} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, businessType: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>

                        <Col span={8} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Buyer Name">
                                <Input value={editOrder?.buyerName} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, buyerName: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="Contact Person Name">
                                <Input value={editOrder?.contactPersonName} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, contactPersonName: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={8} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Contact Person Phone">
                                <Input value={editOrder?.contactPersonPhone} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, contactPersonPhone: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>

                        <Col span={8} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Contact Person Mobile">
                                <Input value={editOrder?.contactPersonMobile} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, contactPersonMobile: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Registered Address">
                                <Input value={editOrder?.registeredAddress} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, registeredAddress: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={6} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Pin">
                                <Input value={editOrder?.pin} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, pin: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={6} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Pan">
                                <Input value={editOrder?.pan} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, pan: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12} >
                            <FormItem label="GSTIN">
                                <Input value={editOrder?.gstin} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, gstin: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <FormItem label="FSSAI">
                                <Input value={editOrder?.fssaiNo} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, fssaiNo: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                    </Row>

                    <Divider orientationMargin={50}>
                        Monthly Business Demand
                    </Divider>

                    <Row>
                        <Col span={12} >
                            <FormItem label="Fruits">
                                <Input value={editOrder?.fruits} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, fruits: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Vegitables">
                                <Input value={editOrder?.vegetables} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, vegetables: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Exotic Vegitable">
                                <Input value={editOrder?.exoticVegetables} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, exoticVegetables: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Dry Fruits">
                                <Input value={editOrder?.dryFruits} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, dryFruits: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </div>
    )
}

export default Buyers