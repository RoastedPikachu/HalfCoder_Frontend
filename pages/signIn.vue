<template>
    <section>
        <div id="vk_api_transport"></div>

        <div id="SignIn">
            <h1> <p>&lt;</p> HalfCoder <p>/></p> </h1>

            <form>
                <ErrorComp
                        :error="error"
                        :errLength="error.length"
                />

                <div class="signIn_inputs">
                    <p>Имя пользователя/email</p>
                    <input type="text" placeholder="Введите логин" v-model="login">
                </div>

                <div class="signIn_inputs">
                    <p>Пароль</p>
                    <input type="password" placeholder="Введите пароль" v-model="password">
                </div>

                <div id="signIn_ExternalButtons" v-if="whenPohui">
                    <button></button>
                    <button></button>
                    <button @click="githubAuth()"></button>
                </div>

                <button id="signIn_FormButton" type="button" @click="setValuesLogin()">Войти</button>

                <NuxtLink to="/documents/termsOfUse" target="_blank" class="route">Пользовательское соглашение</NuxtLink>
            </form>
        </div>
    </section>
</template>

<script lang=ts>
    import { defineComponent } from 'vue';
    import { ref } from 'vue';
    import { useMainStore } from '@/stores/main';
    import axios from 'axios';
    import ErrorComp from '@/widgets/shared/ErrorComp.vue';

    interface AllInfoAboutUser{
        posts: number,
        followers: number,
        views: number,
        firstName: string,
        secondName: string,
        userImage: string,
        userName: string,
        employment: string,
        email: string,
    }

    export default defineComponent({
        name: 'SignInPage',
        setup() {
            const store = useMainStore();
            const login = ref('');
            const password = ref('');
            const error = ref('');
            const allInfoAboutUser = ref({} as AllInfoAboutUser);
            const whenPohui = ref(false);

            return {
                store,
                login,
                password,
                error,
                allInfoAboutUser,
                whenPohui
            }
        },
        methods: {
            async setValuesLogin() {
                const url = new URL('http://79.174.12.75:80/api/account/auth/login/');

                axios.post(url.toString(), {
                    username: this.login,
                    password: this.password,
                }, {
                    headers: {'Content-Type': 'application/json;charset=utf-8'}
                })
                    .then((res:any) => {
                        const result = res;
                        const token:string = result.data.token;
                        const status:number | string = result.data.status;

                        switch(status) {
                            case 'success': document.cookie =`token=${token}; path=/; max-age=2592000; secure=true`;

                                this.store.setToken(token);
                                this.store.changeSignInStatus();
                                this.store.setCookieOpen();

                                this.$router.push('/');
                                break;

                            case 4: this.error = 'User с таким именем не найден';
                                break;

                            case 5: this.error = 'Неверный пароль';
                                break;
                        }
                    })
                    .catch((e:any) => {
                        this.$router.push('/techWorks');
                    });

                this.login = '';
                this.password = '';
            },
            async githubAuth() {
                //const url = new URL('https://github.com/login/oauth/authorize&client_id=cb49d0c9c363a6d035ce');

                const result = 0;

                console.log(result);
            }
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
      #SignIn {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 15px 15px;
        width: 310px;
        height: 330px;
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
          height: 250px;
          .signIn_inputs {
            width: 90%;
            height: 52.5px;
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
          #signIn_ExternalButtons {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 80%;
            height: 40px;
            button {
              width: 40px;
              height: 40px;
              background-size: cover;
              background-color: #141414;
              border: none;
              border-radius: 50px;
              transition: 400ms ease;
              cursor: pointer;
            }
            button:hover {
              transform: translateY(5px);
            }
            button:nth-child(1) {
              background-image: url('@/assets/vk_login_icon.svg');
            }
            button:nth-child(2) {
              background-image: url('@/assets/google_login_icon.svg');
            }
            button:nth-child(3) {
              background-image: url('@/assets/github_login_icon.svg');
            }
          }
              #signIn_FormButton {
                width: 150px;
                height: 30px;
                background-color: #3d5aff;
                border: none;
                border-radius: 5px;
                color: #ffffff;
                font-size: 14px;
                font-weight: 700;
                font-family: 'Inter', sans-serif;
                outline: none;
                cursor: pointer;
              }
              .route {
                margin-top: -5px;
                width: 80%;
                color: #3d5aff;
                font-size: 14px;
                font-weight: 400;
                font-family: 'Space Grotesk', sans-serif;
                text-align: center;
                transition: 500ms ease;
                text-decoration: none;
              }
              .route:hover {
                transform: translateY(2.5px);
              }
        }
      }
    }
</style>