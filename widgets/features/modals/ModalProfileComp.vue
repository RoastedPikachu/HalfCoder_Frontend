<template>
  <div id="ModalProfileWindow" 
    :class="{ whiteModalProfileTheme: !isDarkTheme }" 
    v-if="active"
  >
    <ItemBrieflyInfoComp
      :name="name"
      :image="image"
      :employment="employment"
    />

    <button id="ModalProfileWindow_profileButton">Профиль</button>

    <div id="ModalProfileWindow_buttons">
      <SettingsLinkComp/>
      <SupportLinkComp/>
    </div>

    <SignOutButtonComp 
      :token="token"
    />
    <div class="modalProfileWindow_changeTheme_container">
      <div id="ModalProfileWindow_changeTheme" class="modalProfileWindow_theme">
        <input type="checkbox" id="slide">
        <label id="slider" for="slide" @click="changeTheme()"></label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { ref, watch } from 'vue';
    import { useMainStore } from '@/stores/main';
    import ItemBrieflyInfoComp from '@/widgets/shared/ItemBrieflyInfoComp.vue';
    import SettingsLinkComp from '@/widgets/shared/SettingsLinkComp.vue';
    import SupportLinkComp from '@/widgets/shared/SupportLinkComp.vue';
    import SignOutButtonComp from '@/widgets/shared/buttons/SignOutButtonComp.vue';

    export default defineComponent({
      name: "ModalProfileComp",
      props: {
          name: String,
          image: String,
          employment: String,
          active: Boolean,
          token: String
      },
      setup() {
        const store = useMainStore();
        const isDarkTheme = ref(store.isDarkTheme);
        const starStatus = ref(false);

        const changeTheme = () => {
          store.changeThemeColor();
        }

        watch(() => store.isDarkTheme, () => {
          isDarkTheme.value = store.isDarkTheme;
        });

        return {
          store,
          isDarkTheme,
          starStatus,
          changeTheme
        }
      },
      components: {
        ItemBrieflyInfoComp,
        SettingsLinkComp,
        SupportLinkComp,
        SignOutButtonComp
      },
    })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  div {
    background-color: #141414;
    #ModalProfileWindow_buttons {
      background-color: #141414;
    }
    .modalProfileWindow_changeTheme_container {
      background-color: #1e1e1e;
      #ModalProfileWindow_changeTheme {
        background-image: url('@/assets/darkTheme_bg.svg');
        #slider {
          height: 40px;
          background-image: url('@/assets/slider_dark.svg');
        }
      }
    }
  }

  #ModalProfileWindow {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    top: 35px;
    right: 0px;
    padding: 15px 15px;
    width: 195px;
    height: 280px;
    border: 2px solid rgba(116, 116, 116, 0.5);
    border-radius: 5px;
    transition: 400ms ease;
    z-index: 10;
    #ModalProfileWindow_profileButton {
      margin-top: 10px;
      width: 100%;
      height: 30px;
      background-color: #3d5aff;
      border: 0px;
      border-radius: 5px;
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;
    }
    #ModalProfileWindow_buttons {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: 75px;
      transition: 400ms ease;
    }
    .ModalProfileWindow_buttonContainer {
      display: flex;
      height: 65px;
      border: 0px solid #747474;
      border-width: 1px 0px;
      transition: 400ms ease;
    }
    .modalProfileWindow_changeTheme_container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      padding: 3px 5px;
      width: 70px;
      height: 37.5px;
      border: none;
      border-radius: 20px;
      transition: 100ms ease;
      #ModalProfileWindow_changeTheme {
        position: relative;
        width: 100%;
        height: 85%;
        background-color: transparent;
        background-size: cover;
        transition: 300ms ease;
        #slide {
          display: none;
          outline: none;
        }
        #slider {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          top: -3.5px;
          left: -2.5px;
          width: 40px;
          background-size: cover;
          border-radius: 50px;
          transition: height 150ms, background-image 150ms, transform 400ms ease;
          cursor: pointer;
        }
      }
    }
  }
  .whiteModalProfileTheme {
    background-color: #ffffff;
    #ModalProfileWindow_buttons {
      background-color: #ffffff;
    }
    .modalProfileWindow_changeTheme_container {
      background-color: rgba(61, 90, 255, 0.13);
      #ModalProfileWindow_changeTheme {
        background-image: url('@/assets/whiteTheme_bg.svg');
        #slider {
          height: 41.5px;
          background-image: url('@/assets/slider_white.svg');
          transform: translateX(32.5px);
        }
      }
    }
  }
</style>