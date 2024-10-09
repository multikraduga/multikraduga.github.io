import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    rows: [],
  }),
  getters: {},
  actions: {
    async fetchAccountData() {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/plushevy/demo/meetings"
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        this.rows = data;
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },
  },
});
