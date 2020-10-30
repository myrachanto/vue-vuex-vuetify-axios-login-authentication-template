<template>
  <v-app id="inspire">
      <!--  -->

    <v-app-bar app>

      <v-toolbar-title>E-Login auth</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
      tile
      class="ma-2"
      @click="home"
    >
      <v-icon left>
        mdi-home
      </v-icon>
      Home
    </v-btn>
    <v-btn
      tile
      class="ma-2"
    >
      <v-icon left>
        mdi-menu
      </v-icon>
      Categories
    </v-btn>
    <v-btn
      tile
      class="ma-2"
    >
      <v-icon left>
        mdi-information
      </v-icon>
      About us
    </v-btn>
    <v-btn
      tile
      class="ma-2"
    >
      <v-icon left>
        mdi-cart
      </v-icon>
      Cart
    </v-btn>
    <v-btn
      tile
      class="ma-2"
      @click="login"
    >
      <v-icon left>
        mdi-login
      </v-icon>
      Sign In
    </v-btn>
    <v-btn
      tile
      class="ma-2"
      @click="register"
    >
      <v-icon left>
        mdi-login-variant
      </v-icon>
      Sign Up
    </v-btn>
      
      
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <foot/>
  </v-app>
</template>

<script>

import foot from './foot'
  export default {
    data: () => ({ drawer: null }),
    components:{
        foot,
    },
    methods:{
        home(){
        this.$router.push("/")
        },
        login(){
        this.$router.push("/login")
        },
        register(){
        this.$router.push("/register")
        },
    }
  }
</script>