if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const o=e=>a(e,i),r={module:{uri:i},exports:t,require:o};s[i]=Promise.all(c.map((e=>r[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/2VQQPoWVkJMx7efh2BiRA/_buildManifest.js",revision:"627c0e8267d72602a274ab9acd3bbe77"},{url:"/_next/static/2VQQPoWVkJMx7efh2BiRA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/bce60fc1-8eec208bad7cefab.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/bce60fc1-8eec208bad7cefab.js.map",revision:"49e0a222a4a44b0a4641f544141ac263"},{url:"/_next/static/chunks/framework-069d08506d2cdc20.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/framework-069d08506d2cdc20.js.map",revision:"14f90ad8444ecb56bb99b9e3ba4b4b29"},{url:"/_next/static/chunks/main-app-258e0efa41934c16.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/main-app-258e0efa41934c16.js.map",revision:"f2c1c3c0c5ca9f7dd737ad560287c995"},{url:"/_next/static/chunks/main-dcfeaeaccb274d87.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/main-dcfeaeaccb274d87.js.map",revision:"e2dea009d85d88ce4b428f456bc68cf3"},{url:"/_next/static/chunks/pages/_app-1ddec70096f308b3.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/pages/_error-ec42f24b6efe35a8.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/pages/_error-ec42f24b6efe35a8.js.map",revision:"43bc7c404dc44524055c46373e1fe65c"},{url:"/_next/static/chunks/pages/add-706a4eadf9f81ebb.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/pages/add-706a4eadf9f81ebb.js.map",revision:"c1c6651ea668591add27203771b11769"},{url:"/_next/static/chunks/pages/index-ad38ea08e46fd4aa.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/pages/index-ad38ea08e46fd4aa.js.map",revision:"44a6e1e4a2773328f561f7d18d738ae3"},{url:"/_next/static/chunks/pages/register-18413a04577b8beb.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/pages/register-18413a04577b8beb.js.map",revision:"ae8b8ee013412d2d002d936fd67de77a"},{url:"/_next/static/chunks/pages/signin-4859e68560b49a62.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/pages/signin-4859e68560b49a62.js.map",revision:"3e67c599c6c9648046a683fc09ebcfe9"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-0001c5ad49e46e70.js",revision:"2VQQPoWVkJMx7efh2BiRA"},{url:"/_next/static/chunks/webpack-0001c5ad49e46e70.js.map",revision:"8c3555d812a3ce3dcbe9b2cc0c96fb43"},{url:"/_next/static/css/65709879a22b6f0a.css",revision:"65709879a22b6f0a"},{url:"/_next/static/css/65709879a22b6f0a.css.map",revision:"f9ef6d5b0b75ad5cb55152c7005fa299"},{url:"/_next/static/css/684d37753127db9f.css",revision:"684d37753127db9f"},{url:"/_next/static/css/684d37753127db9f.css.map",revision:"50e737841f4fa22d2e8da240f45b7b15"},{url:"/_next/static/css/bd3ae97085b0464b.css",revision:"bd3ae97085b0464b"},{url:"/_next/static/css/bd3ae97085b0464b.css.map",revision:"8be8f03058cb6c96f7eaa1432dc08f57"},{url:"/_next/static/css/e6f14b1d1a5d1f93.css",revision:"e6f14b1d1a5d1f93"},{url:"/_next/static/css/e6f14b1d1a5d1f93.css.map",revision:"3ca94f8cb6d18beeb32d6c6851f94a90"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/firebase-messaging-sw.js",revision:"761c93e1927d015f666e033ce30d272d"},{url:"/loading.gif",revision:"5515cf0cf38db64c6fc5a1ef8f223b3a"},{url:"/logo-512.png",revision:"c3739629a1b4f1d4ed3501b0d6600e69"},{url:"/logo-96.png",revision:"9a26a2a69c3178187b4a02d3fb3a1bd4"},{url:"/logos/maskable_icon_x128.png",revision:"5e3c53d7dbc07fc076cf01234253b5d8"},{url:"/logos/maskable_icon_x192.png",revision:"72154bc8e6ce8d2395d3192749a3f23c"},{url:"/logos/maskable_icon_x384.png",revision:"f4e1e74fad36a2b06b62cc48bfdba051"},{url:"/logos/maskable_icon_x48.png",revision:"4b892b60ccaf632db60bfb1e5488c529"},{url:"/logos/maskable_icon_x512.png",revision:"6d3a54e16096482663438de3d120e14a"},{url:"/logos/maskable_icon_x72.png",revision:"64b4ff607a43d7c5c5791d745ed8f8a9"},{url:"/logos/maskable_icon_x96.png",revision:"368b165d011072818f1d4d2f88c835b0"},{url:"/manifest.json",revision:"007518d584cfd96080d02f1430bab3c5"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
