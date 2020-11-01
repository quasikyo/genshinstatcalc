<template>
  <!-- This entire layout is really repetitive of the other files. -->
  <BaseLayout id="otherBuffs" headerText="Other Buffs">
    <template v-slot>
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
            v-model="buff.permanent"
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
      buffs: [],
    };
  },
  computed: {
    ...mapState('stats', ['otherBuffTypes',]),
    ...mapGetters('stats', ['statNames',]),
    appropriateStatNames() {
      return function(buffType, forOther=false, statBeingInc=null) {
        if (forOther) { // implicit `buffType == 'percentOfOther'`
          const statNames = this.statNames(false, true);
          // prevent infinite recursion by increasing a stat with itself
          const iStatBeingInc = statNames.findIndex((stat) => stat == statBeingInc);
          statNames.splice(iStatBeingInc, 1);
          return statNames;
        } // if

        // Flat stats can only increase flat bases.
        // % stats can increase flat and other %.
        // %OfOther results in a flat increase.
        if (buffType == 'percent') {
          return this.statNames(false, true, true);
        } else {
          return this.statNames(true);
        } // if
      };
    },
  },
  methods: {
    addBuff() {
      this.buffs.push({
        label: '',
        stat: 'maxHP',
        otherStat: 'atk',
        type: 'flat',
        value: 0,
        permanent: false,
        applied: false,
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

#otherBuffs .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
</style>
