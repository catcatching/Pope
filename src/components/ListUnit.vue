<template>
  <div class="ListUnit">
    <span><a :href="actorUrl">{{actor}}</a></span>
    {{action}}
    <span><a :href="thingUrl">{{thing}}</a></span>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  props: ['actor', 'actorUrl', 'action', 'thing', 'thingUrl']
}
</script>

<style lang='less'>
  .ListUnit {
      padding: 16px 12px;
      //border-bottom: 1px solid #e6e6e6;
      a {
        color: #409EFF;
        &:hover {
          color: #207EDF;
        }
      }
      .divider {
        position: relative;
        top: 16px;
        background: #e6e6e6;
        height: 1px;
      }
  }
</style>
