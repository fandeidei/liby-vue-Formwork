<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less" type="text/less">
body{
      overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
  background-image: url('./assets/img/screen_bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  font-family: 'pingfang';
  overflow: hidden;
}
.ant-progress-inner{
  border-radius: 0!important;
}
.ant-progress-bg{
  border-radius: 0!important;
}
.ant-radio-group{
  box-shadow: 0px 2px 8px 0px rgba(1,19,31,0.89);
  border-radius: 14px;
  background: rgba(8,24,33,1);
  border:1px solid;
}
.ant-radio-button-wrapper{
  background:none!important;
  opacity:0.8!important;
  font-size:14px!important;
  color:rgba(106,142,182,1)!important;
  border:none!important;
}
.ant-radio-button-wrapper-checked{
  background:linear-gradient(0deg,rgba(9,67,121,0.8),rgba(30,98,175,0.8))!important;
  border-image:linear-gradient(0deg, rgba(44, 127, 194, 0.74), rgba(65, 99, 151, 0.74)) 1 1!important;
  box-shadow:0px 1px 15px 0px rgba(7,25,38,0.8), 0px 4px 7px 0px rgba(100,187,242,0.15), 0px -7px 7px 0px rgba(10,52,82,0.38)!important;
  border-radius:14px!important;
  color:#fff!important
}
.ant-radio-button-wrapper:not(:first-child)::before{
  display: none!important;
}
/* .ant-progress-line{
  width:80%!important
} */
.ant-progress-text{
  display: none!important;
}
.ant-radio-button-wrapper{
  padding:0 1rem!important
}
.ant-tabs-tab{
  padding: 0.4rem 0.1rem!important;
}
.ant-progress-inner{
  background: rgba(20,66,97,1)!important;
}
.ant-progress-outer{
  padding:0!important;
  margin:0!important;
}
.ant-progress-line {
    padding: 0 5%!important;
}
.ant-radio-button-wrapper-disabled{
  span{
    color:rgba(106,142,182,1)!important;
    opacity:0.4!important;
  }
}
.ant-dropdown{
  ul{
    background: rgba(18, 77, 136, 0)!important;
    border: 1px solid!important;
    box-shadow: rgba(7, 25, 38, 0.8) 0px 2px 30px 0px, rgba(10, 52, 82, 0.38) 0px -13px 13px 0px!important;
    text-align: center;
    span{
      color:#fff!important
    }
    .ant-dropdown-menu-item:hover{
      background:linear-gradient(0deg,rgba(8,40,70,0.8),rgba(31,98,173,0.8))!important;
      box-shadow:0px 8px 13px 0px rgba(100,187,242,0.15)!important;
    }
  }
}
</style>
