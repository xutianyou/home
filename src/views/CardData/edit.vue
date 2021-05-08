<template>
  <div>
    <el-button @click="close">取消</el-button>
    <el-input v-model="text"></el-input>
  </div>
</template>
<script>
export default {
  name: 'componentEdit',
  components: {},
  data() {
    return {
      text: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>