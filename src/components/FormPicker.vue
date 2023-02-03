<script setup>
import { ref, reactive } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

const date = ref(new Date())
date.value.setDate(Number(date.value.getDate()) + 35)
const range = reactive({
  start: new Date(),
  end:  date.value
})

</script>
<template>
  <DatePicker v-model="range" is-range>
    <template v-slot:="{inputValue, inputEvents}">
      <div class="group">
        <label class="button groupItem" for="start">Start</label>
        <input type="text" id="start" v-model="inputValue.start">
      </div>
    </template>
  </DatePicker>
  <p>Date : {{date.toJSON() }}</p>
</template>

<style scoped>
@use form {
  field: label, group,input, button;
}
</style>