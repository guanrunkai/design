import { useMemo } from 'react'
import { IFuncItem, IUser, useSelector } from 'umi'
import { IConnectState } from '@/models/connect'

export type IAccessKey = keyof ReturnType<typeof useAccess>

/**
 * 判断当前用户是否拥有权限
 * @param permList 对应模块的权限列表
 * @param funcId 权限值
 * @returns boolean
 */
function hasPerms(permList: IFuncItem[] = [], funcId: number) {
  return !!permList.find(v => v.funcId === funcId)?.flag
}

const selector = ({ user }: IConnectState) => ({ user })

/**
 * @example
 * ```jsx
 * import React from 'react'
 * import useAccess from '@/hooks/useAccess'
 *
 * function RoleComp () {
 * const { canEditRole } = useAccess()
 *
 *  return <>
 *    {canEditRole && <Button>编辑权限</Button>}
 *  </>
 * }
 * ```
 *
 * @param propsUserInfo 用户信息
 * @returns {} 权限列表
 */
function useAccess(propsUserInfo?: IUser) {
  const { user } = useSelector(selector)
  const userInfo = propsUserInfo || user.userInfo
  const { funcList = [] } = userInfo

  const permsMap = useMemo(
    () =>
      funcList.reduce(
        (res: { [k: string]: IFuncItem[] }, v) => ({ ...res, [v.moduleName]: v.sub }),
        {}
      ),
    [funcList]
  )

  const accessResult = useMemo(() => {
    const result = {
      // ------ 个人信息 ------
      canViewProfile: hasPerms(permsMap['个人信息'], 1), // 查看

      // ------ 首页大屏 ------
      canViewDashboard: hasPerms(permsMap['首页大屏'], 2), // 查看

      // ------ 项目管理 ------
      canViewProject: hasPerms(permsMap['项目管理'], 3), // 查看
      canCreateProject: hasPerms(permsMap['项目管理'], 4), // 新建项目
      canEditProject: hasPerms(permsMap['项目管理'], 5), // 编辑项目
      canEditRiskProject: hasPerms(permsMap['项目管理'], 6), // 编辑项目风险指标
      canEditTaskRiskProject: hasPerms(permsMap['项目管理'], 7), // 编辑任务风险指标
      canCreateSCATask: hasPerms(permsMap['项目管理'], 8), // 新建SCA扫描任务
      canCreateSASTTask: hasPerms(permsMap['项目管理'], 9), // 新建SAST扫描任务
      canCreateIASTTask: hasPerms(permsMap['项目管理'], 10), // 新建IAST扫描
      canCreateDASTTask: hasPerms(permsMap['项目管理'], 11), // 新建哨兵扫描任务
      canCreateTenableTask: hasPerms(permsMap['项目管理'], 12), // 新建tenable.sc扫描任务
      canCreateCheckmarkTask: hasPerms(permsMap['项目管理'], 13), // 新建checkmarx.sast扫描任务
      canStartTask: hasPerms(permsMap['项目管理'], 14), // 开始扫描
      canRescanTask: hasPerms(permsMap['项目管理'], 15), // 重新扫描
      canManagingSecurityRequirements: hasPerms(permsMap['项目管理'], 48), // 管理安全需求
      canImportSecurityRequirements: hasPerms(permsMap['项目管理'], 49), // 导入安全需求
      canAssignSecurityTestCases: hasPerms(permsMap['项目管理'], 50), // 分配安全测试用例

      // ------ 漏洞管理 ------
      canViewLeak: hasPerms(permsMap['漏洞管理'], 16), // 查看
      canTransferLeak: hasPerms(permsMap['漏洞管理'], 17), // 漏洞转派
      canEditLeak: hasPerms(permsMap['漏洞管理'], 18), // 编辑漏洞
      canImportLeak: hasPerms(permsMap['漏洞管理'], 19), // 手动录入

      // ------ 报告管理 ------
      canViewReport: hasPerms(permsMap['报告管理'], 20), // 查看
      canCreateReport: hasPerms(permsMap['报告管理'], 21), // 生成报告
      canDownloadReport: hasPerms(permsMap['报告管理'], 22), // 下载
      canDelReport: hasPerms(permsMap['报告管理'], 23), // 删除
      canBatchExportReport: hasPerms(permsMap['报告管理'], 24), // 批量导出
      canBatchDelReport: hasPerms(permsMap['报告管理'], 25), // 批量删除

      // ------ 我的待办 ------
      // canViewTodo: hasPerms(permsMap['我的待办'], 26), // 查看
      // canEditTodo: hasPerms(permsMap['我的待办'], 27), // 办理
      // canDelTodo: hasPerms(permsMap['我的待办'], 28), // 删除
      // canBatchDelTodo: hasPerms(permsMap['我的待办'], 29), // 批量删除
      canCreateTodo: hasPerms(permsMap['我的待办'], 30), // 新建通告
      canDelNotion: hasPerms(permsMap['我的待办'], 31), // 删除通告

      // ------ 安全知识库 ------
      canViewKnownledge: hasPerms(permsMap['安全知识库'], 32), // 查看
      canImportKnownledge: hasPerms(permsMap['安全知识库'], 33), // 录入问题
      canEditKnownledge: hasPerms(permsMap['安全知识库'], 34), // 编辑问题
      canDelKnownledge: hasPerms(permsMap['安全知识库'], 35), // 删除问题

      // ------ 系统配置 ------
      canEditRole: hasPerms(permsMap['系统配置'], 36), // 编辑角色
      canViewUserManage: hasPerms(permsMap['系统配置'], 37), // 用户管理
      canViewDepManage: hasPerms(permsMap['系统配置'], 38), // 组织管理
      canViewEngineManage: hasPerms(permsMap['系统配置'], 39), // 引擎配置
      canViewSystemInfo: hasPerms(permsMap['系统配置'], 40), // 系统信息
      canViewNotify: hasPerms(permsMap['系统配置'], 41), // 消息通知
      canViewUserRole: hasPerms(permsMap['系统配置'], 42), // 查看角色权限
      canViewCustom: hasPerms(permsMap['系统配置'], 43), // 自定义配置
      canViewAuthConfig: hasPerms(permsMap['系统配置'], 46), // 授权配置
      canViewSecurityRequirements: hasPerms(permsMap['系统配置'], 47), // 基线安全需求配置

      // ------ 日志审计 ------
      canViewAudits: hasPerms(permsMap['日志审计'], 44), // 查看
      canDownloadAudits: hasPerms(permsMap['日志审计'], 45) // 下载日志

      // ------ 数据权限 ------
      // canViewRelatedData: dataPermission === 1, // 查看相关数据
      // canViewDepData: dataPermission === 2, // 查看部门数据
      // canViewAllData: dataPermission === 3 // 查看所有数据
    }

    return result
  }, [permsMap])

  return accessResult
}

export default useAccess
