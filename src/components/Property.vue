<<template>
    <div v-if="property">
       <b>{{ property.$.Name }}</b> : {{ property.$.Type }}
    </div>
</template>

<script>
export default {
  props: ["property"]
};
</script>

<style>

</style>
