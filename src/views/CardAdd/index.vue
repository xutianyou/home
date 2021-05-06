<template>
  <div class="card-add">
    <el-form ref="form" :model="form" label-width="70px">
      <el-row type="flex" class="card-add-header">
        <el-col :span="4" class="card-add-header-left">数据配置</el-col>
        <el-col :span="16" class="card-add-header-center">{{ initialData.name }}</el-col>
        <el-col :span="4" class="card-add-header-right">图形配置</el-col>
      </el-row>

      <el-row type="flex" class="card-add-main">

        <el-col :span="4" class="card-add-main-left">
          <el-form-item label="卡片名称" prop="name">
            <el-input v-model="form.name" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="关联报表" prop="region">
            <el-select v-model="form.table" size="mini" placeholder="请选择" @change="changeTable">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="item in yAxisList" :key=item :label="item" 
              :disabled="checkList.length === 1 && checkList[0] === item"></el-checkbox>
          </el-checkbox-group>
        </el-col>

        <el-col :span="16" class="card-add-main-center">
          <div class="card-add-main-center-chart" id="chart"></div>
        </el-col>

        <el-col :span="4" class="card-add-main-right">图形配置</el-col>
        
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getList } from '@/api/card.js';
import { mapState } from 'vuex'
export default {
  name: 'CardAdd',
  data() {
    return {
      echarts: null,
      series: [],
      checkList: [],
      options: [],
      initialData: {
        name: '',
        body: []
      },
      form: {
        name: '',
        table: '',
      }
    }
  },
  computed: {
    ...mapState(['user']),

    yAxisList() {
      // 构造图形数据个数
      return this.initialData.body.map(item => item['property-0']);
    },
    xAxisList() {
      return this.initialData.header.filter((del, delIndex) => delIndex !== 0).map(item => item.label);
    }
  },
  watch: {
    yAxisList: {
      handler(list) {
        // 默认选中第一个
        this.checkList = list.length ? [list[0]] : [];
      },
      deep: true
    },
    checkList: {
      handler(list) {
        this.series = list.map(item => {
          const _o = this.initialData.body.find(f => f['property-0'] === item)

          const arr = this.initialData.header.filter((del, delIndex) => delIndex !== 0).map(f => {
            const obj = {};
            obj.label = f.label
            obj.value = _o[f.property]
            return obj
          })
          return arr
        })
        this.getOption();
      },
      deep: true
    }
  },
  created() {
    this.getTableNameList();
  },
  mounted() {
    this.echarts = this.$echarts.init(document.getElementById('chart'));
  },
  methods: {
    getTableNameList() {
      getList(this.user.name)
      .then(res => {
        if (res && res.code === '00') {
          this.options = res.list;
        }
      })
    },
    changeTable(val) {
      this.initialData = this.options.find(item => item.id === val);
    },
    getOption() {
      const option = {
        xAxis: {
            type: 'category',
            data: this.xAxisList
        },
        yAxis: {
            type: 'value'
        },
        series: this.series.map(item => {
          return {
            data: item,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        })
        // series: [{
        //     data: [120, 200, 150, 80, 70, 110, 130],
        //     type: 'bar',
        //     showBackground: true,
        //     backgroundStyle: {
        //         color: 'rgba(180, 180, 180, 0.2)'
        //     }
        // }]
      }

      this.echarts.setOption(option, true);
    }
  }
}
</script>

<style lang="less" scoped>
.card-add {
  height: 100%;
  &-header {
    height: 62px;
    border-bottom: 2px solid @borderBase;
    &-left,&-right {
      text-align: center;
      font-size: 20px;
      color: var(--themeColor);
    }
    &-left,&-right,&-center {
      height: 100%;
      line-height: 60px;
    }
    &-left {
      border-right: 2px solid @borderBase;
    }
    &-right {
      border-left: 2px solid @borderBase;
    }
    &-center {
      color: @textPrimary;
    }
  }
  &-main {
    height: calc(100% - 62px);
    &-left,&-right {
      padding: 10px;
      text-align: center;
      font-size: 20px;
      color: var(--themeColor);
    }
    &-left,&-right,&-center {
      height: 100%;
    }
    &-left {
      border-right: 2px solid @borderBase;
    }
    &-right {
      border-left: 2px solid @borderBase;
    }
    &-center {
      color: @textPrimary;
      
      &-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.card-add {
  .el-form {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="less" scoped>
::v-deep .el-form {
  .el-form-item {
    .el-form-item__label {
      width: 70px !important;
    }
    .el-form-item__content {
      margin-left: 70px !important;
    }
  }
}
::v-deep .el-checkbox-group {
  .el-checkbox {
    width: 100%;
    text-align: left;
    margin-right: 0;
  }
}
</style>