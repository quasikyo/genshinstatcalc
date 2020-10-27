<template>
  <BaseLayout id="baseStats" headerText="Base Stats">
    <template v-slot>
      <v-form ref="form">
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
</template>

<script>
import BaseLayout from './BaseLayout';

export default {
  name: 'BaseStats',
  components: {
    BaseLayout,
  },
  data() {
    return {
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

</style>
