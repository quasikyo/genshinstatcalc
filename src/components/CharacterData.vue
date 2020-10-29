<template>
  <section id="characterData">
    <v-navigation-drawer app>
      <v-container>
        <v-item-group v-model="window" mandatory>
          <v-row no-gutters v-for="row in length / buttonsPerRow" :key="row" justify="space-between">
            <v-item
              v-for="i in buttonsPerRow"
              :key="i"
              v-slot="{ active, toggle }"
            >
              <v-btn tile small :input-value="active" @click="toggle">
                {{ labels[i - 1 + buttonsPerRow * (row - 1)] }}
              </v-btn>
            </v-item>
          </v-row>
        </v-item-group>

        <v-window v-model="window">
          <v-window-item><BaseStats /></v-window-item>
          <v-window-item><Artifacts /></v-window-item>
          <v-window-item><OtherBuffs /></v-window-item>
        </v-window>
      </v-container>
    </v-navigation-drawer>
  </section>
</template>

<script>
import BaseStats from './CharacterData/BaseStats';
import Artifacts from './CharacterData/Artifacts';
import OtherBuffs from './CharacterData/OtherBuffs';

export default {
  name: 'CharacterData',
  components: {
    BaseStats,
    Artifacts,
    OtherBuffs,
  },
  data() {
    return {
      window: 0,
      // Base Stats (Level, Weapon, Base Stats), Artifacts, Other Buffs
      labels: ['BS', 'A', 'OB'],
    };
  },
  computed: {
    length() {
      return this.labels.length;
    },
    buttonsPerRow() {
      return this.length;
    },
  },
};
</script>

<style>
#characterData .v-navigation-drawer__content {
  scrollbar-width: thin;
}

.v-window {
  margin-top: 12px;
}
</style>
