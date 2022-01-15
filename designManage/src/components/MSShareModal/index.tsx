import * as React from 'react'
import { Input, Button, Modal, message, Form } from 'antd'
import copy from 'copy-to-clipboard'
import styles from './index.less'

interface IProps {
  shareUrl: string
  shareAu: string
  visible: boolean
  toggleShareModal: Function
  title: string
}

const FormItem = Form.Item

class MSShareModal extends React.Component<IProps> {
  handleCopy = () => {
    const { shareAu, shareUrl } = this.props
    const str = `漏洞地址： ${shareUrl}  密码：${shareAu}`
    copy(str)
    message.success('复制成功！')
  }

  render() {
    const { shareUrl, shareAu, visible, toggleShareModal, title } = this.props
    return (
      <Modal
        title={title}
        onCancel={() => {
          toggleShareModal()
        }}
        footer={null}
        visible={visible}
        width={400}
      >
        <Form labelAlign="left" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <FormItem label="分享地址">
            <Input value={shareUrl} />
          </FormItem>
          <FormItem label="提取密码">
            <Input value={shareAu} className={styles.shareInput} />
            <Button type="primary" onClick={this.handleCopy} className={styles.shareButton}>
              复制内容
            </Button>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default MSShareModal
