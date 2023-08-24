<script lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { useUsersStore } from '@/store/users'

export default {
  name: 'AuthPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)

    const useStore = useUsersStore()

    const auth = () => {
      loading.value = true

      useStore
        .login(email.value, password.value)
        .then(() => router.push({ name: 'player' }))
        .catch((error) => {
          let msgError = 'Falha na requisição'

          if (error.status === 422) msgError = 'Dados Inválidos'
          if (error.status === 404) msgError = 'Usuário Não Encontrado'

          alert(msgError)
        })
        .finally(() => (loading.value = false))
    }

    const openResetPassword = () => {
      window.open('https://academy.especializati.com.br/password/reset', '_blank')
    }

    return {
      email,
      password,
      loading,
      auth,
      openResetPassword
    }
  }
}
</script>

<template>
  <div class="login-card-container">
    <div class="login-card">
      <div class="header">
        <div class="brand">
          <img src="@/assets/images/logo-especializati.png" alt="EspecializaTi Academy" />
        </div>
        <div class="title">
          <span>Login</span>
          <span>Faça o login para usar a plataforma</span>
        </div>
      </div>
      <div class="body">
        <form @submit.prevent="auth" method="post">
          <div class="form-item">
            <i class="far fa-envelope"></i>
            <input type="email" name="email" v-model="email" placeholder="Seu E-mail" required />
          </div>
          <div class="form-item">
            <i class="far fa-lock"></i>
            <input
              type="password"
              name="password"
              v-model="password"
              placeholder="Sua Senha"
              required
            />
          </div>
          <div class="form-item-other">
            <a href="#" @click.stop="openResetPassword">Esqueceu a Senha?</a>
          </div>
          <div class="form-actions">
            <button type="submit" :disabled="loading" :class="['btn', loading ? 'disabled' : '']">
              <span v-if="loading">Enviando...</span>
              <span v-else>Entrar</span>
            </button>
          </div>
        </form>
      </div>
      <div class="footer">
        <span>Todos os Direitos reservados - <strong>Especializati</strong></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../styles/pages/AuthPage.scss';
</style>
