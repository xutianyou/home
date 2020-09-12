<template>
    <div class="">

    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    props: {
        value: {
            type: Array,
            default: () => {
                return []
            },
            required: true,
            validator: function () {
                return true
            }
        }
    },
    data () {
        return {}
    },
    watch: {
        value: {
            handler: function (arr) {
                console.log(arr)
            },
            deep: true,
            immediate: true
        }
    },
    created () {},
    mounted () {
        // Promise
    },
    methods: {}
}
</script>
<style lang='less' scoped>

</style>
