<template id="neighborhood-template">
    <section class="neighborhood-form">
        <form @submit.prevent="handleSubmit">
            <label>
                Name:
                <input type="text" name="name" placeholder="Name" required
                    v-model="edit.name">
            </label>

            <label>
              Quadrant:
              <select v-model.number="edit.quadrantId" required>
                <option disabled value="">Please select a quadrant</option>
                <option
                  v-for="quadrant in quadrants"
                  :key="quadrant.id"
                  :value="quadrant.id">
                  {{quadrant.name}} ({{quadrant.direction}})
                </option>
              </select>
            </label>

            <label>
                Population:
                <input type="number" name="population" placeholder="Population" required
                    v-model="edit.population">
            </label>

            <label>
                Founded:
                <input type="number" name="founded" placeholder="Founded" required
                    v-model="edit.founded">
            </label>

            <label>
                Description:
                <textarea name="body" rows="8" cols="40" required
                    v-model="edit.description"></textarea>
            </label>

            <label>
                <button type="submit">{{label}}</button>
            </label>
        </form>
        <!-- {{edit}} -->
    </section>
</template>

<script>
import { getQuadrants } from '../services/api';

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
    neighborhood: Object,
    label: String,
    onEdit: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      edit: initNeighborhood() ? Object.assign({}, this.neighborhood) : initNeighborhood(),
      quadrants: []
    };
  },
  created() {
    getQuadrants().then(quadrants => {
      this.quadrants = quadrants;
    });
  },
  methods: {
    handleSubmit() {
      this.onEdit(this.edit)
        .then(() => {
          this.edit = initNeighborhood();
        });
    }
  }
};
</script>

<style>
.neighborhood-form {
	width: 300px;
	text-align: left;
	margin: auto;
}

label {
	display: block;
}
</style>
