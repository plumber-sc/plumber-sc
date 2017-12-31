<<template>
    <div v-if="property">
       * {{ property.$.Name }}
    </div>
</template>

<script>
export default {
  props: ["property"]
};
</script>

<style>

</style>
