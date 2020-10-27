<template>
  <BaseLayout id="level" headerText="Level">
    <template v-slot>
      <v-form ref="form">
        <v-text-field v-model="value" label="Level" type="number" />
      </v-form>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from './BaseLayout';

export default {
  name: 'Level',
  components: {
    BaseLayout,
  },
  data() {
    return {
      value: 1
    };
  },
};
</script>

<style>

</style>
