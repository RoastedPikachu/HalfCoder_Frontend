<template>
  <section id="Profile">
    <div id="Profile_topLine"></div>
    
    <ProfileMenuComp/>
  </section>
</template>

<script lang=ts>
  import { defineComponent } from 'vue';
  import ProfileMenuComp from '@/widgets/features/ProfileMenuComp.vue';

  export default defineComponent({
    name: 'ProfileNotSignInComp',
    components: {
      ProfileMenuComp
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  #Profile {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 300px;
    background-color: #141414;
    border: 2px solid rgba(116, 116, 116, 0.5);
    border-radius: 5px;
    #Profile_topLine {
      width: 100%;
      height: 50px;
      background-image: url('@/assets/test_bgImage.png');
      background-size: cover;
    }
  }
</style>