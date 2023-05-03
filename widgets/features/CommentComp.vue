<template>
  <div class="myComment" v-if="!isOtherComment">
    <div>
      <p>Leha Ovchinnikov</p>
      <p>dsgnsfsuygdugxgsdgdsgsdgsdgsgsgsdh</p>
    </div>

    <img>
  </div>

  <div class="otherComment" v-if="isOtherComment">
    <img>
    
    <div>
      <p>Leha Ovchinnikov</p>
      <p>shshsdhshdshshhshsgd</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'CommentComp',
    props: {
      isOtherComment: Boolean,
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  .myComment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 10px;
    width: 100%;
    height: auto;
    transition: 400ms ease;
    div {
      margin-right: 2.5%;
      padding: 4px 10px;
      width: auto;
      height: auto;
      background-color: #1b1b1b;
      border-radius: 15px 0 15px 15px;
      p:first-child {
        color: #a5a5a5;
        font-size: 14px;
        font-weight: 700;
        font-family: $Inter;
        text-align: right;
      }
      p:last-child {
        font-size: 12px;
        font-weight: 500;
        font-family: $SpaceGrotesk;
        text-align: right;
      }
    }
    img {
      width: 7.5%;
      height: 37.5px;
      background-color: #ffffff;
      border-radius: 10px;
    }
  }
  .otherComment {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding-top: 10px;
    width: 100%;
    height: auto;
    transition: 400ms ease;
    img {
      width: 7.5%;
      height: 37.5px;
      background-color: #ffffff;
      border-radius: 10px;
    }
    div {
      margin-left: 2.5%;
      padding: 4px 10px;
      width: auto;
      height: auto;
      background-color: #1b1b1b;
      border-radius: 0 15px 15px 15px;
      p:first-child {
        color: #a5a5a5;
        font-size: 14px;
        font-weight: 700;
        font-family: $Inter;
      }
      p:last-child {
        font-size: 12px;
        font-weight: 500;
        font-family: $SpaceGrotesk;
      }
    }
  }
</style>