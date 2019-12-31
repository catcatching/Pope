<template lang="html">
  <div>
    <div class='header'>
      <div class="back" @click="back">
        <i class="el-icon-back"></i>
      </div>
      <div class='iconleft'>
        <iconbtn iconName="el-icon-folder-checked" keyWord='保存'></iconbtn>
        <iconbtn iconName="el-icon-delete" keyWord='清空'></iconbtn>
      </div>
      <span class="title">比较两个灯泡的亮暗</span>
      <div class='iconright'>
        <iconbtn iconName="el-icon-setting" keyWord='设置'></iconbtn>
        <iconbtn iconName="el-icon-more-outline" keyWord='更多'></iconbtn>
      </div>
    </div>
    <div class="main">
      <div class="operatingInterface">
      </div>
      <div class="aside" ref="aside">
        <div class="collapse">
          <i :class="isCollapse ? 'el-icon-caret-left' : 'el-icon-caret-right'" @click="toggleCollapse"></i>
        </div>
        <div class="searchBox">
          <el-input class="search"
            size="small"
            placeholder="搜索"
            prefix-icon="el-icon-search"
            v-model="input">
          </el-input>
        </div>
        <div class="scrollBox">
          <div class="apparatusBox">
            <apparatus v-for="(item, index) in apparatuses" :key="index" :imgUrl="item.imgUrl" :title="item.title"></apparatus>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Apparatus from '../components/Apparatus.vue'
import IconBtn from '../components/IconBtn.vue'
export default {
  name: 'operation',
  components: {
    'apparatus': Apparatus,
    'iconbtn': IconBtn
  },
  data () {
    return {
      input: '',
      isCollapse: false,
      apparatuses: [
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '小车'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '弹簧测力计'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '小木块'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '磁铁'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '二极管'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '电压表'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '电流表'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '滑动变阻器'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '100Ω电阻'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '1000Ω电阻'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '电阻丝'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '灯泡'
        },
        {
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '电池'
        }
      ]
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    toggleCollapse () {
      this.$refs.aside.style.right = '0px'
      if (this.isCollapse) {
      } else {
        this.$refs.aside.style.right = '-305px'
        console.log('Hello World!')
      }
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang='less'>
  .header {
    width: 100%;
    height: 70px;
    background-color: #f9fafc;
    .back {
      float: left;
      width: 80px;
      height: 100%;
      font-size: 30px;
      line-height: 70px;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
    .iconleft {
      float: left;
    }
    .title {
      position: relative;
      // 平衡返回键导致的居中偏右
      left: -40px;
      line-height: 70px;
      font-size: 20px;
      text-align: center;
    }
    .iconright {
      float: right;
    }
  }
  .main {
    position: absolute;
    top: 70px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    .operatingInterface {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #343941;
    }
    .aside {
      position: fixed;
      right: 0px;
      top: 70px;
      bottom: 0px;
      width: 305px;
      background-color: #292c32;
      transition: right 0.3s ease;
      .collapse {
        width: 30px;
        height: 60px;
        cursor: pointer;
        // 使水平居中
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 305px;
        box-sizing: border-box;
        font-size: 30px;
        color: white;
        line-height: 60px;
      }
      .searchBox {
        width: 280px;
        height: 32px;
        padding: 10px;
        background-color: #292c32;
        color: #808080;
        .search {
          width: 280px;
        }
        input {
          border: 1px solid #808080;
          background-color: #24272d;
          &:hover,&:focus {
            border: 1px solid #2385e9;
          }
        }
      }
      .scrollBox {
        position: absolute;
        top: 52px;
        right: 0px;
        bottom: 10px;
        width: 305px;
        display: grid;
        .apparatusBox {
          // 使用网格式布局
          display: grid;
          justify-content: center;
          grid-template-columns: repeat(auto-fill, 135px);
          grid-template-rows: repeat(auto-fill, 135px);
          grid-gap: 10px;
          // 设置滚动及滚动条且不用时自动隐藏
          overflow-y: hidden;
          padding-right: 5px;
          &:hover {
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 0px;
          }
          &::-webkit-scrollbar {
            width: 5px;
            background-color: #eee;
          }
          &::-webkit-scrollbar-track {
            background-color: #292c32;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: #a6acaf;
          }
        }
      }
    }
  }
</style>
