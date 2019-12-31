<template lang="html">
  <div class="apparatus">
    <div class="aptImg">
      <img :src="imgUrl" alt="">
    </div>
    <div class="aptTitle">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'apparatus',
  props: ['imgUrl', 'title']
}
</script>

<style lang='less'>
  .apparatus {
    width: 133px;
    height: 133px;
    overflow: hidden;
    border: 1px solid #232529;
    border-radius: 10px;
    background-color: #27292f;
    &:hover {
      border: 1px solid #f9fafc;
    }
    .aptImg {
      width: 133px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .aptTitle {
      width: 133px;
      height: 33px;
      line-height: 33px;
      font-size: 18px;
      color: white;
    }
  }
</style>
