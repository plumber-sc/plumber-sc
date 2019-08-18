<template>
   <div class="alert alert-danger" role="danger">
      <h4 class="alert-heading">Hold on...</h4>
      <p>
         It looks like Sitecore Commerce Engine cannot be reached on this url:
         <code>{{config.EngineUri}}</code>
      </p>
      <hr />
      <h5>
         If your Sitecore Commerce Engine is not at
         <code>{{config.EngineUri}}</code>...
      </h5>
      <p>
         You can change the url for Commerce Engine using the
         <b-link v-b-modal.settingsModal variant="danger">settings</b-link>&nbsp;in the upper right corner.
      </p>
      <h5>If you didn`t configure Sitecore Commerce Engine to recognize Plumber...</h5>
      <p>
         To configure your engine to allow Plumber to connect to it, you add it as an allowed origin. Open
         <code>config.json</code>
         in the wwwroot folder of your commerce engine and add the url of
         Plumber (
         <code>{{plumberUri}}</code>) to the AllowedOrigins section. It should look something like this:
         <b-card>
            <pre><code>
"AllowedOrigins": [
   "https://localhost:4200",
   "http://localhost:4200",
   <b>"{{plumberUri}}"</b>
],
         </code></pre>
         </b-card>
      </p>
      <p>
         <a
            href="https://github.com/plumber-sc/plumber-sc#configuring-plumber"
         >Click here for more information on how to configure Plumber</a>
      </p>
   </div>
</template>

<script>
export default {
   props: ["config", "plumberUri"],
   computed: {
      formattedError: function() {
         return this.error.replace(/(\r\n|\n|\r)/gm, "<br/>");
      }
   }
};
</script>
