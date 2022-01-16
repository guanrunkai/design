export interface IRoute {
  group?: boolean
  path?: string
  title?: string
  children?: IRoute[]
  active?: string
  component?: string
  breadcrumb?: string
  exclude?: number[]
  noShowInMenu?: boolean
  routes?: IRoute[]
  redirect?: string
  exact?: boolean
  wrappers?: string[]
  subMenu?: boolean
  accessKey?: string | string[]
}

export const menuRoutesData: IRoute[] = [
  {
    path: '/dashboard',
    title: '安全大屏',
    active: 'dashboard',
    component: './dashboard',
    breadcrumb: '/dashboard',
    accessKey: 'canViewProfile',
    wrappers: ['../wrappers/auth']
  },
  {
    path: '/project',
    title: '项目管理',
    active: 'project',
    breadcrumb: '/project',
    accessKey: 'canViewProject',
    wrappers: ['../wrappers/auth'],
    routes: [
      {
        path: '/project',
        redirect: '/project/list',
        noShowInMenu: true
      },
      {
        path: '/project/list',
        title: '项目列表',
        active: 'leak',
        // component: './project',
        breadcrumb: '/list',
        accessKey: 'canViewProject',
        wrappers: ['../wrappers/auth']
      },
      
    ]},
  {
    path: '/leak',
    title: '漏洞管理',
    active: 'leak',
    breadcrumb: '/leak',
    accessKey: 'canViewLeak',
    wrappers: ['../wrappers/auth'],
    routes: [
      // {
      //   path: '/leak',
      //   redirect: '/leak/list',
      //   noShowInMenu: true
      // },
      // {
      //   path: '/leak/list',
      //   title: '漏洞列表',
      //   active: 'leak',
      //   // component: './leak',
      //   breadcrumb: '/list',
      //   accessKey: 'canViewLeak',
      //   wrappers: ['../wrappers/auth']
      // },
      // {
      //   path: '/leak/import_leak',
      //   title: '手动录入漏洞',
      //   active: 'leak',
      //   // component: './leak/ImportLeak',
      //   breadcrumb: '/import_leak',
      //   accessKey: 'canImportLeak',
      //   wrappers: ['../wrappers/auth']
      // },
      // {
      //   path: '/leak/leak_detail',
      //   title: '漏洞详情',
      //   active: 'leak',
      //   // component: './leak/LeakDetail',
      //   breadcrumb: '/leak_detail',
      //   accessKey: 'canViewLeak',
      //   wrappers: ['../wrappers/auth']
      // }
    ]
  },
  // {
  //   path: '/knowledge',
  //   title: '安全知识库',
  //   active: 'knowledge',
  //   breadcrumb: '/knowledge',
  //   accessKey: 'canViewKnownledge',
  //   wrappers: ['../wrappers/auth'],
  //   routes: [
  //     {
  //       path: '/knowledge',
  //       redirect: '/knowledge/list',
  //       noShowInMenu: true
  //     },
  //     {
  //       path: '/knowledge/list',
  //       title: '安全知识库',
  //       active: 'knowledge',
  //       component: './knowledge',
  //       breadcrumb: '/knowledge',
  //       accessKey: 'canViewKnownledge',
  //       wrappers: ['../wrappers/auth']
  //     },
  //     {
  //       path: '/knowledge/import',
  //       title: '录入问题',
  //       active: 'knowledge',
  //       component: './knowledge/Import',
  //       breadcrumb: '/import',
  //       accessKey: 'canImportKnownledge',
  //       wrappers: ['../wrappers/auth']
  //     }
  //   ]
  // },
  // {
  //   path: '/report',
  //   title: '报告管理',
  //   active: 'report',
  //   breadcrumb: '/report',
  //   component: './report',
  //   accessKey: 'canViewReport',
  //   wrappers: ['../wrappers/auth']
  // },
  // {
  //   path: '/audits',
  //   title: '日志审计',
  //   active: 'audits',
  //   component: './audits',
  //   breadcrumb: '/audits',
  //   accessKey: 'canViewAudits',
  //   wrappers: ['../wrappers/auth']
  // },
  {
    path: '/config',
    title: '系统配置',
    active: 'config',
    breadcrumb: '/config',
    subMenu: true,
    accessKey: [
      'canViewProfile',
      'canEditRole',
      'canViewUserManage',
      'canViewDepManage',
      'canViewEngineManage',
      'canViewSystemInfo',
      'canViewNotify',
      'canViewUserRole',
      'canViewCustom',
      'canViewAuthConfig'
    ],
    wrappers: ['../wrappers/auth'],
    routes: [
      {
        path: '/config',
        redirect: '/config/account',
        noShowInMenu: true
      },
    //   {
    //     path: '/config/account',
    //     title: '账号管理',
    //     active: 'config',
    //     component: './config/Account',
    //     breadcrumb: '/account'
    //   },
    //   {
    //     path: '/config/engine',
    //     title: '引擎配置',
    //     active: 'config',
    //     component: './config/Engine',
    //     breadcrumb: '/engine',
    //     accessKey: 'canViewEngineManage',
    //     wrappers: ['../wrappers/auth']
    //   },
    //   {
    //     path: '/config/info',
    //     title: '系统信息',
    //     active: 'config',
    //     component: './config/SystemInfo',
    //     breadcrumb: '/info',
    //     accessKey: 'canViewSystemInfo',
    //     wrappers: ['../wrappers/auth']
    //   },
    //   {
    //     path: '/config/notify',
    //     title: '消息通知',
    //     active: 'config',
    //     component: './config/Notify',
    //     breadcrumb: '/notify',
    //     accessKey: 'canViewNotify',
    //     wrappers: ['../wrappers/auth']
    //   },
    //   {
    //     path: '/config/custome',
    //     title: '自定义配置',
    //     active: 'config',
    //     component: './config/Custom',
    //     breadcrumb: '/custome',
    //     accessKey: 'canViewCustom',
    //     wrappers: ['../wrappers/auth']
    //   },
    //   {
    //     path: '/config/auth-config',
    //     title: '授权配置',
    //     active: 'config',
    //     component: './config/AuthConfig',
    //     breadcrumb: '/auth-config',
    //     accessKey: 'canViewAuthConfig',
    //     wrappers: ['../wrappers/auth']
    //   },
    //   {
    //     path: '/config/baseline-security-req',
    //     title: '基线安全需求',
    //     active: 'config',
    //     component: './config/BaselineSecurityReq',
    //     breadcrumb: '/baseline-security-req',
    //     accessKey: 'canViewSecurityRequirements',
    //     wrappers: ['../wrappers/auth']
    //   },
    //   {
    //     path: '/config/baseline-security-req/detail/:baseLineId',
    //     title: '需求详情',
    //     active: 'config',
    //     noShowInMenu: true,
    //     component: './config/DemandDetails',
    //     breadcrumb: '组件内部已自定义',
    //     accessKey: 'canViewAuthConfig',
    //     wrappers: ['../wrappers/auth']
    //   }
    ]
  },
  {
    path: '/help',
    title: '帮助中心',
    active: 'help',
    breadcrumb: '/help',
    component: './help'
  },

  // {
  //   path: '/notification',
  //   title: '我的待办',
  //   active: 'notification',
  //   component: './notification',
  //   breadcrumb: '/notification',
  //   noShowInMenu: true
  // },
  // {
  //   path: '/expire',
  //   title: '过期',
  //   component: './expire',
  //   noShowInMenu: true
  // },
  {
    path: '/500',
    title: '服务器内部错误',
    component: './500',
    noShowInMenu: true
  },
  {
    path: '/404',
    title: '找不到页面',
    component: './404',
    noShowInMenu: true
  }
]

export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      ...menuRoutesData,
      {
        path: '/login',
        component: './login',
        title: '登录'
      }
    ]
  }
]
