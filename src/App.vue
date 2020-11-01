<template>
  <v-app>
    <v-main>
      <div id="split">
        <CharacterData />
        <Results />
      </div>

      <v-footer>
        <p class="body-1">
          This website is not affiliated nor endorsed by miHoYo.
          <br>
          Feedback? Submit an issue using the link below.
          <br>
          <a class="text-decoration-none" href="https://github.com/michaelrehman/genshinstatcalc">Source Code <v-icon>mdi-github</v-icon></a>
        </p>
      </v-footer>
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
  height: 100%;
}

fieldset {
  border: none;
}

.v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
</style>
