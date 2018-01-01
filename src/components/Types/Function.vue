<<template>
  <div>
    <div v-for="item in item.Parameter">
      {{ item.$.Name }}
      </div>
        <div v-for="item in item.ReturnType">
      {{ item.$.Type }}
      </div>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style>

</style>
