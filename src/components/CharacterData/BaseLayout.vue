<template>
  <article :id=id>
    <h4 class="text-h4">{{ headerText }}</h4>
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: 'BaseLayout',
  props: {
    id: String,
    headerText: String,
  },
};
</script>
