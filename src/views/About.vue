<template>
<front>
  <div class="about">
    <h1>This is an about page</h1>
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