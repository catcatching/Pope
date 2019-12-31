<template>
  <div class='experiment' :data-id="experimentId">
    <el-container>
      <el-main>
        <el-image
          style='width: 300px; height: 200px'
          :src="imgUrl"></el-image>
      </el-main>
      <el-footer>
        <div class='banner'>
          <span class="title">{{title}}</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class='el-icon-arrow-down more'></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit" command="edit">编辑</el-dropdown-item>
              <el-dropdown-item icon="el-icon-info" command="brief">简介</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <i ref='star' @click="star" :class="['star', isStar ? 'el-icon-star-on' : 'el-icon-star-off']"></i>
          <div class='subordinate'>{{author}}</div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { bus } from '../bus.js'
export default {
  name: 'experiment',
  data () {
    return {
      isStar: this.favourite
    }
  },
  props: ['imgUrl', 'author', 'title', 'favourite', 'experimentId'],
  methods: {
    star () {
      this.isStar = !this.isStar
      // To be continue
    },
    handleCommand (command) {
      if (command === 'edit') {
        console.log('edit')
        this.$router.push({ name: 'operation', query: { experimentId: this.experimentId } })
        // To be continue
      } else if (command === 'brief') {
        console.log(this.experimentId)
        // 利用bus把触发的事件传到父组件
        bus.$emit('showdialog', this.experimentId)
      }
    }
  }
}
</script>
<style lang='less'>
  .experiment {
    border: 1px solid #dcdfe6;
    border-radius: 7px;
    transform: scale(1,1);
    transition: transform 0.5s ease-out;
    &:hover {
      transform:scale(1.05,1.05);
    }
    .el-main {
      padding: 15px;
    }
    .banner {
      line-height: 18px;
      padding: 3px 15px;
      text-align: left;
      font-size: 18px;
    }
    .title {
      display: inline-block;
      width: 10em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .subordinate {
      font-size: 13px;
    }
    .star {
      float: right;
      padding-right: 8px;
      cursor: pointer;
    }
    .el-dropdown {
      float: right;
      .more {
        font-size: 20px;
      }
    }
  }
</style>
