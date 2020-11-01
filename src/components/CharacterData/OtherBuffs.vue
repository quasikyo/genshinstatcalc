<template>
  <!-- This entire layout is really repetitive of the other files. -->
  <BaseLayout id="otherBuffs" headerText="Other Buffs">
    <template v-slot>
      <v-dialog v-model="warningDialog" width="50%">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="warning" v-on="on" v-bind="attrs" outlined>Warning</v-btn>
        </template>

        <v-card>
          <v-card-title>
            <h6 class="text-h6 warning--text">Potentially Dangerous Operation</h6>
          </v-card-title>
          <v-card-text>
            <p class="body-1">
              Selecting <code>percentOfOther</code> for some stat_1 and having
              it be increased by state_2 <em>and</em> creating their vice-versa
              buff is potentially dangerous.
              <br><br>
              This may cause a currently unsolved dependency between the two
              as it is necessary to calculate the total of one stat to calculate
              the total of the other.
              <br><br>
              It is okay to create the buffs, but if they are applied at the
              same time it may cause the browsers of weaker devices to stutter
              and potentially crash.
              <br><br>
              Please opt for creating a <code>flat</code> buff instead.
              Apologies for the inconvenience.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="warningDialog = false;">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-form ref="form" @submit.prevent>
        <fieldset
          class="buff-inputs"
          v-for="(buff, i) in buffs"
          :key="`buff-${i}`"
        >
          <br>
          <v-text-field
            dense
            label="Label"
            v-model="buff.label"
            @change="setOtherBuffs"
          />

          <v-select
            dense
            label="Buff Type"
            :items="otherBuffTypes"
            v-model="buff.type"
            @change="setOtherBuffs"
          />

          <v-select
            dense
            label="Stat"
            :items="appropriateStatNames(buff.type)"
            v-model="buff.stat"
            @change="setOtherBuffs"
          />

          <v-text-field
            dense
            :label="`Value ${buff.type == 'flat' ? '(flat)' : '(%)'}`"
            v-model="buff.value"
            type="number"
            @change="setOtherBuffs"
          />

          <v-select
            v-if="buff.type == 'percentOfOther'"
            dense
            label="Other Stat"
            :items="appropriateStatNames(null, true, buff.stat)"
            v-model="buff.otherStat"
            @change="setOtherBuffs"
          />

          <v-switch
            dense
            label="Permanent"
            v-model="buff.isPermanent"
            @change="setOtherBuffs"
          />

          <v-btn outlined color="error" @click="removeBuff(i)">Remove</v-btn>
        </fieldset>
      </v-form>
      <v-btn
        id="addBuffBtn"
        block
        rounded
        color="info"
        @click="addBuff"
      >
        Add Buff
      </v-btn>
    </template>
  </BaseLayout>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import BaseLayout from './BaseLayout';

export default {
  name: 'OtherBuffs',
  components: {
    BaseLayout,
  },
  data() {
    return {
      warningDialog: false,
      buffs: [],
    };
  },
  computed: {
    ...mapState('stats', ['otherBuffTypes',]),
    ...mapGetters('stats', ['statNames',]),
    appropriateStatNames() {
      return function(buffType, forOther=false, statBeingInc=null) {
        // Flat stats can only increase flat bases.
        // % stats can increase flat and other %.
        // %OfOther results in a flat increase (cannot get a flat value by multiplying just percents).
        if (buffType == 'percent') {
          return this.statNames(false, true, true);
        } else {
          const statNames = this.statNames(true);
          if (forOther) {
            // prevent infinite recursion by increasing a stat with itself
            const iStatBeingInc = statNames.findIndex((stat) => stat == statBeingInc);
            statNames.splice(iStatBeingInc, 1);
          } // if
          return statNames;
        } // if
      };
    },
  },
  methods: {
    addBuff() {
      const length = this.buffs.length;
      this.buffs.push({
        label: `Some Buff ${length}`,
        stat: 'maxHP',
        otherStat: 'atk',
        type: 'flat',
        value: 0,
        isPermanent: false,
        isActive: false,
      });
      this.setOtherBuffs();
    },
    removeBuff(index) {
      this.buffs.splice(index, 1);
      this.setOtherBuffs();
    },
    setOtherBuffs() {
      this.$store.dispatch('stats/setOtherBuffs', this.buffs);
    },
  },
};
</script>

<style>
#addBuffBtn {
  margin-top: 16px;
}
</style>
