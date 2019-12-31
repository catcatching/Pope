<template>
<div>
<div class="myHeader" height="50" >
  <el-row type="flex" justify="center" >
    <el-col :xs="6" :xl="4" :lg="4"><div class="grid-content">
      <router-link :to="{name:'homepage'}">LOGO</router-link>
    </div></el-col>
    <el-col class="hidden-xs-only" :span="3"><div class="grid-content">
      粉丝：{{fans}}
    </div></el-col>
    <el-col class="hidden-xs-only" :span="3"><div class="grid-content">
      关注：{{follow}}
    </div></el-col>
    <el-col :xs="14" :xl="6" :lg="6"><div class="grid-content">
      <el-input size="medium"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input2">
      </el-input>
    </div></el-col>
    <el-col :span="4"><div class="grid-content">
      <el-dropdown>
        <div class="el-dropdown-link">
          <avatar :username="userName" :avatarUrl="circleUrl" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>实验</el-dropdown-item>
          <el-dropdown-item>动态</el-dropdown-item>
          <el-dropdown-item>消息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div></el-col>
  </el-row>
</div>
<el-main type="primary" >
    <el-row v-for="(item, index) in items" :key="index" type="flex" justify="center" >
        <el-col :xs="22" :xl="14" :lg="14" >
            <el-card class="box-card" shadow="hover" >
              <div slot="header" class="clearfix">
                <span style="float: left;" >{{item.type}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
              </div>
              <div class="text item">
                {{ item.message }}
              </div>
            </el-card>
        </el-col>
    </el-row>
</el-main>
</div>
</template>
<script>
export default {
  name: 'personal',
  data () {
    return {
      userName: '小明',
      input2: '',
      fans: 0,
      follow: 0,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      items: [
        {
          type: '实验动态',
          message: '有人关注了你的实验'
        },
        {
          type: '我的贴子',
          message: '你的贴子有人回复'
        },
        {
          type: '新的消息',
          message: '有人关注了你'
        }
      ]
    }
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    min-height: 36px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .text {
    font-size: 14px;
    text-align: left;/*未知原因导致文字默认居中，通过text-align设置文字左对齐*/
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    margin-bottom: 20px;
  }
</style>
