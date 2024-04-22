<script setup lang="ts">
// import { useToggle } from '@vueuse/core'
// import 'uno.css'
// import '../style.css'
// import { Vue3Snackbar } from "vue3-snackbar";
// import { useSnackbar } from "vue3-snackbar";
// const snackbar = useSnackbar();
// import 'vuetify/styles';
// import 'vuetify/dist/vuetify.min.css';
// import 'vuetify/dist/vuetify';

// import FilterableDropdown from "./FilterableDropdown.vue";

// import 'choices.js/public/assets/styles/choices.min.css';
import Choices from 'choices.js';
import 'choices.js';

// const show = ref(false);

// function copy() {
//   const text = document.querySelector(".nBzcnc.OjZ2cc.OcVpRe.IyS93d.N1DhNb")?.textContent;
//   navigator.clipboard.writeText(text ? text : "");
//   show.value = true;
//   setTimeout(() => {
//     show.value = false;
//   }, 1000);
// }

const firstItemList = ref("");
const showDropdown = ref(true);

const items = ref(['TEST-A', 'TEST-B', 'TEST-C', 'TEST-C', 'TEST-C', 'TEST-C']);
const selectedItem = ref();
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const selectItem = (item: any) => {
  selectedItem.value = item;
  showDropdown.value = false;
};

const firstItem: any = ref(null);

onMounted(() => {
  // const selectElement: Element | null = document.querySelector('#first-item');
  console.log("onMounted!! selectElement", firstItem.value);
  if (firstItem) {
    // const choices = new Choices(selectElement);
    new Choices(firstItem.value, {
      removeItemButton: true,
      allowHTML: true,
      searchResultLimit: 10,
      searchPlaceholderValue: '検索ワード',
      noResultsText: '一致する情報は見つかりません',
      itemSelectText: '選択'
    });

    firstItem.value.addEventListener('change', (event: any) => {
      const selectedValue = event?.target?.value;
      console.log(selectedValue);
    });
  }
});


</script>

<style lang="scss"></style>

<template>
  <v-container id="ItemCombobox">
    <v-row>
      <v-col cols="4">
        <!-- <v-combobox theme="light" dense filled label="first-item" v-model="firstItemList"
          :items="['TEST-A', 'TEST-B', 'TEST-C']"></v-combobox> -->
        <select name="spice" id="first-item" ref="firstItem">
          <option value="">スパイスを選択</option>
          <option value="garammasala">ガラムマサラ</option>
          <option value="coriander">コリアンダー</option>
          <option value="cumin">クミン</option>
        </select>

        <v-select v-bind:options="['small', 'medium', 'large']">
        </v-select>

        <!-- <FilterableDropdown v-model="firstItemList" :items="items" :showEmptyItem="true" :disabled="false"
          :ignoreCase="true" emptyItemValue="SAMPLE_EMPTY_VALUE" emptyItemText="" placeholder="Please select..."
          name="fruit" idKey="id" valueKey="name" textKey="name" filterTargetKey="name" /> -->

      </v-col>

    </v-row>
  </v-container>
</template>
