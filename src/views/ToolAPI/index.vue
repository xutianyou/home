<template>
  <div class="tool-api">
    <el-tabs type="border-card">
      <el-tab-pane 
        v-for="item in list"
        :key="item.label"
        :label="item.label">
        <iframe class="tool-api-iframe" :src="item.src"></iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'toolAPI',
  data() {
    return {
      list: [
        {
          label: 'Element',
          src: 'https://element.eleme.cn/'
        },
        {
          label: 'Vue',
          src: 'https://cn.vuejs.org/'
        },
        {
          label: 'Vue CLI',
          src: 'https://cli.vuejs.org/zh/'
        }
      ]
    }
  }
}
</script>

<style lang="less" scope>
.tool-api {
  width: 100%;
  height: 100%;
  padding: 20px;

  .el-tabs {
    height: 100%;

    .el-tabs__content {
      height: calc(100% - 39px);

      .el-tab-pane {
        height: 100%;
      }
    }
  }
  &-title {
    color: @textPrimary;
    height: 60px;
  }

  &-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
