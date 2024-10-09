<template>
  <div class="q-pa-lg">
    <div class="row items-center justify-start q-mb-md">
      <div class="text-h4">Детали</div>
    </div>

    <q-form @submit="saveEdit" @reset="cancelEdit" class="q-gutter-md">
      <div class="row">
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.person_fullname"
            label="ФИО*"
            :rules="[(val) => !!val || 'Обязательное поле!']"
            outlined
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.person_phone"
            label="Телефон*"
            :rules="[(val) => !!val || 'Обязательное поле!']"
            outlined
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.person_email"
            label="Email"
            outlined
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.inn"
            label="ИНН"
            outlined
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.state"
            label="Статус*"
            :rules="[(val) => !!val || 'Обязательное поле!']"
            outlined
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.company_type"
            label="Тип компании"
            outlined
          />
        </div>
      </div>

      <h5>Дополнительные данные</h5>
      <div class="row">
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.extra.partner.type"
            label="Тип"
            outlined
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.extra.partner.client_name"
            label="Клиент"
            outlined
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.extra.partner.inn"
            label="ИНН"
            outlined
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            class="q-ma-xs"
            v-model="localForm.extra.crm_source_type"
            label="CRM"
            outlined
          />
        </div>
      </div>

      <q-btn
        color="green"
        icon="save"
        class="q-ml-md"
        size="sm"
        push
        type="submit"
        >Сохранить
      </q-btn>
      <q-btn
        color="grey"
        icon="edit"
        class="q-ml-md"
        size="sm"
        push
        type="reset"
        >Отменить
      </q-btn>
    </q-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRequestStore } from "src/stores/requests";
import { useRouter } from "vue-router";

const props = defineProps({
  id: String,
});

const reqStore = useRequestStore();

// Локальная копия данных при помощи reactive
const localForm = reactive(reqStore.deepCopy(reqStore.details[props.id]));

// Отменяем изменения
const cancelEdit = () => {
  Object.assign(localForm, reqStore.deepCopy(reqStore.details[props.id])); // Возвращаем начальные данные
  reqStore.removeTab(props.id);
  router.push(`/request`);
};

const router = useRouter();

// Сохраняем изменения
const saveEdit = () => {
  reqStore.updateRequest(reqStore.deepCopy(localForm));
  reqStore.removeTab(props.id);
  router.push(`/request`);
};
</script>
