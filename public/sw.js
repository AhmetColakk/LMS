if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, p) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let l = {};
    const d = e => a(e, c),
      n = { module: { uri: c }, exports: l, require: d };
    s[c] = Promise.all(i.map(e => n[e] || d(e))).then(e => (p(...e), l));
  };
}
define(['./workbox-d249b2c8'], function (e) {
  'use strict';
  self.addEventListener('message', e => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: 'favicon.ico', revision: 'c92b85a5b907c70211f4ec25e29a8c4a' },
        { url: 'icon.png', revision: '541f2e6a0d74e7ebbb186905a6d924ea' },
        { url: 'icon1.png', revision: '7589677eb7e110679307633f68ce5f00' },
        {
          url: 'icons/apple-icon-180.png',
          revision: 'bd0a89dda80296ea9a81ddd41ba07fe4',
        },
        {
          url: 'icons/apple-splash-1125-2436.jpg',
          revision: '8f41a7486392e9b6e2ba9799c449368e',
        },
        {
          url: 'icons/apple-splash-1136-640.jpg',
          revision: 'fd04f746042a10d096792b92dafa8e30',
        },
        {
          url: 'icons/apple-splash-1170-2532.jpg',
          revision: '43043703de4448d8eab31ac757f93af4',
        },
        {
          url: 'icons/apple-splash-1179-2556.jpg',
          revision: 'c1147042ca2f971a58a12cef9123aefb',
        },
        {
          url: 'icons/apple-splash-1242-2208.jpg',
          revision: '780b369a5e472a037c23c4c6d7d6a312',
        },
        {
          url: 'icons/apple-splash-1242-2688.jpg',
          revision: '63b7a10f77c4e48417abd2899ff1a33a',
        },
        {
          url: 'icons/apple-splash-1284-2778.jpg',
          revision: 'ba4bb0dc9a6767b9389c38356fe4273f',
        },
        {
          url: 'icons/apple-splash-1290-2796.jpg',
          revision: 'd9979a30e51dd3792d5d77c505ae1a2a',
        },
        {
          url: 'icons/apple-splash-1334-750.jpg',
          revision: '2d40ca4006e02d357b764a9366081d88',
        },
        {
          url: 'icons/apple-splash-1536-2048.jpg',
          revision: 'cd575d7b7d038a32e4fda5d8f5281b96',
        },
        {
          url: 'icons/apple-splash-1620-2160.jpg',
          revision: '4a9441e43c2c17a802d21dc933a054c4',
        },
        {
          url: 'icons/apple-splash-1668-2224.jpg',
          revision: '6ddad6ff51902141d144dc2c3fed2ab3',
        },
        {
          url: 'icons/apple-splash-1668-2388.jpg',
          revision: 'ff1137c0f8de6509172bdd53e6842c42',
        },
        {
          url: 'icons/apple-splash-1792-828.jpg',
          revision: '84ed6d0210fbd7c8529335b35451bea2',
        },
        {
          url: 'icons/apple-splash-2048-1536.jpg',
          revision: 'd5064d0d53c6e53bcc9b30a6a5e6c5a7',
        },
        {
          url: 'icons/apple-splash-2048-2732.jpg',
          revision: '203b68130e90f4b90c15e1370264df51',
        },
        {
          url: 'icons/apple-splash-2160-1620.jpg',
          revision: '6ed4a958492331915d63d0fda3f804a0',
        },
        {
          url: 'icons/apple-splash-2208-1242.jpg',
          revision: '2a1220b1ae135e42d6d560ac6ea65405',
        },
        {
          url: 'icons/apple-splash-2224-1668.jpg',
          revision: 'ebfcfd47dfd4466dffc86bc793958400',
        },
        {
          url: 'icons/apple-splash-2388-1668.jpg',
          revision: 'ecb96df31057367b3ee6589d9dc0dc69',
        },
        {
          url: 'icons/apple-splash-2436-1125.jpg',
          revision: '74d2df8ea98f8830c674828e4bdc54c2',
        },
        {
          url: 'icons/apple-splash-2532-1170.jpg',
          revision: '82f984113f5e3528c14e337731dba222',
        },
        {
          url: 'icons/apple-splash-2556-1179.jpg',
          revision: '7dc9a948e1dbbfa05952545830ce328c',
        },
        {
          url: 'icons/apple-splash-2688-1242.jpg',
          revision: '27c8918569b3d6b32a91f66199fdbb55',
        },
        {
          url: 'icons/apple-splash-2732-2048.jpg',
          revision: '98823d0d698d9f1a76f980edc54fd491',
        },
        {
          url: 'icons/apple-splash-2778-1284.jpg',
          revision: 'ab2e1c5320ae12d6adeda6368fba5c8a',
        },
        {
          url: 'icons/apple-splash-2796-1290.jpg',
          revision: '2872eff142b7f20bc85bbca78862f93b',
        },
        {
          url: 'icons/apple-splash-640-1136.jpg',
          revision: '037dc5d59518267390941497ac257af5',
        },
        {
          url: 'icons/apple-splash-750-1334.jpg',
          revision: 'eda76f042d8afd3cd667e6c5d78248f3',
        },
        {
          url: 'icons/apple-splash-828-1792.jpg',
          revision: 'e073a3d3795252fc8aca6558398411f1',
        },
        {
          url: 'icons/manifest-icon-192.maskable.png',
          revision: '0c62d52b7ac24ad5359c4ed08da3bbf4',
        },
        {
          url: 'icons/manifest-icon-512.maskable.png',
          revision: 'acee881d89ce2be9ecabeff41d856110',
        },
        { url: 'index.html', revision: '16695675a525935916e796f7348be5a0' },
        { url: 'login.jpg', revision: '907698973783f31996bd6ce770b5127b' },
        { url: 'manifest.json', revision: '9c4553a3bae16217c0017d7d7f6d951b' },
        { url: 'robots.txt', revision: 'fa1ded1ed7c11438a9b0385b1e112850' },
        { url: 'vite.svg', revision: '8e3a10e157f75ada21ab742c022d5430' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    );
});
//# sourceMappingURL=sw.js.map
