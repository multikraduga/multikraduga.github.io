<template>
  <!-- rows - данные таблицы - строки -->
  <!-- columns - данные для хедера таблицы -->

  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
  >
    <!-- ячейка "детали" -->
    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn
          flat
          round
          icon="arrow_right"
          @click="$emit('click-btn', props.row.id)"
        />
      </q-td>
    </template>

    <!-- ячейка "удалить" -->
    <template v-slot:body-cell-delete="props">
      <q-td :props="props">
        <q-btn
          flat
          round
          icon="delete"
          @click="$emit('delete', props.row.id)"
        />
      </q-td>
    </template>

    <!-- ячейка с именем клиента -->
    <template v-slot:body-cell-client_name="props">
      <q-td :props="props">
        {{
          props.row.client_name
            ? props.row.client_name
            : props.row.person_fullname
        }}
      </q-td>
    </template>

    <!-- ячейка со статусом -->
    <template v-slot:body-cell-state="props">
      <q-td :props="props">
        <q-chip
          dense
          :color="getStatusColor(props.row.state).color"
          :text-color="getStatusColor(props.row.state).textColor"
        >
          {{ props.row.state }}
        </q-chip>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const props = defineProps({
  rows: Array,
  columns: Array,
});

const pagination = ref({
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const emit = defineEmits(["click-btn", "delete"]);

const statusColors = {
  init: { color: "orange", textColor: "white" },
  waitformeeting: { color: "red", textColor: "white" },
  meeting: { color: "pink", textColor: "white" },
  default: { color: "gray", textColor: "white" },
};

// Вычисляемое свойство для определения цвета статуса на основе состояния строки
const getStatusColor = (state) => {
  if (statusColors[state]) {
    return statusColors[state];
  } else {
    return statusColors.default;
  }
};
</script>
