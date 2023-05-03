<template>
  <footer>
    <span>
      <a href="/" target="blank">О нас</a>

      <a href="/" target="blank">Поддержка</a>

      <NuxtLink to="/docs/termsOfUse" class="route" target="_blank">Документы</NuxtLink>
    </span>

    <span>©{{ year }} &lt; HalfCoder /></span>

    <span id="SocialNetworkLinks">
      <a href="https://vk.com/halfcoder" id="SocialNetworkLinks_Vk">
        <img src="@/assets/grey_vk_icon.svg" alt="Вконтакте">
      </a>

      <a href="https://t.me/halfcoder" id="SocialNetworkLinks_Tg">
        <img src="@/assets/grey_telegramm_icon.svg" alt="Telegram">
      </a>
      
      <a href="https://m.dzen.ru/halfcoder" id="SocialNetworkLinks_Dzen">
        <img src="@/assets/dzen_icon.svg" alt="Дзен">
      </a>
    </span>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';

  export default defineComponent({
    name: 'FooterComp',
    setup() {
      const year = ref(new Date().getFullYear());

      return {
        year
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  footer {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 17px;
    padding: 0 2.5%;
    width: 95%;
    height: 60px;
    color: #747474;
    font-size: 12px;
    font-weight: 700;
    font-family: $SpaceGrotesk;
    a {
      color: #747474;
      line-height: 25px;
      text-decoration: none;
      transition: 400ms ease;
      outline: none;
    }
    .route {
      color: #747474;
      line-height: 25px;
      text-decoration: none;
      transition: 400ms ease;
      outline: none;
    }
    .route:hover {
      color: #3d5aff;
    }
    a:hover {
      color: #3d5aff;
    }
    span {
      display: flex;
      justify-content: space-around;
      width: 85%;
      text-align: center;
      line-height: 25px;
    }
    span:last-child {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 5px;
      width: 50%;
      a {
        width: 26px;
        height: 26px;
        transition: 400ms ease;
        img {
          width: 100%;
          height: 100%;
        }
      }
      a:last-child {
        width: 22px;
        height: 22px;
      }
      a:hover {
        transform: translateY(5px);
      }
    }
  }
</style>