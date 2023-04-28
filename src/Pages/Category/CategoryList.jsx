import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeFilled, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Divider, Modal, Form, Upload, Spin, Image, Row, Typography } from 'antd';
import IMG from "../../Assets/Images/logo.png"
import FormItem from 'antd/lib/form/FormItem';
import { getAllCategory, deleteCategory, updateCategory } from '../../Services/CategoryServices';
import { useEffect } from 'react';
import { notification } from 'antd';

import "../../Components/GlobalVariable"
// import Paragraph from 'antd/lib/skeleton/Paragraph';


const { Paragraph } = Typography;


const CategoryList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const [isEditing, setIsEditing] = useState(false)
  const [isEditings, setIsEditings] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [putDescription, setPutDescription] = useState('')
  const [putName, setPutName] = useState('')
  const [putId, setPutId] = useState('')
  const [loadings, setLoadings] = useState([]);
  const [spin, setSpin] = useState(false)
  const [imageBase64, setImageBase64] = useState()
  const [imageShow, setImageShow] = useState(false)
  const [imageUploaded, setImageUploaded] = useState("no")



  const fileList = [];

  const uploadImage = async (e) => {

    setImageBase64(e)
    setImageShow(true)
    setImageUploaded("yes")


  }



  const fetchData = async () => {
    try {

      const allCategory = await getAllCategory()

      if (allCategory) {
        setData(allCategory);
        setSpin(true)


      }
    } catch (e) {
      console.log(e)
    }
  }


  const putValues = async (image) => {


    const allCategory = await updateCategory(putDescription, putId, putName, image, imageUploaded)

    if (allCategory) {
      setData(allCategory);
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
      title: 'Category ID',
      dataIndex: 'id',
      key: 'id',

      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      // width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Category Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {

        return (
          <>
            <Paragraph>{record.description.substr(0, 10)}</Paragraph>
            {/* <a>{record.description.substr(0, 10)}</a> */}
          </>
        );
      },
      // width: '20%',
      // ...getColumnSearchProps('description'),
    },

    {
      title: 'Category Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => {

        return (
          <>
            {/* console.log(record.icon); */}
            {/* <img src={`https://goodashpen34.conveyor.cloud/${record.icon}`} alt="" style={{ width: 100 }} /> */}
            <Image
              width={100}
              src={`${global.BaseUrl}/${record.icon}`}
            />

          </>
        );
      }
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


        const allCategory = await deleteCategory(record.id)

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
    setPutId(record.id)
    setImageBase64(`${record.icon}`)

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
      <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>Category List</Divider>
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

          <FormItem label="Category Name" rules={[
            {
              required: true,
              message: 'Please input Category Description',
            },


          ]}
            hidden>
            <Input value={editCategory?.id} />
          </FormItem>
          <FormItem label="Category Name" rules={[
            {
              required: true,
              message: 'Please input Category Description',
            },

          ]}>
            <Input value={editCategory?.name} onChange={(e) => {
              setEditCategory(pre => {
                return { ...pre, name: e.target.value }
              })
              setPutName(e.target.value)
            }} />
          </FormItem>
          <Form.Item

            label="Category Description"

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
              setPutDescription(e.target.value)
            }} />
          </Form.Item>
          <Form.Item
            name="Category_Icon"
            label="Category Icon"
          >
            <Row>

              <Image
                width={200}
                src={`${global.BaseUrl}/${editCategory?.icon}`}
                hidden={imageShow}
              />
            </Row>
            <Row style={{ marginTop: 10 }}>

              <Upload
                maxCount={1}
                listType="picture"
                className="upload-list-inline"
                accept='.png,.jpg,.jpeg'
                action={(e) => { uploadImage(e) }}
                defaultFileList={[...fileList]}
              // beforeUpload={(file) => {
              //   console.log({ file });
              //   return false;
              // }}
              >
                <Button icon={<UploadOutlined />} >Upload</Button>
              </Upload>
            </Row>

          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ float: "right", marginTop: 10, marginBottom: "-30px" }} loading={loadings[0]} onClick={() => {
              putValues(imageBase64)
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
          <FormItem label="Category Name">
            <Input value={editCategory?.name} onChange={(e) => {
              setEditCategory(pre => {
                return { ...pre, name: e.target.value }
              })
            }} readOnly />
          </FormItem>
          <Form.Item
            label="Category Description"
          >
            <Input.TextArea showCount maxLength={100} value={editCategory?.description} onChange={(e) => {
              setEditCategory(pre => {
                return { ...pre, description: e.target.value }
              })
            }} readOnly />
          </Form.Item>
          <Form.Item
            label="Icon"
          >

            <Image
              width={200}
              src={`${global.BaseUrl}/${editCategory?.icon}`}
            />
          </Form.Item>


        </Form>
      </Modal>

    </div >
  )
}

export default CategoryList