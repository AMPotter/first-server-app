<template>
    <section class="add-neighborhood">
        <h1>New Neighborhood</h1>
        <form @submit.prevent="handleSubmit">
            <label>
                Name:
                <input type="text" name="name" placeholder="Name" required
                    v-model="neighborhood.name">
            </label>
            <label>
                City:
                <input type="text" name="city" placeholder="City" required
                    v-model="neighborhood.city">
            </label>
            <label>
                Population:
                <input type="number" name="population" placeholder="Population" required
                    v-model="neighborhood.population">
            </label>
            <label>
                Founded:
                <input type="number" name="founded" placeholder="Founded" required
                    v-model="neighborhood.founded">
            </label>
            <label>
                Description:
                <input type="text" name="description" placeholder="Description" required
                    v-model="neighborhood.description">
            </label>
            <label>
                <button type="submit">Add</button>
            </label>
        </form>
    </section>
</template>

<script>
const initNeighborhood = () => {
  return {
    name: '',
    city: 'Portland',
    population: '',
    founded: '',
    description: ''
  };
};

export default {
  props: {
    onAdd: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      neighborhood: initNeighborhood()
    };
  },
  methods: {
    handleSubmit() {
      this.onAdd(this.neighborhood)
        .then(() => {
          this.neighborhood = initNeighborhood();
        });
    }
  }
};
</script>

<style>

.add-neighborhood {
    width: 300px;
    text-align: left;
    margin: auto;
}

label {
    display: block;
}

</style>
