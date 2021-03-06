
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import register from '@/components/auth/register'
import login from '@/components/auth/Login'
import posts from '@/components/posts'
import wait from '@/components/auth/wait'
import postdetails from '@/components/PostDetails'
import myProfile from '@/components/myProfile'
import Friends from '@/components/myfriends'
import profiles from '@/components/profiles'
import profilefriends from '@/components/profilefriends'
import adminpanel from '@/components/admin/adminPanel'
import accounts from '@/components/admin/accounts'
import store from "@/store";


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wait',
    name: 'wait',
    component: wait
  },
  {
    path: '/register',
    name: "register",
    component: register,
    meta: { guest: true },
  },
  {
    path: '/login',
    name: "login",
    component: login,
    meta: { guest: true },
  },
  {
    path: '/posts',
    name: "posts",
    component: posts,
    meta: {requiresAuth: true},
  },
  {
    path: '/posts/:id',
    name: "postdetails",
    props: true,
    component: postdetails,
    meta: {requiresAuth: true},
  },
  {
    path: '/myprofile/',
    name: "myprofile",
    component: myProfile,
    meta: {requiresAuth: true},
  },
  ,
  {
    path: '/friends/',
    name: "myfriends",
    component: Friends,
    meta: {requiresAuth: true},
  },
  {
    path: '/profilefriends/:id',
    name: "profilefriends",
    props: true,
    component: profilefriends,
    meta: {requiresAuth: true},
  },

  {
    path: '/profiles/:id',
    name: "profile",
    props: true,
    component: profiles,
    meta: {requiresAuth: true},
  },
  {
    path: '/admin/',
    name: "admin",
    component: adminpanel,
    meta: {requiresAuthorized: true},
  },
  {
    path: '/admin/accounts',
    name: "adminaccounts",
    component: accounts,
    meta: {requiresAuthorized: true},
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//Requires Authorization (to be admin)
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuthorized)) {
//     if (store.getters.isAuthorized) {
//       next();
//       return;
//     }
//     next("/admin/");
//   } else {
//     next();
//   }
// });

//Requires Authentication (to be registered)
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

//Guest
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});


export default router

