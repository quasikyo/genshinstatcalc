<template>
  <section id="results" style="">
    <v-container fluid>
      <v-item-group v-model="window" mandatory>
        <v-item v-for="i in labels.length" :key="i" v-slot="{ active, toggle }">
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
              <br>
              <v-radio-group v-model="critAction" row>
                <v-radio
                  v-for="i in critActions.length"
                  :key="i"
                  :label="critActions[i - 1]"
                  :value="i - 1"
                />
              </v-radio-group>
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
      critActions: ['No Crit', 'Crit', 'Crit Average',],
      critAction: 0,
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
    ...mapGetters('stats', ['statNames', 'totalStat', 'dmgBonuses',]),
    ...mapState('attacks', ['dmgTypes', 'elementalTypes',]),
    ...mapGetters('attacks', ['calculateAttacks',]),
    statsItems() {
      const stats = this.statNames(null, true);
      const items = stats.map((stat) => {
        return {
          stat,
          value: this.totalStat(stat).toFixed(2),
        };
      });

      const dmgBonuses = this.dmgBonuses;
      for (const property in dmgBonuses) {
        items.push({
          stat: property,
          value: dmgBonuses[property].toFixed(2),
        });
      } // for

      return items;
    },
    dmgItems() {
      return this.calculateAttacks(
        this.totalStat('atk'),
        this.totalStat('physicalBonus'),
        this.totalStat('elementalBonus'),
        this.dmgBonuses,
        {
          apply: this.critAction == 1,
          average: this.critAction == 2,
          dmg: this.totalStat('critDMG'),
          rate: this.totalStat('critRate'),
        }
      );
    },
  },
};
</script>

<style>
#results {
  width: 100%;
}
</style>
