import { defineStore } from "pinia";
import { Loading } from "quasar";
import { ref } from "vue";
import { showNotify } from "src/utils/notify";

export const useRequestStore = defineStore("request", {
  state: () => ({
    rows: ref([]),
    details: {},
    tabs: [],
    isShow: false,
  }),
  getters: {},
  actions: {
    async fetchData() {
      try {
        Loading.show();

        const response = await fetch(
          "https://my-json-server.typicode.com/plushevy/demo/list"
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        } else {
          Loading.hide();
        }
        const data = await response.json();

        this.rows = data;
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },

    async getDetails(id) {
      try {
        Loading.show();
        const response = await fetch(
          "https://my-json-server.typicode.com/plushevy/demo/orders/" + id
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        } else {
          Loading.hide();
        }
        const data = await response.json();
        this.details[id] = data;
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },

    // Функция для глубокого копирования объектов
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    addTab(tab) {
      this.tabs.push(tab);
    },

    removeTab(id) {
      this.tabs = this.tabs.filter((tab) => tab.id !== id);
    },

    addNewReq(req) {
      this.rows = [...this.rows, req];
      this.details[req.id] = { ...req };
    },

    updateRequest(form) {
      const id = form.id;

      if (id) {
        this.details[id] = { ...form };

        const index = this.rows.findIndex((row) => row.id === id);

        if (index !== -1) {
          this.rows.splice(index, 1, { ...form });

          showNotify("Заявка изменена", { color: "green" });
        } else {
          console.error("Ошибка");
        }
      }
    },

    removeRow(id) {
      this.rows = this.rows.filter((row) => row.id !== id);
    },

    tabIsOpen(id) {
      return this.tabs.some((tab) => tab.id === id);
    },
  },
});
