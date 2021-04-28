<template>
  <div class="echarts-bar">
    <div id="bar" class="echarts-bar-box"></div>
  </div>
</template>

<script>
export default {
  name: 'EchartsBar',
  data() {
    return {
      echarts: null
    }
  },
  mounted() {
    this.echarts = this.$echarts.init(document.getElementById('bar'));
    this.getOption();
  },
  methods: {
    getOption() {
      const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }]
      }

      this.echarts.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>
  .echarts-bar {
    &-box {
      width: 400px;
      height: 400px;
      border: 1px solid var(--themeColor);
    }
  }
</style>
