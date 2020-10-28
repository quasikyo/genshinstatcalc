<template>
  <!-- TODO: Abstract the layout to reduce repeated code -->
  <BaseLayout id="artifacts" headerText="Artifacts">
    <template v-slot>
      <v-form>
        <fieldset
          class="artifact-inputs"
          v-for="(artifact, i) in artifacts"
          :key="`artifact-${i}`"
        >
          <legend><h6 class="text-h6">{{ `Artifact ${i + 1}` }}</h6></legend>
          <br>

          <div class="main-stat-inputs">
            <v-select
              dense
              label="Main Stat"
              :items="
                artifact.mainStat.isFlat
                  ? statNames(true)
                  : statNames(null, true)
              "
              v-model="artifact.mainStat.stat"
              @change="setArtifactBuffs"
            />
            <v-text-field
              dense
              :label="artifact.mainStat.isFlat ? 'flat' : '%'"
              v-model="artifact.mainStat.value"
              type="number"
              @change="setArtifactBuffs"
            />
          </div>
          <v-switch
            dense
            v-model="artifact.mainStat.isFlat"
            label="Main Stat Flat"
            @change="setArtifactBuffs"
          />

          <div
            class="substat"
            v-for="(substat, j) in artifact.substats"
            :key="`artifact-${i}-substat-${j}`"
          >
            <div class="substat-inputs">
              <v-select
                dense
                :label="`Substat ${j + 1}`"
                :items="
                  substat.isFlat
                    ? statNames(true)
                    : statNames(null, true)
                "
                v-model="substat.stat"
                @change="setArtifactBuffs"
              />
              <v-text-field
                dense
                :label="substat.isFlat ? 'flat' : '%'"
                v-model="substat.value"
                type="number"
                @change="setArtifactBuffs"
              />
            </div>
            <v-switch
              dense
              v-model="substat.isFlat"
              :label="`Substat ${j + 1} Flat`"
              @change="setArtifactBuffs"
            />
          </div>
          <br>
        </fieldset>
      </v-form>
    </template>
  </BaseLayout>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseLayout from './BaseLayout';

export default {
  name: 'Artifacts',
  components: {
    BaseLayout,
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
  computed: {
    ...mapGetters('stats', ['statNames',]),
  },
  methods: {
    // TODO: terribly inefficient to do this every change; find a better way
    setArtifactBuffs() {
      const buffs = {};

      this.artifacts.forEach((artifact) => {
        if (!buffs[artifact.mainStat.stat]) {
          buffs[artifact.mainStat.stat] = []
        }
        buffs[artifact.mainStat.stat].push({
          value: Number(artifact.mainStat.value),
          isFlat: artifact.mainStat.isFlat,
        });

        artifact.substats.forEach((substat) => {
          if (!buffs[substat.stat]) {
            buffs[substat.stat] = []
          }
          buffs[substat.stat].push({
            value: Number(substat.value),
            isFlat: substat.isFlat,
          });
        });
      });

      this.$store.dispatch('stats/setArtifactBuffs', buffs);
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
