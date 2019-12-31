<template>
  <div id="app">
<!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/personal">Personal</router-link>
    </div>-->
    <router-view/>
  </div>
</template>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
* {
  padding: 0px;
  margin: 0px;
}
.myHeader{
  padding: 0px;
  background-color: #f9fafc;
  box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
a {
  /*router-link会被渲染成带下划线的a标签，故去除*/
  text-decoration: none;
  &:active {
    color: #42b983;
  }
}
</style>
