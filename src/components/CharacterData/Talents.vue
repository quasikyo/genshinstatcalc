<template>
  <BaseLayout id="talents" headerText="Talents">
    <template v-slot>
      <v-form>
        <fieldset
          class="attack-inputs"
          v-for="(attack, i) in attacks"
          :key="`attack-${i}`"
        >
          <v-text-field label="Label" v-model="attack.label" />
          <v-text-field
            label="% of ATK (decimal)"
            v-model="attack.percentOfAtk"
            type="number"
          />

          <v-select
            label="Normal/Charged/Skill/Burst"
            :items="dmgTypes"
            v-model="attack.dmgType"
          />

          <v-select
            label="Elemental Type"
            :items="elementalTypes"
            v-model="attack.elementalType"
          />

          <v-btn outlined color="error" @click="removeAttack(i)">
            Remove Attack
          </v-btn>
          <br><br>
          <v-btn outlined color="success" @click="setAttack(i)">
            Update Attack
          </v-btn>
        </fieldset>
      </v-form>
      <v-btn
        id="addAttackBtn"
        block
        rounded
        color="info"
        @click="addAttack"
      >
        Add Attack
      </v-btn>
    </template>
  </BaseLayout>
</template>

<script>
import { mapState } from 'vuex';
import BaseLayout from './BaseLayout';

export default {
  name: 'Talents',
  components: {
    BaseLayout,
  },
  data() {
    return {
      dialog: false,
      attacks: [],
    };
  },
  computed: {
    ...mapState('attacks', ['dmgTypes', 'elementalTypes',]),
  },
  methods: {
    addAttack() {
      const attack = {
        label: '',
        percentOfAtk: 0,
        dmgType: 'Normal',
        // TODO: default to character elemental type
        elementalType: 'PHYS',
      };
      this.$store.dispatch('attacks/addAttack', attack);
      this.attacks.push(attack);
    },
    setAttack(index) {
      this.attacks[index].percentOfAtk = Number(this.attacks[index].percentOfAtk);
      this.$store.dispatch('attacks/setAttack', { index, attack: this.attacks[index] });
    },
    removeAttack(index) {
      this.$store.dispatch('attacks/removeAttack', index)
      this.attacks.splice(index, 1);
    },
  },
};
</script>

<style>
#addAttackBtn {
  margin-top: 16px;
}
</style>
