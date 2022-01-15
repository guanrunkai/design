const types = [
  {
    value: 'dev:html:',
    name: 'dev:html:（新功能开发，新feature开发(feature)）'
  },
  {
    value: 'bug:html:',
    name: 'bug:html:（修补bug）'
  },
  {
    value: 'opt:html:',
    name: 'opt:html:（代码重构、代码优化，既不是新增功能，也不是修改bug的代码变动）'
  },
  {
    value: 'util:html:',
    name: 'util:html:（安装、部署、构建、混淆、编译等辅助设施的变动）'
  },
  {
    value: 'doc:html:',
    name: 'doc:html:（添加文档、注释）'
  },
  {
    value: 'fmt:html:',
    name: 'fmt:html:（格式调整等不影响代码运行的变动(style/format)）'
  },
  {
    value: 'test:html:',
    name: 'test:html:（增加测试）'
  }
]

const scopes = [
  '项目总览',
  '项目管理',
  '风险列表',
  '软件成分',
  '报告管理',
  '账号管理',
  '系统配置',
  '日志审计',
  '帮助中心',
  '用户模块',
  'app',
  '项目配置'
]

const commitPrefix = types.map(item => item.value)

module.exports = {
  types,
  commitPrefix,
  scopes,
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer']
}
