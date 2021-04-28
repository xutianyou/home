const menu = [
	{
		label: '简历',
		name: 'ProjectBrief',
		path: '/project-brief',
		icon: 'el-icon-platform-eleme'
	},
	{
		label: '开发工具',
		icon: 'el-icon-thumb',
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
		icon: 'el-icon-document',
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
		icon: 'el-icon-brush',
    children: [
      {
				label: '复制xlsx表格数据',
				name: 'CopyData',
        path: '/components/copy-data'
      }
    ]
  },
	{
		label: 'element',
		icon: 'el-icon-brush',
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
		icon: 'el-icon-coffee-cup',
		children: [
			{
				label: '柱状图',
				name: 'EchartsBar',
				path: '/echarts/bar'
			}
		]
	}
]
export default menu