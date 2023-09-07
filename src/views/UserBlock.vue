<script lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useUsersStore } from '@/store/users'

export default {
  name: 'UserBlock',
  setup() {
    const userStore = useUsersStore()

    const urlWhatsApp =
      'https://api.whatsapp.com/send?phone=5564981701406&text=Conta%20bloqueada%20meu%20e-mail%20' +
      userStore.user?.email

    return {
      urlWhatsApp
    }
  },
  components: {
    NavbarComponent
  }
}
</script>

<template>
  <div id="my-courses-wrapper">
    <header>
      <NavbarComponent />
    </header>
    <main>
      <div class="content">
        <span class="page-title">
          <br /><br />
          <p>Nossa I.A. detectou um comportamento incomum do seu usuário</p>
          <p>
            Entre em contato pelo e-mail <strong>contato@especializati.com.br</strong> ou pelo
            WhatsApp
            <strong><a :href="urlWhatsApp" style="color: aquamarine">(clique aqui)</a></strong>
            que resolveremos para você, conte com a gente! :-)
          </p>
        </span>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/pages/MyCoursesPage.scss';
</style>
