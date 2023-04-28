import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Space, Table, Divider, Modal, Row, Col, Form, Select, InputNumber, Upload, Spin } from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import Highlighter from 'react-highlight-words';

import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { getAllSellersList } from '../../Services/EntityServices';

const { Option } = Select;
const fileList = [

];

const Sellers = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isDetails, setIsDetails] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [data, setData] = useState([]);
    const [spin, setSpin] = useState(false);

    const [editOrder, setEditOrder] = useState(null)
    const [isEditings, setIsEditings] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const fetchData = async () => {
        try {
            const allSellers = await getAllSellersList()
            console.log(allSellers)
            if (allSellers) {
                setData(allSellers);
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
        // {
        //     title: 'Seller ID',
        //     dataIndex: 'sellerid',
        //     key: 'sellerid',
        //     sorter: (a, b) => a.sellerid - b.sellerid,
        // },
        {
            title: 'Seller Name',
            dataIndex: 'contactPersonName',
            key: 'contactPersonName',

            ...getColumnSearchProps('sellername'),
        },
        {
            title: 'Business Name',
            dataIndex: 'organizationName',
            key: 'organizationName',

            ...getColumnSearchProps('organizationName'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',

            ...getColumnSearchProps('sellername'),
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
    ];

    const onViewList = (record) => {
        setIsEditings(true)
        setEditOrder({ ...record })
    }

    const resetDetails = () => {
        setIsDetails(false)

    }
    const onUserList = (record) => {
        setIsDetails(true)
        setUserDetails({ ...record })
    }
    const suffixSelector5 = (
        <Form.Item name="suffix5" noStyle>
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
    const suffixSelector6 = (
        <Form.Item name="suffix6" noStyle>
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
    const suffixSelector7 = (
        <Form.Item name="suffix7" noStyle>
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
    const suffixSelector8 = (
        <Form.Item name="suffix8" noStyle>
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
    const suffixSelector9 = (
        <Form.Item name="suffix9" noStyle>
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
            <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>Sellers List</Divider>
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
                        <Col span={12}>
                            <FormItem label="Seller Name">
                                <Input value={editOrder?.contactPersonName} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, contactPersonName: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>

                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Organization">
                                <Input value={editOrder?.organizationType} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, organizationType: e.target.value }
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
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Pin">
                                <Input value={editOrder?.pin} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, pin: e.target.value }
                                    })
                                }} disabled />
                            </FormItem>
                        </Col>

                    </Row>



                    <Divider orientationMargin={50}>
                        Crops Available for Supply
                    </Divider>

                    <Row>

                        <Col span={12}>
                            <FormItem label="Fruits">
                                <Input value={editOrder?.fruits} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, fruits: e.target.value }
                                    })
                                }} disabled />


                                <Upload
                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture"
                                    defaultFileList={[...fileList]}
                                    className="upload-list-inline"
                                    accept='.png,.jpg,.jpeg'
                                    multiple
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Vegitables">
                                <Input value={editOrder?.vegetable} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, vegetable: e.target.value }
                                    })
                                }} disabled />


                                <Upload
                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture"
                                    defaultFileList={[...fileList]}
                                    className="upload-list-inline"
                                    accept='.png,.jpg,.jpeg'
                                    multiple
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>

                        <Col span={12}>
                            <FormItem label="Exotic Vegitable">
                                <Input value={editOrder?.exoticVegetables} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, exoticVegetables: e.target.value }
                                    })
                                }} disabled />


                                <Upload
                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture"
                                    defaultFileList={[...fileList]}
                                    className="upload-list-inline"
                                    accept='.png,.jpg,.jpeg'
                                    multiple
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <FormItem label="Dry Fruits">
                                <Input value={editOrder?.dryFruits} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, dryFruits: e.target.value }
                                    })
                                }} disabled />


                                <Upload
                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture"
                                    defaultFileList={[...fileList]}
                                    className="upload-list-inline"
                                    accept='.png,.jpg,.jpeg'
                                    multiple
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Others">
                                <Input value={editOrder?.others} onChange={(e) => {
                                    setEditOrder(pre => {
                                        return { ...pre, others: e.target.value }
                                    })
                                }} disabled />


                                <Upload
                                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture"
                                    defaultFileList={[...fileList]}
                                    className="upload-list-inline"
                                    accept='.png,.jpg,.jpeg'
                                    multiple
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="Harvest/Supply_Month"
                                label="Harvest/Supply Month"
                                rules={[

                                    {
                                        required: true,
                                        message: 'Please input Harvest/Supply Month!',
                                    },
                                ]}
                            >
                                <Select placeholder="Select">
                                    <Option value="January">January</Option>
                                    <Option value="February">February</Option>
                                    <Option value="March">March</Option>
                                    <Option value="April">April</Option>
                                    <Option value="May">May</Option>
                                    <Option value="June">June</Option>
                                    <Option value="July">July</Option>
                                    <Option value="August">August</Option>
                                    <Option value="Septembar">Septembar</Option>
                                    <Option value="October">October</Option>
                                    <Option value="November">November</Option>
                                    <Option value="December">December</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ paddingLeft: "10px" }}>
                            <Form.Item
                                name="Msg_for_KM_Team"
                                label="Message for Kisan Manch Team"
                                rules={[

                                    {
                                        required: true,
                                        message: 'Please input Message!',
                                    },
                                ]}
                            >
                                <Input.TextArea showCount maxLength={100} />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </div>
    )
}

export default Sellers