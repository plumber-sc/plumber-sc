<<template>

  <div>
       <h1>Blocks</h1>
    <b-row>
      <b-col>
        <div class="form-group has-feedback has-clear">
          <input type="text" class="typeahead form-control" data-provide="typeahead" placeholder="Name of the block">
          <a class="glyphicon glyphicon-remove-sign form-control-feedback form-control-clear" ng-click="ctrl.clearSearch()" style="pointer-events: auto; text-decoration: none;cursor: pointer;"></a>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <pipeline v-bind:pipeline="selectedBlock" />
        </b-col>
    </b-row>
    </div>
</template>

<script>
export default {};
</script>

<style>

</style>
