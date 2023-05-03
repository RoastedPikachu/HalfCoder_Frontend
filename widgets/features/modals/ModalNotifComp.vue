<template>
  <div id="ModalNotifWindow" 
    :class="{ whiteNotifTheme: !isDarkTheme }" 
    v-if="active"
  >
    <span class="ModalNotifWindow_moderationStatus">
      <img src="@/assets/moderation_icon.svg" alt="Статус модерации">
      <p>Ваша статья отправлена на модерацию</p>
      <p>2ч.</p>
    </span>

    <span class="ModalNotifWindow_moderationStatus">
      <img src="@/assets/moderation_icon.svg" alt="Статус модерации">
      <p>Ваша статья отправлена на модерацию</p>
      <p>3ч.</p>
    </span>

    <span class="ModalNotifWindow_moderationStatus">
      <img src="@/assets/moderation_icon.svg" alt="Статус модерации">
      <p>Ваша статья отправлена на модерацию</p>
      <p>1ч.</p>
    </span>

    <span class="ModalNotifWindow_moderationStatus">
      <img src="@/assets/moderation_icon.svg" alt="Статус модерации">
      <p>Ваша статья отправлена на модерацию</p>
      <p>5ч.</p>
    </span>

    <span class="ModalNotifWindow_moderationStatus">
      <img src="@/assets/moderation_icon.svg" alt="Статус модерации">
      <p>Ваша статья отправлена на модерацию</p>
      <p>4ч.</p>
    </span>

    <button>Очистить</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, watch } from 'vue';
  import { useMainStore } from '@/stores/main';

  export default defineComponent({
    name: 'ModalNotifComp',
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
    props: {
      active: Boolean
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  div {
    background-color: #141414;
  }

  #ModalNotifWindow {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    top: 35px;
    right: 0px;
    padding: 15px 15px;
    width: 190px;
    height: 250px;
    border: 2px solid rgba(116, 116, 116, 0.5);
    border-radius: 5px;
    z-index: 10;
    .ModalNotifWindow_moderationStatus {
      display: flex;
      align-items: center;
      width: 100%;
      height: 32.5px;
      img {
        width: 32.5px;
        height: 100%;
      }
      p {
        color: #747474;
        font-size: 10px;
        font-weight: 500;
        font-family: 'Space Grotesk', sans-serif;
      }
      p:nth-child(2) {
        margin-left: 10px;
      }
      p:nth-child(3) {
        margin-top: 15px;
      }
    }
    button {
      width: 150px;
      height: 27.5px;
      background-color: #3d5aff;
      border: 0px;
      border-radius: 5px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
  }

  .whiteNotifTheme {
    background-color: #ffffff;
  }
</style>