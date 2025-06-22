<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid>
    <v-card class="pa-6 rounded-lg" max-width="420" width="100%" >
      <v-card-title class="text-h5 font-weight-bold text-center pb-2">
        Crear cuenta
      </v-card-title>

      <v-card-subtitle class="text-center mb-4 text-body-2">
        Ingresa tu correo y una contraseña segura
      </v-card-subtitle>

      <v-card-text>
        <v-form @submit.prevent="handleRegister" ref="form" lazy-validation>
          <v-text-field
            v-model="email"
            label="Correo electrónico"
            type="email"
            prepend-inner-icon="mdi-email"
            required
            density="comfortable"
          />
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            prepend-inner-icon="mdi-lock"
            required
            density="comfortable"
          />
          <v-btn
            type="submit"
            color="#41CDF0"
            block
            class="mt-4"
            size="large"
          >
            Registrarse
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signUp } from '../services/auth.service';
import alerts from "@/shared/alerts"
const email = ref('');
const password = ref('');
const form = ref(null);
const router = useRouter();

const handleRegister = async () => {
  try {
    const response = await signUp(email.value, password.value);
    alerts.showSuccess("Usuario registrado correctamente");
    router.push('/auth/sign-in');
  } catch (error) {
    alerts.showError(error)
  }
};
</script>
