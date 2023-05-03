<template>
  <TheHeaderComp/>
  <section id="mainBlock">
    <aside>
      <ProfileSignInComp/>

      <TheFooterComp/>
    </aside>

    <div class="mainInfoAboutEvents" :class="{ whiteEventsTheme: !isDarkTheme }">
      <span id="MainInfoAboutEvents_Top">
        <h2>Мероприятия</h2>  

        <button>
          <i class="fa-solid fa-plus"></i>
          <p>Создать мероприятие</p>
        </button>
      </span>

      <span id="MainInfoAboutEvents_Nav">
        <p>Топ</p>
        <p>Локальные</p>
        <p>На этой неделе</p>
        <p>Онлайн</p>
        <p>Друзья</p>
        <p>Подписки</p>
      </span>

      <div id="MainInfoAboutEvents_container">
        <div class="mainInfoAboutEvents_eventBlock" 
          v-for="event of events" 
          :key="event.id"
        >
          <div class="loadingPhoto" v-show="!isLoaded"></div>
          <img :src="event.photo" alt="Изображение события" v-show="isLoaded">

          <div class="loadingTag" v-show="!isLoaded"></div>
          <div class="mainInfoAboutEvents_eventBlock_tag" v-show="isLoaded">
            <p>{{ event.category }}</p>
          </div>

          <div class="loadingText" v-show="!isLoaded">
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div class="mainInfoAboutEvents_eventBlock_text" v-show="isLoaded">
            <p>{{ event.title }}</p>
            <p>{{ event.created_at }}</p>
            <p>{{ event.place }}</p>
          </div>

          <span>
            <button>Интересно</button>
            
            <button>
              <svg width="17" height="18" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8332 15C13.0298 15 13.9998 14.0599 13.9998 12.9C13.9998 11.7402 13.0298 10.8 11.8332 10.8C10.6365 10.8 9.6665 11.7402 9.6665 12.9C9.6665 14.0599 10.6365 15 11.8332 15Z" stroke="#3D5AFF" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.8333 5.2C13.0299 5.2 14 4.25979 14 3.1C14 1.9402 13.0299 1 11.8333 1C10.6366 1 9.66663 1.9402 9.66663 3.1C9.66663 4.25979 10.6366 5.2 11.8333 5.2Z" stroke="#3D5AFF" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.16667 10.0999C4.36329 10.0999 5.33334 9.15973 5.33334 7.9999C5.33334 6.84007 4.36329 5.8999 3.16667 5.8999C1.97005 5.8999 1 6.84007 1 7.9999C1 9.15973 1.97005 10.0999 3.16667 10.0999Z" stroke="#3D5AFF" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.0272 4.1499L4.97168 6.9499" stroke="#3D5AFF"/>
                <path d="M4.97168 9.05005L10.0272 11.85" stroke="#3D5AFF"/>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, watch } from 'vue';
  import axios from 'axios';
  import { useMainStore } from '@/stores/main';
  import TheHeaderComp from '@/widgets/shared/TheHeaderComp.vue';
  import ProfileSignInComp from '@/widgets/homePage/ProfileSignInComp.vue';
  import TheFooterComp from '@/widgets/shared/TheFooterComp.vue';

  interface Event {
    id: number,
    category: string,
    title: string,
    created_at: string,
    place: string,
    photo: string,
  }

  export default defineComponent({
    name: 'EventsPage',
    setup() {
      const store = useMainStore();
      const isLoaded = ref(false);
      const isDarkTheme = ref(store.isDarkTheme);
      const events = ref([
        {
          id: 0,
          category: '',
          title: '',
          created_at: '',
          place: '',
          photo: '',
        },
        {
          id: 1,
          category: '',
          title: '',
          created_at: '',
          place: '',
          photo: '',
        },
        {
          id: 2,
          category: '',
          title: '',
          created_at: '',
          place: '',
          photo: '',
        },
        {
          id: 3,
          category: '',
          title: '',
          created_at: '',
          place: '',
          photo: '',
        },
        {
          id: 4,
          category: '',
          title: '',
          created_at: '',
          place: '',
        },
        {
          id: 5,
          category: '',
          title: '',
          created_at: '',
          place: '',
        }
      ] as Event[]);

      watch(() => store.isDarkTheme, () => {
        isDarkTheme.value = store.isDarkTheme;
      });

      return {
        store,
        isDarkTheme,
        isLoaded,
        events,
      }
    },
    methods: {
      async getEventsByCategory() {
        const url = new URL('http://79.174.12.75:80/api/event/all/');

        axios.get(url.toString(), {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
          .then((res:any) => {
            const result = res;

            this.events = (Object.values(result.data));

            if(result) {
              this.isLoaded = true;
            }
          })
          .catch((e:any) => {
            this.$router.push('/techWorks');
          })
      }
    },
    mounted() {
      this.getEventsByCategory();
    },
    components: {
      TheHeaderComp,
      ProfileSignInComp,
      TheFooterComp
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  #mainBlock {
    display: flex;
    justify-content: space-between;
    padding: 0 7.5%;
    margin-top: 15px;
    width: 85%;
    aside {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 23.5%;
      height: 680px;
    }
    .mainInfoAboutEvents {
      padding: 2.5% 2.5%;
      width: 70%;
      height: 840px;
      background-color: $DarkBgBlocksTheme;
      border: 2px solid $BorderColor;
      border-radius: 5px;
      transition: 400ms ease;
      #MainInfoAboutEvents_Top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        h2 {
          color: $DarkHeadingColor;
          font-family: $SpaceGrotesk;
          transition: 400ms ease;
        }
        button {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 200px;
          height: 100%;
          background-color: rgba(61, 90, 255, 0.2);
          border: none;
          border-radius: 5px;
          transition: 500ms ease;
          cursor: pointer;
          i {
            color: $BlueButtonFontColor;
            font-size: 16px;
          }
          p {
            color: $BlueButtonFontColor;
            font-size: 14px;
            font-weight: 700;
            font-family: $SpaceGrotesk;
          }
        }
        button:hover {
          transform: translateY(5px);
        }
      }
      #MainInfoAboutEvents_Nav {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        width: 100%;
        height: 70px;
        border: 2px solid #747474;
        border-width: 0 0 2px;
        p {
          margin-left: 3%;
          height: 35px;
          color: $DarkFormFontColor;
          font-size: 18px;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          text-align: left;
          transition: 500ms ease;
          cursor: pointer;
        }
        p:first-child {
          margin-left: 0;
        }
        p:hover {
          color: $HoverColor;
        }
      }
      #MainInfoAboutEvents_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        .mainInfoAboutEvents_eventBlock {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 20px;
          width: 31%;
          height: 340px;
          border: 2px solid $BorderColor;
          border-radius: 5px;
          img {
            margin-top: -4%;
            width: 100%;
            height: 47.5%;
            border: 2px solid $BorderColor;
            border-width: 0 0 2px;
          }
          .loadingPhoto {
            margin-top: -4.5%;
            width: 100%;
            height: 47.5%;
            background-color: $LoadingColor;
            border-radius: 2.5px 2.5px 0 0;
          }
          .mainInfoAboutEvents_eventBlock_tag {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2px 10px;
            top: 45%;
            left: 5%;
            width: auto;
            min-height: 22.5px;
            height: auto;
            background-color: $BgButtonColor;
            border-radius: 2.5px;
            color: $ButtonFontColor;
            font-size: 12px;
            font-family: $SpaceGrotesk;
            text-align: left;
            cursor: pointer;
          }
          .loadingTag {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 45%;
            left: 5%;
            width: 110px;
            height: 22.5px;
            background-color: $BgButtonColor; 
            border-radius: 2.5px;
          }
          .mainInfoAboutEvents_eventBlock_text {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 2.5%;
            padding: 0 5%;
            width: 90%;
            height: 25%;
            p {
              width: 100%;
              color: #747474;
              font-size: 12px;
              font-weight: 600;
              font-family: $SpaceGrotesk;
              transition: 400ms ease;
            }
            p:first-child {
              color: $DarkHeadingColor;
              font-size: 14px;
              font-family: $Inter;
            }
            p:nth-child(2) {
              margin-top: 3%;
            }
          }
          .loadingText {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            padding: 0 5%;
            width: 90%;
            height: 25%;
            p {
              width: 100%;
              height: 12.5px;
              background-color: $LoadingColor;
              border-radius: 2.5px;
            }
            p:nth-child(2) {
              width: 70%;
            }
            p:nth-child(3) {
              margin-top: -3%;
              width: 40%;
            }
          }
          span {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 5%;
            width: 90%;
            height: 10%;
            button {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: -5%;
              height: 100%;
              background-color: rgba(61, 90, 255, 0.2);
              border-radius: 5px;
              transition: 500ms ease;
              cursor: pointer;
            }
            button:first-child {
              width: 50%;
              background-color: rgba(61, 90, 255, 0.2);
              border: 1.5px solid $BgButtonColor;
              color: $BgButtonColor;
            }
            button:last-child {
              width: 14%;
              border: none;
            }
            button:hover {
              transform: translateY(2.5px);
            }
          }
        }
  
      }
    }
    .whiteEventsTheme {
      background-color: $WhiteBgBlocksTheme;
      #MainInfoAboutEvents_Top {
        h2 {
          color: $WhiteHeadingColor;
        }
      }
      #MainInfoAboutEvents_container {
        .mainInfoAboutEvents_eventBlock {
          .mainInfoAboutEvents_eventBlock_text {
            p:first-child {
              color: $WhiteHeadingColor;
            }
          }
        }
      }
    }
  }
</style>