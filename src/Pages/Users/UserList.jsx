import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Space, Table, Divider, Modal, Row, Col, Form } from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const UserList = props => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [isDetails, setIsDetails] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

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

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userid',
      key: 'userid',
      sorter: (a, b) => a.userid - b.userid,
    },
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',

      ...getColumnSearchProps('username'),
    },
    {
      title: 'Fullname',
      dataIndex: 'userfullname',
      key: 'userfullname',

      ...getColumnSearchProps('userfullname'),
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key: 'telephone',

      ...getColumnSearchProps('telephone'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

      ...getColumnSearchProps('email'),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastlogin',
      key: 'lastlogin',

      ...getColumnSearchProps('lastlogin'),
    },
    {
      title: 'Action',
      key: 'action',
      width: "15%",
      render: (record) => {

        return <>
          <Button type='primary' onClick={() => {
            onUserList(record)
          }}>Details</Button>
        </>
      }

    },
  ]
  const [data, setData] = useState([
    {
      key: '1',
      username: 'KLRahul',
      userfullname: 'K L Rahul',
      telephone: 9087654321,
      lastlogin: '22-06-22',
      userid: '1',
      email: 'KLRahul@gmail.com',
    },
    {
      key: '2',
      username: 'RishabhP',
      userfullname: 'Rishabh Pant',
      telephone: 9087654321,
      lastlogin: '22-06-22',
      userid: '2',
      email: 'RishabhP@gmail.com',
    },
    {
      key: '3',
      username: 'JaspreetB',
      userfullname: 'Jaspreet Bumrah',
      telephone: 9087654321,
      lastlogin: '22-06-22',
      userid: '3',
      email: 'JaspreetB@gmail.com',
    },
    {
      key: '4',
      username: 'MSD',
      userfullname: 'M S Dhoni',
      telephone: 9087654321,
      lastlogin: '22-06-22',
      userid: '4',
      email: 'MSD@gmail.com',
    },
    {
      key: '5',
      username: 'ViratK',
      userfullname: 'Virat Kohli',
      telephone: 9087654321,
      lastlogin: '22-06-22',
      userid: '5',
      email: 'ViratK@gmail.com',
    },
    {
      key: '6',
      username: 'SuryaY',
      userfullname: 'Surya Yadav',
      telephone: 9087654321,
      lastlogin: '22-06-22',
      userid: '6',
      email: 'SuryaY@gmail.com',
    },
    {
      key: '7',
      username: 'HardikP',
      userfullname: 'Hardik Pandya',
      telephone: 9087654321,
      lastlogin: '22-06-22',
      userid: '7',
      email: 'HardikP@gmail.com',
    }

  ])
  const resetDetails = () => {
    setIsDetails(false)

  }
  const onUserList = (record) => {
    setIsDetails(true)
    setUserDetails({ ...record })
  }
  return (
    <div style={{ background: 'white', paddingLeft: "20px", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px" }}>
      <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>User List</Divider>

      <Table columns={columns} dataSource={data} pagination={true} style={{ paddingLeft: "10px", paddingRight: 10, paddingBottom: 10 }} />
      <Modal visible={isDetails}
        onCancel={() => {
          resetDetails()
        }}
        onOk={() => {
          resetDetails()
        }}


        title="Details"
        width="80%">
        {/* <Divider orientation='left'>{editOrder?.name}</Divider> */}
        <Form layout='vertical'>
          <Row>
            <Col span={12}>
              <FormItem label="User Name">
                <Input value={userDetails?.username} onChange={(e) => {
                  setUserDetails(pre => {
                    return { ...pre, username: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Fullname">
                <Input value={userDetails?.userfullname} onChange={(e) => {
                  setUserDetails(pre => {
                    return { ...pre, userfullname: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="Telephone">
                <Input value={userDetails?.telephone} onChange={(e) => {
                  setUserDetails(pre => {
                    return { ...pre, telephone: e.target.value }
                  })
                }} disabled />
              </FormItem>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Email">
                <Input value={userDetails?.email} onChange={(e) => {
                  setUserDetails(pre => {
                    return { ...pre, email: e.target.value }
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

UserList.propTypes = {}

export default UserList