<<template>
    <div>
       <table id="table">
            <thead>
            <tr v-for="property in properties">
                <th data-field="key" class="key">{{ property.key }}</th>
                <th data-field="value">{{ property.value }}</th>
            </tr>
            </thead>
        </table>
    </div>
</template>

<script>
import PolicyTypeMixin from "../../mixins/PolicyTypeMixin";

export default {
  mixins: [PolicyTypeMixin]
};
</script>

<style>

</style>
