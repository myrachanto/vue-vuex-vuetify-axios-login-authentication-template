# login authentication with vuejs, vuex, vuetify

## i have being trolling all over the internet to get  this resource and here it is

This repository is a simple template of an authentication system using vuejs, vuex,vuetify and other supporting libraries in the quest of frontend web application development. working with frameworks such as the ones listed in here unburdens a programmer in the art of rediscovering the wheel and as such thought it will be nice to develop a simple authentication system and help someone out

## scope of the project
this projects has being design to use this tecknologies(vuejs,vuex,vuetify,axios etc) to work together and build a simple authenctication system. although this system will only work with a backend application system that embraces the authentication with jwt tokens that support single page application(SPAs)
- passport for laravel
- passport for nodejs
- Golang - well jtw package!

## the login file 
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

## register file 
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
                md="6"
                sm="4">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
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
              <v-card-text>
                  <v-form>
                                 <v-container>
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
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="firstname"
                                        rules="required|max:10"
                                      >
                                      <v-text-field
                                        v-model="form.firstname"
                                        :counter="10"
                                        :error-messages="errors"      
                                        label="First name"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="lastname"
                                        rules="required|max:10"
                                      >
                                      <v-text-field
                                        v-model="form.lastname"
                                        :counter="10"
                                        label="Last name"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="username"
                                        rules="required|max:10"
                                      >
                                      <v-text-field
                                        v-model="form.username"
                                        :counter="10"
                                        label="User name"
                                        :error-messages="errors" 
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="phone"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.phone"
                                        :error-messages="errors" 
                                        label="Phone"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="12"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Address"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.address"
                                        label="Address"
                                        :error-messages="errors" 
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="12"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="email"
                                        rules="required|email"
                                      >
                                      <v-text-field
                                        v-model="form.email"
                                        :error-messages="errors" 
                                        label="Email"
                                        required
                                      ></v-text-field>
                                </validation-provider>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="12"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="password"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.password"
                                        label="Password"
                                        :error-messages="errors" 
                                        required
                                        type="password"
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                </v-container>
                        
                      </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="Register">Register</v-btn>
                <v-btn color="primary" @click="login">Login</v-btn>
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
        form:{
             firstname:'',
            lastname:'',
            username:'',
            phone:'',
            address:'',
            email:'',
            password:'',
        },
      errors: null,
      timeout: 3000,
      snackbar:false,
      errs:{}
    }),

     methods: {
        login(){
        this.$router.push("/login")
        },
        async Register(){
                try {
                 const response = await axios.post('/register', {
                        fname: this.form.firstname,
                    lname: this.form.lastname,
                    uname: this.form.username,
                    phone: this.form.phone,
                    address: this.form.address,
                    email: this.form.email,
                    password: this.form.password,
                })
                 if(response.status === 201){
                    this.$router.push("/login") 
                }
        }catch(err){
            this.snackbar = true
            // console.log(err.response.data)
            this.errs = err.response.data
         }
        },
     }

  }
</script>

this files holds the key of authentication but there are other supporting files in the repository
