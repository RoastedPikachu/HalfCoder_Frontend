<template>
        <header :class="{ whiteHeaderTheme: !isDarkTheme }">
            <h1> <p>&lt;</p> HalfCoder <p>/></p> </h1>

            <nav>
                <NuxtLink to="/" class="route">Главная</NuxtLink>

                <NuxtLink to="/events" class="route" v-if="isSignIn">События</NuxtLink>
                <p v-else>События</p>

                <NuxtLink to="/settings" class="routeImg" v-if="isSignIn">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9999 14C12.6568 14 13.9999 12.6569 13.9999 11C13.9999 9.3431 12.6568 8 10.9999 8C9.34304 8 7.99994 9.3431 7.99994 11C7.99994 12.6569 9.34304 14 10.9999 14Z" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.6224 9.3954L17.5247 6.7448L19 5L17 3L15.2647 4.48295L12.5578 3.36974L11.9353 1H9.981L9.3491 3.40113L6.70441 4.51596L5 3L3 5L4.45337 6.78885L3.3725 9.4463L1 10V12L3.40111 12.6555L4.51575 15.2997L3 17L5 19L6.79116 17.5403L9.397 18.6123L10 21H12L12.6045 18.6132L15.2551 17.5155C15.6969 17.8313 17 19 17 19L19 17L17.5159 15.2494L18.6139 12.598L20.9999 11.9772L21 10L18.6224 9.3954Z" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </NuxtLink>

                <div class="modalContainer">
                    <button @click="changeNotifActive()">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.6667 7.40112C17.6667 5.70343 16.9643 4.07529 15.714 2.87485C14.4638 1.6744 12.7681 1 11 1C9.23189 1 7.5362 1.6744 6.28596 2.87485C5.03571 4.07529 4.33333 5.70343 4.33333 7.40112C4.33333 14.8691 1 17.0028 1 17.0028H21C21 17.0028 17.6667 14.8691 17.6667 7.40112Z" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.9222 20.0033C12.7269 20.3064 12.4465 20.5581 12.1091 20.7329C11.7718 20.9079 11.3893 21 11 21C10.6106 21 10.2282 20.9079 9.89087 20.7329C9.55354 20.5581 9.27309 20.3064 9.07776 20.0033" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <div id="HasNotificationsStatus" v-if="hasNotificationsStatus"></div>
                    </button>

                    <ModalNotifComp
                        :active="modalNotifActive"
                    />
                </div>

                <div class="modalContainer" v-if="isSignIn">
                    <button id="ModalContainer_profile" @click="changeProfileActive()">
                        <img :src="image" alt="Мой аватар">
                    </button>

                    <ModalProfileComp
                        :active="modalProfileActive"
                        :token="token"
                        :name="name"
                        :image="image"
                        :employment="employment"
                    />
                </div>

                <div class="modalContainer" v-else>
                    <button @click="changeSignInActive()">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 11C14.2147 11 16.8208 8.76142 16.8208 6C16.8208 3.23858 14.2147 1 11 1C7.78535 1 5.17932 3.23858 5.17932 6C5.17932 8.76142 7.78535 11 11 11Z" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 21C21 17.13 16.518 14 11 14C5.48196 14 1 17.13 1 21" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <ModalSignInComp
                        :active="modalSignInActive"
                    />
                </div>
            </nav>
        </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { ref, onMounted } from 'vue';
    import { useMainStore } from '@/stores/main';
    import ModalProfileComp from '@/widgets/features/modals/ModalProfileComp.vue';
    import ModalNotifComp from '@/widgets/features/modals/ModalNotifComp.vue';
    import ModalSignInComp from '@/widgets/features/modals/ModalSignInComp.vue';

    export default defineComponent({
        name: 'HeaderComp',
        props: {
            token: String,
            name: String,
            image: String,
            employment: String
        },
        setup(props) {
            const store = useMainStore();
            const isDarkTheme = ref(store.isDarkTheme);
            const isSignIn = ref(store.isSignIn);
            const hasNotificationsStatus = ref(true);
            const modalNotifActive = ref(false);
            const modalProfileActive = ref(false);
            const modalSignInActive = ref(false);

            const changeNotifActive = ():void => {
                modalNotifActive.value = !modalNotifActive.value;
                modalProfileActive.value = false;
                modalSignInActive.value = false;
            }

            const changeProfileActive = ():void => {
                modalProfileActive.value = !modalProfileActive.value;
                modalNotifActive.value = false;
            }

            const changeSignInActive = ():void => {
                modalSignInActive.value = !modalSignInActive.value;
                modalNotifActive.value = false;
            }

            onMounted(() => {
                window.addEventListener('click', event => {
                    if(event.target !== null) {
                        const target = event.target as HTMLElement;

                        if(!target.closest('.modalContainer')) {
                            if(modalNotifActive.value) {
                                modalNotifActive.value = false;
                            } else if(modalProfileActive.value) {
                                modalProfileActive.value = false;
                            } else if(modalSignInActive.value) {
                                modalSignInActive.value = false;
                            }
                        }
                    }
                });
            });

            store.$subscribe(() => {
                isDarkTheme.value = store.isDarkTheme;
            })

            return {
                store,
                isDarkTheme,
                isSignIn,
                hasNotificationsStatus,
                modalNotifActive,
                modalProfileActive,
                modalSignInActive,
                changeNotifActive,
                changeProfileActive,
                changeSignInActive
            }
        },
        components: {
            ModalProfileComp,
            ModalNotifComp,
            ModalSignInComp
        }
    })
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 7.5%;
    width: 85%;
    height: 60px;
    background-color: #111111;
    font-weight: 700;
    transition: 400ms ease;
    outline: none;
    h1 {
        display: flex;
        color: #ffffff;
        font-size: 36px;
        font-family: $SpaceGrotesk;
        transition: 400ms ease;
        p {
            color: #3d5aff;
            transition: 400ms ease;
        }
    }
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 27.5%;
        height: 26px;
        font-family: $Inter;
        p {
            color: #747474;
            font-size: 16px;
            text-decoration: none;
            transition: 400ms ease;
            outline: none;
            cursor: pointer;
        }
        p:hover {
            color: #3d5aff;
        }
        .route {
            color: #747474;
            font-size: 16px;
            text-decoration: none;
            transition: 400ms ease;
            outline: none;
        }
        .route:hover {
            color: #3d5aff;
        }
        .routeImg {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 34px;
            height: 34px;
            background-color: #1e1e1e;
            border: none;
            border-radius: 10px;
            transition: 400ms ease;
            outline: none;
            svg {
                path {
                    transition: 400ms ease;
                }
            }
            svg:hover {
                path {
                    stroke: #3d5aff;
                }
            }
        }
        .modalContainer {
            position: relative;
            width: 36px;
            height: 36px;
            #ModalContainer_profile {
                background-color: #ffffff;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                }
            }
            button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 36px;
                height: 36px;
                background-color: #1e1e1e;
                border: none;
                border-radius: 10px;
                transition: 500ms ease;
                outline: none;
                cursor: pointer;
                svg {
                    path {
                        transition: 400ms ease;
                    }
                }
                div {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 10px;
                    height: 10px;
                    background-color: #df0a0a;
                    border-radius: 50px;
                }
            }
            button:hover {
                svg {
                    path {
                        stroke: #3d5aff;
                    }
                }
            }
        }
    }
}

.whiteHeaderTheme {
    background-color: #3483f9;
    h1 {
        p {
            color: #ffffff;
        }
    }
    nav {
        p {
            color: #ffffff;
        }
        p:hover {
            color: #1d2b7d;
        }
        .route {
            color: #ffffff;
        }
        .route:hover {
            color: #1d2b7d;
        }
        .routeImg {
            background-color: #ffffff;
            svg {
                path {
                    stroke: #3d5aff;
                }
            }
        }
        .modalContainer {
            button {
                background-color: #ffffff;
                svg {
                    path {
                        stroke: #3d5aff;
                    }
                }
            }
        }
    }
}
</style>
