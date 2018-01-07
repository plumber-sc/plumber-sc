<<template>
    <div class="pipeline">
        <div v-if="!pipeline">
        </div>
        <div v-else>
            <span class="namespace">{{ pipeline.Namespace }}</span>
            <h2>{{ pipeline.Name }}</h2>


            <div>
                <i class="fa fa-cog" aria-hidden="true"></i>
            </div>
            <div>
                <i class="fa fa-commenting-o" aria-hidden="true"></i> {{ pipeline.Comments }}
            </div>

            <div class="timeline-centered">
                <article class="timeline-entry start">

                    <div class="timeline-entry-inner">

                        <div class="timeline-icon">
                            <i class="entypo-feather"></i>
                        </div>

                        <div class="timeline-label">
                            <h3>Start</h3>
                            <div>
                                <i class="fa fa-sign-in" aria-hidden="true"></i> {{ pipeline.Receives }}
                            </div>
                        </div>
                    </div>

                </article>
                <article class="timeline-entry" v-for="block in pipeline.Blocks">

                    <div class="timeline-entry-inner">

                        <div class="timeline-icon">
                            <i class="entypo-feather"></i>
                        </div>

                        <div class="timeline-label" v-bind:class="{ pipeline : isBlockPipeline(block) }">
                            <span class="namespace">{{ block.Namespace }}</span>
                            <h3 v-if="!isBlockPipeline(block)"><router-link :to="{ name: 'blocks', params: { blockname: `${block.Namespace}.${block.Name}` }}">{{ block.Name }}</router-link></h3>
                            <h3 v-else><router-link :to="{ name: 'pipelines', params: { pipelineid: `${block.Namespace}.${block.Name}` }}">{{ block.Name }}</router-link></h3>
                            <div>
                                <i class="fa fa-cog" aria-hidden="true"></i>
                            </div>
                            <div>
                                <i class="fa fa-sign-in" aria-hidden="true"></i> {{ block.Receives }}
                            </div>
                            <div>
                                <i class="fa fa-sign-out" aria-hidden="true"></i> {{ block.Returns }}
                            </div>
                        </div>
                    </div>

                </article>

                <article class="timeline-entry finish">

                  <div class="timeline-entry-inner">

                        <div class="timeline-icon">
                            <i class="entypo-feather"></i>
                        </div>

                        <div class="timeline-label">
                            <h3>Finish</h3>
                            <div>
                                <i class="fa fa-sign-out" aria-hidden="true"></i> {{ pipeline.Returns }}
                            </div>
                        </div>
                    </div>

                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Pipeline",
  props: ["pipeline"],
  data() {
    return {
      blocks: []
    };
  },
  computed: {
    pipelines: () => {
      if (this.$store) {
        return this.$store.state.pipelines;
      } else {
        return [];
      }
    }
  },
  created() {},
  beforeUpdate() {
    var pipelines = this.$store.state.pipelines;
    if (this.pipeline) {
      this.blocks = this.pipeline.blocks;
    }
  },
  methods: {
    isBlockPipeline: function(block) {
      var pipeline = this.$store.getters.getPipeline(
        `${block.Namespace}.${block.Name}`
      );
      return pipeline;
    }
  }
};
</script>

<style>
img {
  vertical-align: middle;
}

.img-responsive {
  display: block;
  height: auto;
  max-width: 100%;
}

.img-rounded {
  border-radius: 3px;
}

.img-thumbnail {
  background-color: #fff;
  border: 1px solid #ededf0;
  border-radius: 3px;
  display: inline-block;
  height: auto;
  line-height: 1.428571429;
  max-width: 100%;
  moz-transition: all 0.2s ease-in-out;
  o-transition: all 0.2s ease-in-out;
  padding: 2px;
  transition: all 0.2s ease-in-out;
  webkit-transition: all 0.2s ease-in-out;
}

.img-circle {
  border-radius: 50%;
}

.timeline-centered {
  position: relative;
  margin-bottom: 30px;
}

.timeline-centered:before,
.timeline-centered:after {
  content: " ";
  display: table;
}

.timeline-centered:after {
  clear: both;
}

.timeline-centered:before,
.timeline-centered:after {
  content: " ";
  display: table;
}

.timeline-centered:after {
  clear: both;
}

.timeline-centered:before {
  content: "";
  position: absolute;
  display: block;
  width: 4px;
  background: #f5f5f6;
  /*left: 50%;*/
  top: 20px;
  bottom: 20px;
  margin-left: 30px;
}

.timeline-centered .timeline-entry {
  position: relative;
  /*width: 50%;
        float: right;*/
  margin-top: 5px;
  margin-left: 30px;
  margin-bottom: 10px;
  clear: both;
}

.timeline-centered .timeline-entry:before,
.timeline-centered .timeline-entry:after {
  content: " ";
  display: table;
}

.timeline-centered .timeline-entry:after {
  clear: both;
}

.timeline-centered .timeline-entry:before,
.timeline-centered .timeline-entry:after {
  content: " ";
  display: table;
}

.timeline-centered .timeline-entry:after {
  clear: both;
}

.timeline-centered .timeline-entry.start .timeline-entry-inner .timeline-label,
.timeline-centered
  .timeline-entry.finish
  .timeline-entry-inner
  .timeline-label {
  background-color: #fafafa;
}

.timeline-centered
  .timeline-entry.start
  .timeline-entry-inner
  .timeline-label
  h2,
.timeline-centered
  .timeline-entry.finish
  .timeline-entry-inner
  .timeline-label
  h2 {
  color: #a0a0a0;
}

.timeline-centered .timeline-entry.left-aligned {
  float: left;
}

.timeline-centered .timeline-entry.left-aligned .timeline-entry-inner {
  margin-left: 0;
  margin-right: -18px;
}

.timeline-centered
  .timeline-entry.left-aligned
  .timeline-entry-inner
  .timeline-time {
  left: auto;
  right: -100px;
  text-align: left;
}

.timeline-centered
  .timeline-entry.left-aligned
  .timeline-entry-inner
  .timeline-icon {
  float: right;
}

.timeline-centered
  .timeline-entry.left-aligned
  .timeline-entry-inner
  .timeline-label {
  margin-left: 0;
  margin-right: 70px;
}

.timeline-centered
  .timeline-entry.left-aligned
  .timeline-entry-inner
  .timeline-label:after {
  left: auto;
  right: 0;
  margin-left: 0;
  margin-right: -9px;
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.timeline-centered .timeline-entry .timeline-entry-inner {
  position: relative;
  margin-left: -20px;
}

.timeline-centered .timeline-entry .timeline-entry-inner:before,
.timeline-centered .timeline-entry .timeline-entry-inner:after {
  content: " ";
  display: table;
}

.timeline-centered .timeline-entry .timeline-entry-inner:after {
  clear: both;
}

.timeline-centered .timeline-entry .timeline-entry-inner:before,
.timeline-centered .timeline-entry .timeline-entry-inner:after {
  content: " ";
  display: table;
}

.timeline-centered .timeline-entry .timeline-entry-inner:after {
  clear: both;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-time {
  position: absolute;
  left: -100px;
  text-align: right;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-time > span {
  display: block;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-time
  > span:first-child {
  font-size: 15px;
  font-weight: bold;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-time
  > span:last-child {
  font-size: 12px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon {
  background: #fff;
  color: #737881;
  display: block;
  width: 40px;
  height: 40px;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  text-align: center;
  -moz-box-shadow: 0 0 0 5px #f5f5f6;
  -webkit-box-shadow: 0 0 0 5px #f5f5f6;
  box-shadow: 0 0 0 5px #f5f5f6;
  line-height: 40px;
  font-size: 15px;
  float: left;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-icon.bg-primary {
  background-color: #303641;
  color: #fff;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-icon.bg-secondary {
  background-color: #ee4749;
  color: #fff;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-icon.bg-success {
  background-color: #00a651;
  color: #fff;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-icon.bg-info {
  background-color: #21a9e1;
  color: #fff;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-icon.bg-warning {
  background-color: #fad839;
  color: #fff;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-icon.bg-danger {
  background-color: #cc2424;
  color: #fff;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label {
  position: relative;
  background: #f5f5f6;
  padding: 1em;
  margin-left: 60px;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label:after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 9px 9px 9px 0;
  border-color: transparent #f5f5f6 transparent transparent;
  left: 0;
  top: 10px;
  margin-left: -9px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2,
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h3,
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p {
  color: #737881;
  margin: 0;
  font-weight: 800;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p + p {
  margin-top: 15px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 {
  color: black;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h3 {
  color: black;
  margin-bottom: 10px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 a,
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h3 a {
  color: #303641;
}

.timeline-centered
  .timeline-entry
  .timeline-entry-inner
  .timeline-label
  h2
  span {
  -webkit-opacity: 0.6;
  -moz-opacity: 0.6;
  opacity: 0.6;
  -ms-filter: alpha(opacity=60);
  filter: alpha(opacity=60);
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
}

.start .timeline-entry-inner .timeline-label {
  background-color: #ffcdd2 !important;
}

.finish .timeline-entry-inner .timeline-label {
  background-color: #e57373 !important;
}

.timeline-entry-inner .timeline-label {
  background-color: #e1bee7 !important;
}

.timeline-entry-inner .timeline-label.pipeline {
  background-color: #c5cae9 !important;
}
</style>
