<script lang="ts">
import router from '@/router'
import { ref, reactive } from 'vue'
import { useUsersStore } from '@/store/users'

export default {
  name: 'AuthPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const useStore = useUsersStore()

    const error: any = reactive({
      msgError: 'Falha na requisição',
      active: false,
      status: 0
    })

    const auth = () => {
      loading.value = true
      error.active = false

      useStore
        .login(email.value, password.value)
        .then(() => router.push({ name: 'player' }))
        .catch((_error: any) => {
          error.msgError = 'Falha na requisição'
          error.status = _error.response.status
          error.active = true

          if (error.status === 422) error.msgError = 'Dados Inválidos'
          if (error.status === 404) error.msgError = 'Usuário Não Encontrado'
        })
        .finally(() => (loading.value = false))
    }

    const openResetPassword = () => {
      window.open('https://academy.especializati.com.br/password/reset', '_blank')
    }

    const clearError = () => {
      error.active = false
    }

    return {
      email,
      password,
      loading,
      error,
      clearError,
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
          <div
            class="form-item"
            :class="{ error: error.active && (error.status == 422 || error.status == 404) }"
          >
            <i class="far fa-envelope"></i>
            <input
              type="email"
              name="email"
              v-model="email"
              placeholder="Seu E-mail"
              @input="clearError"
              required
            />
          </div>
          <div class="form-item" :class="{ error: error.active && error.status == 422 }">
            <i class="far fa-lock"></i>
            <input
              type="password"
              name="password"
              v-model="password"
              placeholder="Sua Senha"
              @input="clearError"
              required
            />
          </div>
          <div v-if="error.active" class="form-item-erros">
            <span>{{ error.msgError }}</span>
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
