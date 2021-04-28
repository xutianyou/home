<template>
  <div>
    <SlideVerify 
      ref="slideblock"
      :l="25"
      :r="2"
      :w="300"
      :h="100"
      :accuracy="accuracy"
      :slider-text="text"
      @again="onAgain"
      @fulfilled="onFulfilled"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    ></SlideVerify>
  </div>
</template>
<script>
/*
  参数    类型    默认值    描述    版本
  l    Number    42    滑块的边长    
  r    Number    10    滑块突出圆的半径    
  w    Number    310    canvas画布的宽    
  h    Number    155    canvas画布的高    
  sliderText    String    Slide filled right    滑块底纹文字    1.0.5
  imgs    Array    []    背景图数组。可不传    1.1.0
  accuracy    Number    5    滑动验证的误差范围    1.1.2
  show    Boolean    true    是否显示刷新按钮    1.1.2

  事件名 类型  描述  版本
  success Function    验证码匹配成功的回调 
  fail    Function    验证码未匹配的回调  
  refresh Function    点击刷新按钮后的回调函数   
  again   Function    检测到非人为操作滑动时触发的回调函数  1.1.2
  fulfilled   Function    刷新成功之后的回调函数 1.1.2
*/
export default {
  name: 'LoginVerify',
  data() {
    return {
      msg: '',
      text: '向右滑',
      accuracy: 5//精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
    }
  },
  methods: {
    onSuccess(){
      console.log('验证通过');
      this.msg = 'login success'
      this.$emit('success')
    },
    onFail(){
      console.log('验证不通过');
      this.msg = ''
    },
    onRefresh(){
      console.log('点击了刷新小图标');
      this.msg = ''
    },
    onFulfilled() {
      console.log('刷新成功啦！');
    },
    onAgain() {
      console.log('检测到非人为操作的哦！');
      this.msg = 'try again';
      // 刷新
      this.$refs.slideblock.reset();
    },
    handleClick() {
      // 父组件直接可以调用刷新方法
      this.$refs.slideblock.reset();
    }
  }
}  
</script>