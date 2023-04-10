<template>
  <div class="px-16 text-left">
    <div class="flex items-center justify-between my-5">
      <h1 class="m-0">Liste des logements</h1>
      <el-button @click="handleCreateAccomodation" type="primary">Ajouter un logement</el-button>
    </div>

    <el-table class="table" :data="accomodations" height="70vh" width="100%">
      <el-table-column prop="id" label="Référence" width="120" />
      <el-table-column prop="image" label="Image" width="120">
        <template #default="{ row }">
          <img :src="row.image" alt="image" width="80">
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Type" width="120">
        <template #default="{ row }">
          <el-tag disable-transitions round v-if="row.type === 'maison'" type="info">Maison</el-tag>
          <el-tag disable-transitions round v-else-if="row.type === 'appartement'" type="success">Appartement</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="adresse" label="Adresse" width="250">
        <template #default="{ row }">
          <p class="adress">
            {{ row.adresse }} {{ row.cp }} {{ row.ville }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="prix" label="Prix" width="100">
        <template #default="{ row }">
          <p class="price">
            {{ row.prix }} €
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="superficie" label="Superficie" width="120">
        <template #default="{ row }">
          <p>
            {{ row.superficie }} m²
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="nb_pieces" label="Nb de pièces" width="130" />
      <el-table-column label="Nb de candidatures" width="160">
        <template #default="{ row }">
          <router-link to="/admin/applications" class="flex items-center decoration-none">
            <p class="candidatures">
              {{ applications.filter((application) => application.appartement.id === row.id).length }}
            </p>
            <el-icon class="ml-2">
              <View />
            </el-icon>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template #default="{ row }">
          <el-button type="info" circle @click="handleUpdateAccomodation(row.id)">
            <el-icon>
              <EditPen />
            </el-icon>
          </el-button>
          <el-popconfirm width="220" confirm-button-text="Oui" cancel-button-text="Annuler" :icon="InfoFilled"
            icon-color="#626AEF" title="Êtes-vous sûr ?" @confirm="handleDelete(row.id)">
            >
            <template #reference>
              <el-button type="danger" circle>
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <AddUpdateAccomodationDialog v-model="dialogVisible" :mode="dialogMode" :handleCloseDialog="handleCloseDialog" />
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { useAccomodationStore } from '../stores/accomodation';
import { useApplicationStore } from '../stores/application';
import { InfoFilled } from '@element-plus/icons-vue';
import AddUpdateAccomodationDialog from '../components/accomodation/AddUpdateAccomodationDialog.vue';

export default {
  name: "AccomodationsAdminView",
  setup() {

    const { accomodations, loading, error } = storeToRefs(useAccomodationStore())
    const { applications } = storeToRefs(useApplicationStore())

    const { fetchAccomodations, deleteAccomodation, fetchAccomodation } = useAccomodationStore()
    const { fetchApplications } = useApplicationStore()

    return {
      accomodations,
      applications,
      loading,
      error,
      InfoFilled,
      fetchAccomodations,
      deleteAccomodation,
      fetchApplications,
      fetchAccomodation,
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogMode: '',
    };
  },
  async mounted() {
    await this.fetchAccomodations();
    await this.fetchApplications();
  },
  methods: {
    handleDelete(id: number) {
      this.deleteAccomodation(id);
    },
    handleOpenDialog() {
      this.dialogVisible = true;
    },
    handleCloseDialog() {
      this.dialogVisible = false;
    },
    handleCreateAccomodation() {
      this.dialogMode = 'add';
      this.handleOpenDialog();
    },
    async handleUpdateAccomodation(id: string) {
      await this.fetchAccomodation(id);
      this.dialogMode = 'update';
      this.handleOpenDialog();
    },
  },
  components: {
    AddUpdateAccomodationDialog,
  },
};
</script>

<style>
.table {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
}

.adress {
  font-size: 0.8rem;
  color: #606266;
}

.price {
  font-size: 1rem;
  font-weight: 600;
  color: #409EFF;
}

.candidatures {
  font-size: 1rem;
  font-weight: 600;
}
</style>