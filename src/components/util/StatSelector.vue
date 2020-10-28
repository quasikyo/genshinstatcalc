<template>
  <div>
    <div :class="className">
      <!--
        Flat bases can be increased by flat or %.
        % bases can only be increased by other %.

        Therefore:
        Flat stats can only increase flat bases.
        % stats can increase flat and other %.
      -->
      <v-select
        :dense="dense"
        :label="labels['stat']"
        v-model="stat"
        :items="isFlat ? statNames(true) : statNames(null, true)"
        @change="onChange"
      />
      <v-text-field
        :dense="dense"
        :label="labels['value']"
        v-model="value"
        type="number"
        @change="onChange"
      />
    </div>

    <v-switch
      :dense="dense"
      :label="labels['isFlat']"
      v-model="isFlat"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StatSelector',
  data() {
    return {
      stat: this.original.stat,
      value: this.original.value,
      isFlat: this.original.isFlat,
    };
  },
  props: {
    className: String,
    dense: Boolean,
    items: Array,
    labels: Object,
    postChange: Function,
    original: Object,
  },
  computed: {
    ...mapGetters('stats', ['statNames',]),
  },
  methods: {
    onChange() {
      this.$emit('change', {
        original: this.original,
        postChange: this.postChange,
        stat: this.stat,
        value: Number(this.value),
        isFlat: this.isFlat,
      });
    },
  },
};
</script>

<style>

</style>