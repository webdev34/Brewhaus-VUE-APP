<template>
  <div>
    <h2>Lazy Load Breweries</h2>
    <SearchInput v-model="searchTerm" placeholder="Search Breweries..." :loading="loading"/>

    <BreweryCard
      v-for="brewery in breweries"
      :key="brewery.id"
      :brewery="brewery"
      :search-query="searchTerm"
      :from="'LazyLoad'"
    />
    <button class="load-more-btn" v-if="!loading && hasMore" @click="loadMore">Load More</button>
    <img v-if="loading" src="@/assets/images/beer-mug.svg" alt="Beer mug icon" class="beer-icon spinning" role="status" aria-label="Loading" />
    <p class="no-results" v-if="!breweries.length && !loading">No Results</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, inject } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import SearchInput from '@/components/SearchInputComponent.vue';
import BreweryCard from '@/components/BreweryCardComponent.vue';
import { API } from '@/constants/api';
import type { Brewery } from '@/interfaces/interfaces';

export default defineComponent({
  name: 'LazyLoad',
  components: {
    SearchInput,
    BreweryCard,
  },
  setup() {
    const breweries = ref<Brewery[]>([]);
    const searchTerm = ref('');
    const page = ref(1);
    const loading = ref(false);
    const hasMore = ref(false);
    const route = useRoute();
    const setGlobalError = inject<(msg: string) => void>('setGlobalError');

    const fetchBreweries = async (reset = false) => {
      loading.value = true;

      // Fake loading delay
      setTimeout(async ()=> {
        try {
          const url = searchTerm.value ? `${API.BASE_URL}/search?query=${searchTerm.value}&per_page=5&page=${page.value}` : `${API.BASE_URL}?per_page=5&page=${page.value}`;
          const { data } = await axios.get(url);

          if (reset) {
            breweries.value = data;
          } else {
            breweries.value = [...breweries.value, ...data];
          }

          hasMore.value = data.length === 5;
        } catch (err) {
          console.error('Error fetching breweries', err);
          setGlobalError?.('Failed to load breweries. Please try again later.');
        } finally {
          loading.value = false;
        }
      }, 1000);
    };

    const loadMore = () => {
      page.value++;
      fetchBreweries();
    };

    onMounted(() => {
      const querySearch = route.query.search as string;
      if (querySearch) {
        searchTerm.value = querySearch;
        fetchBreweries(true);
      } else {
        fetchBreweries();
      }
    });

    watch(searchTerm, () => {
      page.value = 1;
      hasMore.value = true;
      fetchBreweries(true);
    });

    return {
      breweries,
      searchTerm,
      loading,
      loadMore,
      hasMore,
    };
  },
});
</script>

<style scoped>

h2,
.no-results {
  text-align: center;
}

button.load-more-btn {
  margin: 0 auto;
  display: flex;
}
</style>
