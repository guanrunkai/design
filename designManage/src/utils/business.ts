/**
 * 获取权限控制方法
 * 包含关系：权限列表中是否有所需权限（交集）
 * 排除关系：排除所需权限外权限列表是否有其他权限（差集）
 * @param roleIds 权限列表（具有权限的用户ID列表）
 * @param target 所需权限（页面展示所需要的权限）
 * @param exclude 包含/排除
 * @returns {boolean} 用户是否拥有权限
 */
export function hasRole(roleIds: number[], target: number[] | undefined, exclude = false) {
  // const currentPlatformRoleIds = getCurrentPlatformRoleIds(roleIds)
  if (!exclude) return !!intersection(roleIds, target || []).length
  return !!difference(roleIds, target || []).length
}

function intersection(roleIds: number[], target: number[]) {
  return roleIds.filter(v => target.includes(v))
}

function difference(roleIds: number[], target: number[]) {
  return roleIds.filter(v => !target.includes(v))
}
