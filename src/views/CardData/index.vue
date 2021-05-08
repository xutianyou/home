<template>
  <div class="card-data">
    <el-card shadow="always">
      <div slot="header">
        <h1>卡片数据录入</h1>
      </div>
      
      <cDataEntry @change="toGetData"></cDataEntry>
      <el-row class="row-table">
        <el-table 
          :data="tableData"
          border stripe
        >
          <el-table-column
            type="index"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            property="name"
            label="名称">
          </el-table-column>
          <el-table-column
            property="operationTime"
            label="录入日期"
            :formatter="formatter"
          >
          </el-table-column>
          <el-table-column
            property="updateTime"
            label="更新日期"
            :formatter="formatter"
          >
          </el-table-column>
          <el-table-column
            property="userName"
            label="修改人">
          </el-table-column>
          <el-table-column width="90" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="toDelete(scope)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getList, deleteTableData } from '@/api/card.js';
import cDataEntry from '@/components/DataEntry.vue';
import { mapState } from 'vuex';
export default {
  name: 'CardData',
  components: { cDataEntry },
  data() {
    return {
      addData: null,
      tableData: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      getList(this.user.name)
      .then(res => {
        if (res && res.code === '00') {
          this.tableData = res.list;
        }
      })
    },
    formatter(row, column, cellValue) {
      return cellValue.$format();
    },
    toGetData(data) {
      this.getDataList();
      this.addData = data;
    },
    toDelete(scope) {
      console.log(scope)
      console.log(scope.row.id)
      deleteTableData({
        userName: this.user.name,
        id: scope.row.id
      })
      .then(res => {
        if (res && res.code === '00') {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          this.getDataList();
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .row-table {
    margin-top: 20px;
  }
</style>