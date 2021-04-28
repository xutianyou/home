<template>
<el-scrollbar>
  <div class="file-css style-deep">
    <el-card shadow="always">
      <div slot="header">
        <h1>vue样式穿透</h1>
      </div>

      <p>运用场景: 复写第三方插件样式、复写子组件样式</p>
      <p>好处: 不会造成全局污染</p>
			<p>原理: scoped会向所有dom添加[data-v-hash]</p>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="scoped1">
      </el-input>

			<p>原理: scoped会向所有的css选择器添加[data-v-hash]</p>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="scoped2">
      </el-input>

			<p>原理: 子组件dom没有[data-v-hash],deep会向子组件所有的的dom元素添加[data-v-hash],这样才能跟css选择器的</p>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="false"
        v-model="scoped3">
      </el-input>

			<p>使用:</p>
			<h2>css深度作用选择器 &lt;&lt;&lt; </h2>
			<el-input
					class="style-deep-burlywood"
					type="textarea"
					autosize
					placeholder="请输入内容"
					:readonly="false"
					v-model="textarea">
			</el-input>
			<h3>注意:  Sass 之类的预处理器无法正确解析 &lt;&lt;&lt;</h3>

      <h2>/deep/</h2>
      <el-input
				class="style-deep-red"
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="false"
        v-model="textarea2">
      </el-input> 
			<h3>注意:  cli3编译下可能出现报错</h3>

      <h2>::v-deep</h2> 
      <el-input
				class="style-deep-blue"
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="false"
        v-model="textarea3">
      </el-input>
			<h3>推荐使用</h3>
    </el-card>
  </div>
</el-scrollbar>
</template>

<script>
export default {
  name: 'StyleDeep',
  data() {
    return {
			scoped1: '<div class=“style-deep” data-v-7ba5bd90>我是组件中所有的dom</div>',
			scoped2: '.style-deep[data-v-7ba5bd90] {\n color: #000;\n}\n.style-deep-red[data-v-7ba5bd90] {\n color: red;\n}',
			scoped3: '<div class=“.el-textarea” data-v-7ba5bd90>我是子组件中的dom</div>',
			textarea: '<style lang=“css” scoped>\n .style-deep-burlywood.el-textarea >>> .el-textarea__inner {\n  color: orangered;\n }\n</style>',
      textarea2: '<style lang=“less” scoped>\n ::v-deep .style-deep-red.el-textarea {\n  .el-textarea__inner {\n   color: red;\n  }\n }\n</style>',
      textarea3: '<style lang=“less” scoped>\n /deep/ .style-deep-blue.el-textarea {\n  .el-textarea__inner {\n   color: blue;\n  }\n }\n</style>'
    }
  },
  mounted() {
  },
  methods: {

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
@import "~@/assets/less/documents.less";
</style>

<style lang="css" scoped>
.style-deep-burlywood >>> .el-textarea__inner {
	color: burlywood;
}
</style>

<style lang="less" scoped>
::v-deep .style-deep-red.el-textarea {
	.el-textarea__inner {
		color: red;
	}
}
/deep/ .style-deep-blue.el-textarea {
	.el-textarea__inner {
		color: blue;
	}
}
</style>