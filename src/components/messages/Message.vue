<template>
  <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">{{heading}}</h4>
      <p v-html="message"></p>
      <p v-if="helpLink"><a class="alert-link" :href="helpLink" target="_blank">{{helpText}}</a></p>
      <p>Check the javascript console to view the error.</p>
  </div>
</template>

<script>
export default {
  props: ["heading", "message", "error", "helpText", "helpLink"],
  computed: {
    formattedError : function() {
      return this.error.replace(/(\r\n|\n|\r)/gm, "<br/>");
    }
  }
}
</script>

<style>
.error {
  font-family: 'Courier New', Courier, monospace;
}
</style>
