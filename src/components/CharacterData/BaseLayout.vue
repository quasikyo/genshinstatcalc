<template>
  <article :id=id>
    <h3 class="text-h3">{{ headerText }}</h3>
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
