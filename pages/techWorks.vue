<template>
  <section>
    <div>
      <p id="Tech">Technical</p>

      <h1> <p>&lt;</p> Works <p>/></p> </h1>

      <p id="TechRuDesc">В данный момент сайт недоступен.</p>
      
      <p id="TechEngDesc">The site is currently unavailable.</p>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TechnicalWorksPage'
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 600px;
    padding: 0 12.5%;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 10%;
      width: 70%;
      height: 350px;
      #Tech {
        margin-top: 20px;
        margin-left: -5%;
        width: 95%;
        color: #ffffff;
        font-size: 40px;
        font-weight: 700;
        font-family: $SpaceGrotesk;
        text-align: center;
      }
      h1 {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        width: 80%;
        color: #ffffff;
        font-size: 126px;
        font-family: $SpaceGrotesk;
        text-align: center;
        transition: 400ms ease;
        p {
          color: #3d5aff;
          text-align: center;
          transition: 400ms ease;
        }
      }
      #TechRuDesc {
        margin-top: -30px;
        width: 100%;
        color: #747474;
        font-size: 18px;
        font-weight: 700;
        font-family: $SpaceGrotesk; 
        text-align: center;
      }
      #TechEngDesc {
        margin-top: 15px;
        width: 100%;
        color: #747474;
        font-size: 18px;
        font-weight: 700;
        font-family: $SpaceGrotesk; 
        text-align: center;
      }
    }
  }
</style>