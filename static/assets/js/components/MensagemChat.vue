<template>
  <p :class="[classe]">{{ json }}</p>
</template>

<script>
export default {
  props: {
    json: { type: Object }
  },
  computed: {
    classe: function(){
      return this.json.from == 'client' ? 'client' : 'server';
    }
  }
};
</script>

<style lang="css" scoped>
.client{
  color: red;
}

.server{
  color: yellow;
}
</style>