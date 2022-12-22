<template>
  <TheSpinner v-if="isLoading"/>
  <b-form class="form" @submit.prevent="handleSubmit">
    <b-form-group class="form-group" label="Email:">
      <b-form-input
        class="form-control"
        id="emailInput"
        placeholder="Enter email..."
        :state="!credentials.email ? null : !v$.email.$error"
        name="email"
        v-model="credentials.email"
      />
      <b-form-invalid-feedback id="emailInput">Invalid email value</b-form-invalid-feedback>
    </b-form-group>
    <b-button class="form-btn app-button app-button--primary" type="submit">Reset</b-button>
  </b-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import TheSpinner from "@/components/TheSpinner.vue";

interface Credentials {
  email?: string;
}

const isLoading = ref(false);
const credentials = reactive({} as Credentials);
const v$ = useVuelidate({
  email: { required, email },
}, credentials as any, { $autoDirty: true });

async function handleSubmit()  {
  if (!await v$.value.$validate()) return;
}
</script>

<style lang="scss" scoped>
.form-group {
  margin: 10px 0 20px 0;
}

.form-control {
  display: block;
  width: 300px !important;
  min-height: 28px;
  box-sizing: border-box;
}
</style>
