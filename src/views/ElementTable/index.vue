<template>
  <div class="element-table">
    <h1>动态表格</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="650"
      border
      :span-method="arraySpanMethod">
      <el-table-column
        fixed
        prop="index"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="projectName"
        label="研发项目名称"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="projectNo"
        label="项目编号"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="rdCostType"
        label="研发费用类别"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="annualTotal"
        label="全年总计"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        v-for="item in tableHead"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        width="120"
        align="center">

        <template slot="header" slot-scope="scope">
          <table-filter 
            :sort="true"
            :sortType.sync="item.filter.sortType"
            @change-sort="item.filter.changeSort($event, scope)">
            {{ scope.column.label }}
          </table-filter>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import TableFilter from '@/components/tableFilter'
export default {
  name: 'ElementTable',
  components: {
    TableFilter
  },
  data() {
    return {
      tableHead: [],
      table: {
        tableHead: [
          {
            label: '2020-01',
            value: 'time1'
          }, {
            label: '2020-02',
            value: 'time2'
          }, {
            label: '2020-05',
            value: 'time3'
          }, {
            label: '2021-01',
            value: 'time4'
          }, {
            label: '2021-02',
            value: 'time5'
          }, {
            label: '2021-04',
            value: 'time6'
          }
        ],
        tableBody: [
          {
            index: '1',
            projectName: '项目总合计',
            projectNo: '',
            childrens: [
              {
                rdCostType: '合计',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '工资薪资',
                annualTotal: '100',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '职工福利费',
                annualTotal: '200',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '养老保险',
                annualTotal: '300',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '医疗保险',
                annualTotal: '400',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '工商保险',
                annualTotal: '500',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '生育保险',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '失业保险',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '住房公积金',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '补充养老保险费',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '差旅费',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }
            ]
          },
          {
            index: '2',
            projectName: '项目A',
            projectNo: '43424024',
            childrens: [
              {
                rdCostType: '合计',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '工资薪资',
                annualTotal: '100',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '职工福利费',
                annualTotal: '100',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '养老保险',
                annualTotal: '300',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '医疗保险',
                annualTotal: '400',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '工商保险',
                annualTotal: '500',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '生育保险',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '失业保险',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '住房公积金',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '补充养老保险费',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }, {
                rdCostType: '差旅费',
                annualTotal: '600',
                time1: '1',
                time2: '2',
                time3: '3',
                time4: '4',
                time5: '5',
                time6: '6'
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    tableData() {
      let arr = []
      this.table.tableBody.forEach(item => {
        const _list = item.childrens.map(m => {
          return {
            ...m,
            index: item.index,
            projectName: item.projectName,
            projectNo: item.projectNo
          }
        })
        arr = arr.concat(_list)
      })
      return arr
    }
  },
  created() {
    this.tableHead = this.table.tableHead.map(item => {
      return {
        prop: item.value,
        label: item.label,
        filter: {
          sortType: '',
          changeSort: (value, scope) => {
            // console.log(value, scope)
            // console.log(scope.column.label)
            // console.log(scope.column.property)
            this.tableHead.forEach( (f, index, self) => {
              if (f.prop !== scope.column.property) {
                self[index].filter.sortType = ''
              }
            })
          }
        }
      }
    })
  },
  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      const len = this.table.tableBody[0].childrens.length;
      if (columnIndex === 0) {
        if (rowIndex % len === 0) {
          return {
            rowspan: len,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 1) {
        if (rowIndex < len ) {
          if (rowIndex % len === 0) {
            return {
              rowspan: len,
              colspan: 2
            };
          } else {
            return {
              rowspan: 0,
              colspan: 1
            };
          }
        } else {
          if (rowIndex % len === 0) {
            return {
              rowspan: len,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 1
            };
          }
        }
      }
      if (columnIndex === 2) {
        if (rowIndex < len ) {
          if (rowIndex % len === 0) {
            return {
              rowspan: 1,
              colspan: 0
            };
          } else {
            return {
              rowspan: 1,
              colspan: 0
            };
          }
        } else {
          if (rowIndex % len === 0) {
            return {
              rowspan: len,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 1
            };
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.element-table {
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid @tableBorder;
  }
  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid @tableBorder;
  }
  .el-table {
    .el-table__fixed {
      .el-table__fixed-header-wrapper {
        .el-table__header {
          thead {
            tr {
              th {
                background-color: @tableHeader;

                .cell {

                }
              }
            }
          }
        }
      }

      .el-table__fixed-body-wrapper {
        .el-table__body {
          tbody {
            .el-table__row {
              .el-table_1_column_1,.el-table_1_column_2,.el-table_1_column_3,.el-table_1_column_4 {
                background-color: @tableHeader;
              }
            }
          }
        }
      }
    }

    .el-table__header-wrapper {
      .el-table__header {
        thead {
          tr {
            th {
              background-color: @tableHeader;

              .cell {

              }
            }
          }
        }
      }
    }
  }
}
</style>
