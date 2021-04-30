<template>
  <div class="card-add">
    <el-form ref="form" :model="form" label-width="70px">
      <el-row type="flex" class="card-add-header">
        <el-col :span="4" class="card-add-header-left">数据配置</el-col>
        <el-col :span="16" class="card-add-header-center">卡片名称</el-col>
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
        </el-col>
        <el-col :span="16" class="card-add-main-center">卡片名称</el-col>
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
      options: [],
      initialData: null,
      form: {
        name: '',
        table: '',
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.getTableNameList();
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