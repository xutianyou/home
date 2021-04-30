import Vue from 'vue';
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts;
Date.prototype.$format = function (symbol = '-', type = 'D') {
  let text = '';

  if (type === 'Y') {
    text = this.getFullYear();
  } else if (type === 'M') {
    text = this.getFullYear() + symbol + (this.getMonth() + 1);
  } else if (type === 'D') {
    text = this.getFullYear() + symbol + (this.getMonth() + 1) + symbol + this.getDate();
  }

  return text
}
