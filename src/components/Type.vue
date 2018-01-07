<<template>
    <div v-if="types.length > 0" class="type-section" :class="types[0].type.toLowerCase()" >
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
import EntityContainer from "@/components/Types/EntityContainer";
import Action from "@/components/Types/Action";
import EnumType from "@/components/Types/EnumType";
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
    EntityContainer,
    Action,
    EnumType,
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
  margin-bottom: 16px;
}

.type {
  margin-bottom: 8px;
  padding: 10px;
  background-color: #f0f0f0;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  column-break-inside: avoid;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
}

.command h3 {
  color: #009688;
}

.command .type {
  background-color: #b2dfdb;
}

.policy h3 {
  color: #4caf50;
}

.policy .type {
  background-color: #c8e6c9;
}

.entity h3 {
  color: #cddc39;
}

.entity .type {
  background-color: #f0f4c3;
}

.model h3 {
  color: #fbc02d;
}

.model .type {
  background-color: #fff9c4;
}

.component h3 {
  color: #00bcd4;
}

.component .type {
  background-color: #b2ebf2;
}

.function h3 {
  color: #2196f3;
}

.function .type {
  background-color: #bbdefb;
}

.action h3 {
  color: #3f51b5;
}

.action .type {
  background-color: #c5cae9;
}

.entitycontainer h3 {
  color: #673ab7;
}

.entitycontainer .type {
  background-color: #d1c4e9;
}

.enumtype h3 {
  color: #9c27b0;
}

.enumtype .type {
  background-color: #e1bee7;
}

.other h3 {
  color: #03a9f4;
}

.other .type {
  background-color: #b3e5fc;
}

.basetype {
  font-size: 80%;
}
</style>
