<template>
  <div ref="wrapper" class="fd__wrapper">
    <input type="hidden" :name="name" :value="value">
    <input ref="textBox" type="text" class="fd__display-textbox" :disabled="disabled" :value="displayText"
      :placeholder="placeholder" readonly="readonly" @click="textBoxClicked">
    <div class="fd__list" v-show="showList">
      <div class="fd__filter-input">
        <input ref="filterTextBox" type="text" class="fd__filter-textbox" placeholder="Filter..." v-model="filterString">
      </div>
      <ul>
        <li class="fd__item" v-if="showEmptyItem" :value="emptyItemValue" @click.stop.prevent="itemClicked(null)">{{
          emptyItemText || '&nbsp;' }}</li>
        <li class="fd__item" v-if="filteredItems.length > 0" v-for="item in filteredItems"
          :key="'item_' + (idKey ? item[idKey] : item)" :value="(valueKey ? item[valueKey] : item)"
          @click.stop.prevent="itemClicked(item)">
          {{ textKey ? item[textKey] : item }}
        </li>
        <li v-if="filteredItems.length === 0">No Items</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const filterString = ref(null);
const showList = ref(false);

const selectedItem = computed(() => {
  return items.value.find(
    x => value.value === (valueKey.value ? x[valueKey.value] : x)
  );
});

const displayText = computed(() => {
  const item = selectedItem.value;
  if (!item) return "";
  return textKey.value ? item[textKey.value] : item;
});

const textBoxClicked = () => {
  if (disabled.value) return;
  showList.value = !showList.value;
};

const itemClicked = (item) => {
  if (item) {
    const value = valueKey.value ? item[valueKey.value] : item;
    emit('update:value', value);
  } else {
    emit('update:value', emptyItemValue.value || null);
  }
  reset();
};

const reset = () => {
  showList.value = false;
  filterString.value = "";
};

watch(showList, (val) => {
  if (val) {
    nextTick(() => {
      filterTextBox.value.focus();
    });
  }
});

onMounted(() => {
  const wrapper = ref('wrapper');
  const reset = () => {
    showList.value = false;
    filterString.value = "";
  };

  const handleDocumentClick = (e) => {
    const target = (e.target || e.srcElement).closest(".fd__wrapper");
    if (target === wrapper.value) return;
    reset();
  };

  document.addEventListener("click", handleDocumentClick);

  return () => {
    document.removeEventListener("click", handleDocumentClick);
  };
});
</script>

<style lang="scss" scoped>
.fd__wrapper {
  position: relative;
  width: 100%;

  * {
    font-size: 1rem;
  }

  input.fd__display-textbox,
  input.fd__filter-textbox {
    width: 100%;
  }

  .fd__list {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 4px;
    border: solid 1px rgb(192, 192, 192);
    background: white;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
    margin-top: -1px;

    ul {
      margin: 4px 0 0 0;
      padding: 4px;
      overflow-x: auto;
      overflow-y: scroll;
      max-height: 40vh;

      li {
        padding: 4px 1px;
        cursor: pointer;
        list-style: none;
        line-height: 1;

        &.fd__item:hover {
          background: aliceblue;
        }
      }
    }
  }
}</style>