<template>
  <section id="results" style="">
    <v-container fluid>
      <v-item-group v-model="window" mandatory>
        <v-item v-for="i in length" :key="i" v-slot="{ active, toggle }">
          <v-btn tile x-large :input-value="active" @click="toggle">
            {{ labels[i - 1] }}
          </v-btn>
        </v-item>
      </v-item-group>

      <v-window v-model="window">
        <v-window-item>
          <v-data-table
            :headers="statsHeaders"
            :items="statsItems"
            :disable-pagination="true"
            hide-default-footer
          />
        </v-window-item>
        <v-window-item>
          <v-row>
            <v-col cols="12" md="3" xl="4">
              <Talents />
            </v-col>
            <v-col>
              <v-data-table
                :headers="dmgHeaders"
                :items="dmgItems"
                :disable-pagination="true"
                hide-default-footer
              />
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Talents from './CharacterData/Talents';

export default {
  name: 'Results',
  components: {
    Talents,
  },
  data() {
    return {
      window: 0,
      labels: ['TOTAL STATS', 'DMG'],
      statsHeaders: [
        { text: 'Stat', value: 'stat', },
        { text: 'Total', value: 'value', },
      ],
      dmgHeaders: [
        { text: 'Attack', value: 'label', },
        { text: 'DMG', value: 'value', },
      ],
    };
  },
  computed: {
    ...mapState('stats', ['dmgBonuses',]),
    ...mapGetters('stats', ['statNames', 'totalStat',]),
    ...mapState('attacks', ['dmgTypes', 'elementalTypes',]),
    ...mapGetters('attacks', ['calculateAttacks',]),
    length() {
      return this.labels.length;
    },
    statsItems() {
      const stats = this.statNames(null, true);
      const items = stats.map((stat) => {
        return {
          stat,
          value: this.totalStat(stat).toFixed(2),
        };
      });

      for (const property in this.dmgBonuses) {
        items.push({
          stat: property,
          value: this.dmgBonuses[property].toFixed(2),
        });
      } // for

      return items;
    },
    dmgItems() {
      const totalAtk = this.totalStat('atk');
      const phys = this.totalStat('physicalBonus');
      const elemental = this.totalStat('elementalBonus');

      return this.calculateAttacks(totalAtk, phys, elemental, this.dmgBonuses);
    },
  },
};
</script>

<style>
#results {
  width: 100%;
  /* scroll-margin: 2rem; */
}
</style>
