<template>
  <div id="ModalSignIn" v-if="active">
    <NuxtLink to="/signIn" class="routeButton">Вход</NuxtLink>
    
    <NuxtLink to="/registration" class="routeButton">Регистрация</NuxtLink>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ModalSignInComp',
    props: {
      active: Boolean
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  #ModalSignIn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    top: 35px;
    right: 0px;
    padding: 15px 15px;
    width: 160px;
    height: 110px;
    background-color: #141414;
    border: 2px solid rgba(116, 116, 116, 0.5);
    border-radius: 5px;
    z-index: 10;
    .routeButton {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90%;
      height: 30px;
      background-color: #3d5aff;
      border-radius: 5px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
      font-family: 'Space Grotesk', sans-serif;
      transition: 400ms ease;
      text-decoration: none;
    }
    .routeButton:hover {
      transform: translateY(2.5px);
    }
  }
</style>