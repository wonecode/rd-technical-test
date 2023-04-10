<template>
  <div class="px-16 text-left">
    <h1 class="mb-0">Liste des logements</h1>
    <h2 class="mt-1 font-light">{{ accomodations.length }} biens disponibles</h2>

    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>

    <div>
      <div class="card rounded" v-for="accomodation in accomodations" :key="accomodation.id">
        <img :src="accomodation.image" alt="image" class="card__image" />
        <div class="card__content">
          <div>
            <h2>{{ accomodation.type }} {{ accomodation.nb_pieces }} pièces {{ accomodation.superficie }} m²</h2>
            <p class="card__subtitle">{{ accomodation.cp }} {{ accomodation.ville }}</p>
            <p class="card__price">{{ accomodation.prix }} € <span class="text-sm font-normal text-gray-500">/ par
                mois</span></p>
            <p>{{ accomodation.description }}</p>
          </div>

          <div class="card__actions">
            <router-link :to="'/accomodations/' + accomodation.id" class="mr-3 decoration-none">
              <el-button type="primary">
                <el-icon style="vertical-align: middle">
                  <Search />
                </el-icon>
                <span style="vertical-align: middle">
                  En savoir plus
                </span>
              </el-button>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { useAccomodationStore } from '../stores/accomodation';
import { InfoFilled } from '@element-plus/icons-vue';

export default {
  name: "AccomodationsView",
  setup() {
    const { accomodations, loading, error } = storeToRefs(useAccomodationStore())
    const { fetchAccomodations, deleteAccomodation } = useAccomodationStore()

    return {
      accomodations,
      loading,
      error,
      fetchAccomodations,
      deleteAccomodation,
    }
  },
  data() {
    return {
      InfoFilled,
    }
  },
  async created() {
    await this.fetchAccomodations()
  },
  methods: {
    async deleteAccomodation(id: number) {
      try {
        await this.deleteAccomodation(id)
      } catch (e) {
        console.log(e)
      }
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #fafafa;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card__image {
  width: 30%;
  height: 220px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 5px;
}

.card__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card__content h2 {
  font-size: 1.3rem;
  margin: 0;
  text-transform: capitalize;
}

.card__subtitle {
  font-size: 1rem;
  margin: 0;
  color: #666;
}

.card__price {
  font-size: 1.3rem;
  margin: 5px 0 0 0;
  font-weight: bold;
  color: var(--ep-color-primary);
}
</style>