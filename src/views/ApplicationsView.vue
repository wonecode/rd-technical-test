<template>
  <div class="px-16 text-left">
    <h1>Liste des candidatures</h1>

    <el-table class="table" :data="applications" height="70vh" width="100%">
      <el-table-column prop="id" label="Référence" width="120" />
      <el-table-column prop="statut" label="Statut" width="150">
        <template #default="{ row }">
          <el-tag disable-transitions round v-if="row.statut === 'en_attente'" type="warning">En attente</el-tag>
          <el-tag disable-transitions round v-else-if="row.statut === 'acceptee'" type="success">Acceptée</el-tag>
          <el-tag disable-transitions round v-else-if="row.statut === 'refusee'" type="danger">Refusée</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Date" width="140">
        <template #default="{ row }">
          {{ new Date(row.date).toLocaleDateString("fr") }}
        </template>
      </el-table-column>
      <el-table-column prop="appartement" label="Logement">
        <template #default="{ row }">
          <p class="accomodation">
            {{ row.appartement.type }} {{ row.appartement.nb_pieces }} pièces {{ row.appartement.superficie }} m² : {{
              row.appartement.cp }} {{ row.appartement.ville }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="utilisateur" label="Emetteur" width="200">
        <template #default="{ row }">
          <div @click="handleDialog(row.utilisateur.id)" class="items-center flex font-bold cursor-pointer">
            <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" size="small"
              class="mr-2"></el-avatar>
            {{ row.utilisateur.prenom }} {{ row.utilisateur.nom }}
            <el-icon class="ml-2">
              <View />
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="Actions">
        <template #default="{ row }">
          <el-button @click="handleStatus(row.id, 'acceptee')" v-if="row.statut !== 'acceptee'" type="success"
            size="small">Accepter</el-button>
          <el-button @click="handleStatus(row.id, 'refusee')" v-if="row.statut !== 'refusee'" type="danger"
            size="small">Refuser</el-button>
          <el-button @click="handleStatus(row.id, 'en_attente')" v-if="row.statut !== 'en_attente'" type="warning"
            size="small">En attente</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="Informations de l'émetteur" width="30%">
      <p class="flex items-center">
        <el-icon class="mr-1">
          <User />
        </el-icon>
        {{ user.prenom }} {{ user.nom }}
      </p>
      <p class="flex items-center">
        <el-icon class="mr-1">
          <ChatRound />
        </el-icon>
        {{ user.email }}
      </p>
      <p class="flex items-center">
        <el-icon class="mr-1">
          <Iphone />
        </el-icon>
        {{ user.telephone }}
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            OK
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { useApplicationStore } from '../stores/application';
import { useUserStore } from '../stores/user';

export default {
  name: "ApplicationsView",
  setup() {

    const { applications, loading, error } = storeToRefs(useApplicationStore())
    const { user } = storeToRefs(useUserStore())

    const { fetchApplications, updateApplication } = useApplicationStore()
    const { fetchUserById } = useUserStore()

    return {
      applications,
      loading,
      error,
      fetchApplications,
      updateApplication,
      fetchUserById,
      user
    }
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  async mounted() {
    await this.fetchApplications()
  },
  methods: {
    async handleDialog(id: number) {
      await this.fetchUserById(id);
      this.dialogVisible = true;
    },
    async handleStatus(id: number, statut: string) {
      await this.updateApplication(id, statut);
    }
  }
};
</script>

<style scoped>
.table {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
}

.accomodation {
  font-size: 0.8rem;
  color: #777777;
  text-transform: uppercase;
}
</style>