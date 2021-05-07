<template>
  <div class="directive-drag">
    <el-button
      v-for="(item, index) in list" :key="item.label" 
      @click="change(index)">{{ item.state ? '关闭' : '开启' }}{{ item.label }}拖拽功能</el-button>

    <div class="directive-drag-box">
      <div 
        v-for="item in list" :key="item.label" 
        v-drag="{ state: item.state, left: item.left, top: item.top, change: item.change }">{{ item.label }}</div>
    </div>

    <ul>
      <li
      v-for="item in list" :key="item.label">{{ item.label }}坐标位置：x: {{ Number(item.left).toFixed(2) + '%' }} y: {{ Number(item.top).toFixed(2) + '%' }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DirectiveDrag',
  data() {
    return {
      list: [
        {
          label: '组件1',
          direction: 'state',
          left: 0,
          top: 0,
          state: true,
          change: (left, top) => {
            this.list[0].left = left;
            this.list[0].top = top;
          }
        },
        {
          label: '组件2',
          direction: 'state',
          left: '50',
          top: '50',
          state: false,
          change: (left, top) => {
            this.list[1].left = left;
            this.list[1].top = top;
          }
        }
      ]
    }
  },
  methods: {
    change(index) {
      this.list[index].state = !this.list[index].state;
    }
  }
}
</script>
<style lang="less" scoped>
.directive-drag{
  width: 100%;
  height: 100%;
  padding: 20px;

  &-box {
    margin-top: 20px;
    margin-bottom: 10px;
    width:100%;
    height:500px;
    border: 1px solid var(--themeColor);
  }
}
</style>