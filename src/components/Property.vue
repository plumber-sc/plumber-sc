<<template>
    <div v-if="property" class="code">
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
