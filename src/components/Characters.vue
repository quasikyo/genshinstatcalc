<template>
  <section id="characters">
    <v-navigation-drawer dark app mini-variant>
      <div id="characterButtons">
        <v-menu
          :min-width="200"
          v-for="i in Array.apply(null, Array(membersPerParty))"
          :key="i"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="8" icon large v-bind="attrs" v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              Select New Character or Display Current Character Values
            </v-card-title>
          </v-card>
        </v-menu>
      </div>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  name: 'Characters',
  data() {
    return {
      membersPerParty: 4,
    };
  },
};
</script>

<style scoped>
#characterButtons {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
</style>
