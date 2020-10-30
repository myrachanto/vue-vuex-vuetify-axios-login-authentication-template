<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>
            <v-btn icon @click="logout">
              <v-icon >mdi mdi-logout</v-icon>
            </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Estore backend</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-email</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
    <foot/>
  </v-app>
</template>

<script>
import axios from '../axios'
import foot from './foot'
  export default {
    data: () => ({ drawer: null,
    items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' , route:'/dashboard'},
          { title: 'Products', icon: 'mdi-folder-multiple' },
          { title: 'Category', icon: 'mdi-cards' },
          { title: 'MajorCagory', icon: 'mdi-cards-outline' }
        ],
     }),
    components:{
        foot
    },
    computed:{
        username(){
            return this.$store.getters.username
        }
    },
    methods:{
         async logout(){
        try {
                await axios.get(`/api/logout/${this.$store.getters.Token}`)
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('username')
                    this.$store.commit('logout')      
            }catch(err){
                this.snackbar = true
                console.log(err.response.data)
                this.errs = err.response.data
            }
      },
    }

  }
</script>