<template>
  <section id="Rating" :class="{ whiteRatingTheme: !isDarkTheme}">
    <h2>Рейтинг</h2>

    <div id="Rating_info">
      <div class="rating_infoUser" 
        v-for="elem of elements.slice(0, 4)" 
        :key="elem.id" 
        v-show="isLoaded"
      >
        <p>{{ elem.rating || 0 }} points</p>

        <ItemBrieflyInfoComp  
          :name="elem.username"
          :image="elem.photo"
          :employment="elem.profile.work"
        />
      </div>

      <div class="rating_loadingInfoUser" 
        v-for="loadingElem of loadingElements" 
        :key="loadingElem.id" 
        v-show="!isLoaded"
      >
        <div class="rating_loadingInfoUser_score">
          <p></p>
          <p></p>
        </div>

        <div class="rating_loadingInfoUser_image"></div>

        <div class="rating_loadingInfoUser_info">
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
    
    <NuxtLink to="/users" id="Rating_moreUsers">Ещё {{ countOfUsersResults }} {{countOfResultsText}}</NuxtLink>
  </section>
</template>

<script lang="ts"> 
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/main';
  import axios from 'axios';
  import ItemBrieflyInfoComp from '@/widgets/shared/ItemBrieflyInfoComp.vue';

  // Дочерние интерфейсы объекта юзер

  interface Profile {
    sex: null,
    work: string,
    birthday: null,
    phone: null,
    country: null,
    hobby: null,
    education: null,
    website: null,
    quote: null
  }

  interface Advertisement {
    count: number,
    all: object
  }

  // Сам интерфейс юзера

  interface User {
    id: number,
    username: string,
    email: string,
    last_login: null,
    first_name: string,
    last_name: string,
    date_joined: string,
    trustFactor: number,
    is_authenticity: boolean,
    profile_id: number,
    photo: string,
    is_staff: boolean,
    profile: Profile,
    advertisement: Advertisement,
    subs_to_user: number,
    post_from_user: number,
    views_to_user: number,
    user_rating_per_month: number,
    user_rating_per_week: number,
    rating: number
  }

  export default defineComponent({
    name: 'RatingComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);
      const isLoaded = ref(false);
      const elements = ref([] as User[]);
      const countOfUsersResults = ref(0);
      const countOfResultsText = ref('');
      const loadingElements = ref([
          {
            id: 0,
          },
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          }
        ]);

      const setCountText = (num:number, arr:string[]) => {
        const n:number = num % 100;
        
        if(n >= 5 && n <= 20) {
          countOfResultsText.value = arr[2];
        } else if(n === 1) {
          countOfResultsText.value = arr[0];
        } else if(n >= 2 && n <= 4) {
          countOfResultsText.value = arr[1];
        } else {
          countOfResultsText.value = arr[2];
        }
      }

      store.$subscribe(() => {
          isDarkTheme.value = store.isDarkTheme;
      })

      return {
        store,
        isDarkTheme,
        isLoaded, 
        elements,
        countOfUsersResults,
        countOfResultsText,
        loadingElements,
        setCountText
      }
    },
    methods: {
      async getElems() {
        const url = new URL('http://79.174.12.75:80/api/account/read/rating/popular/');

        axios.get(url.toString())
          .then((res:any) => {
            this.elements = Object.values(res.data);
            this.countOfUsersResults = this.elements.length;
            this.setCountText(this.countOfUsersResults, ['результат', 'результата', 'результатов']);

            if(this.elements.length) {
              this.isLoaded = true;
            }
          })
          .catch((e:any) => {
            this.$router.push('/techWorks');
          });
      },
    },
    mounted() {
      this.getElems();
    },
    components: {
      ItemBrieflyInfoComp
    }
  })
</script>

<style lang="scss" scoped>
  @import "@/styles/_variables.scss";

  section {
    background-color: $DarkBgBlocksTheme;
    h2 {
      color: $DarkHeadingColor;
    }
  }

  #Rating {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 330px;
    border: 2px solid $BorderColor;
    border-radius: 5px;
    color: $RatingFontColor; 
    font-family: $SpaceGrotesk;
    transition: 400ms ease;
    h2 {
      margin-top: 12px; 
      width: 100%;
      font-size: 18px;
      text-align: center;
    }
    #Rating_info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 10px;
      width: 80%;
      min-height: 250px;
      div {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        cursor: pointer;
      }
      .rating_infoUser {
        p {
          padding-right: 5px;
          width: 45px;
          font-size: 10px;
          text-align: center;
        }
      }
      .rating_loadingInfoUser {
        justify-content: space-between;
        .rating_loadingInfoUser_score {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 20%;
          height: 100%;
          p {
            height: 12.5px;
            background-color: $LoadingColor;
            border-radius: 2.5px;
          }
          p:first-child {
            width: 50%;
          }
          p:last-child {
            width: 80%;
          }
        }
        .rating_loadingInfoUser_image {
          width: 42.5px;
          height: 100%;
          background-color: $LoadingColor;
          border-radius: 5px;
        }
        .rating_loadingInfoUser_info {
          display: flex;
          flex-wrap: wrap;
          width: 52.5%;
          p {
            height: 12.5px;
            background-color: $LoadingColor;
            border-radius: 2.5px;
          }
          p:first-child {
            width: 70%;
          }
          p:last-child {
            width: 90%;
          }
        }
      }
    }
    #Rating_moreUsers {
      width: 100%;
      height: 30px;
      color: $RatingFontColor;
      font-size: 12px;
      font-family: $Inter;
      text-decoration: none;
      transition: 400ms ease;
      outline: none;
      text-align: center;
      cursor: pointer;
    }
    #Rating_moreUsers:hover {
      color: $HoverColor;
    }
  }

  .whiteRatingTheme {
    background-color: $WhiteBgBlocksTheme;
    h2 {
      color: $WhiteHeadingColor;
    }
  }
</style>