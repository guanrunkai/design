import React, { useState } from 'react'
import {
  Button,
  Tag,
  Switch,
  Steps,
  Alert,
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  Popconfirm,
  Card,
  Row,
  Col,
  Pagination
} from 'antd'
import { MSPageTitle, MSNoData } from '@/components'
import { MSHelpTip } from '@moresec/react-components'
import {
  CheckCircleOutlined,
  PoweroffOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined
} from '@ant-design/icons'
import styles from './index.less'

const { Step } = Steps
const { confirm } = Modal
const { TabPane } = Tabs
const { Search } = Input

const Rule: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalFormVisible, setIsModalFormVisible] = useState(false)
  const [isModalFormVerticalVisible, setIsModalFormVerticalVisible] = useState(false)
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const showFormModal = () => {
    setIsModalFormVisible(true)
  }

  const handleFormCancel = () => {
    setIsModalFormVisible(false)
  }

  const showFormVerticalModal = () => {
    setIsModalFormVerticalVisible(true)
  }
  const handleFormVerticalCancel = () => {
    setIsModalFormVerticalVisible(false)
  }

  const showConfirm = () => {
    confirm({
      title: '提示',
      icon: <WarningOutlined />,
      content: '提示弹框',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  return (
    <div className={styles.rule_wrap}>
      {/* <h2>2.9页头/面包屑</h2> */}
      {/* 页面标题 */}
      <MSPageTitle title="2.9页头" />
      {/* 页面标题返回 */}
      <MSPageTitle title="2.9页头返回" back />
      <div className="page_container">
        <h2>2.1按钮规范</h2>
        <div>
          <div className={styles.item}>
            <Button type="primary" size="large">
              超大按钮
            </Button>
            <Button type="primary" className="ms-btn-lg">
              大按钮啊
            </Button>
            <Button type="primary">中按钮啊</Button>
            <Button type="primary" className="ms-btn-sm">
              小按钮啊
            </Button>
            <Button type="primary" size="small">
              超小
            </Button>
          </div>
          <div className={styles.item}>
            <Button type="primary" size="large" ghost>
              超大按钮
            </Button>
            <Button type="primary" className="ms-btn-lg" ghost>
              大按钮啊
            </Button>
            <Button type="primary" size="middle" ghost>
              中按钮啊
            </Button>
            <Button type="primary" className="ms-btn-sm" ghost>
              小按钮啊
            </Button>
            <Button type="primary" size="small" ghost>
              超小
            </Button>
          </div>
          <div className={styles.item}>
            <Button size="large">超大按钮</Button>
            <Button className="ms-btn-lg">大按钮啊</Button>
            <Button size="middle">中按钮啊</Button>
            <Button className="ms-btn-sm">小按钮啊</Button>
            <Button size="small">超小</Button>
          </div>
          <div className={styles.item}>
            <Button icon={<PoweroffOutlined />} size="large">
              超大按钮
            </Button>
            <Button icon={<PoweroffOutlined />} className="ms-btn-lg">
              大按钮啊
            </Button>
            <Button icon={<PoweroffOutlined />}>中按钮啊</Button>
            <Button icon={<PoweroffOutlined />} className="ms-btn-sm">
              小按钮啊
            </Button>
            <Button icon={<PoweroffOutlined />} size="small">
              超小
            </Button>
          </div>
          <div className={styles.item}>
            <Button icon={<PoweroffOutlined />} size="large" />
            <Button icon={<PoweroffOutlined />} className="ms-btn-lg" />
            <Button icon={<PoweroffOutlined />} />
            <Button icon={<PoweroffOutlined />} className="ms-btn-sm" />
            <Button icon={<PoweroffOutlined />} size="small" />
          </div>
          <h4>交互</h4>
          <div className={styles.item}>
            <Button type="primary">默认</Button>
            <Button type="primary" disabled>
              disabled
            </Button>
          </div>
          <div className={styles.item}>
            <Button type="primary" ghost>
              默认
            </Button>
            <Button type="primary" disabled ghost>
              disabled
            </Button>
          </div>
          <div className={styles.item}>
            <Button>默认</Button>
            <Button disabled>disabled</Button>
          </div>
        </div>

        <h2>2.2标签</h2>
        <div>
          <Tag className="ms-tag-xl" closable>
            Tag 1
          </Tag>
          <Tag className="ms-tag-lg" closable>
            Tag 2
          </Tag>
          <Tag className="ms-tag-md" closable>
            Tag 3
          </Tag>
          <Tag className="ms-tag-sm" closable>
            Tag 4
          </Tag>
        </div>
        <h2>2.3开关</h2>
        <div>
          <Switch />
          <Switch checked />
          <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          <Switch /> 已开启
        </div>
        <h2>2.5气泡</h2>
        <MSHelpTip
          label="默认黑底背景"
          title="这是我的帮助说明这是我的帮助说明这是我的帮助说明这是我的帮助说明这是我的帮助说明这是我的帮助说明"
        />
        <br />
        <MSHelpTip label="白底背景" title="帮助说明" color="white" />
        <h2>2.7 输入框 搜索框 选择框</h2>
        <Form form={form} name="control-hooks">
          <Form.Item name="note" label="Note" rules={[{ required: true }]}>
            <Input placeholder="默认背景内容" />
          </Form.Item>
        </Form>

        <Search placeholder="input search text"  style={{ marginBottom: '20px' }} />
        <div>
          <Select style={{ width: 300 }}>
            <Select.Option value="iast">黑盒</Select.Option>
          </Select>
        </div>
        <h2>2.10步骤条</h2>
        <Steps current={1} labelPlacement="vertical">
          <Step title="标题一" />
          <Step title="标题二" />
          <Step title="标题三" />
          <Step title="标题四" />
        </Steps>
        <h2> 3.2字号</h2>
        <div>
          <h1> h1</h1>
          <h2> h2</h2>
          <h3> h3</h3>
          <h4> h4</h4>
          <h5> h5</h5>
          <h6> h6</h6>
        </div>
        <h2>5.4 告警提示</h2>
        <div className={styles.alert_wrap}>
          <Alert banner message="成功" type="success" icon={<CheckCircleOutlined />} showIcon />
          <Alert banner message="消息" type="info" icon={<InfoCircleOutlined />} showIcon />
          <Alert
            banner
            message="警告"
            type="warning"
            icon={<WarningOutlined />}
            showIcon
            closable
          />
          <Alert banner message="失败" type="error" icon={<CloseCircleOutlined />} showIcon />
          {/* <h4>消息框</h4>
          <Alert message="消息" type="info" />
          <Alert className="noBorder" message="消息" type="info" /> */}
        </div>
        <h2>5.3 弹窗</h2>
        <div className={styles.tab_wrap}>
          <Button type="primary" onClick={showModal}>
            打开查看弹窗
          </Button>
          <Button type="primary" onClick={showFormModal}>
            打开表单弹窗-左右
          </Button>
          <Button type="primary" onClick={showFormVerticalModal}>
            打开表单弹窗-上下
          </Button>
          <Button type="primary" onClick={showConfirm}>
            打开Confirm提示弹窗
          </Button>

          {/* 注： 文本弹框添加 className text_modal */}
          <Modal
            title="Basic Modal"
            wrapClassName="text_modal"
            visible={isModalVisible}
            onOk={handleCancel}
            onCancel={handleCancel}
            footer={false}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <Modal
            title="Basic Modal"
            visible={isModalFormVisible}
            onOk={handleFormCancel}
            onCancel={handleFormCancel}
          >
            <Form form={form} name="control-hooks" onFinish={showFormModal}>
              <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Basic Modal"
            visible={isModalFormVerticalVisible}
            onOk={handleFormVerticalCancel}
            onCancel={handleFormVerticalCancel}
          >
            <Form
              form={form}
              name="control-hooks"
              layout="vertical"
              onFinish={showFormVerticalModal}
            >
              <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <h2> 气泡弹窗</h2>
        <div>
          <Popconfirm
            title="删除项目后，该项目所属的所有数据将被同时删除，请确认是否删除？"
            onConfirm={e => {
              console.log(e)
            }}
            onCancel={e => {
              console.log(e)
            }}
            okText="确定"
            cancelText="取消"
            okType="link"
            cancelButtonProps={{ type: 'text' }}
            icon={<WarningOutlined />}
          >
            <Button type="primary">Hover me</Button>
          </Popconfirm>
        </div>
        <h2>列表页-Tab</h2>
        <div className={styles.tabs_wrap}>
          <div>
            <Tabs>
              <TabPane tab="Tab 1" key="1">
                Content of tab 1
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of tab 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of tab 3
              </TabPane>
            </Tabs>
          </div>
          <div>
            <Tabs className="card-border" defaultActiveKey="1" type="card">
              <TabPane tab="Card Tab 1" key="1">
                Content of card tab 1
              </TabPane>
              <TabPane tab="Card Tab 2" key="2">
                Content of card tab 2
              </TabPane>
              <TabPane tab="Card Tab 3" key="3">
                Content of card tab 3
              </TabPane>
            </Tabs>
          </div>
          <div className={styles.card_container}>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Card Tab 1" key="1">
                Content of card tab 1
              </TabPane>
              <TabPane tab="Card Tab 2" key="2">
                Content of card tab 2
              </TabPane>
              <TabPane tab="Card Tab 3" key="3">
                Content of card tab 3
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className={styles.card_wrap}>
          <Row>
            <Col span={8}>
              <h2>dashboard 带图表Card</h2>
              <Card title="dashboard Top5" extra={<a href="#">More</a>}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={10} offset={2}>
              <h2>dashboard 带图表Card 无border</h2>
              <Card title="dashboard Top5" bordered={false} extra={<a href="#">More</a>}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </div>
        <h2>Pagination</h2>
        {/* <div className="pagination-no-margin">
          <Pagination
            total={85}
            showSizeChanger
            showQuickJumper
            showTotal={total => `共 ${total} 条`}
          />
        </div> */}

        <Pagination
          total={85}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共 ${total} 条`}
        />
        <h2>暂无数据</h2>
        <MSNoData />
      </div>
    </div>
  )
}

export default Rule
