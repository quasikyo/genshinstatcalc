<template>
  <section id="conditionals">
    <v-navigation-drawer app right mobile-breakpoint="0">
      <v-container>
        <h4 class="text-h4">Apply Buffs</h4>
        <div
          v-for="(buffs, forStat) in otherBuffs"
          :key="forStat"
        >
          <br>
          <h5 class="text-h5">{{ forStat }}</h5>

          <v-expansion-panels>
            <v-expansion-panel
              v-for="buff in buffs"
              :key="buff.label"
            >
              <v-expansion-panel-header>
                <h6 class="text-h6">
                  {{ buff.label }}
                  <span class="subtitle-1">({{ subtitle(buff) }})</span>
                </h6>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <article class="buff-data">
                  <p class="body-1">
                    Increases {{ buff.stat }} by <!--
                    --><span v-if="buff.type == 'flat'">{{ buff.value }}</span><!--
                    --><span v-else-if="buff.type != 'flat'">{{ buff.value * 100 }}%</span><!--
                    --><span v-if="buff.type == 'percentOfOther'"> of {{ buff.otherStat }}</span>
                  </p>
                </article>
                <br>
                <v-switch
                  dense
                  label="Active"
                  v-if="!buff.isPermanent"
                  v-model="buff.isActive"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </div>
      </v-container>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { mapState } from 'vuex';

// Going to be cheating here by
// modifying the state directly.
// (like I wasn't already lmao)
export default {
  name: 'Conditionals',
  computed: {
    ...mapState('stats', ['otherBuffs',]),
    subtitle() {
      return function(buff) {
        if (buff.isPermanent) {
          return 'permanent';
        } else if (buff.isActive) {
          return 'active';
        } else {
          return 'not active' ;
        } // if
      };
    },
  },
};
</script>

<style>
</style>
