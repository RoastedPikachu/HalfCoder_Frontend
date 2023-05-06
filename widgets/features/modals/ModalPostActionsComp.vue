<template>
  <div class="modalPostActions" 
    :class="{ whitePostActionsTheme: !isDarkTheme }"
    v-if="modalActionsActive" 
  >
    <button>
      <img src="@/assets/bookmark_icon.svg" alt="В закладки">
      <p>В закладки</p>
    </button>

    <button>
      <Icon name="fa6-solid:font-awesome" class="icon"/>
      <p>Репорт</p> 
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/main';

  export default defineComponent({
    name: 'ModalPostActions',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);

      store.$subscribe(() => {
          isDarkTheme.value = store.isDarkTheme;
      })

      return {
        store,
        isDarkTheme
      }
    },
    props: {
      modalActionsActive: Boolean
    }
  })

</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  .modalPostActions {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    right: 0px;
    padding: 5px;
    width: 8.5vw;
    height: 10vh;
    background-color: #141414;
    border: 2px solid rgba(116, 116, 116, 0.5);
    border-radius: 5px;
    z-index: 10;
    transition: 400ms ease;
    button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 50%;
      background-color: #141414;
      border: none;
      outline: none;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
      }
      .icon {
        width: 20px;
        height: 17.5px;
        color: #747474;
        font-size: 16px;
      }
      p {
        margin-left: 5px;
        color: #747474;
        font-size: 14px;
        font-weight: 700;
        font-family: 'Space Grotesk', sans-serif;
        transition: 400ms ease;
      }
    }
    button:nth-child(1) {
      border: 2px solid rgba(116, 116, 116, 0.5);
      border-width: 0 0 2px;
    }
    button:hover {
      p {
        color: #3d5aff;
      }
    }
  }

  .whitePostActionsTheme {
    background-color: #ffffff;
    button {
      background-color: #ffffff;
    }
  }
</style>