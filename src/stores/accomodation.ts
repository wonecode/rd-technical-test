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
    getAccomodation: (state) => {
      return () => state.accomodation;
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
    async fetchAccomodation(id: string | string[]) {
      this.accomodation = {} as Accomodation;
      this.loading = true;
      try {
        this.accomodation = await fetch(`http://localhost:3000/appartements/${id}`).then(
          (response) => response.json()
        );
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deleteAccomodation(id: number | number[]) {
      this.loading = true;
      try {
        const response = await fetch(`http://localhost:3000/appartements/${id}`, {
          method: 'DELETE',
        });
        if (response.status === 200) {
          const index = this.accomodations.findIndex((accomodation) => accomodation.id === id);
          this.accomodations.splice(index, 1);
        }
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
