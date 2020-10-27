<template>
  <section id="characterData">
    <v-navigation-drawer height="100vh">
      <v-container>
        <v-item-group v-model="window" mandatory>
          <v-row no-gutters v-for="row in length / buttonsPerRow" :key="row">
            <v-item
              v-for="i in buttonsPerRow"
              :key="i"
              v-slot="{ active, toggle }"
            >
              <v-btn tile small :input-value="active" @click="toggle">
                <v-icon>{{ labels[i - 1 + buttonsPerRow * (row - 1)] }}</v-icon>
              </v-btn>
            </v-item>
          </v-row>
        </v-item-group>

        <v-window v-model="window">
          <v-window-item><BaseStats /></v-window-item>
          <v-window-item><Talents /></v-window-item>
          <v-window-item><Artifacts /></v-window-item>
          <v-window-item><OtherBuffs /></v-window-item>
        </v-window>
      </v-container>
    </v-navigation-drawer>
  </section>
</template>

<script>
import BaseStats from './CharacterData/BaseStats';
import Talents from './CharacterData/Talents';
import Artifacts from './CharacterData/Artifacts';
import OtherBuffs from './CharacterData/OtherBuffs';

export default {
  name: 'CharacterData',
  components: {
    BaseStats,
    Talents,
    Artifacts,
    OtherBuffs,
  },
  data() {
    return {
      length: 4,
      window: 0,
      buttonsPerRow: 4,
      // Base Stats (Level, Weapon, Base Stats), Talents, Artifacts, Other Buffs
      labels: ['BS', 'T', 'A', 'OB'],
    };
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
