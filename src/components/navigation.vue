<<template>
  <ul class="nav nav-pills">
  <li class="nav-item">
    <router-link :to="{ name: 'pipelines'}" class="nav-link" active-class="active">Pipelines</router-link>
  </li>
  <li class="nav-item">
    <router-link :to="{ name: 'blocks'}" class="nav-link" active-class="active">Blocks</router-link>
  </li>
  <li class="nav-item">
    <router-link :to="{ name: 'plugins'}"  class="nav-link" active-class="active">Plugins</router-link>
  </li>
  <li class="nav-item">
    <router-link :to="{ name: 'schema'}"  class="nav-link" active-class="active">Schema</router-link>
  </li>
</ul>
</template>

<script>
export default {};
</script>

<style>

</style>
