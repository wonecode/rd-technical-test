<template>
  <el-dialog @open="handleOpen" @close="handleClose" :v-model="visible"
    :title="mode === 'add' ? 'Ajouter un logement' : 'Modifier un logement'" width="50%">
    <el-form ref="form" :model="form" label-position="top" autocomplete="off">
      <el-form-item label="Type">
        <el-radio-group v-model="form.type">
          <el-radio label="maison">Maison</el-radio>
          <el-radio label="appartement">Appartement</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Adresse">
        <el-input v-model="form.adresse"></el-input>
      </el-form-item>
      <el-form-item label="Code postal">
        <el-input v-model="form.cp"></el-input>
      </el-form-item>
      <el-form-item label="Ville">
        <el-input v-model="form.ville"></el-input>
      </el-form-item>
      <el-form-item label="Prix">
        <el-input-number v-model="form.prix" :min="0" :value="form.prix"></el-input-number>
      </el-form-item>
      <el-form-item label="Superficie">
        <el-input-number v-model="form.superficie" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="Nombre de pièces">
        <el-input-number v-model="form.nb_pieces" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="Description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="Image">
        <el-input v-model="form.image"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">{{ mode === 'add' ? 'Ajouter' : 'Modifier' }}</el-button>
        <el-button>Annuler</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAccomodationStore } from '../../stores/accomodation';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'AddUpdateAccomodationDialog',
  props: {
    visible: Boolean,
    mode: {
      type: String,
      required: true,
    },
    handleCloseDialog: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const { createAccomodation, updateAccomodation} = useAccomodationStore();
    const { accomodation } = storeToRefs(useAccomodationStore());

    const initialForm = {
      id: Math.floor(Math.random() * 1000),
      type: 'maison',
      adresse: '',
      cp: '',
      ville: '',
      prix: 0,
      superficie: 0,
      nb_pieces: 0,
      description: '',
      image: '',
    };

    return {
      createAccomodation,
      updateAccomodation,
      accomodation,
      initialForm
    };
  },
  data() {
    return {
      form: {
        id: Math.floor(Math.random() * 1000),
        type: 'maison',
        adresse: '',
        cp: '',
        ville: '',
        prix: 0,
        superficie: 0,
        nb_pieces: 0,
        description: '',
        image: '',
      },
      mode: this.mode,
    };
  },
  methods: {
    handleOpen() {
      this.$nextTick(() => {
        // Appeler la méthode mounted() ici
        this.mounted();
      });
    },
    handleClose() {
      this.form = this.initialForm;
    },
    async submitForm() {
      if (this.mode === 'add') {
        await this.createAccomodation(this.form);
        this.handleCloseDialog();
      } else {
        await this.updateAccomodation(this.form);
        this.handleCloseDialog();
      }
    },
    mounted() {
      if (this.mode === 'update') {
        this.form = this.accomodation;
      }
    },
  },
});
</script>
