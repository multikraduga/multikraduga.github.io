<template>
  <div>
    <q-dialog v-model="isShow"
      ><q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Данные</div>
          <q-space />
          <!-- <q-btn icon="close" flat round dense v-close-popup /> -->
        </q-card-section>

        <q-form @submit="save" @reset="cancel" class="q-gutter-md">
          <q-card-section>
            <div class="row">
              <div class="col-12 col-md-6">
                <q-input
                  class="q-ma-xs"
                  label="ФИО"
                  outlined
                  v-model="person_fullname"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  class="q-ma-xs"
                  label="Телефон*"
                  outlined
                  type="tel"
                  v-model="person_phone"
                  :rules="[(val) => !!val || 'Обязательное поле!']"
                  mask="+7 (###) ###-##-##"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  class="q-ma-xs"
                  label="Email"
                  outlined
                  v-model="person_email"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  class="q-ma-xs"
                  label="ИНН"
                  outlined
                  v-model="inn"
                  counter
                  maxlength="12"
                  mask="############"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-select
                  class="q-ma-xs"
                  label="Статус*"
                  outlined
                  v-model="state"
                  :options="stateList"
                  :rules="[(val) => !!val || 'Обязательное поле!']"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-select
                  class="q-ma-xs"
                  label="Тип компании"
                  outlined
                  v-model="company_type"
                  :options="company_typeList"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-select
                  class="q-ma-xs"
                  label="Продукт*"
                  :rules="[(val) => !!val || 'Обязательное поле!']"
                  outlined
                  v-model="stg"
                  :options="stgList"
                />
              </div>
            </div>

            <h5>Дополнительные данные</h5>
            <div class="row">
              <div class="col-12 col-md-6">
                <q-input
                  class="q-ma-xs"
                  label="Название компании*"
                  outlined
                  v-model="company_name"
                  :rules="[(val) => !!val || 'Обязательное поле!']"
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  class="q-ma-xs"
                  label="Клиент*"
                  outlined
                  v-model="client_name"
                  :rules="[(val) => !!val || 'Обязательное поле!']"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  class="q-ma-xs"
                  label="ИНН партнера"
                  outlined
                  counter
                  maxlength="12"
                  mask="############"
                  v-model="partnerInn"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  class="q-ma-xs"
                  label="CRM"
                  outlined
                  v-model="crm_source_type"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn color="primary" class="q-ml-md" size="sm" type="submit"
              >Сохранить</q-btn
            >
            <q-btn color="grey" class="q-ml-md" size="sm" type="reset"
              >Отменить</q-btn
            >
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from "vue";
import { date } from "quasar";

const lastId = ref(5);
const emit = defineEmits(["add", "close"]);

const props = defineProps({
  show: Boolean,
});

const isShow = computed(() => props.show);

const stateList = [
  "init",
  "waitformeeting",
  "meeting",
  "waitforcoownersdata",
  "waitforuploaddocs",
  "process",
  "success",
  "decline",
  "client",
  "archive",
  "double",
  "lol",
];

const company_typeList = ["ИП", "OOO"];

const stgList = [
  "Налоговая консультация",
  "SMM - сопровождение",
  "Поиск контрагентов",
];

const state = ref("");
const stg = ref("");
const inn = ref("");
const client_name = ref("");
const person_phone = ref("");
const person_fullname = ref("");
const person_email = ref("");
const crm_source_type = ref("");
const company_type = ref("");

const partnerInn = ref("");
const company_name = ref("");

// очистка формы
const resetForm = () => {
  state.value = "";
  stg.value = "";
  inn.value = "";
  client_name.value = "";
  person_phone.value = "";
  person_fullname.value = "";
  person_email.value = "";
  crm_source_type.value = "";
  partnerInn.value = "";
  company_name.value = "";
};

// закрытие формы
const closeForm = () => {
  emit("close");
};

// кнопочка отмена
const cancel = () => {
  resetForm();
  closeForm();
};

// кнопока сохранить
const save = () => {
  const newRequest = {};
  const timeStamp = Date.now();
  lastId.value = lastId.value + 1;
  newRequest.id = String(lastId.value);
  newRequest.num = lastId.value + 5000;
  newRequest.dadd = date.formatDate(timeStamp, "YYYY-MM-DDTHH:mm:ss.SSS");
  newRequest.state = state.value;
  newRequest.lastUpd = newRequest.dadd;
  newRequest.stg = stg.value;
  newRequest.inn = inn.value;
  newRequest.company_name = company_name.value;
  newRequest.person_phone = person_phone.value;
  newRequest.company_type = company_type.value;
  newRequest.person_fullname = person_fullname.value;
  newRequest.person_email = person_email.value;
  newRequest.extra = {
    partner: {
      client_name: client_name.value,
      inn: partnerInn.value,
    },
    crm_source_type: crm_source_type.value,
  };

  emit("add", newRequest);
  cancel();
};
</script>
