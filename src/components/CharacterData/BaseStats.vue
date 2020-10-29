<template>
  <div>
    <BaseLayout id="level" headerText="Level">
      <template v-slot>
        <v-form ref="levelForm" @submit.prevent>
          <v-text-field
            v-model="level"
            label="Level"
            type="number"
            @change="setLevel"
          />
        </v-form>
      </template>
    </BaseLayout>
    <br>
    <BaseLayout id="weapon" headerText="Weapon">
      <template v-slot>
        <v-form ref="weaponForm" @submit.prevent>
          <v-text-field
            v-model="weapon.atk"
            label="base atk (flat)"
            type="number"
            @change="setWeapon"
            :disabled="includesWeaponAtk"
          />
          <StatSelector
            className="substat-inputs"
            dense
            :labels="{
              stat: `Substat`,
              value: weapon.substat.isFlat ? 'flat' : '%',
              isFlat: `Substat Flat`,
            }"
            :original="weapon.substat"
            :postChange="setWeapon"
            @change="updateOriginal"
          />
        </v-form>
      </template>
    </BaseLayout>
    <br>
    <BaseLayout id="baseStats" headerText="Base Stats">
      <template v-slot>
        <v-form ref="baseStatsForm" @submit.prevent>
          <div v-for="(stat, statName, i) in baseStats" :key="statName">
            <v-text-field
              :dense="i != 0"
              v-model="baseStats[statName].value"
              :label="stat.isFlat ? `${statName} (flat)` : `${statName} (%)`"
              type="number"
              @change="setBaseStat(statName)"
            />
            <v-switch
              dense
              v-if="statName == 'atk'"
              v-model="includesWeaponAtk"
              label="Includes Weapon Base Atk"
              @change="setBaseStat(statName)"
            />
          </div>
        </v-form>
      </template>
    </BaseLayout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseLayout from './BaseLayout';
import StatSelector from '../util/StatSelector';

export default {
  name: 'Level',
  components: {
    BaseLayout,
    StatSelector,
  },
  data() {
    return {
      level: 1,
      weapon: {
        atk: 0,
        substat: {
          stat: 'maxHP',
          value: 0,
          isFlat: true,
        },
      },
      baseStats: {},
      includesWeaponAtk: true,
    };
  },
  created() {
    // Hack cause I am lazy
    this.baseStats = this.$store._modules.root._rawModule.modules.stats.state.baseStats;
  },
  computed: {
    ...mapGetters('stats', ['totalStat',]),
  },
  methods: {
    updateOriginal({ original, postChange, stat, value, isFlat }) {
      Object.assign(original, {
        stat, value, isFlat
      });
      postChange();
    },
    setLevel() {
      this.level = Number(this.level);
      this.$store.dispatch('stats/setLevel', this.level);
    },
    setWeapon() {
      this.weapon.atk = Number(this.weapon.atk);
      this.weapon.substat.value = Number(this.weapon.substat.value);
      this.$store.dispatch('stats/setWeapon', this.weapon);
      this.totalStat(this.weapon.substat.stat); // debug
    },
    setBaseStat(statName) {
      this.baseStats[statName].value = Number(this.baseStats[statName].value);
      this.$store.dispatch('stats/setBaseStat', {
        statName,
        stat: this.baseStats[statName],
        includesWeaponAtk: this.includesWeaponAtk,
      });
    },
  },
};
</script>

<style>
.substat-inputs {
  display: flex;
}

#weapon .v-input--selection-controls, #baseStats .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
</style>
