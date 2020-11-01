<template>
  <v-app>
    <v-main>
      <div id="split">
        <CharacterData />
        <Results />
      </div>
    </v-main>
    <Conditionals />
  </v-app>
</template>

<script>
import CharacterData from './components/CharacterData';
import Results from './components/Results';
import Conditionals from './components/Conditionals';

export default {
  name: 'App',
  components: {
    CharacterData,
    Results,
    Conditionals,
  },
};
</script>

<style>
#split {
  display: flex;
}

fieldset {
  border: none;
}

.v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
</style>
