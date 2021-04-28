<template>
<el-scrollbar class="c-scrollbar">
  <div class="file-css documents-router">
    <el-card shadow="always">
      <div slot="header">
        <h1>路由配置</h1>
      </div>

      <h2>数据格式:</h2>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="textarea">
      </el-input>

      <h2>参数说明:</h2>
      <p>label：菜单名称</p>
      <p>name：对应路由组件。具有唯一性，有子菜单则不传，不跳转路由</p>
      <p> path： 用户设置的url地址</p>

      <h2>创建菜单页面文件格式:</h2>
      <p>views目录下创建文件夹</p>
      <p>文件名称大写开头</p>
      <p>一个文件夹代表一个页面，文件名index.vue</p>
    </el-card>
  </div>
</el-scrollbar>
</template>

<script>
export default {
  name: 'DocumentsRouter',
  data() {
    return{
      textarea: "[\n {\n  label: '简历',\n  name: 'ProjectBrief',\n  icon: 'el-icon-platform-eleme',\n  path: '/project-brief'\n },\n {\n  label: '项目文档',\n  icon: 'el-icon-document',\n   children: [\n    {\n     label: '翻译',\n     name: 'ToolTranslate',\n     path: '/tool/translate'\n    }\n   ]\n  }\n]"
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/documents.less";
</style>
