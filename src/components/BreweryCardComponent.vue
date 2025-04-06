<template>
  <article class="brewery-card" aria-label="Brewery details">
    <h3 class="brewery-name">{{ brewery.name }}</h3>
    <p><strong>Type:</strong> {{ brewery.brewery_type }}</p>
    <p><strong>City:</strong> {{ brewery.city }}</p>
    <p><strong>State:</strong> {{ brewery.state }}</p>
    <router-link
      :to="{
        name: 'BreweryDetail',
        params: { id: brewery.id },
        query: { search: searchQuery, from: 'LazyLoad' }
      }"
      class="details-link"
      :aria-label="`View details for ${brewery.name}`"
    >
      View Details
    </router-link>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Brewery } from '@/interfaces/interfaces';

export default defineComponent({
  name: 'BreweryCard',
  props: {
    brewery: {
      type: Object as PropType<Brewery>,
      required: true
    },
    searchQuery: {
      type: String,
      default: ''
    }
  }
});
</script>

<style scoped>
.brewery-card {
  border: 1px solid var(--vt-c-light-grey);
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--vt-c-white-mute);
  text-align: left;
  max-width: 400px;
  margin: 0 auto 1rem;

  p {
    text-transform: capitalize;
  }
}

.brewery-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vt-c-black);
  text-align: center;
}

.details-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--vt-c-blue);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}
</style>
