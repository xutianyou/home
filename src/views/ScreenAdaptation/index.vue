<template>
<el-scrollbar>
  <div class="file-css screen-adaptation">
    <el-card class="screen-adaptation-card" shadow="always">
      <div slot="header">
        <h1>屏幕自适应</h1>
      </div>

      <h2>一、安装模块</h2>
      <p>npm install amfe-flexible postcss-px2rem -S</p>

      <h2>二、main.js里引入amfe-flexible</h2>
      <p>import "amfe-flexible";</p>   

      <h2>三、以下配置二选一即可</h2> 
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="textarea">
      </el-input>

      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="textarea2">
      </el-input>

      <h3>注:配置的remUnit设置为136.8（设计稿最小宽度1366px）表示在1366宽度下1px=1rem。</h3>
    </el-card>
  </div>
</el-scrollbar>
</template>

<script>
export default {
  name: 'ScreenAdaptation',
  data() {
    return {
      textarea: 'module.exports = {\n    css: {\n        loaderOptions: {\n            postcss: {\n                plugins: [\n                    require("postcss-px2rem")({remUnit: 136.8}),\n                ]\n            }\n        }\n    }\n}',
      textarea2: 'postcss: {\n  plugins: {\n    autoprefixer: {},\n    postcss-px2rem: {\n      remUnit: 136.8\n    }\n  }\n}'
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .el-scrollbar {
      height: 100%;
  }
  ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
  }
</style>

<style lang="less" scoped>
@import "~@/assets/less/documents.less";
</style>
