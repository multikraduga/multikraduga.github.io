<template>
  <div class="q-pa-md d-flex flex-column">
    <div class="q-mb-md">
      <q-btn
        color="grey-4"
        text-color="black"
        glossy
        unelevated
        icon="add"
        label="Добавить заявку"
        @click="reqStore.isShow = true"
      />
    </div>

    <div>
      <RequestGrid
        :columns="requestColumns"
        :rows="rows"
        @click-btn="getRequest"
        @delete="deleteRequest"
      />
    </div>
    <RequestForm :show="reqStore.isShow" @add="addNewReq" @close="closeForm" />
  </div>
</template>

<script setup>
import RequestGrid from "src/components/RequestGrid.vue";
import { useRouter } from "vue-router";
import { onMounted, computed } from "vue";
import { useRequestStore } from "src/stores/requests";
import RequestForm from "src/components/RequestForm.vue";

const reqStore = useRequestStore();

const rows = computed(() => [...reqStore.rows]);

const addNewReq = (newRequest) => {
  reqStore.addNewReq(newRequest);
};

const requestColumns = [
  {
    name: "num",
    label: "№ Заявки",
    field: "num",
  },
  {
    name: "stg",
    label: "Продукт",
    field: "stg",
  },
  {
    name: "dadd",
    label: "Дата",
    field: (row) => formatDate(row.dadd),
  },
  {
    name: "client_name",
    label: "Клиент",
    field: "client_name",
  },
  {
    name: "state",
    label: "Статус",
    field: "state",
  },
  {
    name: "person_phone",
    label: "Телефон",
    field: "person_phone",
  },
  {
    name: "delete",
    label: "",
    field: "id",
  },
  {
    name: "action",
    label: "Детали",
    field: "id",
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

const closeForm = () => {
  reqStore.isShow = false;
};

const router = useRouter();

async function getRequest(id) {
  if (!reqStore.details[id]) {
    await reqStore.getDetails(id);
  }
  router.push(`/request/${id}`);
}

const deleteRequest = (id) => {
  reqStore.removeRow(id);
  if (reqStore.tabIsOpen(id)) {
    reqStore.removeTab(id);
  }
};

onMounted(() => {
  if (reqStore.rows.length <= 0) {
    reqStore.fetchData();
  }
});
</script>
