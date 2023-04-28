import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider, Table, Modal, Row, Col, Form, Input, DatePicker, Tabs } from 'antd'
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
const { RangePicker } = DatePicker;

const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

const Reports = props => {
  const columns = [
    {
      title: 'Sr No',
      dataIndex: 'id',
      key: 'id',
      width: "5%"
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: "40%"
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: "10%"

      // ...getColumnSearchProps('customername'),
    },
    {
      title: 'Action',
      key: 'action',
      width: "10%",
      render: (record) => {

        return <>
          {/* <Button type='primary'>Details</Button> */}
          <DownloadOutlined style={{ color: "green", fontSize: 20 }} />
          <DeleteOutlined style={{ color: "red", marginLeft: 25, fontSize: 20 }} />

        </>
      }

    },
  ]
  const data = [
    {
      id: 1,
      name: "October Month Report",
      date: "2/10/22",

    },
    {
      id: 2,
      name: "August Month Report",
      date: "2/8/22",

    },
    {
      id: 3,
      name: "May Month Report",
      date: "2/5/22",

    },
    {
      id: 4,
      name: "June Month Report",
      date: "2/6/22",

    },
    {
      id: 5,
      name: "July Month Report",
      date: "2/7/22",

    },
  ]
  const [isVisible, setIsVisible] = useState(false)
  const resetVisible = () => {
    setIsVisible(false)

  }
  const onGenerateReport = () => {
    setIsVisible(true)
  }
  return (
    <div style={{ background: 'white', paddingLeft: "20px", width: "98.5%", marginLeft: "14px", marginTop: "20px", marginBottom: "10px" }}>
      <Divider orientation="left" style={{ paddingLeft: "10px", paddingTop: 10 }}>Reports</Divider>
      <Button onClick={() => {
        onGenerateReport()
      }}>Generate Report</Button>
      <Table columns={columns} dataSource={data} pagination={true} style={{ paddingLeft: "10px", paddingRight: 10, paddingBottom: 10, paddingTop: 10 }} />
      <Modal visible={isVisible}
        onCancel={() => {
          resetVisible()
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
          resetVisible()
        }
        }
        okText="Save"
        title="Edit"
        width="80%">
        {/* <Divider orientation='left'>{editOrder?.name}</Divider> */}
        <Form layout='vertical'>
          <Row>
            <Col span={12} >
              <FormItem label="Report Name">
                <Input />
              </FormItem>
            </Col>
            {/* </Row>
          <Row> */}
            <Col span={12} style={{ paddingLeft: 10 }}>
              <FormItem label="Date">
                <RangePicker style={{ width: "100%" }} />
              </FormItem>
            </Col>
          </Row>


        </Form>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Products" key="1">
            Content of Products
          </TabPane>
          <TabPane tab="Sales" key="2">
            Content of Sales
          </TabPane>
          <TabPane tab="Orders" key="3">
            Content of Orders
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}

Reports.propTypes = {}

export default Reports