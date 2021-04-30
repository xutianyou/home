<template>
  <div class="table-filter">

    <span>
      <slot></slot>
    </span>
    <span v-if="sort" class="slot" :class="slotClass" @click="change"></span>
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  props: {
    sort: {
      type: Boolean,
      default: false
    },
    sortType: {
      type: String,
      default: ''
    }
  },
  computed: {
    slotClass() {
      let i = 'el-icon-sort'
      if (this.sortType === 'asc') {
        i = 'el-icon-sort-up'
      } else if (this.sortType === 'desc') {
        i = 'el-icon-sort-down'
      }
      return i
    }
  },
  methods: {
    change() {
      
      if (this.sortType === 'asc') {
        this.$emit('update:sortType', 'desc')
        this.$emit('change-sort', 'desc')
      } else if (this.sortType === 'desc') {
        this.$emit('update:sortType', '')
        this.$emit('change-sort', '')
      } else {
        this.$emit('update:sortType', 'asc')
        this.$emit('change-sort', 'asc')
      }

    }
  }
}
</script>
<style lang="less" scoped>
.table-filter {
  .el-icon-sort-up,.el-icon-sort-down {
    color: var(--themeColor);
  }
}
</style>
