<template>
<front>
  <div class="home">

      <v-container fill-height fluid>
        <v-row align="center"
      justify="center">
                <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="6">
        <v-card>
        <v-card-text>
          <div>Project</div>
          <p class="display-1 text--primary">
            Welcome to vuejs, vuex, vuetify authentication
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="deep-purple accent-4"
          >
            Learn More
          </v-btn>
        </v-card-actions>
  </v-card>
                </v-col>
                </v-row>
                </v-container>
  </div>

</front>
</template>

<script>
// @ is an alias to /src
import front from '../layouts/front'

export default {
  name: "Home",
  components: {
    front
  }
};
</script>
