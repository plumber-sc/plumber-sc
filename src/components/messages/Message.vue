<template>
<div class="alert alert-info" role="alert">
    <h4 class="alert-heading">{{heading}}</h4>
    <p v-html="message"></p>
</div>
</template>

<script>
export default {
  props: ["heading", "message"]

}
</script>

<style>

</style>
