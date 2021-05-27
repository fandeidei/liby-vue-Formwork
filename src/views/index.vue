<!--
 * @Descripttion: 首国家监督抽查
 * @version: 
 * @Author: gonghairun
 * @Date: 2020-07-09 11:19:03
 * @LastEditors: gonghairun
 * @LastEditTime: 2020-10-16 14:09:01
-->
<template>
    <div class="index">
        <!-- 头部 -->
        <top-menu></top-menu>
        <!-- 子路由 -->
        <router-view></router-view>
    </div>
</template>
<script>
import topMenu from '../components/topMenu/index.vue' // 头部
export default {
    name: 'index',
    components: {
        topMenu
    },
    data() {
        return {
            topMenu
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
    updated(){
    },
    methods:{

    }
}
</script>
<style lang="less">
.home{
    width: 100%;
    height: 100%;
}
</style>
