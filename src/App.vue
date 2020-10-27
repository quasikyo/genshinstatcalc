<template>
    <v-app>
        <Characters />
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
import Characters from './components/Characters';
import CharacterData from './components/CharacterData';
import Results from './components/Results';
import Conditionals from './components/Conditionals';

export default {
    name: 'App',
    components: {
        Characters,
        CharacterData,
        Results,
        Conditionals,
    },
};
</script>

<style scoped>
#split {
    display: flex;
}
</style>
