import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'
import Home from "../views/Home.vue";
import Register from '../views/auth/register'
import Login from '../views/auth/login'
import Dashboard from '../views/backend/dashboard'

Vue.use(VueRouter);
var token = store.getters.Token
const routes = [
  {path: "/",name: "Home",component: Home},
  {path: "/login",component: Login},
  {path: "/register",component: Register},
  {path: "/dashboard",component: Dashboard, beforeEnter(to, from, next) {
    if (token){
      next()
    }else{
      next('/login')
    }
  }},
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
