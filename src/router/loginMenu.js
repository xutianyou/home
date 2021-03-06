const menu = [
  {
    label: '简历',
    name: 'ProjectBrief',
    path: '/project-brief',
    icon: 'icon-resume'
  },
  {
    label: '开发工具',
    icon: 'icon-tool',
    children: [
      {
        label: 'API',
        name: 'ToolAPI',
        path: '/tool/api'
      }
    ]
  }, 
  {
    label: '项目文档',
    icon: 'icon-file',
    children: [
      {
        label: '路由配置',
        name: 'RoutingConfiguration',
        path: '/file/routing-configuration'
      },
      {
        label: '多主题一键切换',
        name: 'ThemeSwitch',
        path: '/file/theme-switch'
      },
      {
        label: '屏幕自适应',
        name: 'ScreenAdaptation',
        path: '/file/screen-adaptation'
      },
      {
        label: 'style-deep',
        name: 'StyleDeep',
        path: '/file/style-deep'
      },
      {
        label: '全局less',
        name: 'GlobalLess',
        path: '/file/global-less'
      }
    ]
  }, 
  {
    label: '组件',
    icon: 'icon-warehouse',
    children: [
      {
        label: '复制xlsx表格数据',
        name: 'CopyData',
        path: '/components/copy-data'
      },
      {
        label: '拖拽指令',
        name: 'DirectiveDrag',
        path: '/components/directive-drag'
      }
    ]
  },
  {
    label: 'element',
    icon: 'icon-word',
    children: [
      {
        label: '下拉框',
        name: 'ElementSelect',
        path: '/element/select'
      }, 
      {
        label: '表格',
        name: 'ElementTable',
        path: '/element/table'
      }, 
      {
        label: '主题',
        name: 'ElementTheme',
        path: '/element/theme'
      }
    ]
  }, 
  {
    label: 'echarts',
    icon: 'icon-chart',
    children: [
      {
        label: '柱状图',
        name: 'EchartsBar',
        path: '/echarts/bar'
      }
    ]
  }, 
  {
    label: '卡片',
    icon: 'icon-shuzihua',
    children: [
      {
        label: '卡片数据录入',
        name: 'CardData',
        path: '/card/data'
      },
      {
        label: '创建卡片',
        name: 'CardAdd',
        path: '/card/add'
      }
    ]
  }
]
export default menu