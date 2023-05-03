<template>
  <span :class="{ whiteSettingsTheme: !isDarkTheme }">
    <img src="@/assets/settings_icon.svg" alt="Настройки">
    
    <NuxtLink to="/settings" class="profile_menuIcons_route">Настройки</NuxtLink>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, watch } from 'vue';
  import { useMainStore } from '@/stores/main';

  export default defineComponent({
    name: 'SettingsLinkComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);

      watch(() => store.isDarkTheme, () => {
        isDarkTheme.value = store.isDarkTheme;
      });

      return {
        store,
        isDarkTheme
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  span {
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 18px;
    background-color: transparent;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
    .profile_menuIcons_route {
      margin-left: 10px;
      height: 22px;
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
      transition: 400ms ease;
      text-decoration: none;
      outline: none;
    }
    .profile_menuIcons_route:hover {
      color: #3d5aff;
    }
  }

  .whiteSettingsTheme {
    .profile_menuIcons_route {
      color: #1e1e1e;
    }
  }
</style>