<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/main';

  export default defineComponent({
    name: 'App',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);

      const changeBodyTheme = () => {
        if(isDarkTheme.value) {
          document.body.style.backgroundColor="#1e1e1e";
          document.body.style.colorScheme="dark";
        } else {
          document.body.style.backgroundColor="#ffffff";
          document.body.style.colorScheme="light";
        }
      }

      store.$subscribe(() => {
          isDarkTheme.value = store.isDarkTheme;
          console.log(isDarkTheme.value);
          changeBodyTheme();
      })

      return {
        store,
        isDarkTheme
      }
    }
  })
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  @import '@/styles/variables';

  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: $DarkBgTheme;
    transition: 400ms ease;
  }

</style>
