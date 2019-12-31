<template>
  <div id="avatar">
    <el-avatar :size="33" :src="avatarUrl"></el-avatar>
  </div>
</template>
<script>
export default {
  name: 'avatar',
  props: ['avatarUrl']
}
</script>
<style>
  #avatar {
    cursor: pointer;
    color: #409EFF;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
