<template>
    <TheHeaderComp/>
    <section>
        <div>
            <p id="Error">error</p>
            <h1> <p>&lt;</p> 404 <p>/></p> </h1>
            <p id="ErrorRuDesc">Данная ошибка может возникать при неправильно введённой ссылке или страница была удалена.</p>
            <p id="ErrorEngDesc">This error may occur if the link is entered incorrectly or the page has been deleted</p>
        </div>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';

    export default defineComponent({
      name: '404Error',
      components: {
        TheHeaderComp
      }
    })
</script>

<style lang="scss" scoped>
    @import '@/styles/variables';

    section {
      display: grid;
      justify-content: center;
      align-content: center;
      grid-template-columns: 100%;
      margin-top: 15px;
      width: 60%;
      height: 600px;
      padding: 0 20.0%;
      div {
        display: grid;
        justify-content: center;
        justify-items: center;
        align-content: center;
        width: 100%;
        height: 350px;
        #Error {
          justify-self: center;
          margin-top: 20px;
          margin-left: -5%;
          width: 60%;
          color: #ffffff;
          font-size: 40px;
          font-weight: 700;
          font-family: $SpaceGrotesk;
          text-align: center;
        }
        h1 {
          display: flex;
          justify-content: center;
          margin-top: 0px;
          width: 75%;
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
        #ErrorRuDesc {
          margin-top: -40px;
          width: 100%;
          color: #747474;
          font-size: 18px;
          font-weight: 700;
          font-family: $SpaceGrotesk;
          text-align: center;
        }
        #ErrorEngDesc {
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