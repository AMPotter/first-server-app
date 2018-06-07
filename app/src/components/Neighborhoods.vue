<template>
    <section>
        <h2>Portland Neighborhoods</h2>
        <p v-if="!neighborhoods">Loading Neighborhoods</p>
        <ul>
            <Neighborhood
                v-for="neighborhood in neighborhoods"
                :key="neighborhood.id"
                :neighborhood="neighborhood"
            />
        </ul>
        <AddNeighborhood :on-add="handleAdd"/>
    </section>
</template>

<script>
import Neighborhood from './Neighborhood';
import AddNeighborhood from './AddNeighborhood';
import { getNeighborhoods, addNeighborhood, deleteNeighborhood } from '../services/api';

export default {
  data() {
    return {
      neighborhoods: null
    };
  },
  created() {
    getNeighborhoods()
      .then(neighborhoods => {
        this.neighborhoods = neighborhoods;
      });
  },
  components: {
    Neighborhood,
    AddNeighborhood
  },
  methods: {
    handleAdd(neighborhood) {
      return addNeighborhood(neighborhood)
        .then(saved => {
          this.neighborhoods.push(saved);
        });
    },
    handleDelete(neighborhood) {
      return deleteNeighborhood(neighborhood)
        .then(deleted => {
          this.neighborhoods.pop(deleted);
        });
    }
  }
};
</script>

<style>

ul.list {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

</style>
