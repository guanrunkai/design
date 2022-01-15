import moment from 'moment'
export const DSMP_LOGIN_TOKEN = 'DSMP-LOGIN-TOKEN'

export const API_PROXY: Readonly<string> = '/v1'

export interface IMapItem {
  label: string
  value: string | number
  key?: string | number
}
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_FORMAT_WITH_SECOND = 'YYYY-MM-DD HH:mm:ss'
export const DEFAULT_TIME = {
  format: 'HH:mm:ss',
  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]
}

type ExtractValue<T, K> = T extends { value: K; label: infer R } ? R : never
type ExtractLabel<T, K> = T extends { value: infer R; label: K } ? R : never

export const genMapObject = <T extends Readonly<IMapItem[]>>(originData: T) => {
  type IMapValue = {
    [TK in T[number]['value']]: ExtractValue<T[number], TK>
  }
  type IMapLabel = {
    [TK in T[number]['label']]: ExtractLabel<T[number], TK>
  }
  const valueObject: IMapValue = Object.create(null)
  const labelObject: IMapLabel = Object.create(null)
  originData.forEach(item => {
    // eslint-disable-next-line prettier/prettier
    valueObject[item.value as T[number]['value']] = item.label as ExtractValue<
      T[number],
      T[number]['value']
    >
    // eslint-disable-next-line prettier/prettier
    labelObject[item.label as T[number]['label']] = item.value as ExtractLabel<
      T[number],
      T[number]['label']
    >
  })
  return Object.assign({}, valueObject, labelObject)
}

// example
export const MAP_LEVELS = [
  { label: '一般', value: 'custom' },
  { label: '低危', value: 'low' },
  { label: '中危', value: 'middle' },
  { label: '高危', value: 'high' },
  { label: '严重', value: 'serious' }
]

export const MAP_RISK_LEVEL_COLOR: Readonly<any> = {
  高危: '#DD3E3E',
  4: '#DD3E3E',
  中危: '#F15A24',
  3: '#F15A24',
  低危: '#FFBE15',
  2: '#FFBE15',
  提示: '#ADDCFF',
  1: '#ADDCFF',
  安全: '#00CC88',
  0: '#00CC88',
  未定级: '#00CC88'
}

export const MAP_MAP_LEVELS = genMapObject(MAP_LEVELS)

export type T_MAP_MAP_LEVELS = keyof typeof MAP_MAP_LEVELS

// ------------------ 系统配置 -------------------------
// 用户角色
export const USER_ROLE: MS.optionList = [
  { label: '系统管理员', value: 1 },
  { label: '审计员', value: 2 },
  { label: '安全管理员', value: 3 },
  { label: '部门负责人', value: 4 },
  { label: '项目经理', value: 5 },
  { label: '研发人员', value: 6 },
  { label: '测试人员', value: 7 },
  { label: '部门安全管理员', value: 8 },
  { label: '业务负责人', value: 9 },
  { label: '运维人员', value: 10 }
]
export const MAP_USER_ROLE = genMapObject(USER_ROLE)

export enum E_USER_ROLE {
  '系统管理员' = 1,
  '审计员',
  '安全管理员',
  '部门负责人',
  '项目经理',
  '研发人员',
  '测试人员',
  '部门安全管理员',
  '业务负责人',
  '运维人员'
}

export const PROJECT_MODULE_LEVEL = [
  { label: '全部', value: ' ' },
  { label: '高危', value: 1 },
  { label: '中危', value: 2 },
  { label: '低危', value: 3 },
  { label: '安全', value: 4 }
]

export const ALL_ENGINE_DICT: { [k: number]: string } = {
  1: 'SCA',
  2: 'SAST',
  3: 'IAST',
  4: 'DAST',
  5: 'CHECKMARX',
  6: 'TENABLE'
}

// 账号状态
export const ACCOUNT_STATUS = [
  { label: '正常', value: 1 },
  { label: '已失效', value: 2 },
  { label: '已锁定', value: 3 }
]

// roleBasePermission
export const ROLE_PERMISSION = [
  {
    key: 'user',
    moduleName: '用户管理',
    sub: [{ funcId: 'view', name: '查看', flag: 1 }]
  },
  {
    key: 'dashboard',
    moduleName: '首页大屏',
    sub: [{ funcId: 'view', name: '查看', flag: 1 }]
  },
  {
    key: 'project',
    moduleName: '项目管理',
    sub: [
      { funcId: 'view', name: '查看' },
      { funcId: 'create', name: '新建项目' },
      { funcId: 'edit', name: '编辑项目' },
      { funcId: 'c_sca', name: '新建SCA扫描任务' },
      { funcId: 'c_sast', name: '新建SAST扫描任务' },
      { funcId: 'c_iast', name: '新建IAST扫描' },
      { funcId: 'c_dast', name: '新建哨兵扫描任务' },
      { funcId: 'c_tenable', name: '新建tenable.sc扫描任务' },
      { funcId: 'c_checkmarx', name: '新建checkmarx.sast扫描任务' }
    ]
  },
  {
    key: 'leak',
    moduleName: '漏洞管理',
    sub: [
      { funcId: 'view', name: '查看' },
      { funcId: 'transfer', name: '漏洞转派' },
      { funcId: 'import', name: '手动录入' }
    ]
  }
]

// 角色权限列表
export const AUTHORITYP_LIST = [
  {
    id: 1,
    name: '系统管理员',
    icon: 'manager'
  },
  {
    id: 2,
    name: '审计员',
    icon: 'auditor'
  },
  {
    id: 3,
    name: '安全管理员',
    icon: 'securityAdministrator'
  },
  {
    id: 4,
    name: '部门负责人',
    icon: 'departmentHead'
  },
  {
    id: 5,
    name: '项目经理',
    icon: 'projectManager'
  },
  {
    id: 8,
    name: '部门安全管理员',
    icon: 'departmentSecurityAdministrator'
  },
  {
    id: 6,
    name: '研发人员',
    icon: 'developer'
  },

  {
    id: 7,
    name: '测试人员',
    icon: 'tester'
  },
  {
    id: 9,
    name: '业务负责人',
    icon: 'leader'
  },
  {
    id: 10,
    name: '运维人员',
    icon: 'operationsStaff'
  }
]

// -------- 漏洞管理 --------
// 漏洞状态
export const VULN_STATUS_LIST = [
  { label: '检查中', value: 1 },
  { label: '修复中', value: 2 },
  { label: '复测中', value: 3 },
  { label: '已修复', value: 4 },
  { label: '已忽略', value: 5 },
  { label: '确认中', value: 6 },
  { label: '已延期', value: 7 }
]

export const MAP_STATUS_COLOR: Readonly<any> = {
  检查中: '#F15A24',
  修复中: '#00E31B',
  复测中: '#0283FF',
  已修复: '#ACACAC',
  已忽略: '#ACACAC',
  确认中: '#FFBE15',
  已延期: '#D8D8D8'
}

export const MAP_STATUS_CHART: Readonly<any> = {
  未完成: '#FFBE15',
  已完成: '#00CC88',
  已延期: '#DD3E3E',
  确认中: '#ADDCFF'
}

export const MAP_VULN_STATUS_COLOR: Readonly<any> = {
  检查中: '#F15A24',
  未修复: '#FFBE15',
  已延期: '#DD3E3E',
  已修复: '#00CC88',
  已忽略: '#CCCCCC'
}

export const MAP_VULN_STATUS = genMapObject(VULN_STATUS_LIST)

export const MAP_RISKCODE_STATUS: Record<number, string> = {
  1: '检查中',
  2: '未修复',
  3: '已延期',
  4: '已修复',
  5: '已忽略'
}

export enum E_VULN_STATUS {
  '检查中' = 1,
  '修复中',
  '复测中',
  '已修复',
  '已忽略',
  '确认中',
  '已延期'
}

export enum E_VULN_DESC {
  '描述信息' = 1,
  '忽略原因',
  '拒绝原因',
  '延期原因'
}

export const MAP_VULN_STATUS_ENGLISH: Record<string, string> = {
  检查中: 'checking',
  修复中: 'repair',
  复测中: 'retest',
  已修复: 'fixed',
  已忽略: 'ignore',
  确认中: 'confirming',
  已延期: 'delay'
}

// 漏洞状态颜色
export const LEAK_RISKCODE_COLOR: Record<number, string> = {
  1: '#F15A24',
  2: '#FFBE15',
  3: '#DD3E3E',
  4: '#00CC88',
  5: '#CCCCCC'
}

// 漏洞状态颜色
export const LEAK_STATUS_COLOR: Record<number, string> = {
  1: '#F15A24',
  2: '#00E31B',
  3: '#0283FF',
  4: '#ACACAC',
  5: '#ACACAC',
  6: '#FFBE15',
  7: '#D8D8D8'
}

// 手动录入列表录入状态
export const LEAK_IMPORT_STATUS_COLOR: Record<number, string> = {
  1: '#ACACAC',
  2: '#26C9D8',
  3: '#DD3E3E'
}

// 漏洞等级
export const VULN_LEVEL_LIST = [
  { label: '高危', value: 4 },
  { label: '中危', value: 3 },
  { label: '低危', value: 2 },
  { label: '提示', value: 1 }
]

// 漏洞检测类型
export const VULN_DETECTION_TYPE_LIST = [
  { label: 'SCA', value: 1 },
  { label: 'SAST', value: 2, disabled: true },
  { label: 'IAST', value: 3 },
  { label: 'DAST', value: 4, disabled: true },
  { label: 'checkmax.sast', value: 5, disabled: true },
  { label: 'tenable.sc', value: 6, disabled: true },
  { label: '手动录入', value: 99 }
]

export const MAP_VULN_DETECTION_TYPE = genMapObject(VULN_DETECTION_TYPE_LIST)

export const MAP_LEVEL: Readonly<any> = {
  high: '高危',
  middle: '中危',
  mid: '中危',
  low: '低危',
  warn: '提示',
  safe: '无',
  noRisk: '安全',
  高危: 'high',
  中危: 'middle',
  低危: 'low',
  提示: 'warn',
  无: 'safe',
  安全: 'safe',
  无风险: 'safe',
  暂无风险: 'safe'
}

export const MAP_ACTIVE_VALID_RESULT: Record<number, Record<string, string>> = {
  0: { label: '未验证', className: 'notVerified' },
  1: { label: '验证成功', className: 'success' },
  2: { label: '验证异常', className: 'abnormal' },
  3: { label: '存在过滤', className: 'filtered' },
  4: { label: '未验证', className: 'notVerified' }
}

// --------------------------- 报告管理 -----------------------------
// 报告类型
export const REPORT_TYPE_LIST = [
  { label: '项目报告', value: 1 },
  { label: '引擎报告', value: 2 },
  { label: '任务报告', value: 3 },
  { label: '报表', value: 4 }
]

export const REPORT_STATUS_LIST = [
  { label: '生成中', value: 1 },
  { label: '生成成功', value: 2 },
  { label: '生成失败', value: 3 },
  { label: '已过期', value: 4 }
]

// --------------------------- 项目管理 -----------------------------
export const RIST_GRADE_LIST = [
  { label: '高危', value: 1 },
  { label: '中危', value: 2 },
  { label: '低危', value: 3 },
  { label: '安全', value: 4 }
]

export const MAP_DEMAND_LEVEL_COLOR: Readonly<any> = {
  紧急: '#B90000',
  5: '#B90000',
  高: '#DD3E3E',
  4: '#DD3E3E',
  中: '#F15A24',
  3: '#F15A24',
  低: '#FFBE15',
  2: '#FFBE15',
  建议: '#ADDCFF',
  1: '#ADDCFF'
}

export const MAP_DEMAND_LEVEL: Record<number, string> = {
  5: '紧急',
  4: '高',
  3: '中',
  2: '低',
  1: '建议'
}

export const MAP_DEMAND_BGC_COLOR: Record<number, string> = {
  5: 'rgba(185,0,0,0.25)',
  4: 'rgba(221,62,62,0.26)',
  3: 'rgba(241,90,36,0.20)',
  2: 'rgba(255,190,21,0.25)',
  1: 'rgba(173,220,255,0.25)'
}

export const MAP_DEMAND_STATUS_COLOR: Readonly<any> = {
  已完成: '#00CC88',
  未完成: '#FFBE15',
  延期中: '#DD3E3E',
  确认中: '#ADDCFF'
}

export const CASE_STATUS = [
  { label: '未通过', value: 1 },
  { label: '未完成', value: 2 },
  { label: '已通过', value: 3 }
]

export const LIBRARY_LANGUAGE_TYPE = [
  { label: '全部', value: '' },
  { label: 'JAVA', value: 1 },
  { label: 'C/C++', value: 2 },
  { label: 'C#', value: 4 },
  { label: 'PYTHON', value: 9 },
  { label: 'GOLANG', value: 10 },
  { label: 'JavaScript', value: 8 },
  { label: 'PHP', value: 7 }
]

export const TEST_CONNECT_CATEGORY = [
  { label: '关联安全需求', value: 1 },
  { label: '关联安全设计', value: 2 }
]

export const LIBRARY_RISK_TYPE = [
  { label: '全部', value: '' },
  { label: '存在漏洞', value: 1 },
  { label: '非最新版', value: 2 },
  { label: '许可证风险', value: 3 }
]
export const UPLOAD_FORMAT = [
  { label: 'WORD', value: 1 },
  { label: 'EXCEL', value: 2 }
]

export const LEAK_RISK_LEVEL = [
  { label: '全部', value: '' },

  { label: '高危', value: 4 },
  { label: '中危', value: 3 },
  { label: '低危', value: 2 },
  { label: '提示', value: 1 },
  { label: '安全', value: 0 }
]

export enum E_LEVEL_WITH_SAFETY {
  '安全' = 0,
  '提示' = 1,
  '低危' = 2,
  '中危' = 3,
  '高危' = 4
}

export const CODE_URL_TYPE = [
  { label: 'git(https)', value: 0 },
  { label: 'git(ssh)', value: 1 },
  { label: 'SVN', value: 2 },
  { label: 'TFS', value: 4 },
  { label: 'mercurial(https)', value: 5 },
  { label: 'mercurial(SSH)', value: 6 },
  { label: '上传代码', value: 3 }
]
export const MISSION_STATE = [
  { label: '排队中', value: 1 },
  { label: '扫描中', value: 2 },
  { label: '扫描完成', value: 3 },
  { label: '扫描异常', value: 4 },
  { label: '扫描中断', value: 5 }
]
export const GET_CODE_WAY = [
  { label: 'GIT(HTTPS)', value: 0 },
  { label: 'GIT(SSH)', value: 1 },
  { label: 'SVN', value: 2 },
  { label: 'TFS', value: 4 },
  { label: 'MERCURIAL(HTTPS）', value: 5 },
  { label: 'MERCURIAL(SSH)', value: 6 },
  { label: '上传代码', value: 3 }
]
export const RISK_STAGE = [
  { label: '高危', value: 1 },
  { label: '中危', value: 2 },
  { label: '低危', value: 3 },
  { label: '安全', value: 4 }
]

export const CODE_TYPE = [
  { label: 'JAVA', value: 1 },
  { label: 'PYTHON', value: 9 },
  { label: 'PHP', value: 7 },
  { label: 'C/C++', value: 2 },
  { label: 'Golang', value: 10 },
  { label: 'C#', value: 4 },
  { label: 'JavaScript', value: 8 }
]

export const EMPTY_TEXT = '-'

// 项目资产
export const PROJECT_ASSET_CATEGORY = [
  { label: '代码仓库正式地址', value: 1 },
  { label: '代码仓库测试地址', value: 2 },
  { label: '预发布URL地址', value: 3 },
  { label: '生产URL地址', value: 4 },
  { label: '测试环境IP地址', value: 5 },
  { label: '生产环境IP地址', value: 6 }
]

export const LEAK_LIST_RISK_LEVEL = [
  { label: '高危', value: 4 },
  { label: '中危', value: 3 },
  { label: '低危', value: 2 },
  { label: '提示', value: 1 }
]
export const LISCENSE_LEVEL_LIST = [
  { label: '高危', value: 4 },
  { label: '中危', value: 3 },
  { label: '安全', value: 0 }
]

// checkmarx

export const SAST_TASK_TYPE = [
  { label: '扫描中', value: 1 },
  { label: '已完成', value: 2 },
  { label: '扫描异常', value: 3 }
]

export enum SAST_UPLOAD_TYPE_ENUM {
  其他方式 = 0,
  上传代码
}

export const MAP_TASK_STATUS: Record<string, string> = {
  扫描完成: '#00CC88',
  扫描异常: '#DD3E3E'
}

// 需求响应等级
export const DEMAND_RESPONSE_LEVEL_LIST = [
  { label: '紧急', value: 5 },
  { label: '高', value: 4 },
  { label: '中', value: 3 },
  { label: '低', value: 2 },
  { label: '建议', value: 1 }
]

export const DEMAND_STATUS = [
  { label: '未完成', value: 1 },
  { label: '确认中', value: 2 },
  { label: '延期中', value: 3 },
  { label: '已完成', value: 4 }
]

export const DEMAND_LEVEL = [
  { label: '紧急', value: 5 },
  { label: '高', value: 4 },
  { label: '中', value: 3 },
  { label: '低', value: 2 },
  { label: '建议', value: 1 }
]

export enum DEMAND_STATUS_ENUM {
  未完成 = 1,
  确认中,
  延期中,
  已完成
}

export enum DEMAND_SOURCE_ENUM {
  报告上传 = 1,
  基线需求同步
}

// 策略组使用状态
export const FORBIDDEN_COLOR: { [k: number]: string } = {
  0: '#00D4BE',
  1: '#D14B4B',
  2: '#666'
}
export const PLUG_VULN_LEVEL = [
  { label: '高危', value: 4 },
  { label: '中危', value: 3 },
  { label: '低危', value: 2 },
  { label: '提示', value: 1 }
]
export const MAP_REPORT_STATUS = genMapObject(REPORT_STATUS_LIST)

export const CHART_COLORS = ['#0e6de9', '#cc5252', '#31cc98', '#7f64ff', '#ddae1e']
// TENABLE
export const REMOVE_DEAD_DAYS = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 30, value: 30 },
  { label: 60, value: 60 },
  { label: 90, value: 90 },
  { label: 365, value: 365 }
]

export const TENABLE_MAP_COLOR: Record<string, string> = {
  扫描完成: '#00CC88',
  已超时: '#DD3E3E'
}

export const CHOOSE_SCAN_WEEK = [
  { label: '第一周', value: 1 },
  { label: '第二周', value: 2 },
  { label: '第三周', value: 3 },
  { label: '第四周', value: 4 },
  { label: '最后一周', value: 5 }
]

export const chooseDay = [
  { text: '周一', value: 1 },
  { text: '周二', value: 2 },
  { text: '周三', value: 3 },
  { text: '周四', value: 4 },
  { text: '周五', value: 5 },
  { text: '周六', value: 6 },
  { text: '周日', value: 7 }
]

export const CHOOSE_BTN_LIST = [
  { label: '周一', value: 'MO' },
  { label: '周二', value: 'TU' },
  { label: '周三', value: 'WE' },
  { label: '周四', value: 'TH' },
  { label: '周五', value: 'FR' },
  { label: '周六', value: 'SA' },
  { label: '周日', value: 'SU' }
]
export const WEEK_LIST = [
  { label: '周一', value: 'Monday' },
  { label: '周二', value: 'Tuesday' },
  { label: '周三', value: 'Wednesday' },
  { label: '周四', value: 'Thursday' },
  { label: '周五', value: 'Friday' },
  { label: '周六', value: 'Saturday' },
  { label: '周日', value: 'Sunday' }
]

export const MATCH_SCAN_PLAN: Record<string, string> = {
  now: '立即扫描',
  once: '单次扫描',
  daily: '每天扫描',
  weekly: '每周扫描',
  monthly: '每月扫描',
  demand: '按需扫描',
  dependent: '依赖扫描'
}

export const MATCH_SCAN_STATUS: Record<string, string> = {
  Scanning: '扫描中',
  Completed: '已完成',

  Error: '扫描异常'
}

export const MATCH_TIME_OUT: Record<string, string> = {
  rollover: '导入已完成的结果并创建滚动扫描',
  import: '导入已完成结果',
  discard: '不导入扫描结果'
}

export const MAP_SCAN_STATUS = [
  { label: '扫描中', value: 1 },
  { label: '已完成', value: 2 },
  { label: '扫描异常', value: 3 }
]

// iast

export const COVER_STATUS_LIST: MS.optionList = [
  { label: '全部', value: -1 },
  { label: '已请求', value: 0 },
  { label: '未请求', value: 1 }
]

export const MAP_STATUS = {
  0: {
    label: '未请求',
    className: 'un_request'
  },
  1: {
    label: '已请求',
    className: 'requested'
  }
} as any

export const STATUS_GROUP_FLOW = [
  { label: '运行中', value: 0 },
  { label: '暂停', value: 1 },
  { label: '离线', value: 2 }
]

export enum E_AGENT_STATUS {
  运行中 = 0,
  暂停,
  离线
}

// --------------------------- 日志审计 -----------------------------
// 事件类型
export const AUDITS_EVENT_TYPE_LIST = [
  // 用户管理
  { label: '用户登入', value: 1 },
  { label: '用户登出', value: 2 },
  // 项目管理
  { label: '新建项目', value: 3 },
  { label: '编辑项目', value: 4 },
  { label: '删除项目', value: 5 },
  // 任务管理
  { label: '新建任务', value: 6 },
  { label: '删除任务', value: 7 },
  { label: '重新扫描', value: 8 },
  { label: '停止扫描', value: 9 },
  // 漏洞管理
  { label: '转派漏洞', value: 10 },
  // { label: '忽略漏洞', value: 11 },
  // { label: '恢复漏洞', value: 12 },
  { label: '录入漏洞', value: 13 },
  { label: '删除录入记录', value: 14 },
  { label: '编辑漏洞', value: 15 },
  { label: '添加评论', value: 16 },
  { label: '删除评论', value: 17 },
  { label: '添加工作日志', value: 18 },
  { label: '删除工作日志', value: 19 },
  // 报告管理
  { label: '导出报告', value: 20 },
  { label: '文件下载', value: 21 },
  { label: '文件包导出', value: 22 },
  { label: '文件删除', value: 23 },
  // 安全知识库
  { label: '录入问题', value: 24 },
  { label: '编辑问题', value: 25 },
  { label: '删除问题', value: 26 },
  // 引擎管理
  { label: '新建引擎', value: 27 },
  { label: '编辑引擎', value: 28 },
  { label: '删除引擎', value: 29 },
  // 组织和用户管理
  { label: '修改密码', value: 30 },
  { label: '新增用户', value: 31 },
  { label: '编辑用户', value: 32 },
  { label: '删除用户', value: 33 },
  { label: '关联引擎账号', value: 34 },
  { label: '新建部门', value: 35 },
  { label: '编辑部门', value: 36 },
  { label: '删除部门', value: 37 },
  { label: '更改自定义配置', value: 38 },
  // 待办管理
  { label: '发布通告', value: 39 },
  { label: '删除通告', value: 40 },
  { label: '删除已办', value: 41 }
]

// 事件结果
export const AUDITS_EVENT_RESUTL_LIST = [
  { label: '成功', value: 1 },
  { label: '失败', value: 2 }
]

// --------------------------- 我的待办 -----------------------------
export const TODO_EVENT_TYPE_LIST = [
  { label: '项目安全需求处理', value: 1 },
  { label: '测试用例处理', value: 2 },
  { label: '漏洞处理', value: 3 }
]
