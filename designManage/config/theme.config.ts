const defaultHeight = '32px'
const primaryColor = '#1890ff'

export default {
  // common
  '@text-color': '#333',
  '@border-radius-base': '4px',
  // '@primary-color': '#1890ff',

  // Colors
  '@info-color': '#0383ff',
  '@success-color': '#10c032',
  '@warning-color': '#ff9000',
  '@error-color': '#ff6d6d',
  '@padding-xs': '12px',
  // modal
  '@modal-header-bg': '#EDF3FF',
  '@modal-heading-color': '#333',
  '@modal-header-padding-vertical': '15px',
  '@modal-header-padding-horizontal': '24px',
  '@modal-body-padding': '24px 24px 32px',
  '@modal-confirm-body-padding': '32px 24px !import',

  // menu
  '@menu-collapsed-width': '60px',
  // horizontal
  '@menu-horizontal-line-height': '72px',
  '@menu-item-padding': '0 20px',
  '@menu-item-active-border-width': '0',
  // '@menu-popup-bg': '#fff',
  '@menu-item-boundary-margin': '0',
  // light theme
  '@menu-bg': '#fff',
  '@menu-item-color': '#333',
  '@menu-highlight-color': primaryColor,
  '@menu-inline-submenu-bg': '#fff',
  '@menu-item-active-bg': '#e5f3fd',

  // dark theme
  '@menu-dark-color': '#ccc',
  '@menu-dark-bg': '#2a3146',
  '@menu-dark-inline-submenu-bg': '#2a3146',
  '@menu-dark-highlight-color': '#fff',
  '@menu-dark-item-active-bg': primaryColor,
  // form
  '@form-item-margin-bottom': '24px',
  '@input-disabled-bg': '#fff',
  '@input-disabled-color': '#ccc',
  // button
  '@btn-height-base': defaultHeight,
  '@btn-shadow': 'none',
  '@btn-primary-shadow': 'none',
  '@btn-text-shadow': 'none',
  // input
  '@input-height-base': defaultHeight,

  // card

  // alert
  '@alert-success-border-color': '#e2f3e5',
  '@alert-success-bg-color': '#e2f3e5',
  '@alert-success-icon-color': '#10c032',
  '@alert-info-border-color': '#EDF3FF',
  '@alert-info-bg-color': '#EDF3FF',
  '@alert-info-icon-color': '#9196a6',
  '@alert-warning-border-color': '#faeee0',
  '@alert-warning-bg-color': '#faeee0',
  '@alert-warning-icon-color': '#ff9000',
  '@alert-error-border-color': '#f8e0e0',
  '@alert-error-bg-color': '#f8e0e0',
  '@alert-error-icon-color': '#ef0000',
  '@alert-message-color': '#333',
  // Table
  // --
  '@table-bg': '#fff',
  '@table-header-bg': '#F2F4F8',
  '@table-header-color': '#000',
  '@table-row-hover-bg': '#F2F4F8',

  // Switch
  // ---
  '@switch-height': '20px',
  '@switch-sm-height': '16px',
  '@switch-min-width': '40px',
  '@switch-sm-min-width': '28px',
  '@switch-padding': '2px',
  // Pagination
  // ---
  '@pagination-item-bg': '#fff',
  '@pagination-item-size': '28px',
  '@pagination-item-size-sm': '24px',
  '@pagination-item-bg-active': '#fff',
  // Divider
  '@divider-orientation-margin': '8px',
  '@divider-color': primaryColor,
  // Tabs
  // ---
  '@tabs-card-head-background': '#fff',
  '@tabs-card-height': '48px',
  '@tabs-card-horizontal-padding': '12px 28px',
  '@tabs-card-tab-active-border-top': `2px solid ${primaryColor}`,

  // 下面的为项目自定义变量
  // 为了防止与 antd 冲突，变量名必须以 ms 开头
  'ms-primary-color': primaryColor,
  'ms-background-color': '#e1f7f8',
  'ms-steps-color': '#ddd',

  'ms-border-color': '#e7ecf1',
  'ms-text-color': '#333',

  'ms-white': '#fff',
  'ms-gray': '#666',
  'ms-blue': '#337ab7',

  'ms-level-serious': '#ad194e',
  'ms-level-high': '#ff1939',
  'ms-level-middle': '#ff6f39',
  'ms-level-low': '#f5d70d',
  'ms-level-common': '#199bff',

  'ms-blue-button-color': '#5e9fe9',
  'ms-blue-button-hover-color': '#1c72d5'
}
