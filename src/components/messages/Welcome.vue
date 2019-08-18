<template>
   <div class="jumbotron">
      <h1 class="display-5">
         Welcome to Plumber Configuration Viewer
         <br />for Sitecore Commerce
      </h1>
      <p
         class="lead"
      >Checking what happens in Sitecore Commerce can sometimes be a bit complicated. This tool will give you insight into how the pipelines are configured, which blocks are used and how the policies are configured per environment.</p>
      <hr class="my-4" />
      <p>
         Plumber connects directly to your Sitecore Commerce Engine instance and doesn't need to be (but can be)
         installed on a server:
         <a
            href="https://github.com/plumber-sc/plumber-sc#installing-plumber-locally"
         >Installing Plumber on your own server</a>
      </p>

      <h5>To start using Plumber, follow these 3 steps:</h5>
      <div class="todo">
         <h3>1. Configure Identity Server</h3>
         <p>
            How to configure Identity Server, depends on the version of Sitecore Commerce you are using.
            Click one of the buttons below to see the configuration for that version:
         </p>

         <p>
            <b-button v-b-toggle.collapse-sc90 variant="danger">Sitecore Commerce 9.0</b-button>&nbsp;
            <b-button v-b-toggle.collapse-sc91 variant="danger">Sitecore Commerce 9.1 or higher</b-button>
         </p>
         <div role="tablist">
            <p>
               <b-collapse id="collapse-sc90">
                  <b-card
                     title="Configuration for Sitecore Identity Server on Sitecore Commerce 9.0"
                  >
                     <p>
                        You can find Identity Server's configuration in the
                        <code>appsettings.json</code> file in the wwwroot folder of Sitecore Identity Server.
                        Open the file and add the following to the
                        <code>Clients</code> section:
                     </p>
                     <pre><code>
         {
         "ClientId": "Plumber",
         "ClientName": "Plumber",
         "AccessTokenType": 0,
         "AccessTokenLifetimeInSeconds": 3600,
         "IdentityTokenLifetimeInSeconds": 3600,
         "AllowAccessTokensViaBrowser": true,
         "RequireConsent": false,
         "RequireClientSecret": false,
         "AllowedGrantTypes": [
         "implicit"
         ],
         "RedirectUris": [
         <b>"{{plumberUri}}"</b>
         ],
         "PostLogoutRedirectUris": [
         "{{plumberUri}}"
         ],
         "AllowedCorsOrigins": [
         "{{plumberUri}}"
         ],
         "AllowedScopes": [
         "openid",
         "dataEventRecords",
         "dataeventrecordsscope",
         "securedFiles",
         "securedfilesscope",
         "role",
         "EngineAPI"
         ]
         },
      </code></pre>
                  </b-card>
               </b-collapse>
            </p>
            <p>
               <b-collapse id="collapse-sc91">
                  <b-card
                     title="Configuration for Sitecore Identity Server on Sitecore Commerce 9.1 or higher"
                  >
                     <p>
                        In Sitecore 9.1, Identity Server is used for the whole platform. This brought about a change in the configuration file going from JSON to XML.
                        You can find Identity Server's configuration in the
                        <code>\Config\production</code> folder where Sitecore Identity Server was installed.
                     </p>
                     <p>
                        Create a new file in this folder called
                        <code>Plumber.IdentityServer.Host.xml</code> and paste the the following xml:
                     </p>
                     <pre><code>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;Settings&gt;
  &lt;Sitecore&gt;
    &lt;IdentityServer&gt;
      &lt;Clients&gt;
        &lt;PlumberClient&gt;
          &lt;ClientId&gt;Plumber&lt;/ClientId&gt;
          &lt;ClientName&gt;Plumber&lt;/ClientName&gt;
          &lt;AccessTokenType&gt;0&lt;/AccessTokenType&gt;
          &lt;AllowOfflineAccess&gt;true&lt;/AllowOfflineAccess&gt;
          &lt;AlwaysIncludeUserClaimsInIdToken&gt;false&lt;/AlwaysIncludeUserClaimsInIdToken&gt;
          &lt;AccessTokenLifetimeInSeconds&gt;3600&lt;/AccessTokenLifetimeInSeconds&gt;
          &lt;IdentityTokenLifetimeInSeconds&gt;3600&lt;/IdentityTokenLifetimeInSeconds&gt;
          &lt;AllowAccessTokensViaBrowser&gt;true&lt;/AllowAccessTokensViaBrowser&gt;
          &lt;RequireConsent&gt;false&lt;/RequireConsent&gt;
          &lt;RequireClientSecret&gt;false&lt;/RequireClientSecret&gt;
          &lt;AllowedGrantTypes&gt;
            &lt;AllowedGrantType1&gt;implicit&lt;/AllowedGrantType1&gt;
          &lt;/AllowedGrantTypes&gt;
          &lt;RedirectUris&gt;
            &lt;RedirectUri1&gt;{AllowedCorsOrigin}/auth/callback&lt;/RedirectUri1&gt;
          &lt;/RedirectUris&gt;
          &lt;PostLogoutRedirectUris&gt;
            &lt;PostLogoutRedirectUri1&gt;{AllowedCorsOrigin}&lt;/PostLogoutRedirectUri1&gt;
          &lt;/PostLogoutRedirectUris&gt;
          &lt;AllowedCorsOrigins&gt;
            &lt;AllowedCorsOrigins1&gt;{{plumberUri}}&lt;/AllowedCorsOrigins1&gt;
          &lt;/AllowedCorsOrigins&gt;
          &lt;AllowedScopes&gt;
            &lt;AllowedScope1&gt;openid&lt;/AllowedScope1&gt;
            &lt;AllowedScope2&gt;EngineAPI&lt;/AllowedScope2&gt;
            &lt;AllowedScope3&gt;postman_api&lt;/AllowedScope3&gt;
          &lt;/AllowedScopes&gt;
          &lt;UpdateAccessTokenClaimsOnRefresh&gt;true&lt;/UpdateAccessTokenClaimsOnRefresh&gt;
        &lt;/PlumberClient&gt;
      &lt;/Clients&gt;
    &lt;/IdentityServer&gt;
  &lt;/Sitecore&gt;
&lt;/Settings&gt;
      </code></pre>
                  </b-card>
               </b-collapse>
            </p>
         </div>
      </div>
      <div class="todo">
         <h3>2. Configure Commerce Engine</h3>
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
      </div>
      <div class="todo">
         <h3>3. Configure Plumber</h3>
         <p>
            Configure Plumber by specifying that Plumber can use to reach the engine and identity server on.
            Click the button below to open the settings dialog and configure these settings:
         </p>
         <p>
            <b-button v-b-modal.settingsModal variant="danger">Configure Plumber</b-button>
         </p>
      </div>
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
      isHostedInstall: function() {
         return window.location.hostname == "vwr.plumber-sc.com";
      }
   }
};
</script>

<style>
.todo {
   margin-left: 12px;
}

.display-5 {
   font-weight: 300;
   font-size: 3rem;
}
</style>
