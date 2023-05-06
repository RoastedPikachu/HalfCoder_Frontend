<template>
  <section id="CookieBlock" 
    :class="{ whiteCookieTheme: !isDarkTheme }"
    v-if="isCookieOpen"
  >
    <i class="fa-solid fa-xmark" @click="closeCookie()"></i>

    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.119 0C19.9838 1.11237 19.1978 2.53184 18.8575 4.08435C18.5171 5.63686 18.6372 7.25495 19.203 8.74023C19.7687 10.2255 20.7556 11.5134 22.0426 12.446C23.3296 13.3787 24.8607 13.9155 26.4483 13.9907C27.201 15.5841 28.449 16.8913 30.0059 17.7168C31.5628 18.5424 33.3451 18.842 35.0863 18.571C35.0283 18.9893 34.9994 19.4111 35 19.8333C35 23.8817 37.527 27.244 40.8404 27.888C39.5759 31.5297 37.3335 34.753 34.3588 37.2049C31.3841 39.6567 27.7919 41.2425 23.9759 41.7884C20.1598 42.3343 16.2671 41.8192 12.7243 40.2997C9.18148 38.7801 6.1253 36.3147 3.89062 33.1736C1.65594 30.0325 0.328985 26.3369 0.0551595 22.4917C-0.218666 18.6465 0.571205 14.8001 2.33822 11.374C4.10524 7.94795 6.78121 5.07435 10.0729 3.0681C13.3647 1.06186 17.1451 0.000385711 21 0H21.119ZM21 30.3333C20.3812 30.3333 19.7877 30.5792 19.3501 31.0167C18.9125 31.4543 18.6667 32.0478 18.6667 32.6667C18.6667 33.2855 18.9125 33.879 19.3501 34.3166C19.7877 34.7542 20.3812 35 21 35C21.6189 35 22.2123 34.7542 22.6499 34.3166C23.0875 33.879 23.3333 33.2855 23.3333 32.6667C23.3333 32.0478 23.0875 31.4543 22.6499 31.0167C22.2123 30.5792 21.6189 30.3333 21 30.3333ZM10.5 25.6667C10.1906 25.6667 9.89385 25.7896 9.67506 26.0084C9.45626 26.2272 9.33335 26.5239 9.33335 26.8333C9.33335 27.1428 9.45626 27.4395 9.67506 27.6583C9.89385 27.8771 10.1906 28 10.5 28C10.8094 28 11.1062 27.8771 11.325 27.6583C11.5438 27.4395 11.6667 27.1428 11.6667 26.8333C11.6667 26.5239 11.5438 26.2272 11.325 26.0084C11.1062 25.7896 10.8094 25.6667 10.5 25.6667ZM26.8333 23.3333C26.5239 23.3333 26.2272 23.4562 26.0084 23.675C25.7896 23.8938 25.6667 24.1906 25.6667 24.5C25.6667 24.8094 25.7896 25.1062 26.0084 25.325C26.2272 25.5438 26.5239 25.6667 26.8333 25.6667C27.1428 25.6667 27.4395 25.5438 27.6583 25.325C27.8771 25.1062 28 24.8094 28 24.5C28 24.1906 27.8771 23.8938 27.6583 23.675C27.4395 23.4562 27.1428 23.3333 26.8333 23.3333ZM12.8333 11.6667C11.9051 11.6667 11.0149 12.0354 10.3585 12.6918C9.7021 13.3482 9.33335 14.2384 9.33335 15.1667C9.33335 16.0949 9.7021 16.9852 10.3585 17.6415C11.0149 18.2979 11.9051 18.6667 12.8333 18.6667C13.7616 18.6667 14.6518 18.2979 15.3082 17.6415C15.9646 16.9852 16.3333 16.0949 16.3333 15.1667C16.3333 14.2384 15.9646 13.3482 15.3082 12.6918C14.6518 12.0354 13.7616 11.6667 12.8333 11.6667V11.6667ZM32.6667 7C33.2855 7 33.879 7.24583 34.3166 7.68342C34.7542 8.121 35 8.71449 35 9.33333C35 9.95217 34.7542 10.5457 34.3166 10.9832C33.879 11.4208 33.2855 11.6667 32.6667 11.6667C32.0478 11.6667 31.4543 11.4208 31.0168 10.9832C30.5792 10.5457 30.3333 9.95217 30.3333 9.33333C30.3333 8.71449 30.5792 8.121 31.0168 7.68342C31.4543 7.24583 32.0478 7 32.6667 7V7ZM40.8334 9.33333C41.1428 9.33333 41.4395 9.45625 41.6583 9.67504C41.8771 9.89383 42 10.1906 42 10.5C42 10.8094 41.8771 11.1062 41.6583 11.325C41.4395 11.5437 41.1428 11.6667 40.8334 11.6667C40.5239 11.6667 40.2272 11.5437 40.0084 11.325C39.7896 11.1062 39.6667 10.8094 39.6667 10.5C39.6667 10.1906 39.7896 9.89383 40.0084 9.67504C40.2272 9.45625 40.5239 9.33333 40.8334 9.33333ZM26.8333 2.33333C27.1428 2.33333 27.4395 2.45625 27.6583 2.67504C27.8771 2.89383 28 3.19058 28 3.5C28 3.80942 27.8771 4.10617 27.6583 4.32496C27.4395 4.54375 27.1428 4.66667 26.8333 4.66667C26.5239 4.66667 26.2272 4.54375 26.0084 4.32496C25.7896 4.10617 25.6667 3.80942 25.6667 3.5C25.6667 3.19058 25.7896 2.89383 26.0084 2.67504C26.2272 2.45625 26.5239 2.33333 26.8333 2.33333Z" fill="white"/>
    </svg>  

    <p>Мы используем файлы куки, при помощи них мы подбираем вам контент и анализируем наш трафик</p>
    
    <button @click="closeCookie()">Принять</button>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/main';

  export default defineComponent({
    name: 'CookieComp',
    setup() {
      const store = useMainStore();
      const isCookieOpen = ref(store.isCookieOpen);
      const isDarkTheme = ref(store.isDarkTheme);

      const closeCookie = ():void => {
        store.closeCookieBlock();
        isCookieOpen.value = store.isCookieOpen;
      }

        store.$subscribe(() => {
            isCookieOpen.value = store.isCookieOpen;
            isDarkTheme.value = store.isDarkTheme;
        })

      return {
        store,
        isCookieOpen,
        isDarkTheme,
        closeCookie
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  section {
    background-color: #1b1b1b;
    border: 2px solid #a8b3cf;
    i {
      color: #a8b3cf;
    }
    p {
      color: #cfd6e6;
    }
    button {
      background-color: #ffffff;
      color: #0e1217;
    }
    button:hover {
      background-color: #0e1217;
      border: 1.5px solid #a8b3cf;
      color: #cfd6e6;
    }
  }
  #CookieBlock {
    position: fixed;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 100%;
    left: 10%;
    bottom: 5%;
    padding: 0 2.5%;
    width: 10%;
    height: 40%;
    border-radius: 15px;
    transition: 400ms ease;
    i {
      position: absolute;
      top: 7.5%;
      right: 10%;
      font-size: 24px;
      transition: 400ms ease;
      cursor: pointer;
    }
    svg {
      margin-top: 0px;
      width: 100%;
      height: 40%;
      path {
        transition: 400ms ease;
      }
    }
    p {
      margin-top: -27.5%;
      width: 100%;
      height: auto;
      font-size: 14px;
      font-weight: 400;
      font-family: $SpaceGrotesk;
      text-align: center; 
      transition: 400ms ease;
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 32.5px;
      border: none;
      border-radius: 10px;
      font-weight: 700;
      font-family: $Inter;
      transition: 400ms ease;
      cursor: pointer;
    }
  }

  .whiteCookieTheme {
    background-color: #ffffff;
    border: 2px solid rgba(116, 116, 116, 0.5);
    i {
      color: #1e1e1e;
    }
    svg {
      path {
        fill: #1e1e1e;
      }
    }
    p {
      color: #1e1e1e;
    }
    button {
      background-color: #1e1e1e;
      color: #ffffff;
    }
    button:hover {
      background-color: #ffffff;
      border: 1.5px solid #1e1e1e;
      color: #1e1e1e;
    }
  }
</style>