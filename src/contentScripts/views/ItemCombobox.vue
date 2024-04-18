<script setup lang="ts">
// import { useToggle } from '@vueuse/core'
import 'uno.css'
import '../style.css'
// import { Vue3Snackbar } from "vue3-snackbar";
// import { useSnackbar } from "vue3-snackbar";
// const snackbar = useSnackbar();

// const show = ref(false);

// function copy() {
//   const text = document.querySelector(".nBzcnc.OjZ2cc.OcVpRe.IyS93d.N1DhNb")?.textContent;
//   navigator.clipboard.writeText(text ? text : "");
//   show.value = true;
//   setTimeout(() => {
//     show.value = false;
//   }, 1000);
// }

const firstItemList = ref("aaa");
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

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <!-- <v-combobox theme="light" dense filled label="first-item" v-model="firstItemList"
          :items="['TEST-A', 'TEST-B', 'TEST-C']"></v-combobox> -->
        <v-autocomplete v-model="firstItemList"
          :items="['TEST-A', 'TEST-B', 'TEST-C', 'TEST-C', 'TEST-C', 'TEST-C', 'TEST-C', 'TEST-C', 'TEST-C', 'TEST-C', 'TEST-C']"
          dense filled label="Filled"></v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-combobox theme="light" label="first-item" :items="['test']"></v-combobox>
      </v-col>
      <v-col cols="4">
        <v-combobox z-index="100000" :eager=true theme="light" dense filled label="first-item" v-model="firstItemList"
          :items="['TEST-A', 'TEST-B', 'TEST-C']"></v-combobox>
      </v-col>
      <v-combobox :items="['TEST-A', 'TEST-B', 'TEST-C', 'TEST-C', 'TEST-C', 'TEST-C']" label="Select Item">
        <template v-slot:prepend-inner>
          <!-- v-overlay__content内に要素を追加 -->
          <v-overlay__content>
            <!-- ここにプルダウンの要素を追加 -->
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-overlay__content>
        </template>
      </v-combobox>

      <v-container>
        <v-combobox v-model="selectedItem" :items="items" label="Select Item" dense outlined>
          <!-- プルダウンの要素を追加 -->
          <template v-slot:append-outer>
            <v-btn icon @click="toggleDropdown">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <template v-if="showDropdown">
            <v-list>
              <v-list-item v-for="item in items" :key="item" @click="selectItem(item)">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </template>
        </v-combobox>
      </v-container>

    </v-row>
  </v-container>
</template>
