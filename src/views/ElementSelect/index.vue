<template>
  <div class="element-select">
    <h1>下拉框</h1>
    <el-select v-model="value" placeholder="请选择" filterable @change="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-input
      type="textarea"
      autosize
      :readonly="false"
      placeholder="右键粘贴"
      v-model="textarea"
      
      @focus="focusTextarea"
    >
    </el-input>
    <input @keyup.enter="keydown" />

    <el-button type="success" @click="changeBtn">变更默认值</el-button>
    <el-button type="success" @click="changeBtn1">确认添加内容</el-button>
    <el-button>默认按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    changeBtn() {
      this.value = '选项5'
      console.log('changeBtn', this.value)
    },
    focusTextarea() {
      this.textarea = '111'
    },
    keydown(e) {
      console.log('keydown', e)
    },
    changeBtn1() {
      console.log('changeBtn1', this.textarea)
      // 去除头尾换行符
      const _text = this.textarea.replace(/^[\s\r\n]+|[\s\r\n]+$/g,'');
      const arr = _text.split('\n');
      console.log(arr)
      const brr = arr.map(item => {
        if (item.indexOf('\t') !== -1) {
          return item.split('\t')
        } else if (item.indexOf(' ') !== -1) {
          return item.split(' ')
        }
        
      })
      console.log(brr)
    },
    change(val) {
      console.log('change', val)
    }
  }
}
</script>
