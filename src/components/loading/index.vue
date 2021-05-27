<template>
    <div class="loading">
        <div class="loadingBg"></div>
        <a-spin>
            <a-icon slot="indicator" type="loading" style="font-size: 42px;z-index:50" spin />
        </a-spin>
    </div>
</template>

<script>
import "./style.less"
export default {
    name: 'loading',
    components: {
    },
    props:{
    },
    data() {
        return {
        }
    },
    created(){
    },
    mounted() {
    },  
    computed:{
    },
    watch:{
    },
    methods:{
    }
};
</script>

<style lang="less" scoped type="text/less">
</style>
