<script setup lang="ts">
// import { useToggle } from '@vueuse/core'
// import 'uno.css'
// import '../style.css'
// import { Vue3Snackbar } from "vue3-snackbar";
// import { useSnackbar } from "vue3-snackbar";
// const snackbar = useSnackbar();

const show = ref(false);

function copy() {
  const text = document.querySelector(".nBzcnc.OjZ2cc.OcVpRe.IyS93d.N1DhNb")?.textContent;
  navigator.clipboard.writeText(text ? text : "");
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 1000);
}
</script>

<template>
  <div id="CopyButton">
    <span data-is-tooltip-wrapper="true">
      <button class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ mN1ivc m2yD4b HfYfLe" @click="copy">
        <div jsname="s3Eaab" class="VfPpkd-Bz112c-Jh9lGc"></div>
        <div class="VfPpkd-Bz112c-J1Ukfc-LhBDec"></div>
        <span class="VfPpkd-kBDsod meh4fc KU3dEf" aria-hidden="true">
          <Transition>
            <p v-if="show" title="コピー完了!"><mdi:success-bold></mdi:success-bold></p>
          </Transition>
          <p v-if="!show" title="コピー"><ph:copy-bold></ph:copy-bold></p>
        </span>
      </button>
      <div class="EY8ABd-OWXEXe-TAWMXe" role="tooltip" aria-hidden="true" id="tt-z001">コピー</div>
    </span>
  </div>
  <!-- <vue3-snackbar bottom center :duration="1000"></vue3-snackbar> -->
</template>
