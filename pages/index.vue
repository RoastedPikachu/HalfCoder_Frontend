<template>
    <TheHeaderComp
        :token="token"
        :name="allInfoAboutUser.firstName + ' ' + allInfoAboutUser.secondName"
        :image="allInfoAboutUser.userImage"
        :employment="allInfoAboutUser.employment"
    />

    <section id="MainBlock">
        <aside id="MainBlock_info">
            <ProfileSignInComp
                    v-if="isSignIn"
                    :allInfoAboutUser="allInfoAboutUser"
            />

            <ProfileNotSignInComp v-if="!isSignIn"/>

            <CompaniesComp/>
        </aside>
        <section id="MainBlock_child">
            <RecommendedCategoriesComp/>

            <PostsComp/>

            <aside id="MainBlock_asideRight">
                <RatingComp/>

                <NewsComp/>

                <TheFooterComp/>
            </aside>
        </section>
    </section>
    <CookieComp/>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { ref, onMounted } from 'vue';
    import { useMainStore } from '@/stores/main';
    import axios from 'axios';

    import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
    import ProfileSignInComp from '@/widgets/homePage/ProfileSignInComp.vue';
    import ProfileNotSignInComp from '@/widgets/homePage/ProfileNotSignInComp.vue';
    import CompaniesComp from '@/widgets/homePage/CompaniesComp.vue';
    import RecommendedCategoriesComp from '@/widgets/homePage/RecommendedCategoriesComp.vue';
    import PostsComp from '@/widgets/homePage/PostsComp.vue';
    import RatingComp from '@/widgets/homePage/RatingComp.vue';
    import NewsComp from '@/widgets/homePage/NewsComp.vue';
    import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';
    import CookieComp from '@/widgets/shared/CookieComp.vue';

    interface AllInfoAboutUser{
        posts: number,
        followers: number,
        views: number,
        firstName: string,
        secondName: string,
        userImage: string,
        userName: string,
        employment: string,
        email: string
    }

    export default defineComponent({
        name: 'HomePage',
        setup() {
            const store = useMainStore();
            const token = ref('' as string | undefined);
            const isSignIn = ref(false);
            const allInfoAboutUser = ref({} as AllInfoAboutUser);

            const getCookie = (name:string) => {
                let matches = document.cookie.match(new RegExp(
                    //eslint-disable-next-line
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            }

            onMounted(() => {
                token.value = getCookie('token') ;
                isSignIn.value = store.isSignIn;
            });

            return {
                store,
                token,
                isSignIn,
                allInfoAboutUser,
                getCookie
            }
        },
        methods: {
            async getInfoAboutUser() {
                const url = new URL('http://79.174.12.75:80/api/account/read/data/');

                axios.post(url.toString(), { token: this.token }, {
                    headers: {'Content-Type': 'application/json;charset=utf-8'}
                })
                    .then((res:any) => {
                        const result = res;

                        console.log(result);

                        this.allInfoAboutUser.posts = 0;
                        this.allInfoAboutUser.followers = 0;
                        this.allInfoAboutUser.views = 0;
                        this.allInfoAboutUser.firstName = result.data.first_name;
                        this.allInfoAboutUser.secondName = result.data.last_name;
                        this.allInfoAboutUser.userImage = result.data.photo;
                        this.allInfoAboutUser.userName = result.data.username;
                        this.allInfoAboutUser.employment = result.data.profile.Work;
                        this.allInfoAboutUser.email = result.data.email;
                    })
                    .catch((e:any) => {
                        this.$router.push('/techWorks');
                    });
            },
        },
        mounted() {
            this.getInfoAboutUser();
        },
        components: {
            TheHeaderComp,
            ProfileSignInComp,
            ProfileNotSignInComp,
            CompaniesComp,
            RecommendedCategoriesComp,
            PostsComp,
            RatingComp,
            NewsComp,
            TheFooterComp,
            CookieComp
        },
    })
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

#MainBlock {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  width: 85%;
  padding: 0 7.5%;
  font-weight: 700;
  #MainBlock_info {
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 890px;
  }
  #MainBlock_child {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    #MainBlock_asideRight {
      display: flex;
      flex-wrap: wrap;
      margin-top: 17px;
      margin-left: 4.5%;
      width: 30.5%;
      height: 627px;
    }
  }
}
</style>