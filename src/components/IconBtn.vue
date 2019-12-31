<template lang="html">
  <div class='iconWithWord'>
    <i :class="iconName"></i>
    <div>{{keyWord}}</div>
  </div>
</template>

<script>
export default {
  name: 'iconbtn',
  props: ['iconName', 'keyWord']
}
</script>

<style lang='less'>
  .iconWithWord {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 70px;
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
    i {
      font-size: 25px;
      position: absolute;
      left: 50%;
      top: 10px;
      transform: translate(-50%, 0)
    }
    div {
      white-space: nowrap;
      position: absolute;
      left: 50%;
      bottom: 12px;
      transform: translate(-50%,0);
    }
  }
</style>
