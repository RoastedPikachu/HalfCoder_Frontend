<template>
  <section id="Profile" :class="{ whiteProfileTheme: !isDarkTheme }">
    <div id="Profile_topLine"></div>

    <div id="Profile_mainInfo">
      <img :src="allInfoAboutUser.userImage" alt="Фото профиля">
      <h2>{{ allInfoAboutUser.firstName }} {{ allInfoAboutUser.secondName}}</h2>
      <p>{{ allInfoAboutUser.employment }}</p>
      <p>I'd love to change the world, but they won't give me the source code</p>
    </div>
    
    <span id="Profile_secondaryInfo">
      <div>
        <p>{{ allInfoAboutUser.followers }}</p>
        <p>{{ followersCountText }}</p>
      </div>

      <div>
        <p>{{ allInfoAboutUser.posts }}</p>
        <p>{{ postsCountText }}</p>
      </div>

      <div>
        <p>{{ allInfoAboutUser.views }}</p>
        <p>{{ viewsCountText }}</p>
      </div>
    </span>

    <div id="Profile_centerLine"></div>
    
    <ProfileMenuComp/>
  </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
  import { ref, onMounted, watch } from 'vue';
  import { useMainStore } from '@/stores/main';
  import ProfileMenuComp from '@/widgets/features/ProfileMenuComp.vue';

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
        name: 'ProfileSignInComp',
        props: {
            allInfoAboutUser: {
                type: Object as () => AllInfoAboutUser,
                required: true
            }
        },
        setup(props) {
            const store = useMainStore();
            const isDarkTheme = ref(store.isDarkTheme);
            const postsCountText = ref('');
            const followersCountText = ref('');
            const viewsCountText = ref('');

            const setCountText = (numArr:number[], targetArr:string[], textArr:string[][]) => {
                for (let i = 0; i < numArr.length; i++) {
                    let n: number = numArr[i] % 100;

                    if (n >= 5 && n <= 20) {
                        targetArr[i] = textArr[i][2];
                    } else if (n === 1) {
                        targetArr[i] = textArr[i][0]
                    } else if (n >= 2 && n <= 4) {
                        targetArr[i] = textArr[i][1]
                    } else {
                        targetArr[i] = textArr[i][2];
                    }
                }
                postsCountText.value = targetArr[0];
                followersCountText.value = targetArr[1];
                viewsCountText.value = targetArr[2];
            }

            store.$subscribe(() => {
                isDarkTheme.value = store.isDarkTheme;
            })

            return {
                store,
                isDarkTheme,
                postsCountText,
                followersCountText,
                viewsCountText,
                setCountText
            }
        },
        mounted() {
              this.setCountText([this.allInfoAboutUser.posts, this.allInfoAboutUser.followers, this.allInfoAboutUser.views],
                  [this.postsCountText, this.followersCountText, this.viewsCountText],
                  [
                      ['Пост', 'Поста', 'Постов'],
                      ['Подписчик', 'Подписчика', 'Подписчиков'],
                      ['Просмотр', 'Просмотра', 'Просмотров']
                  ]);
        },
        components: {
            ProfileMenuComp
        }
    })
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';

  section {
    background-color: $DarkBgBlocksTheme;
    #Profile_mainInfo {
      h2 {
        color: $DarkHeadingColor;
      }
    }
    #Profile_secondaryInfo {
      div {
        p {
          color: $DarkNumberColor;
        }
        p:last-child {
          color: $DescColor;
        }
      }
    }
  }
  #Profile {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 590px;
    border: 2px solid $BorderColor;
    border-radius: 5px;
    transition: 400ms ease;
    #Profile_topLine {
      position: absolute;
      width: 100%;
      height: 50px;
      background-image: url('@/assets/test_bgImage.png');
      background-size: cover;
      border-radius: 2.5px 2.5px 0 0;
    }
    #Profile_mainInfo {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 25px;
      width: 180px;
      height: 185px;
      img {
        width: 75px;
        height: 75px;
        background-color: $LoadingColor;
        border-radius: 15px;
        z-index: 9;
      }
      h2 {
        width: 100%;
        margin-top: 7px;
        font-size: 16px;
        font-family: $Inter;
        text-align: center;
        transition: 400ms ease;
      }
      p {
        margin-top: 7px;
        color: $DescColor;
        font-size: 14px;
        font-weight: 700;
        font-family: $SpaceGrotesk;
        text-align: center;
      }
      p:last-child {
        margin-top: 7px;
      }
    }
    #Profile_secondaryInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      width: 235px;
      height: 45px;
      div {
        font-weight: 700;
        font-family: $SpaceGrotesk;
        text-align: center;
        p {
          font-size: 16px;
          transition: 400ms ease;
        }
        p:last-child {
          font-size: 12px;
        } 
      }
      div:nth-child(2) {
        width: 25%;
        border: 0px solid $BorderColor;
        border-width: 0 2px 0;
      }
    }
    #Profile_centerLine {
      position: relative;
      width: 87.5%;
      height: 2px;
      background-color: $BorderColor;
      border-radius: 5px;
    }
  }

  .whiteProfileTheme {
    background-color: $WhiteBgBlocksTheme;
    #Profile_mainInfo {
      h2 {
        color: $WhiteHeadingColor;
      }
    }
    #Profile_secondaryInfo {
      div {
        p {
          color: $WhiteNumberColor;
        }
      }
    }
  }
</style>