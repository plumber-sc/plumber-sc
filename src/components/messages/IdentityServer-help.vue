<template>
   <div class="alert alert-danger" role="danger">
      <h4 class="alert-heading">Oops...</h4>
      <p>
         It looks like Sitecore Identity Server cannot be reached on this url:
         <code>{{config.IdentityServerUri}}</code>
      </p>
      <hr />
      <h5>
         If your Sitecore Identity Server is not at
         <code>{{config.IdentityServerUri}}</code>...
      </h5>
      <p>
         You can change the url for Identity Server using the
         <b-link v-b-modal.settingsModal variant="danger">settings</b-link>&nbsp;in the upper right corner.
      </p>
      <h5>If you didn`t configure Sitecore Identity Server to recognize Plumber...</h5>
      <p>
         Make sure you have configured Identity Server to recognize Plumber. How you configure Identity Server depends
         on the version of Sitecore Commerce you are using. Click the button below for your version to see the configuration:
      </p>
      <p>
         <b-button v-b-toggle.collapse-sc90 variant="danger">Sitecore Commerce 9.0</b-button>&nbsp;
         <b-button v-b-toggle.collapse-sc91 variant="danger">Sitecore Commerce 9.1 or higher</b-button>
      </p>
      <div role="tablist">
         <p>
            <b-collapse id="collapse-sc90">
               <b-card title="Configuration for Sitecore Identity Server on Sitecore Commerce 9.0">
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
         <p>
            <a
               href="https://github.com/plumber-sc/plumber-sc#configuring-plumber"
            >Click here for more information on how to configure Plumber</a>
         </p>
      </div>
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
