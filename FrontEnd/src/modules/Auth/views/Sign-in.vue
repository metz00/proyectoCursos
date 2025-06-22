<template>
  <div class="fill-height" fluid>
    <v-row no-gutters align="center" justify="center" class="login-wrapper">
      <v-col cols="12" md="6" class="hidden-sm-and-down">
        <LoginImage />
      </v-col>
      <v-col cols="12" md="6">
        <LoginForm />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import LoginForm from "../components/Sign-in.vue";
import LoginImage from "../components/Sign-img.vue";
</script>

<style scoped>

</style>
