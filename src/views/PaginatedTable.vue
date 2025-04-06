<template>
  <section aria-labelledby="paginated-heading">
    <h2 id="paginated-heading">Paginated Table View</h2>

    <SearchInput
      v-model="searchTerm"
      :placeholder="'Search Breweries...'"
      :loading="loading"

    />
    <table class="brewery-table">
      <caption class="visually-hidden">List of breweries with pagination</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">City</th>
          <th scope="col">State</th>
          <th scope="col">Type</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="brewery in breweries" :key="brewery.id">
          <td>{{ brewery.name }}</td>
          <td>{{ brewery.city }}</td>
          <td>{{ brewery.state }}</td>
          <td>{{ brewery.brewery_type }}</td>
          <td>
            <router-link
              :to="{ name: 'BreweryDetail', params: { id: brewery.id }, query: { search: searchTerm, from: 'PaginatedTable' } }"
              :aria-label="`View details for ${brewery.name}`"
            >
              View
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <nav class="pagination-controls" aria-label="Pagination controls">
      <button @click="prevPage" :disabled="page === 1" aria-label="Previous page">Previous</button>
      <span aria-live="polite">Page {{ page }}</span>
      <button @click="nextPage" aria-label="Next page">Next</button>
    </nav>
    <img v-if="loading" src="@/assets/images/beer-mug.svg" alt="Beer mug icon" class="beer-icon spinning" role="status" aria-label="Loading" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, inject } from 'vue';
import axios from 'axios';
import SearchInput from '@/components/SearchInputComponent.vue';
import { API } from '@/constants/api';
import type { Brewery } from '@/interfaces/interfaces';

export default defineComponent({
  name: 'PaginatedTable',
  components: { SearchInput },
  setup() {
    const breweries = ref<Brewery[]>([]);
    const searchTerm = ref('');
    const page = ref(1);
    const loading = ref(false);
    const setGlobalError = inject<(msg: string) => void>('setGlobalError');

    const fetchBreweries = async () => {
      loading.value = true;

      // Fake loading delay
      setTimeout(async ()=> {
        try {
        const url = searchTerm.value ? `${API.BASE_URL}/search?per_page=5&query=${searchTerm.value}&page=${page.value}` : `${API.BASE_URL}?per_page=5&page=${page.value}`;

          const { data } = await axios.get(url);
          breweries.value = data;
        } catch (err) {
          console.error('Error fetching breweries', err);
          setGlobalError?.('Failed to load breweries.');
        } finally {
          loading.value = false;
        }
      }, 1000)

    };

    const nextPage = () => {
      page.value++;
      fetchBreweries();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        fetchBreweries();
      }
    };

    watch(searchTerm, () => {
      page.value = 1;
      fetchBreweries();
    });

    onMounted(() => {
      fetchBreweries();
    });

    return {
      breweries,
      searchTerm,
      page,
      loading,
      nextPage,
      prevPage,
    };
  },
});
</script>

<style scoped>
.brewery-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.brewery-table th,
.brewery-table td {
  border: 1px solid var(--vt-c-light-grey);
  padding: 0.75rem;
  text-align: left;
  text-transform: capitalize;
}

.brewery-table th {
  background-color: #f0f0f0;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

#paginated-heading {
  text-align: center;;
}

</style>
