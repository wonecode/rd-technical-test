import { defineStore } from 'pinia';
import { User } from '@/types/User';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [] as User[],
    user: {} as User,
    loading: false,
    error: null as Error | null,
  }),
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  actions: {
    async fetchUserById(id: number) {
      this.user = {} as User;
      this.loading = true;
      try {
        this.user = await fetch(`http://localhost:3000/utilisateurs/${id}`).then((response) =>
          response.json()
        );
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },
});
