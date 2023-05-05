<template>
  <section id="Companies" :class="{ whiteCompaniesTheme: !isDarkTheme }">
    <h2>Популярные компании</h2>

    <div id="Companies_info">
      <div class="companies_infoCompany" 
        v-for="company of companies.slice(0, 4)" 
        :key="company.id" 
        v-show="isLoaded"
      >
        <img 
          :src="company.photo" 
          :alt="company.name"
        >

        <span>
          <p>{{ company.name }}</p>
          <p>{{ company.description }}</p>
        </span>

        <button>
          <Icon name="fa6-solid:eye" class="icon"/>
        </button> 
      </div>

      <div class="companies_infoLoadingCompany" 
        v-for="loadingCompany of loadingCompanies" 
        :key="loadingCompany.id" 
        v-show="!isLoaded"
      >
        <div></div>

        <span>
          <p></p>
          <p></p>
        </span>
        
        <button>
          <Icon name="fa6-solid:eye" class="icon"/>
        </button>
      </div>
    </div>
  </section>
</template>

<script lang=ts>
  import { defineComponent } from 'vue';
  import { ref, watch } from 'vue';
  import { useMainStore } from '@/stores/main';
  import axios from 'axios';

  // Дочерние интерфейсы объекта компания

  interface Ambassador {
    username: string,
    first_name: string,
    last_name: string
  }

  interface Track {
    title: string
  }

  // Интерфейс самой компании

  interface Company {
    id: number,
    name: string,
    photo: string,
    ambassador: Ambassador,
    description: string,
    views: number,
    tracks: Track,
    reg_date: string,
    created_date: null,
    country: string,
    authenticity: true,
    website: null,
  }

  export default defineComponent({
    name: 'CompaniesComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);
      const isLoaded = ref(false);
      const companies = ref([] as Company[]);
      const loadingCompanies = ref([
          {
            id: 0
          },
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ]);

      watch(() => store.isDarkTheme, () => {
        isDarkTheme.value = store.isDarkTheme;
      });

      return {
        store,
        isDarkTheme,
        isLoaded,
        companies,
        loadingCompanies
      }
    },
    methods: {
      async getCompanies() {
        const url = new URL('http://79.174.12.75:80/api/company/popular/');

        axios.get(url.toString())
          .then((res:any) => {
            const result = res;

            this.companies = Object.values(result.data);

            if(this.companies.length) {
              this.isLoaded = true;
            }
          })
          .catch((e:any) => {
            this.$router.push('/techWorks');
          });
      }
    },
    mounted() {
      this.getCompanies();
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
    #Companies_info {
      .companies_infoCompany {
        span {
          p {
            color: #ffffff;
          }
        }
      }
    }
  }

  #Companies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 290px;
    border: 2px solid $BorderColor;
    border-radius: 5px;
    font-family: $SpaceGrotesk;
    transition: 400ms ease;
    h2 {
      margin-top: 12px;
      font-size: 18px;
      transition: 400ms ease;
    }
    #Companies_info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 17px;
      width: 80%;
      min-height: 240px;
      div {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        span {
          display: flex;
          flex-wrap: wrap;
          margin-left: 10px;
          width: 85%;
          p {
            width: 85%;
            height: 12.5px;
          }
        }
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 42.5px;
          height: 32.5px;
          background-color: #1e1e1e;
          border: 0;
          border-radius: 50px;
          outline: none;
          cursor: pointer;
          .icon {
            color: $IconColor;
            font-size: 18px;
            transition: 400ms ease;
          }
        }
      }
      .companies_infoCompany {
        img {
          background-color: $LoadingColor;
        }
        span {
          p {
            font-size: 14px;
            font-family: $Inter;
            transition: 400ms ease;
          }
          p:last-child {
            margin-top: 7.5px;
            color: $DescColor;
            font-size: 12px;
          }
        }
      }
      .companies_infoLoadingCompany {
        div {
          width: 57.5px;
          height: 40px;
          background-color: $LoadingColor;
          border-radius: 5px;
        }
        span {
          p {
            width: 60%;
            height: 12.5px;
            background-color: $LoadingColor;
            border-radius: 2.5px;
          }
          p:last-child {
            margin-top: 7.5px;
            width: 80%;
          }
        }
      }
    }
  }

  .whiteCompaniesTheme {
    background-color: $WhiteBgBlocksTheme;
    h2 {
      color: $WhiteHeadingColor;
    }
    #Companies_info {
      .companies_infoCompany {
        span {
          p {
            color: #1e1e1e; 
          }
        }
      }
    }
  }
</style>