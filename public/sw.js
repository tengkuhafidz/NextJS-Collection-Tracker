if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,a,t)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const i={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return n;case"module":return i;default:return e(s)}}))).then((e=>{const s=t(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-a8b10d99"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/164.c0800bcabdd683b6ec8d.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/578.5d370a2c4cae532a5fe2.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/760-2fd623da76b9d5387c4f.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/773-b3932053980f33ab795d.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/c0d53ec4-ed4405b0ee1ecc0c5eb2.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/commons-38e5b444304bfd9e1a40.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/framework-a1d98d5ef6c5e3e412b4.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/main-be73121c763e8ac4a6fa.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/pages/_app-87fe1c3e5a29f99cedf1.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/pages/_error-1401cd261d162a718272.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/pages/form-dab362080ae8e2c1159b.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/pages/index-0238891227665b288169.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/pages/login-98bf334aaf8cbab48db9.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/pages/success-884f7cee7e9c5e7e97cb.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/polyfills-3d2c0f0875171918a758.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/chunks/webpack-3a0e916ecdf67f99ebd1.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/css/77030b8de461736e558c.css",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/css/b1b89a4e32de864c7140.css",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/eEz2ojFkbfHxEhZg63Xaq/_buildManifest.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/_next/static/eEz2ojFkbfHxEhZg63Xaq/_ssgManifest.js",revision:"eEz2ojFkbfHxEhZg63Xaq"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/nafas-appicon.png",revision:"4d5cbb3dc7d0b96d4ef7311f154b6c4d"},{url:"/nafas-logo.png",revision:"fbdd8c7d6e3ff6252507363642a749c0"},{url:"/photo.png",revision:"888634756799500845a2898d62843f57"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
