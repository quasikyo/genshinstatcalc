<template>
  <BaseLayout id="artifacts" headerText="Artifacts">
    <template v-slot>
      <v-form>
        <fieldset
          class="artifact-inputs"
          v-for="(artifact, i) in artifacts"
          :key="`artifact-${i}`"
        >
          <legend><h5 class="text-h5">{{ `Artifact ${i + 1}` }}</h5></legend>

          <div class="main-stat-inputs">
            <v-select label="Main Stat" :items="stats" />
            <v-text-field v-model="artifact.mainStat.value" type="number"/>
          </div>

          <div
            class="substat-inputs"
            v-for="(substat, j) in artifact.substats"
            :key="`artifact-${i}-substat-${j}`"
          >
            <v-select :label="`Substat ${j + 1}`" :items="stats" />
            <v-text-field v-model="substat.value" type="number" />
          </div>
          <br>
        </fieldset>
      </v-form>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from './BaseLayout';

export default {
  name: 'Artifacts',
  components: {
    BaseLayout,
  },
  data() {
    return {
      artifacts: [...Array(5)].map((element, i) => {
        element = i;
        return {
          mainStat: { stat: '', value: 0, },
          substats: [
            { stat: '', value: 0, },
            { stat: '', value: 0, },
            { stat: '', value: 0, },
            { stat: '', value: 0, },
          ],
        };
      }),
      // temporary cause state management
      stats: [
        'maxHP',
        'atk',
        'def',
        'elementalMastery',
        'maxStamina',
        'critRate',
        'critDMG',
        'healingBonus',
        'incomingHB',
        'energyRecharge',
        'reduceCD',
        'powerfulShield',
        'elementalBonus',
        'elementalRES',
        'physicalBonus',
        'physicalRES',
      ],
    };
  },
};
</script>

<style>
#addArtifactBtn {
  margin-top: 16px;
}

.main-stat-inputs {
  display: flex;
}
</style>
