<template>
  <TheHeaderComp/>
  <section id="MainBlock">
    <aside id="MainBlock_LeftOtherInfo">
      <ProfileMenuComp/>

      <TheFooterComp/>
    </aside>
    
    <SettingsComp/> 
  </section> 
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { ref } from 'vue';
    import { useMainStore } from '@/stores/main';
    import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
    import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';
    import ProfileMenuComp from '@/widgets/features/ProfileMenuComp.vue';
    import SettingsComp from '@/widgets/settingsPage/SettingsComp.vue';

    export default defineComponent({
        name: 'settings',
        setup() {
            const store = useMainStore();
            const token = ref('' as string | undefined);
            const isDarkTheme = ref(store.isDarkTheme);

            const getCookie = (name:string) => {
                let matches = document.cookie.match(new RegExp(
                  //eslint-disable-next-line
                  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            }

            onMounted(() => {
                token.value = getCookie('token');
            });

            store.$subscribe(() => {
                isDarkTheme.value = store.isDarkTheme;
            })

            return {
                store,
                token,
                isDarkTheme,
                getCookie
            }
        },
        components: {
            TheHeaderComp,
            ProfileMenuComp,
            TheFooterComp,
            SettingsComp
        }
    })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  #MainBlock {
    display: flex;
    margin-top: 15px;
    width: 75%;
    padding: 0 12.5%;
    font-weight: 700;
    #MainBlock_LeftOtherInfo {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 280px;
      height: 296px;
      background-color: $DarkBgBlocksTheme;
      border: 2px solid $BorderColor;
      border-radius: 5px;
      transition: 400ms ease;
    }
  }
</style>