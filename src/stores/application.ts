import { defineStore } from 'pinia';
import { Application, ApplicationCore } from '@/types/Application';

export const useApplicationStore = defineStore({
  id: 'application',
  state: () => ({
    applications: [] as Application[],
    application: {} as Application,
    loading: false,
    error: null as Error | null,
  }),
  getters: {
    getApplications: (state) => {
      return () => state.applications;
    },
  },
  actions: {
    async fetchApplications() {
      this.applications = [];
      this.loading = true;
      try {
        const applications = await fetch('http://localhost:3000/candidatures').then((response) =>
          response.json()
        );

        const applicationsWithAppartementAndUser = await Promise.all(
          applications.map(async (application: ApplicationCore) => {
            const appartement = await fetch(
              `http://localhost:3000/appartements/${application.appartementId}`
            ).then((response) => response.json());

            const utilisateur = await fetch(
              `http://localhost:3000/utilisateurs/${application.utilisateurId}`
            ).then((response) => response.json());

            return {
              id: application.id,
              appartement: appartement,
              utilisateur: utilisateur,
              date: application.date,
              statut: application.statut,
            };
          })
        );

        this.applications = applicationsWithAppartementAndUser;
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateApplication(id: number, statut: string) {
      this.loading = true;
      try {
        const response = await fetch(`http://localhost:3000/candidatures/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ statut: statut }),
        });

        if (response.status === 200) {
          const index = this.applications.findIndex((a) => a.id === id);
          this.applications.splice(index, 1, await response.json());
          await this.fetchApplications();
        }
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async addApplication(application: ApplicationCore) {
      this.loading = true;
      try {
        const response = await fetch(`http://localhost:3000/candidatures`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(application),
        });

        if (response.status === 201) {
          const application = await response.json();
          this.applications.push(application);
        } else {
          throw new Error('Error while adding application');
        }
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
