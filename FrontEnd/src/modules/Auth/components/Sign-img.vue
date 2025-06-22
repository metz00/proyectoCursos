<template>
  <div class="welcome-container">
    <div class="welcome-content">
      <img class="icon" src="../../../assets/birrete.svg" alt="Graduation Cap" />
      <h1 class="title">Bienvenido de vuelta</h1>
      <p class="subtitle">Accede a tu cuenta para continuar tu aprendizaje</p>
    </div>
  
  </div>
</template>



<style scoped>

.welcome-container {
  background-color: #0F2D3C; 
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.icon {
  width: 60px;
  margin-bottom: 1rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.welcome-image {
  max-width: 550px;
  margin-top: 1rem;
}
</style>
