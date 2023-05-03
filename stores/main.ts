import { defineStore } from 'pinia';

export interface State {
  isSignIn: boolean,
  isDarkTheme: boolean,
  isCookieOpen: boolean,
  firstName: string,
  secondName: string,
  userImage: string,
  userName: string,
  dateOfBirth: string,
  phoneNumber: string,
  email: string,
  aboutUser: string,
  employment: string,
  posts: number,
  followers: number,
  views: number,
}

export const useMainStore = defineStore('main', {
  state: () => ({
    isSignIn: false,
    isDarkTheme: true,
    isCookieOpen: true,
    firstName: '',
    secondName: '',
    userImage: '',
    userName: '',
    dateOfBirth: '',
    phoneNumber: '',  
    email: '',
    aboutUser: '',
    employment: 'Кормит IT уточек', 
    posts: 0,
    followers: 0,
    views: 0
  }),
  actions: {
    changeSignInStatus() {
      this.isSignIn = !this.isSignIn;
    },
    changeThemeColor() {
      this.isDarkTheme = !this.isDarkTheme;
    },
    clearDataAboutUser() {
      this.firstName = '';
      this.secondName = '';
      this.userName = '';
      this.dateOfBirth = '';
      this.phoneNumber = '';
      this.email = '';
      this.aboutUser = '';
  
      this.isDarkTheme = true;
    },
    closeCookieBlock() {
      this.isCookieOpen = false;
    },
    changeDataAboutUser(payload:any) {
      this.firstName = payload.firstName;
      this.secondName = payload.secondName;
      this.userName = payload.userName;
      this.dateOfBirth = payload.dateOfBirth;
      this.phoneNumber = payload.phoneNumber;
      this.email = payload.email;
      this.aboutUser = payload.aboutUser;
    },
    setFirstDataAboutUser(payload:any) {
      this.firstName = payload.firstName;
      this.secondName = payload.secondName;
      this.userImage = payload.userImage;
      this.userName = payload.userName;
      this.email = payload.email;
      this.posts = payload.posts;
      this.followers = payload.followers;
      this.views = payload.views;
      this.isCookieOpen = true;
    }
  }
})