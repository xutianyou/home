import Vue from 'vue';

const requireAll = require.context("@/components/globalComponent", false, /\.vue$/);

requireAll.keys().forEach((item)=>{
  /*组件name必须是驼峰命名*/
  const _name = requireAll(item).default.name;
    Vue.component(_name, requireAll(item).default)
})