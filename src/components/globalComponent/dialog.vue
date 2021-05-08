<template>
  <el-dialog 
    :title="title" 
    width='90%' 
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :visible.sync="visible">
    <el-scrollbar class="c-scrollbar">
      <div class="gl-dialog-main">
        <slot></slot>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>
<script>

export default {
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  name: 'GlDialog',
  data() {
    return {
      visible: false
    }
  },
  watch: {
    value: {
      handler(boo) {
        this.visible = boo;
      }
    },
    visible: {
      handler(boo) {
        if (!boo) {
          this.$emit('input', false)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .el-dialog {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  height: calc(100% - 40px);

  .el-dialog__header {
    padding: 20px;
    height: 60px;
    border-bottom: 1px solid @borderBase;
    .el-dialog__title {
      display: inline-block;
      vertical-align: top;
      line-height: 20px;
      color: @textPrimary;
    }
  }
  .el-dialog__body {
    height: calc(100% - 60px);
    padding: 0;

    .gl-dialog-main {
      padding: 20px;
    }
  }
}
</style>
