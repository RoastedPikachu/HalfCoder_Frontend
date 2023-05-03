<template>
  <div id="ElemBrieflyInfo" :class="{ whiteBrieflyInfoTheme: !isDarkTheme }">
    <div class="ElemBrieflyInfo_Rating_infoUser_image"></div>
    
    <span>
      <p></p>
      <p></p>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, watch } from 'vue';
  import { useMainStore } from '@/stores/main';

  export default defineComponent({
    name: 'ItemBrieflyInfoCompLoading',
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
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  #ElemBrieflyInfo {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: transparent;
    .ElemBrieflyInfo_Rating_infoUser_image {
      position: relative;
      width: 40px;
      height: 40px;
      background-color: rgba(116, 116, 116, 0.5);
      border-radius: 5px;
    }
    span {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px;
      width: 30%;
      p {
        width: 70%;
        height: 12.5px;
        background-color: rgba(116, 116, 116, 0.5);
        border-radius: 2.5px;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        text-align: left;
        transition: 400ms ease;
      }
      p:last-child {
        margin-top: 7.5px;
        width: 90%;
        font-size: 12px;
      }
    }
  }
  
</style>