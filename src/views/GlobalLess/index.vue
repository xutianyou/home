<template>
<el-scrollbar class="c-scrollbar">
  <div class="file-css global-less">
    <el-card shadow="always">
      <div slot="header">
        <h1>全局less</h1>
      </div>

      <p>运用场景: </p>
      <p>好处: 统一控制项目样式，方便管理，全局修改</p>
			<p>原理: </p>

			<h2>配置全局base.less文件</h2>
			<p>vue.config.js文件配置</p>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="false"
        v-model="textarea">
      </el-input>

			<p>base.less写入所有颜色样式</p>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="false"
        v-model="textarea1">
      </el-input>

    </el-card>
  </div>
</el-scrollbar>
</template>

<script>
export default {
  name: 'GlobalLess',
  data() {
    return {
			textarea: "const path = require(‘path’)\n\nmodule.exports = {\n  chainWebpack: config => {\n    const types = [‘vue-modules’, ‘vue’, ‘normal-modules’, ‘normal’]\n    types.forEach(type => addStyleResource(config.module.rule(‘less’).oneOf(type)))\n  }\n}\n\nfunction addStyleResource (rule) {\n  rule.use(‘style-resource’)\n    .loader(‘style-resources-loader’)\n    .options({\n      patterns: [\n        path.resolve(__dirname, ‘./src/assets/less/base.less’),\n      ],\n    })\n}",
			textarea1: '@textPrimary: #303133; // 主要文字颜色\n@textRegular: #606266; // 常规文字颜色\n@textSecondary: #909399; // 次要文字颜色\n@textWarning: #dc3023; // 文字警告色\n@textPlaceholder: #C0C4CC; // 占位文字颜色\n@ColorWhite: #FFFFFF;\n@ColorBlack: #000000;\n\n@borderBase: #DCDFE6; //一级边框颜色\n@borderLight: #E4E7ED; //二级边框颜色\n@borderLighter: #EBEEF5; //三级边框颜色\n@borderExtraLight: #F2F6FC; //四级边框颜色\n\n@backgroundMenu: #FFF; //导航菜单背景颜色\n@backgroundBase: #F5F7FA; // 基础背景色\n@backgroundFont: #0caae9; // 文字背景色'
		}
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/documents.less";
</style>

