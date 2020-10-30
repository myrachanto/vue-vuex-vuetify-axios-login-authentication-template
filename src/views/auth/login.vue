<template>
  <front>
    <v-main>
          
          <validation-observer
    ref="observer"
    v-slot="{ }"
  >
      <v-container fill-height fluid>
        <v-row align="center"
      justify="center">
                <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon large>mdi-home</v-icon>
                    </v-btn>
                  </template>
                  <span>Home</span>
                </v-tooltip>
              </v-toolbar>
                <template >  
                   <v-snackbar
                    :timeout="timeout"
                    v-model="snackbar"
                    :value="true"
                    absolute
                    left
                    shaped
                    top
                    dismisable
                    color="red"
                  >
                <h2>{{errs.error}}</h2>
                <p>{{errs.message}}</p>
                  </v-snackbar>
              
            </template>
              <v-card-text>
                <v-form>
                    <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required"
                    >
                        <v-text-field
                        prepend-icon="person"
                        v-model="email"
                        :error-messages="errors"
                        label="Email"
                        required
                        ></v-text-field>
                    </validation-provider>
                    <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|max:10"
                    >
                        <v-text-field
                        prepend-icon="lock"
                        v-model="password"
                        :counter="10"
                        :error-messages="errors"
                        label="Password"
                        type="password"
                        required
                        ></v-text-field>
                    </validation-provider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="Login">Login</v-btn>
                <v-btn color="primary" @click="signup">Create an account</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
          </validation-observer>
    </v-main>
  </front>
</template>

<script>
import front from '../../layouts/front'
 import axios from 'axios'
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
      front
    },
    data: () => ({
      password: '',
      email: '',
      errors: null,
      timeout: 3000,
      snackbar:false,
      errs:{}
    }),

    methods: {
    signup(){
      this.$router.push("/register")
    },
     async Login(){
        try {
            const response = await axios.post('/login', {
                email: this.email,
                password: this.password,
            })
              if(response.status !== 200){
                    this.$router.replace("/login") 
                }
                ///set new details///////////
                localStorage.setItem('access_token', response.data.Token)
                localStorage.setItem('username', response.data.uname)
                this.$store.commit('login', response.data) 
            }catch(err){
                this.snackbar = true
                // console.log(err.response.data)
                this.errs = err.response.data
            }
        },
    }
}
</script>