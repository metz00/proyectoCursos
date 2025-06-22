<template>
  <div class="fill-height" fluid>
    <v-row no-gutters align="center" justify="center">
     
      <v-col cols="12" md="6" class="hidden-sm-and-down">
        <SignUpImage />
      </v-col>
       <v-col cols="12" md="6">
        <SignUpForm />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import SignUpForm from '../components/Sign-up.vue';
import SignUpImage from '../components/Sign-img.vue';
</script>

<style scoped>

</style>
