<script lang="ts">
import { storeToRefs } from 'pinia'
import { useAccomodationStore } from '../stores/accomodation';

const { accomodations, loading, error } = storeToRefs(useAccomodationStore())
const { fetchAccomodations } = useAccomodationStore()

fetchAccomodations()

export default {
  name: "AccomodationsView",
  data() {
    return {
      accomodations,
      loading,
      error,
    };
  },
};
</script>

<template>
  <div class="px-16 text-left">
    <h1>Liste des logements</h1>

    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>

    <div>
      <div class="card" v-for="accomodation in accomodations" :key="accomodation.id">
        <img :src="accomodation.image" alt="image" class="card__image" />
        <div class="card__content">
          <div>
            <h2>{{ accomodation.type }} {{ accomodation.nb_pieces }} pièces {{ accomodation.superficie }} m²</h2>
            <p class="card__subtitle">{{ accomodation.adresse }} {{ accomodation.cp }} {{ accomodation.ville }}</p>
            <p class="card__price">{{ accomodation.prix }} €</p>
            <p>{{ accomodation.description }}</p>
          </div>

          <div class="card__actions">
            <el-button type="primary">
              <el-icon style="vertical-align: middle">
                <Search />
              </el-icon>
              <span style="vertical-align: middle"> En savoir plus</span>
            </el-button>
            <el-button type="info">
              <el-icon style="vertical-align: middle">
                <Edit />
              </el-icon>
              <span style="vertical-align: middle"> Modifier</span>
            </el-button>
            <el-button type="danger">
              <el-icon style="vertical-align: middle">
                <Delete />
              </el-icon>
              <span style="vertical-align: middle"> Supprimer</span>
            </el-button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
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