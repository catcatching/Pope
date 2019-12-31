<template>
  <div>
    <div class="myHeader" id="stickyHeader" height="50" >
      <div ref="vision" class="vision">
        <el-row type="flex" justify="center" >
          <el-col :xs="6" :lg="4" :xl="4"><div class="grid-content">
            <router-link :to="{name:'homepage'}">LOGO</router-link>
          </div></el-col>
          <el-col :offset="6" :xs="14" :lg="6" :xl="6"><div class="grid-content">
            <el-input size="medium"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input">
            </el-input>
          </div></el-col>
          <el-col :offset="1" :span="3"><div class="grid-content">
            <el-popover
              placement="bottom"
              title="通知"
              width="350"
              trigger="click"
              v-model="isShowNotification">
              <div class="popover-body" @mouseover="isScrolling = true" @mouseout="isScrolling = false">
                <listunit v-for="(notification, index) in notifications" :key="index" :actor="notification.actor" :actorUrl="notification.actorUrl" :action="notification.action" :thing="notification.thing" :thingUrl="notification.thingUrl"></listunit>
              </div>
              <i class="el-icon-message-solid button" slot="reference"></i>
            </el-popover>
            <el-popover
              placement="bottom"
              title="私信"
              width="350"
              trigger="click"
              v-model="isShowMessage">
              <div class="popover-body" @mouseover="isScrolling = true" @mouseout="isScrolling = false">
                <el-button size="mini" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
              </div>
              <i class="el-icon-s-promotion button" slot="reference"></i>
            </el-popover>
            <el-dropdown placement="bottom">
              <router-link :to="{name:'personal'}" >
                <avatar :avatarUrl="circleUrl" />
              </router-link>
              <el-dropdown-menu slot="dropdown">
                <router-link :to="{name:'personal'}" >
                  <el-dropdown-item><i class="el-icon-s-custom"></i>我的主页</el-dropdown-item>
                </router-link>
                <el-dropdown-item><i class="el-icon-s-opportunity"></i>我的实验</el-dropdown-item>
                <el-dropdown-item><i class="el-icon-s-tools"></i>设置</el-dropdown-item>
                <el-dropdown-item><i class="el-icon-switch-button"></i>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div></el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="4" class="hidden-xs-only"><div class="grid-content" id="logo" @click="backToTop">LOGO</div></el-col>
          <el-col :xs="24" :lg="9" :xl="9"><div class="grid-content">
            <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#f9fafc" active-text-color="#409EFF" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">官方实验</el-menu-item>
              <el-menu-item index="2">学友实验</el-menu-item>
              <el-menu-item index="3">我的实验</el-menu-item>
            </el-menu>
          </div></el-col>
          <el-col :span="4" class='hidden-sm-and-down'><div class="grid-content">
            <el-input size="small"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input">
            </el-input>
          </div></el-col>
          <el-col :xs="4" :lg="2" :xl="2"><div class="grid-content">
            <el-button type="primary" class="hidden-xs-only" size="small" @click="createExperiment" plain>创作实验</el-button>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <el-main>
      <el-menu :default-active="activeIndex" class="el-menu-demo" active-text-color="#409EFF" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">官方实验</template>
          <el-menu-item index="2-0">所有实验</el-menu-item>
          <el-menu-item index="2-1">光学实验</el-menu-item>
          <el-menu-item index="2-2">电学实验</el-menu-item>
          <el-menu-item index="2-3">力学实验</el-menu-item>
          <el-menu-item index="2-3">声学实验</el-menu-item>
          <el-menu-item index="2-3">热学实验</el-menu-item>
          <el-menu-item index="2-3">家庭电路</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">学友实验</el-menu-item>
        <el-menu-item index="3">我的实验</el-menu-item>
      </el-menu>
      <div ref='expBlock' class='expBlock' @click="goToOperation">
        <experiment v-for="(item, index) in items" :key="index" :imgUrl="item.imgUrl" :author="item.author" :title="item.title" :favourite="item.favourite" :experimentId="item.id" ></experiment>
      </div>
    </el-main>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span>{{dialogContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css'
import ListUnit from '../components/ListUnit'
import { bus } from '../bus.js'
export default {
  name: 'homepage',
  components: {
    listunit: ListUnit
  },
  data () {
    return {
      isMerge: false,
      isShowNotification: false,
      isShowMessage: false,
      dialogVisible: false,
      // 由于无法阻止子元素中的scroll事件冒泡，便通过变量isScrolling控制全局scroll事件不与子元素scroll事件同时触发
      isScrolling: false,
      dialogTitle: '简单电路-短路',
      dialogContent: '这里是居中的内容，这里是简介',
      userName: '小明',
      input: '',
      activeIndex: '1',
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      notifications: [
        { 'actor': '小明', 'actorUrl': '#', 'action': '收藏了实验', 'thing': '组装电路', 'thingUrl': '#' },
        { 'actor': 'alice', 'actorUrl': '#', 'action': '点赞了实验', 'thing': '简单电路', 'thingUrl': '#' },
        { 'actor': 'bob', 'actorUrl': '#', 'action': '评论了你的动态', 'thing': '简单电路-短路', 'thingUrl': '#' },
        { 'actor': 'catherine', 'actorUrl': '#', 'action': '评论了实验', 'thing': '简单电路-断路', 'thingUrl': '#' },
        { 'actor': 'leon', 'actorUrl': '#', 'action': '回复了评论', 'thing': '电源断路', 'thingUrl': '#' },
        { 'actor': 'caribou', 'actorUrl': '#', 'action': '收藏了你的实验', 'thing': '练习连接电路', 'thingUrl': '#' },
        { 'actor': 'locust', 'actorUrl': '#', 'action': '点赞了你的实验', 'thing': '探究物体的动能跟那些因素有关', 'thingUrl': '#' },
        { 'actor': 'lily', 'actorUrl': '#', 'action': '回复了评论', 'thing': '组装电路', 'thingUrl': '#' }
      ],
      items: [
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': '小明',
          'title': '组装电路',
          'favourite': true,
          'id': 1
        },
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': 'alice',
          'title': '简单电路',
          'favourite': false,
          'id': 2
        },
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': 'alice',
          'title': '探究物体的动能跟那些因素有关',
          'favourite': true,
          'id': 3
        },
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': 'bob',
          'title': '简单电路-短路',
          'favourite': false,
          'id': 4
        },
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': 'catherine',
          'title': '简单电路-断路',
          'favourite': false,
          'id': 5
        },
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': 'catherine',
          'title': '简单电路-断路',
          'favourite': false,
          'id': 6
        },
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': 'leon',
          'title': '练习连接电路',
          'favourite': true,
          'id': 7
        },
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': 'leon',
          'title': '练习连接电路',
          'favourite': false,
          'id': 8
        },
        {
          'imgUrl': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'author': 'dom',
          'title': '电源短路',
          'favourite': true,
          'id': 9
        }
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      window.console.log(key, keyPath)
    },
    backToTop () {
      // 利用scrollIntoView实现滚动动画
      document.documentElement.scrollIntoView(true)
    },
    handleScroll () {
      // let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      // let scrollObj = document.querySelector('.el-menu-demo')
      // 当popover滚动事件触发时，阻止全局滚动触发
      if (this.isScrolling) {
        return
      }
      // 使通知面板和私信面板在滚动时收起
      this.isShowNotification = this.isShowMessage = false
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop >= 70 && !this.isMerge && this.$refs.vision !== undefined) {
        this.$refs.vision.style.bottom = '50px'
        this.isMerge = true
      }
      if (scrollTop < 70 && this.isMerge && this.$refs.vision !== undefined) {
        this.$refs.vision.style.bottom = '0px'
        this.isMerge = false
      }
    },
    goToOperation (e) {
      var target = e.target
      // 实现事件委托
      while (this.$refs.expBlock !== target) {
        // 收藏的单机响应函数由子组件管理
        if (target.nodeName.toLowerCase() === 'i') {
          return
        }
        // 下拉菜单单机响应函数也由子组件管理
        if (target.nodeName.toLowerCase() === 'li') {
          return
        }
        if (target.nodeName.toLowerCase() === 'section') {
          var id = target.parentNode.getAttribute('data-id')
          this.$router.push({ name: 'operation', query: { experimentId: id } })
        }
        target = target.parentNode
      }
    },
    createExperiment () {
      this.$router.push({ name: 'operation', query: { experimentId: 0 } })
    }
  },
  created: function () {
    // 利用bus实例来实现组件间通信，以下为响应事件
    bus.$on('showdialog', (id) => {
      // To be continue
      this.dialogTitle = `简单电路-短路${id}`
      this.dialogVisible = true
    })
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang='less'>
  html, body {
    scroll-behavior: smooth;
  }
  #stickyHeader {
    position: fixed;
    width: 100%;
    height: 50px;
    overflow: hidden;
    z-index: 10;
  }
  .vision {
    position: relative;
    bottom: 0px;
    transition: bottom 0.3s ease;
    .button {
      color: #909399;
      font-size: 20px;
      margin:auto 0px;
      margin-right: 30px;
      &:hover {
        color: #757575;
      }
    }
  }
  // 自定义popover样式
  .el-popover {
    height: 400px;
    padding: 0px!important;
    .el-popover__title {
      padding-top: 12px;
      text-align: center;
    }
    .popover-body {
      border-top: 1px solid #e6e6e6;
      box-sizing: border-box;
      height: 360px;
      overflow-y: auto;
    }
  }
  #logo {
    cursor: pointer;
  }
  .el-main .el-menu-demo {
    padding-left: 100px;
    margin: 40px 0 15px;
  }
  .el-main .expBlock {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 342px);
    grid-gap: 28px;
  }
  .el-row {
    margin: 0;
  }
  @media only screen and (max-width: 500px) {
    .el-main .el-menu-demo  {
        padding: 0;
    }
  }
</style>
