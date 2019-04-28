<<template>
  <div>
    Parameters:
    <div v-for="item in item.Parameter" class="code">
      {{ item.$.Name }}
      </div>
      Return type:
      <div v-for="item in item.ReturnType" class="code">
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
