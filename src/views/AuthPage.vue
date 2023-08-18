<script lang="ts">
import router from '@/router';
import { ref } from 'vue'
import { useUsersStore } from '@/store/users'

export default {
  name: 'AuthPage',
  setup() {
    const email = ref("")
    const password = ref("")
    const loading = ref(false)

    const useStore = useUsersStore()

    const auth = () => {
            loading.value = true

            useStore.login(email.value, password.value)
            .then(() => router.push({name: 'player'}))
            .catch(error => {
                let msgError = 'Falha na requisição'

                if (error.status === 422) msgError = 'Dados Inválidos'
                if (error.status === 404) msgError = 'Usuário Não Encontrado'

                alert(msgError)
            })
            .finally(() => loading.value = false)
          }

    const openResetPassword = () => window.open('https://academy.especializati.com.br/password/reset', '_blank')

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
  <div>
    <form action="" method="post">
      <input type="email" name="email" placeholder="Seu E-mail" required v-model="email">
      <input type="password" name="password" placeholder="Sua Senha" required v-model="password">
      <button type="submit" :disabled="loading" :class="[
                                    'btn',
                                    loading ? 'disabled' : ''
                                ]"
                                @click.prevent="auth">
                                <span v-if="loading">Enviando...</span>
                                <span v-else>Entrar</span>
                              </button>
    </form>
    <a href="#" @click.prevent="openResetPassword">Esqueceu a Senha?</a>
  </div>
</template>
