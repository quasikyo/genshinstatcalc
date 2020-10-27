<template>
  <BaseLayout id="talents" headerText="Talents">
    <template v-slot>
      <v-form>
        <fieldset
          class="attack-inputs"
          v-for="(attack, i) in attacks"
          :key="`attack-${i}`"
        >
          <v-text-field label="Label" />
          <v-text-field label="% of ATK (decimal)" type="number" />
          <v-select
            label="Normal/Charged/Skill/Burst"
            :items="dmgTypes"
            v-model="attack.dmgType.value"
          />
          <v-select
            label="Elemental Type"
            :items="elementalTypes"
            v-model="attack.elementalType.value"
          />
          <v-btn
            outlined
            color="error"
            @click="removeAttack(i)"
          >
            Remove Attack
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
import BaseLayout from './BaseLayout';

export default {
  name: 'Talents',
  components: {
    BaseLayout,
  },
  data() {
    return {
      dialog: false,
      dmgTypes: ['Normal', 'Charged', 'Skill', 'Burst',],
      elementalTypes: [
        'PHYS',
        'Pyro',
        'Hydro',
        'Dendro',
        'Electro',
        'Anemo',
        'Cryo',
        'Geo',
      ],
      attacks: [],
    };
  },
  methods: {
    addAttack() {
      this.attacks.push({
        percentOfAtk: { value: 0, },
        dmgType: { value: 'Normal', },
        // default to character elemental type
        elementalType: { value: 'PHYS', },
      });
    },
    removeAttack(index) {
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
