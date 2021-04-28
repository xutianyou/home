<template>
<el-scrollbar>
  <div class="file-css project-brief">
    <el-card shadow="always">
      <div slot="header">
        <h1>个人信息</h1>
      </div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年限" prop="year">
              <el-input v-model="form.year" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-input v-model="form.gender" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备用电话" prop="standbyTelephone">
              <el-input v-model="form.standbyTelephone" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="form.email" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信" prop="wechat">
              <el-input v-model="form.wechat" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="专业" prop="major">
              <el-input v-model="form.major" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业院校" prop="school">
              <el-input v-model="form.school" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="always">
      <div slot="header">
        <h1>个人优势</h1>
      </div>
      <el-input
        type="textarea"
        autosize
        placeholder="个人优势"
        :readonly="true"
        v-model="advantage">
      </el-input>
    </el-card>

    <el-card shadow="always">
      <div slot="header">
        <h1>个人技能</h1>
      </div>
      <el-input
        type="textarea"
        autosize
        placeholder="个人技能"
        :readonly="true"
        v-model="skill">
      </el-input>
    </el-card>

    <el-card shadow="always">
      <div slot="header">
        <h1>项目经历</h1>
      </div>

      <p>集团经分系统</p>
      <el-input
        type="textarea"
        autosize
        placeholder="项目经历"
        :readonly="true"
        v-model="experience1">
      </el-input>

      <p>财智云系统</p>
      <el-input
        type="textarea"
        autosize
        placeholder="项目经历"
        :readonly="true"
        v-model="experience2">
      </el-input>

      <p>客户服务平台</p>
      <el-input
        type="textarea"
        autosize
        placeholder="项目经历"
        :readonly="true"
        v-model="experience3">
      </el-input>
      
    </el-card>
  </div>
</el-scrollbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProjectBrief',
  data() {
    return {
      advantage: '业务能力强，经常接到一句话需求，需要独立去完成任务。\n良好的沟通能力，能更好的推进工作。\n有强迫症、完美主义。',
      skill: '常用框架：vue。\n基本运用：\n1: vuex进行状态管理;\n2: localStorage、sessionStorage信息存储,indexedDB大数据存储;\n3: vue-router 动态路由管理;\n4: element-ui主题配置、组件样式改造;\n5: less scoped管理页面样式;\n6: iconfont 图标管理;\n7: 公共组件开发;\n8: 大型模块功能设计;\n\n项目设计: \n1: amfe-flexible、postcss-px2rem自适应PC端大屏。\n2: 项目多主题切换、cssWrap管理CSS。\n\n掌握插件：echarts、html2canvas、富文本\n\n常用办公工具: svn、sublime、谷歌、IE、Vue Devtools',
      experience1: '首页模块：\n千人千面效果设计大多数内部管理前端系统首页，都是统一的设计，统一化的布局。而千人千面这只是一个实现效果，目的是让用户可以根据自己的需求去放置想要看到的功能模块。因为可以选择不同的模块，使用了vue的组件动态引入。在首页的各个模块中，数据的排列顺序是支持拖拽或者点击进行更改并且实时保存数据信息，这需要跟后端进行频繁的数据交互,拖拽频繁时需要截流，以免发送不必要的请求，增加后端压力。前台对数据的存储（vuex）和更新，精致校验数据的变化，实现页面单独的元素重新渲染。\n\n卡片模块：\n创建带有echarts图形的数据集合模块卡片的整个经分项目的重点模块，目的是让用户可以根据自身需求，生产一张带有各类信息的图形化数据卡片。立项之初是想购买第三方现有插件，因成本高、业务需求特殊，故而项目组自己尝试开发，经过和后端的沟通设计，最终完成卡片。卡片模块为项目组节约了非常多的成本，也得到集团领导的一致认可。模块分创建（修改）页面和卡片展示两部分：创建页面主要分数据配置跟图形配置。由二十多个配置子组件组合而成。兄组件之间数据交互频繁，都选择用v\u0002model的形式去开发配置数据的组件。因为数据需要从不同接口获取数据，再根据返回数据去请求，故设计了顺序队列的方式进行数据的获取，单独控制各个模块的渲染时机。确保流程不会阻塞、优化了页面加载的效率。图形配置主要是业务需求，echartst图形主要有柱状图、条形图、堆积图、折线图、饼状图，组合图（柱状+折线），因为数据是动态变化，所以对图形的展示效果要求非常灵活。图形开发遇到问题比较多，如：X轴文字过长溢出，需要计算去调整位置，X轴数据换行引起图形整体高度变化，需自适应，数据过多，图形上的数值重叠，需优话配置到单独每一个数据的展示和位置调整，一个图形中去区分数据类型，比如预测类数据需要把柱子变成空心，实现折线图虚线和实线连接，实现图形中数据跟数据之间的连线效果，饼状图对负数的处理，图形根据需求做单独的颜色-大小-字体配置。\n\n权限模块：\n配置用户个人的各种数据权限和菜单页面主要开发表格功能：表头筛选功能，表头联动筛选功能，多表格列文字对齐功能，表格嵌入富文本，编辑功能。\n\n会议模块：\n一整套后台配置前台页面功能目的是根据各个子公司不同要求，自定义配置页面的布局和需要的模块团队协作开发，主\n要负责定性项目模块使用了vue的插槽使用了html2canvas生产会议记录发送邮件给客户。',
      experience2: '项目描述：\n平安内部税务管理系统，主要功能对财务数据进行分析统合，分类管理账目，风险分析把控，人力管理。\n\n成就：\n统一UI设计风格，规范各类组件复用，重新封装UI组件，规范后端接口字段，优化项目前后端开发流程管理。',
      experience3: '使用jeecg框架开发。\n项目描述：\n公司产品的消费设置。\n收费、返点配置。\n客户、供应商的信息配置。',
      form: {
        name: '许天佑',
        year: '7+',
        age: '33',
        gender: '男',
        phone: '13380840552',
        standbyTelephone: '13692929287',
        email: '9441785@qq.com',
        wechat: 'bing_3x',
        major: '通信技术',
        school: '广东新安职业技术学院'
      }
    }
  },
  computed: {
    ...mapState(['user'])
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

.el-card+.el-card {
  margin-top: 20px;
}
</style>