<template>
  <div class="c-data-entry">
    <el-button 
      type="primary" 
      icon="el-icon-edit" 
      circle fullscreen
      @click="dialogTableVisible = true"
    ></el-button>
    
    <el-dialog title="请将xlsx的表格数据复制到输入框" 
      width='90%' 
      custom-class="all-dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogTableVisible">

      <el-input class="table-name" v-model="tableName" placeholder="请输入表格名称"></el-input>

      <el-input
        v-model="textarea"
        type="textarea"
        placeholder="右键粘贴或者Ctrl + V"
        :autosize="{ minRows: 5, maxRows: 11}"
        :readonly="false"
        resize="none"
        @blur="setText"
      >
      </el-input>

      <div class="c-data-entry-table">
        <el-table 
          v-if="tableData"
          :data="tableData.body"
          border stripe
          height="100%"
        >
          <el-table-column 
            v-for="item in tableData.header"
            :key="item.key"
            :property="item.property"
            :label="item.label" width="150"></el-table-column>
        </el-table>
      </div>
      <div>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'cDataEntry',
  data() {
    return {
      dialogTableVisible: false,
      tableName: '',
      textarea: '',
      tableData: null
    }
  },
  methods: {
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
          this.tableData = this.getTableData(brr);
        }
      }
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
    }
  }
}
</script>

<style lang="less" scoped>
.c-data-entry {
  &-table {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: 50%;
  }

  .table-name {
    margin-bottom: 10px;
  }
}
</style>
<style lang="less" scoped>
::v-deep .all-dialog {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  height: calc(100% - 40px);

  .el-dialog__body {
    height: calc(100% - 60px);
    padding: 0 10px;
  }
}

</style>
