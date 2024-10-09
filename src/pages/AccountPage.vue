<template>
  <div>
    <q-table :rows="accStore.rows" :columns="accountColumns" row-key="id">
    </q-table>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAccountStore } from "src/stores/accounts";

const accStore = useAccountStore();

const accountColumns = [
  {
    name: "client_city",
    label: "Город",
    field: "client_city",
  },
  {
    name: "client_name",
    label: "Имя",
    field: "client_name",
  },
  {
    name: "bank_name",
    label: "Банк",
    field: "bank_name",
  },
  {
    name: "stg",
    label: "Продукт",
    field: "stg",
  },
  {
    name: "meetingDatePlace",
    label: "Дата и место встречи",
    field: (row) => `${row.meeting_place} ${formatDate(row.meeting_date)}`,
    align: "left",
    style: "white-space: pre-line;",
  },
  {
    name: "person_phone",
    label: "Телефон",
    field: "person_phone",
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("ru-RU", options);
};

// Ходим за данными перед загрузкой страницы
onMounted(() => {
  if (accStore.rows.length <= 0) {
    accStore.fetchAccountData();
  }
});
</script>
