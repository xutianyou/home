<template>
  <div class="nav-menu">
    <el-scrollbar>
        <el-tree :data="getMenu" :props="defaultProps" @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i :class="[data.icon]"></i>
            <span @click="open(data, node)">{{ node.label }}</span>
          </span>
        </el-tree>
    </el-scrollbar>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'NavMenu',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters(['getMenu'])
  },
  // watch:{
  //   $router: {
  //     handler(val) {
  //       console.log(val)
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    handleNodeClick(data) {
      // 重复跳转
      if (this.$router.history.current.path !== data.path && data.name) {
        this.$router.push({ name: data.name })
      }
    },
    open(data, node) {
      if (data.path) {
        console.log('open', data)
        console.log('open.path', node)
      }
    }
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
  .nav-menu {
    padding: 20px 0;
    height: 100%;
    background-color: @backgroundMenu;
    box-shadow: 0px 2px 12px 0px #999999;
    border-right: 1px solid var(--themeColor);

    ::v-deep .el-tree {
      .el-tree-node__content {
        height: 30px;
      }
      .custom-tree-node {
        &>i {
          margin: 0 5px;
        }
        
      }
      .el-tree-node__expand-icon {
        position: absolute;
        right: 0;
        transform: rotate(-90deg);
      }
      .el-tree-node__expand-icon.expanded {
        position: absolute;
        right: 0;
        transform: rotate(90deg);
      }
    }
  }
</style>