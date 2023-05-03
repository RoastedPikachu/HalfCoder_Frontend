<template>
  <span :class="{ whiteSignOutTheme: !isDarkTheme }" @click="logOut()">
    <img src="@/assets/exitProfile_icon.svg" alt="Выйти из профиля">

    <p>Выход</p>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'; 
  import { ref, watch } from 'vue';
  import { useMainStore } from '@/stores/main';

  export default defineComponent({
    name: 'SignOutButtonComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);

      const logOut = ():void => {
        store.changeSignInStatus(); 
        store.clearDataAboutUser();

        document.cookie = `token; path=/; max-age=-1`;

        store.closeCookieBlock();
        location.reload();
      }

      watch(() => store.isDarkTheme, () => {
        isDarkTheme.value = store.isDarkTheme;
      });

      return {
        store,
        isDarkTheme,
        logOut
      }
    },
    props: {
      token: String
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 40px;
    border: 0px solid rgba(116, 116, 116, 0.5);
    border-width: 1px 0px;
    transition: 200ms ease;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
    p {
      margin-left: 5px;
      color: #ffffff;
      font-size: 20px;
      font-weight: 600;
      transition: 400ms ease;
    }
    p:hover {
      color: #3d5aff;
    }
  }

  .whiteSignOutTheme {
    border-width: 2px 0px;
    p {
      color: #1e1e1e;
    }
  }
</style>