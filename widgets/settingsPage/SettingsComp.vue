<template>
  <section id="MainBlock_Settings" :class="{ whiteSettingsTheme: !isDarkTheme}">
    <h2>Настройки аккаунта</h2>

    <form>
      <div class="mainBlock_Settings_InputsContainers">
        <div>
          <p>Имя</p>
          <input type="text" v-model="firstName">
        </div>

        <div>
          <p>Фамилия</p>
          <input type="text" v-model="secondName">
        </div>
      </div>

      <div class="mainBlock_Settings_InputsContainers">
        <div>
          <p>Имя пользователя</p>
          <input type="text" v-model="userName">
        </div>

        <!-- <div>
          <p>Дата рождения</p>
          <input type="datetime-local" v-model="dateOfBirth">
        </div> -->
      </div>

      <div class="mainBlock_Settings_InputsContainers">
        <div>
          <p>Номер телефона</p>
          <input type="text" v-model="phoneNumber">
        </div>

        <div>
          <p>E-mail</p>
          <input type="email" v-model="email">
        </div>
      </div>

      <div id="MainBlock_Settings_textareaContainer">
        <p>О себе</p>
        <textarea maxlength="300" v-model="aboutUser"></textarea>
        <p>Лимит символов: 300</p>
      </div>
      
      <button type="button" @click="setChanges()">Сохранить изменения</button>
    </form>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, onMounted } from 'vue';
  import { useMainStore } from '@/stores/main';
  //import flatpickr from "flatpickr";

  export default defineComponent({
    name: 'SettingsComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);
      const firstName = ref('');
      const secondName = ref('');
      const userName = ref('');
      const dateOfBirth = ref('');
      const phoneNumber = ref('');
      const email = ref('');
      const aboutUser = ref('');

      const setChanges = ():void => {
        let payload = {
          firstName: firstName.value,
          secondName: secondName.value,
          userName: userName.value,
          dateOfBirth: dateOfBirth.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
          aboutUser: aboutUser.value
        }
        
        store.changeDataAboutUser(payload);
      }

      onMounted(() => {
        firstName.value = store.firstName;
        secondName.value = store.secondName;
        userName.value = store.userName;
        phoneNumber.value = store.phoneNumber;
        email.value = store.email;
        aboutUser.value = store.aboutUser;

        //setTimeout(() => flatpickr("input[type=datetime-local]", {}), 500);
      });

      store.$subscribe(() => {
          isDarkTheme.value = store.isDarkTheme;
      })

      return {
        store,
        isDarkTheme,
        firstName,
        secondName,
        userName,
        dateOfBirth,
        phoneNumber,
        email,
        aboutUser,
        setChanges
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  section {
    background-color: $DarkBgBlocksTheme;
    h2 {
      color: $DarkHeadingColor;
    }
    form {
      color: $DarkFormFontColor;
      .mainBlock_Settings_InputsContainers {
        input {
          background-color: $DarkInputsColor;
        }
      }
      #MainBlock_Settings_textareaContainer {
        textarea {
          background-color: $DarkInputsColor;
        }
      }
    }
  }
  #MainBlock_Settings {
    margin-left: 20px;
    padding: 20px 30px;
    width: 720px;
    height: 490px;
    border: 2px solid $BorderColor;
    border-radius: 5px;
    font-weight: 700;
    font-family: $SpaceGrotesk;
    transition: 400ms ease;
    h2 {
      width: 205px;
      font-size: 20px;
      text-align: center;
      transition: 400ms ease;
    }
    form {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      margin-top: 20px;
      width: 100%;
      height: 85%;
      font-size: 14px;
      font-family: $Inter;
      transition: 400ms ease;
      .mainBlock_Settings_InputsContainers {
        display: flex;
        justify-content: space-between;
        width: 100%;
        div {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          width: 49%;
          height: 70px;
          p {
            height: 5px;
          }
          input {
            margin-top: 5px;
            padding-left: 15px;
            width: 90%;
            height: 30px;
            border: 1.5px solid $InputsBorderColor;
            border-radius: 5px;
            color: $DarkFormFontColor;
            outline: none;
            transition: 400ms ease;
          }
          input:last-child {
            width: 100%;
          }
        }
      }
      #MainBlock_Settings_textareaContainer {
        width: 100%;
        height: 190px;
        p:first-child {
          height: 25px;
        }
        textarea {
          padding-top: 10px;
          padding-left: 15px;
          width: 100%;
          height: 130px;
          border: 1.5px solid $InputsBorderColor;
          border-radius: 5px;
          color: $DarkFormFontColor;
          font-family: $Inter;
          outline: none;
          resize: none; 
          transition: 400ms ease;
        }
      }
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 35px;
        background-color: $BgButtonColor;
        border: 0;
        border-radius: 5px;
        color: $ButtonFontColor;
        font-size: 12px;
        font-weight: 700;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .whiteSettingsTheme {
    background-color: $WhiteBgBlocksTheme;
    h2 {
      color: $WhiteFormFontColor;
    }
    form {
      color: $WhiteFormFontColor;
      .mainBlock_Settings_InputsContainers {
        input {
          background-color: $WhiteInputsColor;
        }
      }
      #MainBlock_Settings_textareaContainer {
        textarea {
          background-color: $WhiteInputsColor;
        }
      }
    }
  }
</style>