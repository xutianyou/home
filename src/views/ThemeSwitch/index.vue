<template>
<el-scrollbar class="c-scrollbar">
  <div class="file-css theme-switch">
    <el-card shadow="always">
      <div slot="header">
        <h1>多主题一键切换</h1>
      </div>

      <p>运用场景: 多种主题颜色快捷切换</p>
      <p>好处: 无需重复编写样式，可创建多个主题，修改方便，无全局污染</p>
			<p>原理: element在线主题编辑器 + CSS变量var() + less全局变量</p>

			<h2>使用element在线主题编辑器生成css文件,配置组件颜色，边距，大小；</h2>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="textarea">
      </el-input>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="textarea1">
      </el-input>
			<h3>注意： gulp和node版本冲突，node12以上的版本不能兼容gulp3，gulp4不能适应node12一下的版本</h3>

			<h2>在工程目录src下创建gulpfile.js；</h2>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="textarea2">
      </el-input>
			<p>编译以上两个主题文件 gulp css-blue && gulp css-violet</p>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="textarea3">
      </el-input>

			<h2>CSS变量var()控制手写的主题样式</h2>
			<p>在main.js中引入 import ‘./assets/css/theme.css’</p>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        :readonly="true"
        v-model="textarea4">
      </el-input>
    </el-card>
  </div>
</el-scrollbar>
</template>

<script>
export default {
  name: 'ThemeSwitch',
  data() {
    return {
			textarea: "将生成的CSS用以下方法重新gulp\n保留生成的fonts文件放进目录‘src/assets/css/theme/blue/fonts’",
			textarea1: 'npm install gulp -g           // 建议全局安装 \nnpm config get prefix         //查找环境变量 => 记得设置\nnpm install gulp-clean-css    //压缩 CSS 文件\nnpm install gulp-css-wrap     // 批量为css文件扩展命名空间',
			textarea2: "var path = require('path')\nvar gulp = require('gulp')\nvar cleanCSS = require('gulp-clean-css')\nvar cssWrap = require('gulp-css-wrap')\n/* 蓝色主题 */\ngulp.task('blue', function () {\n return gulp.src(path.resolve('./theme/blue.css'))\n        .pipe(cssWrap({\n            selector: '.custom-blue' /* 添加的命名空间 */\n        }))\n        .pipe(cleanCSS())\n        .pipe(gulp.dest('src/assets/css/theme/blue')) /* 存放的目录 */\n})\n/* 紫色主题 */\ngulp.task('violet', function () {\n return gulp.src(path.resolve('./theme/violet.css'))\n        .pipe(cssWrap({\n            selector: '.custom-violet' /* 添加的命名空间 */\n        }))\n        .pipe(cleanCSS())\n        .pipe(gulp.dest('src/assets/css/theme/violet')) /* 存放的目录 */\n})",
			textarea3: '在main.js中引入\nimport ‘./assets/css/theme/blue/blue.css’; // 蓝色主题\nimport ‘./assets/css/theme/violet/violet.css’; // 紫色主题\n\n在项目中用js在body中添加主题类名custom-blue||custom-violet\n<body class=‘custom-blue’></body>',
			textarea4: '在main.js中引入css文件\nimport ‘./assets/css/theme.css’\n\n.custom-blue  {\n --themeColor:#4B8BEE;\n}\n.custom-violet  {\n --themeColor:#d913F4;\n}\n\n在涉及到主题颜色的手写样式中使用\n<style lang=‘less’ scoped>\n.class {\n color: var(--themeColor);\n border-color: var(--themeColor);\n background-color: var(--themeColor);\n}\n</style>',
		}
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/documents.less";
</style>

