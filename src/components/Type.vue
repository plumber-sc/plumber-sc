<<template>
    <div v-if="types.length > 0" class="type-section">
        <h3>{{ title }}</h3>
        <div class="newspaper">
            <div v-for="item in types" class="type">
                <h4 class="typename">{{ item.$.Name }}</h4>
                <div class="basetype">{{ item.$.BaseType }}</div>
                <div>
                    <component :is="getComponent(item)" :properties="item.Property" :item="item"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Properties from "@/components/Properties";
import Command from "@/components/Types/Command";
import Policy from "@/components/Types/Policy";
import Component from "@/components/Types/Component";
import Entity from "@/components/Types/Entity";
import Function from "@/components/Types/Function";
import Model from "@/components/Types/Model";
import Other from "@/components/Types/Other";

export default {
  data() {
    return {
      currentView: "Properties"
    };
  },
  props: ["title", "types"],
  components: {
    Properties,
    Command,
    Policy,
    Component,
    Entity,
    Function,
    Model,
    Other
  },
  methods: {
    getComponent: function(item) {
      return item.type;
    }
  }
};
</script>

<style>
h4 {
  margin-bottom: 0px;
}

.newspaper {
  -webkit-column-count: 2; /* Chrome, Safari, Opera */
  -moz-column-count: 2; /* Firefox */
  column-count: 2;
}

.type-section {
  margin-bottom: 6px;
}

.type {
  margin-bottom: 2px;
  padding: 10px;
  background-color: #f0f0f0;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  column-break-inside: avoid;
}

.basetype {
  font-size: 80%;
}
</style>
