<template>
  <section id="News" :class="{ whiteNewsTheme: !isDarkTheme }">
    <h2>Новости</h2>

    <div id="News_info">
      <div class="loadingNews" 
        v-for="item of loadingNews" 
        :key="item.id" 
        v-show="!isLoaded"
      >
        <p></p>
        <p></p>
      </div>

      <div class="News_infoItem" 
        v-for="item of news.slice(0, 4)" 
        :key="item.id" 
        v-show="isLoaded"
      >
        <a :href="item.link">{{ item.title }}</a>
        <p>{{ item.ago }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';  
  import { ref, watch } from 'vue';
  import { useMainStore } from '@/stores/main';
  import axios from 'axios';

  // Дочерние интерфейсы объекта новости

  interface From_user {
    username: string,
    first_name: string,
    last_name: string,
    link: string
  }

  interface Category {
    title: string,
    views: number,
    link: string
  }

  interface Body {
    text: string
  } 

  // Интерфейс новостей

  interface News {
    title: string,
    link: string,
    views: number,
    from_user: From_user,
    category: Category,
    body: Body,
    photo: string,
    ago: string,
  }

  export default defineComponent({
    name: 'NewsComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);
      const isLoaded = ref(false);
      const news = ref([] as News[]);
      const loadingNews = ref([
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

      watch(() => store.isDarkTheme, () => {
        isDarkTheme.value = store.isDarkTheme;
      });
    
      return {
        store,
        isDarkTheme,
        isLoaded,
        news,
        loadingNews
      }
    },
    methods: {
      async getNews() {
        const url = new URL('http://79.174.12.75:80/api/news/latest/');

        axios.get(url.toString())
          .then((res:any) => {
            const result = res;

            this.news = Object.values(result.data);

            if(this.news.length) {
              this.isLoaded = true;
            }
          })
          .catch((e:any) => {
            this.$router.push('/techWorks');
          });
      }
    },
    mounted() {
      this.getNews();
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  section {
    background-color: $DarkBgBlocksTheme;
    h2 {
      color: $DarkHeadingColor;
    }
    #News_info {
      .News_infoItem {
        a {
          color: $DarkNewsTitleColor;
        }
        a:hover {
          color: $NewsTitleHoverColor;
        }
      }
    }
  }

  #News {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 17px;
    width: 100%;
    height: 300px;
    border: 2px solid $BorderColor;
    border-radius: 5px;
    font-family: 'Space Grotesk', sans-serif;
    transition: 400ms ease;
    h2 {
      margin-top: 12px;
      font-size: 18px;
      transition: 400ms ease;
    }
    #News_info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 10px;
      width: 80%;
      min-height: 250px;
      .News_infoItem {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        height: 45px; 
        cursor: pointer;
        a {
          width: 100%;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          text-decoration: none;
          transition: 400ms ease;
          outline: none;
        }
        p {
          margin-top: -10px;
          width: 100%;
          color: $DescColor;
          font-size: 12px;
          transition: 400ms ease;
        }
      }
    }
    .loadingNews {
      width: 100%;
      height: 45px; 
      p {
        width: 80%;
        height: 12.5px;
        background-color: $LoadingColor;
        border-radius: 2.5px;
      }
      p:last-child {
        margin-top: 10px;
        width: 60%;
      }
    }
  }

  .whiteNewsTheme {
    background-color: $WhiteBgBlocksTheme;
    h2 {
      color: $WhiteHeadingColor;
    }
    #News_info {
      .News_infoItem {
        a {
          color: $WhiteNewsTitleColor;
        }
        a:hover {
          color: $HoverColor;
        }
      }
    }
  }
</style>