import { defineStore } from 'pinia';
import { Accomodation } from '@/types/Accomodation';

export const useAccomodationStore = defineStore({
  id: 'accomodation',
  state: () => ({
    accomodations: [] as Accomodation[],
    accomodation: {} as Accomodation,
    loading: false,
    error: null as Error | null,
  }),
  getters: {
    getAccomodations: (state) => {
      return () => state.accomodations;
    },
  },
  actions: {
    async fetchAccomodations() {
      this.accomodations = [];
      this.loading = true;
      try {
        this.accomodations = await fetch('http://localhost:3000/appartements').then((response) =>
          response.json()
        );
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
