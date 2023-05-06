<template>
    <div id="ElemBrieflyInfo" :class="{ whiteBrieflyInfoTheme: !isDarkTheme }">
        <div class="ElemBrieflyInfo_Rating_infoUser_image">
            <img
              :src="image"
              :alt="name"
            >
        </div>

        <span>
            <p>{{ name }}</p>
            <p>{{ employment }}</p>
        </span>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { ref } from 'vue';
    import { useMainStore } from '@/stores/main';

    export default defineComponent({
        name: 'ItemBrieflyInfoComp',
        props: {
            image: String,
            name: String,
            employment: String
        },
        setup(props) {
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
    })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  div {
    span {
      p {
        color: #ffffff;
      }
    }
  }

  #ElemBrieflyInfo {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: transparent;
    .ElemBrieflyInfo_Rating_infoUser_image {
      position: relative;
      width: 40px;
      height: 40px;
      background-color: #747474;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        color: #ffffff;
      }
    }
    span {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px;
      width: 70%;
      p {
        width: 100%;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        text-align: left;
        transition: 400ms ease;
      }
      p:last-child {
        margin-top: 5px;
        color: #747474;
        font-size: 12px;
      }
    }
  }

  .whiteBrieflyInfoTheme {
    span {
      p {
        color: #1e1e1e;
      }
    }
  }
  
</style>