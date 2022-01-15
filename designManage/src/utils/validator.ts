import { patterns } from '@moresec/utils'
import type { Rule } from 'antd/lib/form'
const reg = {
  username: /^(.|\\n){0,64}$/,
  special: /^[a-zA-Z0-9\u4E00-\u9FA5]+$/,
  phone: /^\d{11}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,30}$/,
  emailLen: /^(.|\\n){0,128}$/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  url: patterns.url,
  ip: patterns.ip,
  safetyFactory: /^(?:[1-9]?\d|100)$/,
  taskName: /^(.|\\n){0,100}$/,
  textArea: /^(.|\n){0,200}$/,
  reportName: /^(.|\\n){0,30}$/,
  projectTag: /^(.|\\n){0,100}$/,
  leakAbout: /^(.|\\n){0,64}$/,
  responseTime: /^\+?[1-9]{1}[0-9]{0,2}\d{0,0}$/,
  version: /^[0-9a-zA-Z](.|\n){0,9}$/
}

export const withRequired = (v: (_rule: Rule, value: any) => Promise<void | any> | void) => {
  return (_rule: Rule, value: any) => {
    if (!value) {
      return Promise.reject(new Error('请输入'))
    }
    return v(_rule, value)
  }
}

export const withEmpty = (v: (_rule: Rule, value: any) => Promise<void | any> | void) => {
  return (_rule: Rule, value: any) => {
    if (!value) {
      return Promise.resolve()
    }
    return v(_rule, value)
  }
}

// Url校验
export const validateUrl = (_: Rule, value = '') => {
  if (!reg.url.test(value)) {
    return Promise.reject(new Error('url格式不正确'))
  } else {
    return Promise.resolve()
  }
}

// Ip校验
export const validateIp = (_: Rule, value = '') => {
  if (!reg.ip.test(value)) {
    return Promise.reject(new Error('IP地址格式不正确'))
  } else {
    return Promise.resolve()
  }
}

// 用户名校验
export const validateUsername = (_: Rule, value = '') => {
  if (!reg.special.test(value)) {
    return Promise.reject(new Error('不能输入特殊字符'))
  } else if (!reg.username.test(value)) {
    return Promise.reject(new Error('长度不能超过64位'))
  } else {
    return Promise.resolve()
  }
}

// 手机号码校验
export const validatePhoneNumber = (_: Rule, value = '') => {
  if (!reg.phone.test(value)) {
    return Promise.reject(new Error('手机号码格式不正确'))
  } else {
    return Promise.resolve()
  }
}

// 用户密码校验
export const validatePassword = (_: Rule, value = '') => {
  if (!reg.password.test(value)) {
    return Promise.reject(new Error('请输入8-30位含有大小写字母和数字的密码'))
  } else {
    return Promise.resolve()
  }
}

// 邮箱校验
export const validateEmail = (_: Rule, value = '') => {
  if (!reg.emailLen.test(value)) {
    return Promise.reject(new Error('邮箱输入的字符不能超过128位'))
  } else if (!reg.email.test(value)) {
    return Promise.reject(new Error('邮箱格式有误'))
  } else {
    return Promise.resolve()
  }
}
// 安全系数校验
export const validateSafetyFactory = (_: Rule, value = '') => {
  if (!reg.safetyFactory.test(value)) {
    return Promise.reject(new Error('请输入0-100之间的安全系数'))
  } else {
    return Promise.resolve()
  }
}
// 任务名字校验
export const validateTaskName = (_: Rule, value = '') => {
  if (!reg.taskName.test(value)) {
    return Promise.reject(new Error('任务名称长度不可超过100个字'))
  } else {
    return Promise.resolve()
  }
}
// 输入文字区域校验(textArea)
export const validateTextArea = (_: Rule, value = '') => {
  if (!reg.textArea.test(value)) {
    return Promise.reject(new Error('任务描述长度不可超过200个字'))
  } else {
    return Promise.resolve()
  }
}
// 报告名称校验
export const validateReportName = (_: Rule, value = '') => {
  if (!reg.reportName.test(value)) {
    return Promise.reject(new Error('报告名称长度不可超过30个字'))
  } else {
    return Promise.resolve()
  }
}
// 响应时长校验
export const validateResponseTime = (_: Rule, value = '') => {
  if (!reg.responseTime.test(value)) {
    return Promise.reject(new Error('请输入1-999之间的整数'))
  } else {
    return Promise.resolve()
  }
}
// 任务标签校验
export const validateProjectTag = (_: Rule, value = '') => {
  if (!reg.projectTag.test(value)) {
    return Promise.reject(new Error('标签长度不可超过100个字'))
  } else {
    return Promise.resolve()
  }
}
// 漏洞名称校验
export const validateLeakName = (_: Rule, value = '') => {
  if (!reg.leakAbout.test(value)) {
    return Promise.reject(new Error('漏洞名称不可超过64个字'))
  } else {
    return Promise.resolve()
  }
}
// 漏洞类型校验
export const validateLeakType = (_: Rule, value = '') => {
  if (!reg.leakAbout.test(value)) {
    return Promise.reject(new Error('漏洞类型不可超过64个字'))
  } else {
    return Promise.resolve()
  }
}

export const validate30 = (_rule: Rule, value: any) => {
  if (value.length > 30) {
    return Promise.reject(new Error('最多输入30个字符'))
  } else {
    return Promise.resolve()
  }
}

// 邮箱字符串校验 (以分号分隔的邮箱)
export const validateEmailText = (_: Rule, value = '') => {
  if (!value) return Promise.resolve()
  const emailList = value.split(';').map(i => i.trim())
  for (const item of emailList) {
    if (item.length > 128) {
      return Promise.reject(new Error('邮箱输入的字符不能超过128位'))
    } else if (!reg.email.test(item)) {
      return Promise.reject(new Error('邮箱格式有误'))
    }
  }
  return Promise.resolve()
}
// 安全需求 版本 校验
export const validateVersion = (_: any, value = '') => {
  if (!reg.version.test(value)) {
    return Promise.reject(new Error('请输入0-10位之间含有数字或字母的内容'))
  } else {
    return Promise.resolve()
  }
}
