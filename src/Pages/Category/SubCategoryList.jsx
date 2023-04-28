import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeFilled, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Divider, Modal, Form, Upload, Spin } from 'antd';
import IMG from "../../Assets/Images/logo.png"
import FormItem from 'antd/lib/form/FormItem';
import { getAllSubCategory, deleteSubCategory, updateSubCategory } from '../../Services/CategoryServices';
import { useEffect } from 'react';
import { notification } from 'antd';





const SubCategoryList = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const searchInput = useRef(null);
    const [isEditing, setIsEditing] = useState(false)
    const [isEditings, setIsEditings] = useState(false)
    const [editCategory, setEditCategory] = useState(null)
    const [putDescription, setPutDescription] = useState('')
    const [putName, setPutName] = useState('')
    const [putCategoryId, setPutCategoryId] = useState('')
    const [putId, setPutId] = useState('')
    const [loadings, setLoadings] = useState([]);
    const [spin, SetSpin] = useState(false)

    const fileList = [

    ];

    const fetchData = async () => {
        try {

            const allCategory = await getAllSubCategory()
            console.log(allCategory)
            if (allCategory) {
                setData(allCategory);
                SetSpin(true)

            }
        } catch (e) {
            console.log(e)
        }
    }

    const putValues = async () => {
        try {
            const allCategory = await updateSubCategory(putDescription, putId, putName, putCategoryId)
            console.log(allCategory)
            if (allCategory) {
                setData(allCategory);
                resetEditing()
            }

            notification.success({
                message: 'Successfully Updated',
            });
        } catch (e) {
            console.log(e)
        }



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
        }, 6000);
        // setIsEditing(false)
    };

    useEffect(() => {

        fetchData();

    }, []);




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
            title: 'SubCategory ID',
            dataIndex: 'id',
            key: 'id',

            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id - b.id,
        },
        // {
        //     title: 'Category ID',
        //     dataIndex: 'categoryId',
        //     key: 'categoryId',

        //     ...getColumnSearchProps('categoryId'),
        //     sorter: (a, b) => a.categoryId - b.categoryId,
        // },

        {
            title: 'SubCategory Name',
            dataIndex: 'name',
            key: 'name',
            // width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'SubCategory Description',
            dataIndex: 'description',
            key: 'description',
            // width: '20%',
            ...getColumnSearchProps('description'),
        },

        {
            title: 'Action',
            key: 'action',
            render: (record) => {

                return <>
                    <EditOutlined onClick={() => {
                        onEditList(record)
                    }} style={{ fontSize: 20 }} />
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
            title: 'Are you sure,you want to delete this Category record?',
            okText: 'Confirm',
            okType: 'danger',
            onOk: async () => {


                const allCategory = await deleteSubCategory(record.id)
                console.log(allCategory)
                if (allCategory) {
                    setData(allCategory);


                }
                notification.success({
                    message: 'Successfully Deleted',

                });


            }
        })

    }

    const onEditList = (record) => {
        setIsEditing(true)
        setEditCategory({ ...record })
        setPutDescription(record.description)
        setPutName(record.name)
        setPutCategoryId(record.categoryId)
        setPutId(record.id)

    }
    const onEditDList = (record) => {
        setIsEditings(true)
        setEditCategory({ ...record })
    }

    const resetEditing = () => {
        setIsEditing(false)
        setIsEditings(false)
        setEditCategory(null)
    }

    return (

        <div style={{ background: 'white', paddingLeft: "20px", height: "100%", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px", overflow: "auto" }}>
            <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>SubCategory List</Divider>
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
                title="Edit"
                width="80%">

                <Form layout='vertical' >

                    <FormItem label="SubCategory id" rules={[
                        {
                            required: true,
                            message: 'Please input SubCategory id',
                        },


                    ]}
                        hidden>
                        <Input value={editCategory?.id} />
                    </FormItem>
                    <FormItem label="SubCategory Name" rules={[
                        {
                            required: true,
                            message: 'Please input SubCategory Name',
                        },

                    ]}>
                        <Input value={editCategory?.name} onChange={(e) => {
                            setEditCategory(pre => {
                                return { ...pre, name: e.target.value }
                            })
                            setPutName(e.target.value)
                        }} />
                    </FormItem>
                    <FormItem label="Category id" rules={[
                        {
                            required: true,
                            message: 'Please input Category id',
                        },

                    ]} hidden>
                        <Input value={editCategory?.categoryId} onChange={(e) => {
                            setEditCategory(pre => {
                                return { ...pre, categoryId: e.target.value }
                            })
                            setPutCategoryId(e.target.value)
                        }} />
                    </FormItem>
                    <Form.Item

                        label="SubCategory Description"

                        rules={[
                            {
                                required: true,
                                message: 'Please input SubCategory Description',
                            },

                        ]}
                    >
                        <Input.TextArea showCount maxLength={100} value={editCategory?.description} onChange={(e) => {
                            setEditCategory(pre => {
                                return { ...pre, description: e.target.value }
                            })
                            setPutDescription(e.target.value)
                        }} />
                    </Form.Item>


                    <Form.Item >
                        <Button type="primary" htmlType="submit" style={{ float: "right", marginTop: 10, marginBottom: "-30px" }} loading={loadings[0]} onClick={() => {
                            putValues()
                            enterLoading(0)
                        }}>
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
                okButtonProps={{ style: { display: 'none' } }}
                title="View"
                width="80%">

                <Form layout='vertical'>
                    <FormItem label="SubCategory Name">
                        <Input value={editCategory?.name} onChange={(e) => {
                            setEditCategory(pre => {
                                return { ...pre, name: e.target.value }
                            })
                        }} readOnly />
                    </FormItem>
                    <Form.Item

                        label="SubCategory Description"

                        rules={[
                            {
                                required: true,
                                message: 'Please input Category Description',
                            },

                        ]}
                    >
                        <Input.TextArea showCount maxLength={100} value={editCategory?.description} onChange={(e) => {
                            setEditCategory(pre => {
                                return { ...pre, description: e.target.value }
                            })
                        }} readOnly />
                    </Form.Item>

                </Form>
            </Modal>

        </div>
    )
}

export default SubCategoryList