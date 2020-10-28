<template>
  <section id="results" style="">
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="items"
      />
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Results',
  computed: {
    ...mapGetters('stats', ['statNames', 'totalStat',]),
    headers() {
      return [
        { text: 'Stat', align: 'start', value: 'stat', },
        { text: 'Total', value: 'value', },
      ];
    },
    items() {
      const stats = this.statNames(null, true);
      return stats.map((stat) => {
        return {
          stat,
          value: this.totalStat(stat),
        };
      });
    },
  }
};
</script>

<style>
#results {
  width: 100%;
}
</style>
