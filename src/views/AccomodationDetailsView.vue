<script lang="ts">
import { storeToRefs } from 'pinia'
import { useAccomodationStore } from '../stores/accomodation';
import router from '../router';
import { useApplicationStore } from '../stores/application';
import { ElMessage } from 'element-plus'

export default {
  name: "AccomodationDetailsView",
  setup() {
    const { accomodation, loading, error } = storeToRefs(useAccomodationStore())
    const { fetchAccomodation } = useAccomodationStore()
    const { addApplication, applications } = useApplicationStore()

    return {
      accomodation,
      loading,
      error,
      fetchAccomodation,
      addApplication,
      applications,
    }
  },
  async created() {
    await this.fetchAccomodation(this.$route.params.id);
  },
  methods: {
    async submitApplication() {
      try {
        await this.addApplication({
          id: Math.floor(Math.random() * 100000),
          appartementId: this.accomodation.id,
          utilisateurId: Math.floor(Math.random() * (Math.ceil(3) - Math.floor(1) + 1)) + Math.floor(1),
          date: new Date(),
          statut: 'en_attente',
        })
        ElMessage({
          message: 'Votre candidature a bien été envoyée.',
          type: 'success',
        })
      } catch (e) {
        ElMessage({
          message: 'Une erreur est survenue lors de la création de la candidature.',
          type: 'error',
        })
        console.log(e)
      }
    },
  },
}
</script>

<template>
  <div class="px-16 pt-10 flex">
    <img :src="accomodation.image" alt="image" class="w-55% rounded mr-10 image" />

    <div>
      <h1 class="text-3xl font-bold capitalize m-0">{{ accomodation.type }} {{ accomodation.nb_pieces }} pièces {{
        accomodation.superficie }} m²</h1>
      <p class="text-xl mt-1 text-gray-600">{{ accomodation.adresse }} {{ accomodation.cp }} {{ accomodation.ville }}</p>
      <p class="text-xl font-bold">{{ accomodation.prix }} € <span class="text-sm font-normal text-gray-500">/ par
          mois</span></p>
      <p class="text-lg">{{ accomodation.description }}</p>

      <el-button type="primary" class="mt-5" @click="submitApplication">
        <el-icon style="vertical-align: middle">
          <Edit />
        </el-icon>
        <span style="vertical-align: middle">
          Soumettre une candidature
        </span>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.image {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>