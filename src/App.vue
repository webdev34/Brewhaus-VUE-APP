<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, provide } from 'vue';

const route = useRoute();
const globalError = ref('');

provide('setGlobalError', (message: string) => {
  globalError.value = message;
  setTimeout(() => (globalError.value = ''), 5000);
});
</script>

<template>
  <div id="app">
    <header>
      <div>
        <h1>
          <router-link :to="{ name: 'Home' }" class="home-link">Brewhaus Search <img src="@/assets/images/beer-mug.svg" alt="Beer mug icon" class="beer-icon" /> </router-link>
        </h1>
        <nav aria-label="Primary Navigation">
          <router-link
            :to="{ name: 'LazyLoad', query: { from: 'Home' } }"
            :class="{ active: route.name === 'LazyLoad' || route.query.from === 'LazyLoad' }"
          >
            Lazy Load View
          </router-link>

          <router-link
            :to="{ name: 'PaginatedTable', query: { from: 'Home' } }"
            :class="{ active: route.name === 'PaginatedTable' || route.query.from === 'PaginatedTable' }"
          >
            Paginated Table View
          </router-link>
        </nav>
      </div>
    </header>

    <main id="main-content" tabindex="-1">
      <router-view />
    </main>

    <!-- Displays global error messages -->
    <footer v-if="globalError" class="error-banner" role="alert" aria-live="polite">
      <p>{{ globalError }}</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: var(--vt-c-indigo);
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 80px;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f8f9fa;
  border-bottom: 1px solid var(--vt-c-light-grey);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 1000;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    flex: 1;
    text-align: left;
  }

  &> div {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .home-link {
    color: var(--vt-c-light-brown);
  }

  nav {
    display: flex;
    gap: 1rem;

    a {
      text-decoration: none;
      color: var(--vt-c-blue);
      font-weight: 500;

      &.router-link-active,
      &.active {
        font-weight: bold;
        color: var(--vt-c-navy);
      }
    }
  }
}

main {
  padding: 2rem 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.error-banner {
  background-color: var(--vt-c-red);
  color: var(--vt-c-white);
  padding: 0.75rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  font-weight: bold;
  z-index: 10;
  text-align: center;
}

</style>
