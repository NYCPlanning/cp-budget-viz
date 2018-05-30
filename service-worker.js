/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';




importScripts("scripts/sw/sw-toolbox.js","scripts/sw/runtime-caching.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["financing_hudson_yards.html","86c62102822969b90db8071608458211"],["financing_municipal_water.html","c2d4b4712198e192235058edf814705d"],["financing_nycgob.html","4dd70cf88cfa9030daa3e0a87ebf6d4f"],["financing_program.html","bc393711b17486751050e5a28a693869"],["financing_transitional_finance_authority.html","6a386c6799e8cc17643ec065ddf15d74"],["financing_variableratedebt.html","de8b3ac3af71d5bd536e4df786dd58a0"],["images/CUNY002_nocaption.jpg","7930da2b80ebd9665f23a1786e1050da"],["images/download-icon.svg","a56d45efd763ae5e39a1937170c3324c"],["images/improve-buildings.jpg","6749b69b8cbf2b111b2edf38df26d4a7"],["images/improve-ferries.jpg","562763950f23c198ec188d5143f1ad92"],["images/improve-parks.jpg","2dc6662fa5b7a6c7feef8e9bd041e0b9"],["images/improve-paths.jpg","c52e5c1b075bcd5bbccbba305c7d0a19"],["images/improve-schools.jpg","2e7f40240270e997fff108a9d56dd01d"],["images/improve-shelters.jpg","339539984c98e09d506f26bcf020ddd6"],["images/jpgs/priority1.jpg","b548f0b36a2b35c7db07727dda3b8ca3"],["images/jpgs/priority2.jpg","e0b160722048b7f1365944ec3a4156a7"],["images/jpgs/priority4.jpg","01b8fd227edc15e8c8e48c6a49ab3cad"],["images/jpgs/priority5.jpg","732adb47d16ee3071a30087bf7b12787"],["images/jpgs/priority6.jpg","7b15c1c37b02a2f68aeee03c2bd27bfe"],["images/maps/Blue1.jpg","bdba85b07caf494ad2f3787b2bcc6a02"],["images/maps/Blue2.jpg","5370fbe1f539483f36c64c264e9bdc0a"],["images/maps/Blue3.jpg","379b234e83ff88f9a99e880f239223c2"],["images/maps/Blue4.jpg","59caa4ea55dd2ff6e145faf0ae3237d9"],["images/maps/FloodPlain_Blue.png","b93629be26e390b87d4364e794c1bd89"],["images/maps/FloodPlain_Green.png","199173e2bed64d9e7349f7b1caad0596"],["images/maps/Green1.jpg","c06eeb16a4b495e5d79e3a4069862e8d"],["images/maps/Green1.png","2d8bf69182bb714b7585f5a0cb1151d0"],["images/maps/Green2.jpg","88d3f989ae008088dcfcf1d6b359b25f"],["images/maps/Green2.png","48e18fcaff80363313d9e967252fbcb8"],["images/maps/Green3.jpg","a5dccc35464d7da9689a1a3dfdec19e9"],["images/maps/Green3.png","2210348ea394655e6280adaab0fb95b9"],["images/maps/Green4.jpg","a7449aab92c84303bb559168b1b39aab"],["images/maps/Green4.png","f28db34e9c6954e83ee848070dff3e7e"],["images/maps/Grey.jpg","e08095cb78cb46ae88907a66fe79e910"],["images/maps/NTAPovertyRates_Blue.png","52aaad1d2e6c1743923a917952fad73a"],["images/maps/NTAPovertyRates_Green.png","7bebd989a634b8933a853f5f5bf8fc83"],["images/maps/Parks.jpg","70691ba74abe431323c04dabdd975a23"],["images/maps/PopJobs_Blue.png","768c71fb33b71a56070adc6cc4c6af98"],["images/maps/PopJobs_Green.png","c6ebeeb9b6bedc18235a5890959f9179"],["images/nyc-background.jpg","6db2273cd28e171a2cc3a066fe3ef545"],["images/pngs/NYC-logo-white.png","2f4d4e6bd3357a539f8d362f72d85900"],["images/pngs/Seal_of_New_York_City_BW.png","13552dd3e68dd63c8a9b2de9ee74f4c8"],["images/pngs/nyc-seal.png","53b76beda6d87b5f576db1e959f4ab14"],["images/pngs/white-triangle.png","e226099ca9391b0ac101b76960fec63c"],["images/touch/apple-touch-icon.png","7326f54bfe6776293f08b34c3a5fde7b"],["images/touch/chrome-touch-icon-192x192.png","571f134f59f14a6d298ddd66c015b293"],["images/touch/icon-128x128.png","7c46d686765c49b813ac5eb34fabf712"],["images/touch/ms-touch-icon-144x144-precomposed.png","452d90b250d6f41a0c8f9db729113ffd"],["index.html","2f8529b7bf5c93f025f458b2cefaa443"],["index_backup.html","f5b1f727e61630044ba51f061c20fa1f"],["manifest.json","30d402e280a04e6fe03b32da34c70890"],["principle_advance_neighborhood_based_capital_planning.html","a1afa3d07dc5e8d66ad126f1591d44f9"],["principle_coastal_flood_impact.html","95bbf52c284ceb2ac1225ec69ef8fc2f"],["principle_maintain_new_york_citys_financial_responsibility.html","5247f652487e26dd02bb7e37da83e57a"],["principle_neighborhood_poverty_rates.html","5c80f0c570c33895108878679a1e54db"],["principle_projected_population_growth.html","08e085ea50310618de7a9ee1593f7932"],["priority_build_stronger_connections_between_our_communities.html","9b603790fe7876ef733ed31b8a65d71e"],["priority_expand_access_to_education_and_economic_opportunity.html","a093465cbb3883f2835a65b4133a8687"],["priority_maintain_our_infrastructure.html","194ede3049bdb6af1ce6b78736c57cae"],["priority_promote_the_health_and_safety_of_all_new_yorkers.html","d984199338abfcbedfbad6fff828e206"],["priority_revitalize_and_protect_our_waterfront_across_all_five_boroughs.html","04e4ee35ef7d2b463304f1bc3cd111a9"],["priority_support_growth_and_preserve_affordability.html","3ab9740b60460f709f324f62081e09b5"],["scripts/main.js","9033e4e1bc2280134ae8aeec0b73c641"],["scripts/sw/runtime-caching.js","e3e34dcb62b5d62453b9215961585488"],["scripts/sw/sw-toolbox.js","2770efb889cc10c4de88d0b746c2a13c"],["styles/main.css","89d5115a0224e0a7c9e5710dbc161cc9"],["transportation_bridges.html","f17b984eeb27d59d5bc3889ef243f5a2"],["transportation_equipment.html","25d805dd5cc65df9b588612ddc62d575"],["transportation_ferries.html","8b986f977abad4eceb46915d8deb71ca"],["transportation_highways.html","1bdcbc24c3e1cbb119aaf9b2ca7912e2"],["transportation_overview.html","83d9be4e840ab93c8f6707602f672d29"],["transportation_traffic.html","9ed0ce8ae88633b057406519f13b1997"],["transportation_transit_authority.html","df80c4dfcc9825760ab38a5aa3d6ea06"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-web-starter-kit-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




