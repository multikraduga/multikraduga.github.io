<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-tabs inline-label>
          <q-route-tab name="requests" label="Заявки" to="/request" />
          <q-route-tab name="accounts" label="Счета" to="/account" />
          <q-route-tab
            v-for="tab in reqStore.tabs"
            :key="tab.id"
            :name="tab.name"
            :label="tab.label"
            :to="`/request/${tab.id}`"
          >
            <q-btn
              flat
              dense
              round
              icon="close"
              class="q-ml-xs"
              @click.prevent="closeTab(tab.id)"
            />
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRequestStore } from "src/stores/requests";
import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";

const reqStore = useRequestStore();

defineOptions({
  name: "MainLayout",
});

// Используем useRoute для получения текущего маршрута
const route = useRoute();
const router = useRouter();

// Отслеживаем изменения в текущем маршруте
watch(
  () => route.name,
  (newName) => {
    if (newName === "ReqDetails") {
      const id = route.params.id;
      const currentRow = reqStore.rows.find((row) => row.id === id);

      // Проверяем, если вкладка уже существует, не добавляем её
      if (!reqStore.tabIsOpen(id)) {
        reqStore.addTab({
          id: id,
          label: `Заявка №${currentRow.num}`,
          name: id,
        });
      }
    }
  },
  { immediate: true }
);

// Закрытие таба
const closeTab = (id) => {
  reqStore.removeTab(id); // Удаляем вкладку из store

  if (route.path !== "/request") {
    router.push("/request").catch((err) => {
      console.error("Ошибка навигации:", err);
    });
  }
};
</script>
