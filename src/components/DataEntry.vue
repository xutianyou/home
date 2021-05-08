<template>
  <div class="c-data-entry">
    <gl-button iconfont="lianjie" @click="visible = true">点击添加</gl-button>
    
    <gl-dialog 
      v-model="visible"
      title="请将xlsx的表格数据复制到输入框">

      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <el-input class="table-name" v-model="tableData.name" placeholder="请输入表格名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end">
            <el-button type="primary" 
              :disabled="disabledBtn"
              :loading="loading"
              icon="el-icon-circle-plus-outline"
              @click="toSubmit">录入</el-button>
          </el-row>
        </el-col>
      </el-row>
      
      <el-row class="row-pd">
        <el-input
          v-model="textarea"
          type="textarea"
          placeholder="右键粘贴或者Ctrl + V"
          :autosize="{ minRows: 5, maxRows: 11}"
          :readonly="false"
          resize="none"
          @focus="textareaFocus"
          @blur="setText"
        >
        </el-input>
      </el-row>

      <el-row class="row-table">
        <el-table 
          v-if="tableData.body.length"
          :data="tableData.body"
          border stripe
          height="100%"
        >
          <el-table-column 
            v-for="item in tableData.header"
            :key="item.key"
            :property="item.property"
            :label="item.label" min-width="90"></el-table-column>
        </el-table>
      </el-row>
    </gl-dialog>
  </div>
</template>

<script>
import { setTableData } from '@/api/card.js';
import { mapState } from 'vuex';
export default {
  components: {  },
  name: 'cDataEntry',
  data() {
    return {
      visible: false,
      disabledBtn: false,
      loading: false,
      textarea: '',
      tableData: {
        name: '',
        header: [],
        body: []
      }
    }
  },
  watch:{
    visible: {
      handler(Boo) {
        if (!Boo) {
          this.close();
        }
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    textareaFocus() {
      this.disabledBtn = true;
    },
    setText() {
      // 去除头尾换行符
      const _text = this.textarea.replace(/^[\s\r\n]+|[\s\r\n]+$/g,'');
      const arr = _text.split('\n');
      if (_text !== '') {
        // 校验数据为空
        if (arr.length < 2) {
          this.$message({
            message: '最少需要录入1行数据',
            type: 'warning'
          });
        } else {
          const brr = arr.map(item => item.split('\t'))
          const _o = this.getTableData(brr);
          this.tableData.header = _o.header;
          this.tableData.body = _o.body;
        }
      }

      this.disabledBtn = false;
    },
    getTableData(arr) {
      const header = arr[0].map((item, index) => {
        return {
          key: index,
          property: 'property-' + index,
          label: item
        }
      })

      arr.shift();

      const body = arr.map(m => {
        const _o = {}
        m.forEach((element, i) => {
          const _key = 'property-' + i
          _o[_key] = element
        });
        return _o;
      })

      return {
        header,
        body
      }
    },
    toSubmit() {
      if (this.tableData.name === '') {
        this.$message({
          message: '报表名称不能为空',
          type: 'warning'
        });
      } else if (!this.tableData.body.length) {
        this.$message({
          message: '报表最少需要有1条数据',
          type: 'warning'
        });
      } else {
        this.loading = true;
        
        setTableData({
          userName: this.user.name,
          data: this.tableData
        })
        .then(res => {
          if (res && res.code === '00') {
            this.$message.success(res.msg);
            this.$emit('change', this.tableData);
            this.visible = false;
          } else {
            this.$message.error(res.msg);
          }
          this.loading = false;
        })
        .catch(res => {
          this.$message.error(res.msg);
          this.loading = false;
        })
      }
    },
    close() {
      this.textarea = '';
      this.tableData.name = '';
      this.tableData.header = [];
      this.tableData.body = [];
    }
  }
}
</script>

<style lang="less" scoped>
.c-data-entry {

  .table-name {
    width: 200px;
  }

  .row-pd {
    margin-top: 20px;
  }

  .row-table {
    margin-top: 20px;
    height:280px;
  }
}
</style>