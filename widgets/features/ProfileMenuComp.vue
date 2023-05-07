<template>
  <div id="Profile_menuIcons" :class="{ whiteProfileMenuTheme: !isDarkTheme }">
    <span>
      <img src="@/assets/home_icon.svg" alt="Feed">
      <p>Новости</p>
    </span>

    <span>
      <img src="@/assets/connections_icon.svg" alt="Связи">
      <NuxtLink to="/createPost" class="route">Связи</NuxtLink>
    </span>

    <span>
      <img src="@/assets/news_icon.svg" alt="Последние новости">
      <p>Последние новости</p>
    </span>

    <span>
      <img src="@/assets/events_icon.svg" alt="События">
      <NuxtLink to="/events" class="route">События</NuxtLink>
    </span>

    <span>
      <img src="@/assets/groups_icon.svg" alt="Группы">
      <p>Группы</p>
    </span>

    <span>
      <img src="@/assets/notifications_icon.svg" alt="Уведомления">
      <p>Уведомления</p>
    </span>

    <SettingsLinkComp/>
  </div>
  <div id="Profile_checkProfile" 
    :class="{ whiteButtonTheme: !isDarkTheme }" 
    v-if="isSignIn"
  >
    <button>Просмотр профиля</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/main';
  import SettingsLinkComp from '@/widgets/shared/SettingsLinkComp.vue';

  export default defineComponent({
    name: 'ProfileMenuComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);
      const isSignIn = ref(store.isSignIn);

      store.$subscribe(() => {
          isSignIn.value = store.isSignIn;
          isDarkTheme.value = store.isDarkTheme;
      })

      return {
        store,
        isDarkTheme,
        isSignIn
      }
    },
    components: {
      SettingsLinkComp
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  div {
    color: $DarkMenuFontColor;
    span {
      .route {
        color: $DarkMenuFontColor;
      }
    }
    button {
      color: $BlueButtonFontColor;
      background-color: $DarkBgBlocksTheme;
    }
    button:hover {
      color: $DarkMenuFontColor;
    }
  }
  #Profile_menuIcons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0 6.25%;
    width: 87.5%;
    height: 220px;
    transition: 400ms ease;
    span {
      display: flex;
      align-items: flex-end;
      width: 100%;
      height: 18px;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
      }
      // Заменить все p на router-link
      p {
        margin-left: 10px;
        height: 22px;
        font-size: 20px;
        font-weight: 700;
        font-family: $SpaceGrotesk;
      }
      .route {
        margin-left: 10px;
        height: 22px;
        font-size: 20px;
        font-weight: 700; 
        font-family: $SpaceGrotesk;
        transition: 400ms ease;
        text-decoration: none;
      }
      .route:hover {
        color: $HoverColor;
      }
    }
  }
  #Profile_checkProfile {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    border: 1px solid $BorderColor;
    border-width: 2px 0 0;
    border-radius: 0px 0px 5px 5px;
    button {
      font-size: 16px;
      font-weight: 700;
      font-family: $SpaceGrotesk;
      border: 0;
      transition: 400ms ease;
      outline: none;
      cursor: pointer;
    }
  }

  .whiteProfileMenuTheme {
    color: $WhiteMenuFontColor;
    background-color: transparent;
    span {
      .route {
        color: $WhiteMenuFontColor;
      }
    }
  }

  .whiteButtonTheme {
    button {
      background-color: $WhiteBgBlocksTheme;
    }
    button:hover {
      color: $DarkBlueButtonFontColor;
    }
  }
</style>