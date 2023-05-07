<template>
  <section>
    <div id="Registration">
      <h1> <p>&lt;</p> HalfCoder <p>/></p> </h1>

      <form>
        <ErrorComp 
          :error="error" 
          :errLength="error.length"
        />
        <div class="registration_inputs_container">
          <div class="registration_inputs">
            <p>Имя</p>
            <input type="text" placeholder="Введите имя" v-model="name">
          </div>

          <div class="registration_inputs">
            <p>Фамилия</p>
            <input type="text" placeholder="Введите фамилию" v-model="secondName">
          </div>
        </div>

        <div class="registration_inputs_container">
          <div class="registration_inputs">
            <p>Имя пользователя</p>
            <input type="text" placeholder="Введите имя пользователя" v-model="userName">
          </div>

          <div class="registration_inputs">
            <p>E-mail</p>
            <input type="text" placeholder="Введите e-mail" v-model="email">
          </div>
        </div>

        <div class="registration_inputs_container">
          <div class="registration_inputs">
            <p>Пароль</p>
            <input type="password" placeholder="Введите пароль" v-model="password">
          </div>

          <div class="registration_inputs">
            <p>Повторите пароль</p>
            <input type="password" placeholder="Введите пароль ещё раз" v-model="repeatedPassword">
          </div>
        </div>

        <div id="Registration_termsOfUse">
          <input type="checkbox" name="termsOfUse" v-model="agreeToTermsOfUse" > 
          <label for="termsOfUse">Я принимаю условия <NuxtLink to="/documents/termsOfUse" target="_blank" id="Registration_termsOfUse_route">Пользовательского соглашения</NuxtLink></label>
        </div>

        <button class="registration_button" type="button" @click="setValuesRegistration()" v-if="agreeToTermsOfUse">Зарегистрироваться</button>
        
        <button class="registration_button registration_notActiveButton" type="button" v-if="!agreeToTermsOfUse">Зарегистрироваться</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import axios from 'axios';
  import ErrorComp from '@/widgets/shared/ErrorComp.vue';

  export default defineComponent({
    name: 'RegistrationPage',
    setup() {
      const name = ref('');
      const secondName = ref('');
      const userName = ref('');
      const email = ref('');
      const password = ref('');
      const repeatedPassword = ref('');
      const agreeToTermsOfUse = ref('');
      const error = ref('');

      return {
        name,
        secondName,
        userName,
        email,
        password,
        repeatedPassword,
        agreeToTermsOfUse,
        error
      }
    },
    methods: {
      async setValuesRegistration() {
        const url = new URL('http://79.174.12.75:80/api/account/auth/register/');

        axios.post(url.toString(), {
          first_name: this.name,
          last_name: this.secondName,
          username: this.userName,
          email: this.email,  
          password: this.password
        }, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
          .then((res:any) => {
            const status:number | string = res.data.status;

            switch(status) {
              case 'success': this.$router.push('/signIn');
                break;
              case 6: this.error = 'Пустое поле';
                break;
              case 7: this.error = 'Некорректный email';
                break;
              case 8: this.error = 'Пользователь с такой почтой уже существует';
                break;
              case 9: this.error = 'Пользователь с таким именем и фамилией уже существует';
                break;
            }
          })
          .catch((e:any) => {
            this.$router.push('/techWorks');
          });

        this.name = '';
        this.secondName = '';
        this.userName = '';
        this.email = '';
        this.password = '';
        this.repeatedPassword = '';
      },
    },
    components: {
      ErrorComp,
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  #Registration {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 15px 15px;
    width: 520px;
    height: 420px;
    background-color: #141414;
    border: 2px solid rgba(116, 116, 116, 0.5);
    border-radius: 5px;
    h1 {
      display: flex;
      color: #ffffff;
      font-size: 36px;
      font-family: 'Space Grotesk', sans-serif;
      p {
        color: #3d5aff;
      }
    }
    form {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      height: 340px;
      .registration_inputs_container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
      }
      .registration_inputs {
        width: 47.5%;
        p {
          height: 22.5px;
          color: #747474;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
        }
        input {
            padding-left: 10px;
            width: calc(100% - 10px);
            height: 30px;
            background-color: rgba(116, 116, 116, 0.2);
            border: 1.5px solid #747474;
            border-radius: 5px;
            color: #ffffff;
            font-size: 14px;
            font-family: 'Space Grotesk', sans-serif; 
            outline: none;
        }
      }
      #Registration_termsOfUse {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        input {
          width: 20px;
          height: 75%;
          cursor: pointer;
        }
        label {
          margin-left: 2.5%;
          color: #ffffff;
          font-size: 14px;
          font-family: 'Space Grotesk', sans-serif;
          #Registration_termsOfUse_route {
            color: #3d5aff;
            text-decoration: none;
            outline: none;
          }
        }
      }
      .registration_button {
        width: 180px;
        height: 35px;
        background-color: #3d5aff;
        border: none;
        border-radius: 5px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
        font-family: 'Space Grotesk', sans-serif;
        cursor: pointer;
      }
      .registration_notActiveButton {
        background-color: #747474;
      }
    }
  }
</style>