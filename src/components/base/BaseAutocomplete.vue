<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watch, withDefaults } from "vue";
import BaseAutocompleteQueryFunction from "@/core/models/inputs/autocomplete-query-function";

const props = withDefaults(defineProps<{
  query?: string,
  queryFunction: BaseAutocompleteQueryFunction,
  placeholder?: string,
}>(), {
  placeholder: "Search...",
});
const emits = defineEmits(["update:query", "update:result", "item-selected"]);

const searchQuery = ref("");
const result = ref([]);
const isShowResult = ref(false);
const query = computed((): string => props.query || "");

watch(query, (currentValue: string) => (searchQuery.value = currentValue));
watch(searchQuery, async (currentValue: string) => {
  emits("update:query", currentValue);

  result.value = await props.queryFunction(currentValue);
  isShowResult.value = result.value.length > 0;
  emits("update:result", result.value);
});

function onItemSelected(item: any) {
  emits("item-selected", item);
  searchQuery.value = "";
  isShowResult.value = false;
}
</script>

<template>
  <div class="base-autocomplete">
    <div class="base-autocomplete__input">
      <b-form-input
        type="search"
        :placeholder="props.placeholder"
        v-model:value="searchQuery"
      />
    </div>
    <ul class="base-autocomplete__result" :class="{'base-autocomplete__result--active': isShowResult}">
      <li
        class="base-autocomplete__result_item"
        v-for="(item, index) of result"
        :key="index"
        @click.prevent="onItemSelected(item)"
      >
        <slot name="result" :item="item"></slot>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.base-autocomplete {

}
</style>
