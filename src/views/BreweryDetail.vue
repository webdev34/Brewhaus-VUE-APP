<template>
  <div v-if="brewery" class="brewery-details">
    <h2>{{ brewery.name }}</h2>
    <p><strong>Type:</strong> {{ brewery.brewery_type }}</p>
    <p><strong>Location:</strong> {{ brewery.city }}, {{ brewery.state }}</p>
    <p><strong>Address:</strong> {{ brewery.street }}</p>
    <p v-if="brewery.phone"><strong>Phone:</strong> {{ formatPhone(brewery.phone) }}</p>
    <p v-if="brewery.website_url">
      <strong>Website:</strong>
      <a :href="brewery.website_url" class="lowercase" target="_blank">{{ brewery.website_url }}</a>
    </p>

    <div class="back-links">
      <router-link
        v-if="fromView === 'PaginatedTable'"
        :to="{ name: 'PaginatedTable', query: route.query.search ? { search: route.query.search } : {} }"
      >
        <font-awesome-icon icon="arrow-left" class="back-icon" aria-hidden="true" /> Back to Paginated Table
      </router-link>

      <router-link
        v-else-if="fromView === 'LazyLoad'"
        :to="{ name: 'LazyLoad', query: route.query.search ? { search: route.query.search } : {} }"
      >
        <font-awesome-icon icon="arrow-left" class="back-icon" aria-hidden="true" /> Back to Lazy Load View
      </router-link>

      <router-link
        v-else
        :to="{ name: 'Home' }"
      >
      <font-awesome-icon icon="arrow-left" class="back-icon" aria-hidden="true" /> Back to Home</router-link>
    </div>
  </div>

  <div v-else>
    <img src="@/assets/images/beer-mug.svg" alt="Beer mug icon" class="beer-icon spinning" role="status" aria-label="Loading brewery details..." />
    <p class="loading-text">Loading brewery details...</p>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject, computed } from 'vue';
import axios from 'axios';
import { API } from '@/constants/api';
import { useRoute } from 'vue-router';
import type { BreweryDetail } from '@/interfaces/interfaces';
import { formatPhone } from '../utils/formatters';

export default defineComponent({
  name: 'BreweryDetail',
  setup() {
    const route = useRoute();
    const brewery = ref<BreweryDetail | null>(null);
    const setGlobalError = inject<(msg: string) => void>('setGlobalError');

    const fromView = computed(() =>  route.query.from as string | undefined );

    const fetchBrewery = async () => {
      setTimeout(async () => {
        try {
        const { data } = await axios.get(`${API.BASE_URL}/${route.params.id}`);
        brewery.value = data;
      } catch (err) {
        console.error('Error fetching brewery detail:', err);
        setGlobalError?.('Failed to load brewery details.');
      }
      }, 1000);

    };

    onMounted(() => {
      fetchBrewery();
    });

    return {
      brewery,
      formatPhone,
      route,
      fromView
    };
  },
});
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

p {
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  text-transform: capitalize;
}

a {
  color: var(--vt-c-blue);
  text-decoration: none;
   &.lowercase {
    text-transform: lowercase;
   }
}

.back-links {
  margin-top: 2rem;
}

main {
  padding: 2rem 1rem;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.beer-icon.spinning {
  width: 50px;
}

.loading-text {
  text-align: center;
}

.brewery-details {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
