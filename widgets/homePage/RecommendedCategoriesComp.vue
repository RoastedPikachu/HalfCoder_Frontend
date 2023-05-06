<template>
  <section id="RecommendedCategories" :class="{ whiteRecommendTheme: !isDarkTheme }">
    <p class="recomendation_loading" 
      v-for="loadingCategory of loadingCategories" 
      :key="loadingCategory.id" 
      v-show="!isLoaded"
    ></p>

    <NuxtLink
      :to="category.link" 
      class="recomendation" 
      v-for="category of categories.slice(0, 10)" 
      :key="category.id" 
      v-show="isLoaded"
    >
      {{ category.title }}
    </NuxtLink>

    <button>  
      <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect x="19" width="18" height="19" transform="rotate(90 19 0)" fill="url(#pattern0)"/>
        <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_1" transform="matrix(0.0109954 0 0 0.0104167 -0.0277778 0)"/>
          </pattern>
          <image id="image0_1" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEAElEQVR4nO2bT4scRRyGayIaUVQkJKBiVPADSI5CQpAYURBUWBDx4B/c4GFgp9+36NlTn4R8BDUYUBTFY7zEqKCC4Fm9reCuSvAkJCpCINvygxGGyU5IeuZXXdP9PlDQzM7OVFU/b/2ZqQlBCCGEEEIIIYQQQgghhBBCiFnKsrwHwNMk37Ri1/bYNU8Uy2U0Gj1A8iyAf0nW08UeA/CePUf97kCMcQ3An7Mdv0e5BGA9hDDQjVgCGxsb95E8dwMdP5uIz8uyPKybkMb6WmnIwHoqDVlYXysNGVjP+eWC5oZ01tdKQx7W10pD+9bXSkMe1te9TUNG1te9SkPG1tddT8OA5BtmllNH7U6KSxqs7iubhgTWXwTwbFEUTwLYURoSjvUAPh2Px/f+/37D4fBuku94pmEl5oYY4/0APvO2Psyh12lIbf08epeGtq3vcxoGZoLnCgfAu2Z00wra/9prdC4NVVXdRvKD3KxvKw02PFZVdXtIhX353fZYf7N4zw2WtJACAMedGrBD8qR3/e09vNIA4FhI0ICPcxvrc5kbAHwUvCG5nYP1a2trt2xubh60Ytc5pAHAL8GbvQ5FpbQ+xviMLXsBXJ5quF2fs7+1mQbrm+ANgJ/bsL4sy8Mkz9/Ae5xvsj5fUhq2gje2SmlqPckzDawfNNhvNFqfT1ZKZ5qmAcAnwZsY49FU63oAD9mOc4G0fTsajR5NlYaiKB4PKQDwtvO6frCsXTaAfwCUVVXt89w32N4oJN4Jf+gx1mNB669TLthre6QBwPvr6+u3htSQfJ7kVwCuTlVoC8AIwJ2ZfbZUN50brC0ki+kFyKTNXxZF8VxoG0tEURQPNt1Mwc/6pabBsDZaW63NoQMMzMjpNX2q0nRu6AxmIIAvUnf8slZKq0xr1rPvacjFevYwDdlZz76kIXfr2eE02Km4U47W7052qp7fclndT2VzAiIj67dJnpj5fGpLafAf63fN+BjjXbM3vaqqO0ientmV92duSG39PPqYhtasb/EERB5pyMX6Fs8DtZcGAC94Wz9cwkkJ79Nx1gfWFyElJF/2muxIbpu5K3YeyPripZBw2Lmcs/UtpeGSfUwdvLGl3qpYn3puAPBW8AbAT6tkfeI0/Bi8Ifn3KlqfaG74K3hD8o9VtT7BvuFi8IbkNwuMkTs5WH+9NJD8dYH2fR28iTG+1gXrndLwSvBmOBzut8mmK9bPoyiKp24yDT9Y34QUAHiE5O9dsX7Rs6IAfivL8uGQkvF4fMB+kEDyyh6V+g7AE6EjkDxB8vs92nnF+sD6orXKATgE4MXJabhXST4WOkqM8QiA1yen5KzNh9qukxBCCCGEEEIIIYQQQgghhBBCiJAt/wE5ec82E4ylEwAAAABJRU5ErkJggg=="/>
        </defs>
      </svg>
    </button>
  </section>
</template>

<script lang="ts">  
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/main';
  import axios from 'axios';

  interface Category {
    id: number,
    title: string,
    link: string,
  }

  export default defineComponent({
    name: 'RecommendedCategoriesComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);
      const isLoaded = ref(false);
      const categories = ref([] as Category[]);
      const loadingCategories = ref([
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
          },
          {
            id: 4
          },
          {
            id: 5
          },
          {
            id: 6
          },
        ]);

      store.$subscribe(() => {
          isDarkTheme.value = store.isDarkTheme;
      })

      return {
        store,
        isDarkTheme,
        isLoaded,
        categories,
        loadingCategories
      }
    },
    methods: {
      async getRecommendedCategories() {
        const url = new URL('http://79.174.12.75:80/api/article/category/popular/');

        axios.get(url.toString())
          .then((res:any) => {
            this.categories = Object.values(res.data);

            if(this.categories.length) {
              this.isLoaded = true;
            }
          })
          .catch((e:any) => {
            this.$router.push('/techWorks');
          });
      }
    },
    mounted() {
      this.getRecommendedCategories();
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  section {
    background-color: $DarkBgBlocksTheme;
  }

  #RecommendedCategories {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 2.25%;
    width: 97.5%;
    height: 30px;
    border: 2px solid $BorderColor;
    border-radius: 5px;
    transition: 400ms ease;
    .recomendation {
      color: #747474;
      font-size: 16px;
      font-family: $SpaceGrotesk;
      text-decoration: none;
      transition: 400ms ease;
      outline: none;
      cursor: pointer;
    }
    .recomendation:hover {
      color: $HoverColor;
    }
    .recomendation_loading {
      width: 90px;
      height: 10px;
      background-color: $LoadingColor;
      border-radius: 2.5px;
    }
    button {
      margin-left: -12px;
      width: 16px;
      height: 18px;
      background-color: transparent;
      border: 0;
      outline: none;
      cursor: pointer;
    }
  }

  .whiteRecommendTheme {
    background-color: $WhiteBgBlocksTheme;
  }
</style>