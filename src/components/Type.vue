<<template>
    <div v-if="types.length > 0" class="type-section">
        <h3>{{ title }}</h3>
        <div class="newspaper">
            <div v-for="item in types" class="type">
                <div class="typename">{{ item.$.Name }}</div>
                <div class="basetype">{{ item.$.BaseType }}</div>
                <div>
                    <properties :properties="item.Property" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Properties from "@/components/Properties";

export default {
  props: ["title", "types"],
  components: {
    Properties
  }
};
</script>

<style>
.newspaper {
  -webkit-column-count: 3; /* Chrome, Safari, Opera */
  -moz-column-count: 3; /* Firefox */
  column-count: 3;
}

.type-section {
  margin-bottom: 6px;
}

.type {
  margin-bottom: 2px;
  padding: 3px;
  background-color: #f0f0f0;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  column-break-inside: avoid;
}

.typename {
  font-weight: 800;
}

.basetype {
  font-size: 80%;
}
</style>
