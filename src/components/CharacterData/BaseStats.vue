<template>
  <div>
    <BaseLayout id="level" headerText="Level">
      <template v-slot>
        <v-form ref="levelForm">
          <v-text-field v-model="level" label="Level" type="number" />
        </v-form>
      </template>
    </BaseLayout>
    <br>
    <BaseLayout id="weapon" headerText="Weapon">
      <template v-slot>
        <v-form ref="weaponForm">
          <v-text-field v-model="weapon.atk.value" label="atk" type="number" />
          <div class="substat-inputs">
            <v-select label="Substat" :items="Object.keys(stats)" />
            <v-text-field v-model="weapon.substat.value" type="number" />
          </div>
        </v-form>
      </template>
    </BaseLayout>
    <br>
    <BaseLayout id="baseStats" headerText="Base Stats">
      <template v-slot>
        <v-form ref="baseStatsForm">
          <v-text-field
            v-for="(stat, statName, i) in stats"
            :key="i"
            v-model="stat.value"
            :label="statName"
            type="number"
          />
        </v-form>
      </template>
    </BaseLayout>
  </div>
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
      level: 1,
      weapon: {
        atk: { value: 0, },
        substat: {
          stat: '',
          value: 0,
        },
      },
      stats: {
        maxHP: { value: 0, },
        atk: { value: 0, },
        def: { value: 0, },
        elementalMastery: { value: 0, },
        maxStamina: { value: 0, },
        critRate: { value: 0, },
        critDMG: { value: 0, },
        healingBonus: { value: 0, },
        incomingHB: { value: 0, },
        energyRecharge: { value: 0, },
        reduceCD: { value: 0, },
        powerfulShield: { value: 0, },
        elementalBonus: { value: 0, },
        elementalRES: { value: 0, },
        physicalBonus: { value: 0, },
        physicalRES: { value: 0, },
      },
    };
  },
};
</script>

<style>
.substat-inputs {
  display: flex;
}
</style>
