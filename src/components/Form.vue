<template>
  <div class="container mx-auto">
    <span class="qa-test-title-section" style="display: block;">
      {{ title }}
    </span>
    <div class="flex mb-4">
      <input
        class="qa-test-input-name bg-white focus:outline-none
        focus:shadow-outline border border-gray-300
        rounded-lg py-2 px-4 block
        appearance-none leading-normal"
        type="text" placeholder="PS5"
        v-model="form.name"
      >
    </div>
    <div class="flex mb-4">
      <span class="mr-4 pt-2">
        Age
      </span>
      <span class="qa-test-age-section flex rounded-full bg-indigo-500 text-indigo-100
      px-2 py-1 pt-2 font-bold mr-3 count">
        {{ form.age }}
      </span>
      <button class="qa-test-increment btn btn-blue mr-4" @click="increment">Increment</button>
      <button class="qa-test-decrement btn btn-blue" @click="decrement">Decrement</button>
    </div>
    <div class="flex mb-4">
      <button class="qa-test-submit btn btn-blue" @click="submit">Submit</button>
    </div>
    <div v-if="error" class="qa-test-error-section bg-red-100 border border-red-400
    text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Umur minimal 5 tahun dan semua harus diisi !</strong>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API = 'https://www.test.com/api/v3';

export default {
  name: 'Form',
  props: {
    title: {
      type: String,
      default: 'Create',
    },
  },
  data() {
    return {
      error: false,
      form: {
        name: '',
        age: 0,
      },
    };
  },
  methods: {
    increment() {
      this.form.age += 1;
    },
    decrement() {
      if (this.form.age !== 0) this.form.age -= 1;
    },
    submit() {
      if (this.form.age >= 5 && this.form.name) {
        axios.post(API, {
          data: this.form,
        });
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>
