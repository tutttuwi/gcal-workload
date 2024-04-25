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

import FilterableDropdown from "./FilterableDropdown.vue";

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

const largeItem: any = ref(null);
const midiumItem: any = ref(null);
const smallItem: any = ref(null);

function setChoices(item: Ref<Element>, callback: Function) {
  const choices = new Choices(item.value, {
    // removeItemButton: true,
    allowHTML: true,
    searchResultLimit: 10,
    searchPlaceholderValue: '検索ワード',
    noResultsText: '一致する情報は見つかりません',
    itemSelectText: '選択'
  });

  item.value.addEventListener('change', callback());
}

function choicesClickFuncForShadowDom(event: Event) {
  event.stopPropagation();
  const dropdown = this.querySelector('.choices__list.choices__list--dropdown');

  // get the input that is being used with in the choices JS
  const dropdown_input = this.querySelector('.choices__input.choices__input--cloned');

  if (!(dropdown).classList.contains('is-active')) {
    (dropdown).classList.add('is-active');
    (dropdown).setAttribute("aria-expanded", "true");

    // focus on the input element 
    dropdown_input.focus();

  } else {
    (dropdown).classList.remove('is-active');
    (dropdown).setAttribute("aria-expanded", "false");

  }
}


onMounted(() => {
  // const selectElement: Element | null = document.querySelector('#first-item');
  console.log("onMounted!! selectElement", largeItem.value, midiumItem.value, smallItem.value);
  // const choices = new Choices(selectElement);
  setChoices(largeItem, (event: any) => {
    const selectedValue = event?.target?.value;
    console.log(selectedValue);
  });
  // largeItem.value.addEventListener("click", choicesClickFuncForShadowDom(event));
  setChoices(midiumItem, (event: any) => {
    const selectedValue = event?.target?.value;
    console.log(selectedValue);
  });
  setChoices(smallItem, (event: any) => {
    const selectedValue = event?.target?.value;
    console.log(selectedValue);
  });

  // document?.querySelector("#ItemCombobox")?.shadowRoot?.querySelectorAll(".choices")?.forEach(element => {
  //   element.addEventListener("click", choicesClickFuncForShadowDom);
  // });

});

const selectedValue = ref(null);
</script>

<style lang="scss"></style>

<template>
  <container>
    <div class="" style="display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 68px;
    width: 500px;">
      <FilterableDropdown v-model="selectedValue" :items="items" :showEmptyItem="true" :disabled="false"
        :ignoreCase="true" emptyItemValue="SAMPLE_EMPTY_VALUE" emptyItemText="" placeholder="Please select..."
        name="fruit" idKey="id" valueKey="name" textKey="name" filterTargetKey="name" />
      <!-- <div class="col-4 gw-popup-select"> -->
      <!-- <v-combobox theme="light" dense filled label="first-item" v-model="firstItemList"
          :items="['TEST-A', 'TEST-B', 'TEST-C']"></v-combobox> -->
      <!-- <select name="largeItem" id="large-item" ref="largeItem">
          <option value="">大項目</option>
          <option value="garammasala">プロジェクトA</option>
          <option value="coriander">プロジェクトB</option>
          <option value="cumin">プロジェクトC</option>
          <option value="cumin">プロジェクトX-長期化刷新DX対応の続き</option>
        </select>
         -->
      <!-- <v-select v-bind:options="['small', 'medium', 'large']">
        </v-select> -->

      <!-- <FilterableDropdown v-model="firstItemList" :items="items" :showEmptyItem="true" :disabled="false"
          :ignoreCase="true" emptyItemValue="SAMPLE_EMPTY_VALUE" emptyItemText="" placeholder="Please select..."
          name="fruit" idKey="id" valueKey="name" textKey="name" filterTargetKey="name" /> -->

      <!-- </div> -->

      <!-- <div class="col-4 gw-popup-select">
        <select name="midiumItem" id="midium-item" ref="midiumItem">
          <option value="">中項目</option>
          <option value="garammasala">プロジェクトA</option>
          <option value="coriander">プロジェクトB</option>
          <option value="cumin">プロジェクトC</option>
          <option value="cumin">プロジェクトX-長期化刷新DX対応の続き</option>
        </select>

      </div>
      <div class="col-4 gw-popup-select">
        <select name="smallItem" id="small-item" ref="smallItem">
          <option value="">小項目</option>
          <option value="garammasala">プロジェクトA</option>
          <option value="coriander">プロジェクトB</option>
          <option value="cumin">プロジェクトC</option>
          <option value="cumin">プロジェクトX-長期化刷新DX対応の続き</option>
        </select>

      </div> -->

    </div>
  </container>
</template>
