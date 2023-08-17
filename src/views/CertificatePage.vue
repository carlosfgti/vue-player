<script lang="ts">
import "@/assets/certificate.css"
import router from "@/router"
import { onMounted, ref } from "vue"
import { useCoursesStore } from '@/store/courses'
import { useRoute } from "vue-router"
import bgCertificate from "@/assets/images/certificado-eti-back.png"

export default {
  name: 'CertificatePage',
  setup() {
    const loading = ref(true)
    const courseStore = useCoursesStore()
    const route = useRoute();
    const certificate = ref(null)

    onMounted(() => {
      courseStore.getCertificate(route.params.identify.toString())
      .then(response => certificate.value = response.data.data)
      .catch(() => router.push({name: 'my.courses'}))
      .finally(() => loading.value = false)
    })

    return {
      certificate,
      loading,
      bgCertificate
    }

  }
}
</script>

<template>
  <div v-if="loading">Carregando o certificado</div>
  <div v-else class="certificado">
        <img :src="bgCertificate" class="img-back-cert" alt="Certificado Digital EspecializaTi">

        <div class="conteudo-certificado text-center">
            <h1 class="titulo-certificado">CERTIFICADO</h1>

            <h2 class="detalhes-certificado">
                Certificamos que <span class="nome-aluno">{{ certificate?.user.name }}</span> concluiu o <br>
                <span class="curso">{{ certificate?.course.name }} </span> com carga horária total de {{ certificate.course.certificate_time }} horas. <br>
                EspecializaTi (CNPJ: 23.882.706/0001-20)
            </h2>

            <h3 class="mais-detalhes-certificado">
                Certificado nº <b>{{ certificate.identify }}</b> para verificar se é um certificado válido acesse: http://academy.especializati.com.br/verificar-certificado
            </h3>

            <h4 class="data-certificado">
                Concluído em {{ certificate.date_finished }}
            </h4>
        </div>

    </div><!--Certificado-->
</template>
