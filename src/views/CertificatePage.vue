<script lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useCoursesStore } from '@/store/courses'
import { useRoute } from 'vue-router'
import bgCertificate from '@/assets/images/certificado-eti-back.png'
import NavbarComponent from '@/components/NavbarComponent.vue'

export default {
  name: 'CertificatePage',
  setup() {
    const loading = ref(true)
    const courseStore = useCoursesStore()
    const route = useRoute()
    const certificate = ref({
      identify: '',
      date_finished: '',
      user: {
        name: ''
      },
      course: {
        name: '',
        certificate_time: ''
      }
    })
    const viewShare = route.query.share
    const url = window.location.origin + window.location.pathname

    onMounted(() => {
      courseStore
        .getCertificate(route.params.identify.toString())
        .then((response) => {
          const info = response.data.data
          certificate.value = {
            identify: info.identify,
            date_finished: info.date_finished,
            user: {
              name: info.user.name
            },
            course: {
              name: info.course.name,
              certificate_time: info.course.certificate_time,
            }
          }
        })
        .catch(() => router.push({ name: 'my.courses' }))
        .finally(() => (loading.value = false))
    })

    const copyCertificate = () => {
      navigator.clipboard.writeText(url).then(
        () => { console.log('cp') },
        () => { }
      )
    }

    const printCertificate = () => {
      window.print()
    }

    return {
      certificate,
      copyCertificate,
      printCertificate,
      loading,
      bgCertificate,
      viewShare,
      url
    }
  },

  components: {
    NavbarComponent
  }
}
</script>

<template>
  <div id="certificate-wrapper">
    <header>
      <NavbarComponent />
    </header>
    <main>
      <div class="content">
        <span class="page-title" v-if="loading">Carregando o certificado...</span>
        <span class="page-title" v-else>
          <i class="fas fa-graduation-cap"></i>
          Certificado
        </span>
        <div class="share-content" v-if="viewShare">
          <ul class="items" role="list">
            <li>
              <a :href="`https://api.whatsapp.com/send?text=${url}`" target="_blank" title="Compartilhar no Whatsapp">
                <i class="fab fa-whatsapp"></i>
              </a>
            </li>
            <li>
              <a :href="`http://www.linkedin.com/shareArticle?url=${url}`" target="_blank"
                title="Compartilhar no LinkedIn">
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a :href="`http://www.facebook.com/sharer.php?u=${url}`" target="_blank" title="Compartilhar no Facebook">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a :href="`https://twitter.com/share?url=${url}`" target="_blank" title="Compartilhar no Twitter">
                <i class="fab fa-twitter fa-fw"></i>
              </a>
            </li>
            <li>
              <a href="#" @click.stop="copyCertificate" title="Copiar link">
                <i class="fas fa-copy"></i>
              </a>
            </li>
            <li>
              <a href="#" @click.stop="printCertificate" title="Imprimir certificado">
                <i class="fas fa-print"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="certificate-content">
          <div v-if="certificate" class="certificate">
            <img :src="bgCertificate" class="img-back-cert" alt="Certificado Digital EspecializaTi" />
            <div class="infos">
              <div class="title">CERTIFICADO</div>

              <div class="details">
                Certificamos que <b>{{ certificate?.user?.name }}</b> concluiu o
                <br />
                <b>{{ certificate?.course?.name }} </b> com carga horária total de
                <b>{{ certificate?.course?.certificate_time }}</b> hrs.
                <br />
                EspecializaTi (CNPJ: 23.882.706/0001-20)
              </div>

              <div class="details small">
                Certificado nº <b>{{ certificate?.identify }}</b> para verificar se é um certificado
                válido acesse: http://academy.especializati.com.br/verificar-certificado
              </div>

              <div class="details right">
                Concluido em <b>{{ certificate?.date_finished }}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/pages/CertificatePage.scss';
</style>

