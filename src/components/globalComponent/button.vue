<template>
  <span  class="gl-button" @click.stop="toClick">
    <span><slot></slot></span>
    <i v-if="iconfont" class="iconfont" :class="iconName"></i>
  </span>
</template>
<script>

export default {
  props: {
    iconfont: {
      type: String
    }
  },
  name: 'GlButton',
  computed: {
    iconName() {
      return this.iconfont ? `icon-${this.iconfont}` : '';
    }
  },
  methods: {
    toClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.gl-button{
  display: inline-block;
  vertical-align: middle;
  padding: 7px 12px;
  border: 1px solid var(--themeColor);
  border-radius: 15px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;

  span,i {
    display: inline-block;
    vertical-align: middle;
  }
  span {
    font-size: inherit;
    color: var(--themeColor);
    // color: @textPrimary;
  }

  i {
    margin-left: 4px;
    font-size: inherit;
    color: var(--themeColor);
  }

  &:hover {
    background-color: var(--themeColor);

    span,i {
      color: @ColorWhite;
    }
  }

  &+& {
    margin-left: 10px;
  }
}
</style>
