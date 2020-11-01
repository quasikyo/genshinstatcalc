<template>
  <BaseLayout id="artifacts" headerText="Artifacts">
    <template v-slot>
      <v-form>
        <fieldset
          class="artifact-inputs"
          v-for="(artifact, i) in artifacts"
          :key="`artifact-${i}`"
        >
          <legend><h6 class="text-h6">{{ `Artifact ${i + 1}` }}</h6></legend>

          <StatSelector
            className="main-stat-inputs"
            dense
            :labels="{
              stat: 'Main Stat',
              value: artifact.mainStat.isFlat ? 'flat' : '%',
              isFlat: 'Main Stat Flat',
            }"
            :original="artifact.mainStat"
            :postChange="setArtifactBuffs"
            @change="updateOriginal"
          />

          <div
            class="substat"
            v-for="(substat, j) in artifact.substats"
            :key="`artifact-${i}-substat-${j}`"
          >
            <StatSelector
              className="substat-inputs"
              dense
              :labels="{
                stat: `Substat ${j + 1}`,
                value: substat.isFlat ? 'flat' : '%',
                isFlat: `Substat ${j + 1} Flat`,
              }"
              :original="substat"
              :postChange="setArtifactBuffs"
              @change="updateOriginal"
            />
          </div>
          <br>
        </fieldset>
      </v-form>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from './BaseLayout';
import StatSelector from '../util/StatSelector';

export default {
  name: 'Artifacts',
  components: {
    BaseLayout,
    StatSelector,
  },
  data() {
    return {
      // TODO: abstract this structure to a model (don't forget other files)
      // TODO: add set bonuses
      artifacts: [...Array(5)].map(() => {
        return {
          mainStat: { stat: 'maxHP', value: 0, isFlat: true, },
          substats: [
            { stat: 'maxHP', value: 0, isFlat: true },
            { stat: 'maxHP', value: 0, isFlat: true },
            { stat: 'maxHP', value: 0, isFlat: true },
            { stat: 'maxHP', value: 0, isFlat: true },
          ],
        };
      }),
    };
  },
  methods: {
    updateOriginal({ original, postChange, stat, value, isFlat }) {
      Object.assign(original, {
        stat,
        value: Number(value),
        isFlat,
      });
      postChange();
    },
    setArtifactBuffs() {
      this.$store.dispatch('stats/setArtifactBuffs', this.artifacts);
    },
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

#artifacts .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
</style>
