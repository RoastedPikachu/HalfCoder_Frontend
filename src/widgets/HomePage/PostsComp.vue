<template>
  <section id="MainBlock_childPosts">
    <div class="MainBlock_childPosts_info" v-for="post of posts" :key="post.id">
      <div class="MainBlock_childPosts_topInfo">
        <div>
          <img :src="post.userImage" :alt="post.userName">
          <span>
            <p>{{ post.userName }}</p>
            <p>{{ post.userSpeciality }}</p>
          </span>
        </div>
        <button>
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>
      <p>{{ post.text }}</p>
      <img :src="post.postImage" :alt="post.text">
      <div class="MainBlock_childPosts_activityInfo">
        <span>
          <img src="@/assets/grey_like_icon.svg" alt="Лайк"><p> {{ post.likes }}</p>
          <img src="@/assets/grey_repost_icon.svg" alt="Репост"><p> {{ post.reposts }}</p>
        </span>
        <span>
          <img src="@/assets/grey_eye_icon.svg" alt="Просмотры"><p> {{ post.views }}</p>
        </span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PostsComp',
    data() {
      return {
        posts: [
          {
            id: 0,
            userImage: 'https://avatanplus.com/files/resources/original/5ebf6e0aa0d9c1721bc5d9a3.png',
            userName: 'Lorem Ipsum',
            userSpeciality: 'Frontend developer',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum accumsan mauris, et pharetra nibh rhoncus in. Morbi',
            postImage: 'https://sportishka.com/uploads/posts/2022-09/1662113882_3-sportishka-com-p-krasivaya-priroda-gori-krasivo-3.jpg',
            likes: 15,
            reposts: 25, 
            views: 54
          },
          {
            id: 1,
            userImage: 'https://avatanplus.com/files/resources/original/5ebf6e0aa0d9c1721bc5d9a3.png',
            userName: 'Lorem Ipsum',
            userSpeciality: 'Frontend developer',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum accumsan mauris, et pharetra nibh rhoncus in. Morbi et sodales.',
            postImage: 'https://sportishka.com/uploads/posts/2022-09/1662113882_3-sportishka-com-p-krasivaya-priroda-gori-krasivo-3.jpg',
            likes: 15,
            reposts: 25, 
            views: 54
          },
          {
            id: 2,
            userImage: 'https://avatanplus.com/files/resources/original/5ebf6e0aa0d9c1721bc5d9a3.png',
            userName: 'Lorem Ipsum',
            userSpeciality: 'Frontend developer',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum accumsan mauris, et pharetra nibh rhoncus in. Morbi et sodales.',
            postImage: 'https://sportishka.com/uploads/posts/2022-09/1662113882_3-sportishka-com-p-krasivaya-priroda-gori-krasivo-3.jpg',
            likes: 15,
            reposts: 25, 
            views: 54
          }
        ]
      }
    }
  })
</script>

<style lang="scss" scoped>
  #MainBlock_childPosts {
    width: auto;
    height: auto;
    .MainBlock_childPosts_info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 17px;
      margin-left: 20px;
      width: 580px;
      min-height: 440px;
      height: auto;
      background-color: #141414;
      border: 2px solid rgba(116, 116, 116, 0.5);
      border-radius: 5px;
      color: #747474;
      font-family: 'Space Grotesk', sans-serif;
      overflow: hidden;
      .MainBlock_childPosts_topInfo {
        display: flex;
        margin-top: 28px;
        width: 90%;
        height: 40px;
        div {
          display: flex;
          align-items: center;
          width: 100%;
          img {
            width: 40px;
            height: 40px;
            background-color: #747474;
            border-radius: 50px;
          }
          span {
            margin-left: 10px;
            width: 100%;
            p {
              width: 80%;
            }
            p:first-child {
              color: #ffffff;
              font-size: 14px;
              font-family: 'Inter', sans-serif;
            }
            p:last-child {
              font-size: 12px;
            }
          }
        }
        button {
          align-self: flex-start;
          background: none;
          border: 0;
          color: #747474;
          font-size: 24px;
          cursor: pointer;
        }
      }
      p {
        width: 90%;
      }
      img {
        width: 90%;
        height: 250px;
        border-radius: 5px;
      }
      .MainBlock_childPosts_activityInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 40px;
        span {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 25%;
          img {
            width: 25px;
            height: 25px;
            cursor: pointer;
          }
          p {
            margin-left: 7.5px;
            font-size: 14px;
          }
        }
        span:last-child {
          width: 10%;
        }
      }
    }
  }
</style>