<template>
<el-scrollbar class="c-scrollbar">
  <div class="file-css element-select">
    <el-card shadow="always">
      <div slot="header">
        <h1>复制xlsx的基础表格数据</h1>
      </div>

      <p>使用方法: 复制xlsx到输入框，点击确认按钮自动转化成表格数据</p>

      <cDataEntry></cDataEntry>
    </el-card>
  </div>
</el-scrollbar>
</template>

<script>
import cDataEntry from '@/components/dataEntry';
export default {
  name: 'copyData',
  components: { cDataEntry },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/documents.less";
</style>