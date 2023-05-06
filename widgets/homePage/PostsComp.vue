<template>
  <section id="MainBlock_childPosts">
    <div class="mainBlock_childPosts_info"
         :class="{ whitePostsTheme: !isDarkTheme, openComments: isCommentsOpen}"
         v-for="post of posts"
         :key="post.id"
    >
      <div class="mainBlock_childPosts_topInfo">
        <div class="mainBlock_childPosts_userInfo_loading" v-show="!isLoaded">
          <LoadingItemBrieflyInfoComp/>
        </div>

        <div class="mainBlock_childPosts_userInfo" v-show="isLoaded">
          <ItemBrieflyInfoComp
            :name="`${post.author.first_name} ${post.author.last_name}`"
            :image="post.author.photo"
            :employment="post.author.profile.work"
          />
        </div>

        <div class="mainBlock_childPosts_button">
          <button @click="changeModalActionsActive(post)">
            <Icon name="fa6-solid:ellipsis"/>
          </button>

          <ModalPostActionsComp
            :modalActionsActive="post.modal_actions_active"
          />
        </div>
      </div>

      <span class="postText_loading" v-show="!isLoaded">
        <p></p>
        <p></p>
      </span>
      <p v-show="isLoaded">{{ post.title }}</p>

      <div class="postImage_loading" v-show="!isLoaded"></div>
      <img 
        :src="post.photo" 
        :alt="post.title" 
        v-show="isLoaded"
      >

      <div class="mainBlock_childPosts_activityInfo">
        <span>
          <Icon name="fa6-solid:heart" class="icon"/>
          <p>{{ post.likes || 0 }}</p>

          <Icon name="fa6-solid:share" class="icon"/>
          <p>{{ post.reposts || 0 }}</p>

          <Icon name="fa6-solid:comment" class="icon" @click="isCommentsOpen = !isCommentsOpen"/>
          <p>{{ Object.values(post.comments).length || 0 }}</p>
        </span>

        <span>
          <Icon name="fa6-solid:eye" class="icon"/>
          <p>{{ post.views || 0 }}</p>
        </span>
      </div>

      <div class="mainBlock_childPosts_comments" v-show="isCommentsOpen">
        <div class="mainBlock_childPosts_comments_place">
          <CommentComp 
            :isOtherComment="true"
          />
          <CommentComp 
            :isOtherComment="false"
          />
        </div>

        <button class="mainBlock_childPosts_comments_showMore">Показать больше</button>
        
        <div class="mainBlock_childPosts_comments_addComment">
          <input type="text" placeholder="Добавить комментарий...">

          <button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.22202 18.903C8.04732 19.5249 6.74874 18.3126 7.28858 17.098L10.0125 10.969L7.28852 4.84011C6.74871 3.62548 8.04732 2.41312 9.22196 3.03499L21.8724 9.7323C22.8652 10.2579 22.8652 11.6801 21.8724 12.2057L9.22202 18.903Z" stroke="#747474" stroke-width="2.5"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, onMounted } from 'vue';
  import { useMainStore } from '@/stores/main';
  import axios from 'axios';
  import ModalPostActionsComp from '@/widgets/features/modals/ModalPostActionsComp.vue';
  import ItemBrieflyInfoComp from '@/widgets/shared/ItemBrieflyInfoComp.vue';
  import LoadingItemBrieflyInfoComp from '@/widgets/shared/LoadingItemBrieflyInfoComp.vue';
  import CommentComp from '@/widgets/features/CommentComp.vue';

  // Дочерние интерфейсы для поста

  interface Profile {
    birthday: string,
    country: string,
    education: string,
    hobby: string,
    phone: string,
    quote: string,
    sex: string,
    website: string,
    work: string,
  }

  interface Author {
    type: string,
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    photo: string
    link: string
    profile: Profile
  } 

  // Сам интерфейс пост

  interface Post {
    id: number,
    title: string,
    body: {
      text: string
    },
    author: Author,
    views: number,
    category: string,
    tags: object,
    likes: number,
    reposts: number,
    link: string,
    date_published: string,
    time_to_read: number,
    photo: string,
    comments: [],
    modal_actions_active: boolean
  } 

  export default defineComponent({
    name: 'PostsComp',
    setup() {
      const store = useMainStore();
      const isDarkTheme = ref(store.isDarkTheme);
      const isLoaded = ref(false);
      const activeId = ref(0);
      const posts = ref([
        {
          id: 0,
          title: '',
          body: {
            text: ''
          },
          author: {
            type: '',
            id: 0,
            username: '',
            first_name: '',
            last_name: '',
            photo: '',
            link: '',
            profile: {
              birthday: '',
              country: '',
              education: '',
              hobby: '',
              phone: '',
              quote: '',
              sex: '',
              website: '',
              work: '',
            }
          },
          views: 0,
          category: '',
          tags: {},
          likes: 0,
          reposts: 0,
          link: '',
          date_published: '',
          time_to_read: '',
          photo: '',
          comments: {},
          modal_actions_active: false,
        },
        {
          id: 1,
          title: '',
          body: {
            text: ''
          },
          author: {
            type: '',
            id: 0,
            username: '',
            first_name: '',
            last_name: '',
            photo: '',
            link: '',
            profile: {
              birthday: '',
              country: '',
              education: '',
              hobby: '',
              phone: '',
              quote: '',
              sex: '',
              website: '',
              work: '',
            }
          },
          views: 0,
          category: '',
          tags: {},
          likes: 0,
          reposts: 0,
          link: '',
          date_published: 0,
          time_to_read: 0,
          photo: '',
          comments: {},
          modal_actions_active: false,
        }
      ]);
      const userName = ref('');
      const isCommentsOpen = ref(false);

      const changeModalActionsActive = (post:any):void => {
        post.modal_actions_active = !post.modal_actions_active;
        activeId.value = post.id;

        posts.value.forEach((item) => {
          if(item.id !== activeId.value) {
            item.modal_actions_active = false;
          }
        })
      }

      // const openComments = (post:any):void => {
      //   post.
      // }

      onMounted(() => {
        window.addEventListener('click', event => {
          if(event.target !== null) {
            const target = event.target as HTMLElement;

            if(!target.closest('.mainBlock_childPosts_button')) {
              let currentPost = posts.value.find(item => item.id === activeId.value);
              if(currentPost !== undefined) {
                currentPost.modal_actions_active = false;
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
        isLoaded,
        activeId,
        posts,
        changeModalActionsActive,
        userName,
        isCommentsOpen
      }
    },
    methods: {
      getCookie(name:string) {
        let matches = document.cookie.match(new RegExp(
          //eslint-disable-next-line
          "(?:^|; )" + name.replace(`${/([\.$?*|{}\(\)\[\]\\\/\+^])/g}`, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      },
      async getPosts() {
        const url = new URL('http://79.174.12.75:80/api/article/tape/');

        const token = this.getCookie('token');

        axios.post(url.toString(), { token: token }, {
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
          .then((res:any) => {
            this.posts = Object.values(res.data);

            if(res) {
              this.isLoaded = true;
            }
          })
          .catch((e:any) => {
            this.$router.push('/techWorks');
          });
      }
    },
    mounted() {
      this.getPosts();
    },
    components: {
      ModalPostActionsComp,
      ItemBrieflyInfoComp,
      LoadingItemBrieflyInfoComp,
      CommentComp,
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  #MainBlock_childPosts {
    width: 65%;
    height: auto;
    .mainBlock_childPosts_info {
      position: relative;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 17px;
      margin-left: 3.5%;
      padding: 5px 2.5%;
      width: 95%;
      min-height: 440px;
      height: auto;
      background-color: $DarkBgBlocksTheme;
      border: 2px solid $BorderColor;
      border-radius: 5px;
      color: #747474;
      font-family: $SpaceGrotesk;
      transition: 400ms ease;
      //overflow: hidden;
      .mainBlock_childPosts_topInfo {
        display: flex;
        margin-top: 28px;
        width: 90%;
        height: 40px;
        .mainBlock_childPosts_userInfo {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .mainBlock_childPosts_userInfo_loading {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .mainBlock_childPosts_button {
          position: relative;
          width: 20px;
          height: 20px;
          button {
            align-self: flex-start;
            background: none;
            border: 0;
            color: $IconColor;
            font-size: 24px;
            outline: none;
            transition: 400ms ease;
            cursor: pointer;
          }
          button:hover {
            color: $HoverColor;
          }
        }
      }
      p {
        width: 90%;
      }
      .postText_loading {
        width: 90%;
        p {
          height: 12.5px;
          background-color: $LoadingColor;
          border-radius: 2.5px;
        }
        p:last-child {
          width: 75%;
          margin-top: 7.5px;
        }
      }
      img {
        width: 90%;
        height: 250px;
        border-radius: 5px;
      }
      .postImage_loading {
        width: 90%;
        height: 250px;
        background-color: $LoadingColor;
        border-radius: 5px;
      }
      .mainBlock_childPosts_activityInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 40px;
        span {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 35%;
          .icon {
            color: $IconColor;
            font-size: 100px;
            transition: 400ms ease;
            cursor: pointer;
          }
          .icon:hover {
            color: $HoverColor;
          }
          p {
            margin-left: 7.5px;
            font-size: 14px;
          }
        }
        span:last-child {
          width: 7.5%;
        }
      }
    }
    .mainBlock_childPosts_comments {
      position: absolute;
      margin-top: 430px;
      padding: 0 5%;
      width: 90%;
      min-height: 100px;
      height: auto;
      background-color: #141414;    
      border: 2px solid rgba(116, 116, 116, 0.5);
      border-radius: 0 0 5px 5px;
      z-index: 10;  
      .mainBlock_childPosts_comments_place {
        padding-top: 5px;
        width: 100%;
        min-height: 140px;
      }
      .mainBlock_childPosts_comments_showMore {
        width: 100%;
        background: none;
        border: none;
        color: #3d5aff;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
      }
      .mainBlock_childPosts_comments_addComment {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        input {
          padding-left: 2.5%;
          width: 87.5%;
          height: 35px;
          background-color: #1b1b1b;
          border: none;
          border-radius: 5px;
          color: #ffffff;
          font-size: 14px;
          font-family: $SpaceGrotesk;
          transition: 400ms ease;
          outline: none;
        }
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          height: 35px;
          background-color: #1b1b1b;
          border: none;
          border-radius: 50px;
          transition: 400ms ease;
          cursor: pointer;
          svg {
            margin-top: 1.5px;
            margin-left: -5px;
            path {
              transition: 400ms ease;
            }
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

  #MainBlock_childPosts {
    .whitePostsTheme {
    background-color: $WhiteBgBlocksTheme;
      .mainBlock_childPosts_topInfo {
        .mainBlock_childPosts_userInfo {
          span {
            p:first-child {
              color: #1e1e1e;
            }
          }
        }
      }
      .mainBlock_childPosts_comments {
        .mainBlock_childPosts_comments_addComment {
          input {
            background-color: #ffffff;
            border: 2px solid rgba(116, 116, 116, 0.5);
            color: #747474;
          }
          button {
            background-color: #ffffff;
            border: 2px solid rgba(116, 116, 116, 0.5);
          }
        }
      }
    }
  }
</style>