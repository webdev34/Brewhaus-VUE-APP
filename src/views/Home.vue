<template>
  <section class="home-nav" aria-labelledby="home-heading">
    <h2 id="home-heading">Welcome to Brewhaus <span role="img" aria-label="beer icon">🍺</span></h2>
    <p>Select a search method to begin</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>

<style scoped>
.home-nav {
  text-align: center;
  margin-top: 3rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
}

router-link {
  font-size: 1.2rem;
  color: var(--vt-c-blue);
  text-decoration: none;

  &.router-link-active {
    font-weight: bold;
    color: var(--vt-c-navy);
  }
}
</style>
