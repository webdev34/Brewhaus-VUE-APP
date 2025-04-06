<template>
  <div class="search-wrapper" role="search" aria-label="Search Breweries">
    <label :for="inputId" class="visually-hidden">Search Breweries</label>
    <input
      :id="inputId"
      type="text"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="onInput"
      class="search-input"
      :aria-label="placeholder"
      autocomplete="off"
    />
    <font-awesome-icon icon="search" class="search-icon" aria-hidden="true" />

    <img v-if="loading && inputValue.length > 2" src="@/assets/images/beer-mug.svg" alt="Beer mug icon" class="beer-icon spinning" role="status" aria-label="Loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String,
      default: 'Search...',
    },
    debounceDelay: {
      type: Number,
      default: 300,
    },
    modelValue: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    const inputId = `search-${Math.random().toString(36).substring(2, 9)}`;
    const loading = ref(props.loading);
    let debounceTimer: ReturnType<typeof setTimeout>;

    const onInput = () => {
      if(inputValue.value.length > 2) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          emit('update:modelValue', inputValue.value);
        }, props.debounceDelay);
      }
    };

    return {
      inputValue,
      onInput,
      inputId,
    };
  },
});
</script>

<style scoped>
.search-wrapper {
  position: relative;
  max-width: 400px;
  margin: 0 auto;

  .search-input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 400px;
    border: 1px solid var(--vt-c-light-grey-1);
    border-radius: 4px;
  }

  svg.fa-magnifying-glass {
    position: absolute;
    font-size: 21px;
    top: 6px;
    right: 6px;
  }

  .beer-icon {
    position: absolute;
    top: -8px;
    right: -33px;
  }
}
</style>
