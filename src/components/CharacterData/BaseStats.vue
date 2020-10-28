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

          <div class="substat-inputs">
            <!--
              Flat bases can be increased by flat or %.
              % bases can only be increased by other %.

              Therefore:
              Flat stats can only increase flat bases.
              % stats can increase flat and other %.
             -->
            <v-select
              label="Substat"
              v-model="weapon.substat.stat"
              :items="
                weapon.substat.isFlat
                  ? statNames(true)
                  : statNames(null, true)
              "
              @change="setWeapon"
            />
            <v-text-field
              :label="weapon.substat.isFlat ? '(flat)' : '%' "
              v-model="weapon.substat.value"
              type="number"
              @change="setWeapon"
            />
          </div>

          <v-switch
            dense
            v-model="weapon.substat.isFlat"
            label="Substat Flat"
            @change="setWeapon"
          />
        </v-form>
      </template>
    </BaseLayout>
    <br>
    <BaseLayout id="baseStats" headerText="Base Stats">
      <template v-slot>
        <v-form ref="baseStatsForm" @submit.prevent>
          <div v-for="(stat, statName) in baseStats" :key="statName">
            <v-text-field
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

export default {
  name: 'Level',
  components: {
    BaseLayout,
  },
  data() {
    return {
      level: 1,
      weapon: {
        atk: 0,
        substat: {
          stat: '',
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
    ...mapGetters('stats', ['statNames', 'totalStat',]),
  },
  methods: {
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
      this.totalStat(statName); // debug
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
