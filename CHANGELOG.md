# [1.26.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.25.0...v1.26.0) (2022-06-23)



# [1.25.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.24.0...v1.25.0) (2021-10-05)


### Features

* **navigation:** add shopify link to bottom nav bar ([240454e](https://github.com/SLB-Pizza/radio-pizza/commit/240454ea20ff1fa2bc801cb2109c92222b4f8253))



# [1.24.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.23.5...v1.24.0) (2021-09-30)



## [1.23.5](https://github.com/SLB-Pizza/radio-pizza/compare/v1.23.4...v1.23.5) (2021-09-30)


### Bug Fixes

* **/editorial:** change editorialsPerPage from 12 to 6; relabel variables from features to editorials ([9ef4297](https://github.com/SLB-Pizza/radio-pizza/commit/9ef42975b711c27350fa44304078461e1f0ae50d))



## [1.23.4](https://github.com/SLB-Pizza/radio-pizza/compare/v1.23.3...v1.23.4) (2021-09-29)


### Bug Fixes

* **/editorial:** remove highlightEditorial processing; editorialUID filtering ([cd8c818](https://github.com/SLB-Pizza/radio-pizza/commit/cd8c8185121be0e29b05ed19dc2aa1944caf4bc4))



## [1.23.3](https://github.com/SLB-Pizza/radio-pizza/compare/v1.23.2...v1.23.3) (2021-07-03)



## [1.23.2](https://github.com/SLB-Pizza/radio-pizza/compare/v1.23.1...v1.23.2) (2021-07-02)



## [1.23.1](https://github.com/SLB-Pizza/radio-pizza/compare/v1.23.0...v1.23.1) (2021-07-02)



# [1.23.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.22.0...v1.23.0) (2021-06-28)


### Bug Fixes

* **/editorial:** change number loaded from 6 to 12 ([66b6f20](https://github.com/SLB-Pizza/radio-pizza/commit/66b6f20a24ba9537a18dd5bbcbe95d525a6fcbae))



# [1.22.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.21.0...v1.22.0) (2021-06-26)


### Features

* **/editorial:** add case to create highlights from allFeatures ([5d35168](https://github.com/SLB-Pizza/radio-pizza/commit/5d35168d597c59a533c7ee5c54e8a2e5f7b22e95))
* **/editorial:** adjust editorial fetch based on filter presence ([5ee5c7d](https://github.com/SLB-Pizza/radio-pizza/commit/5ee5c7d7b75ce91ca7bd1933f50d697321774774))


### Reverts

* Revert "refactor(utils): remove getUIDsFromDataArray" ([89f9198](https://github.com/SLB-Pizza/radio-pizza/commit/89f9198bfff1094801401ebfe64f56e85fb62953))



# [1.21.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.20.0...v1.21.0) (2021-06-17)


### Bug Fixes

* **/schedule:** change static 'EST' to derived user timezone ([099825c](https://github.com/SLB-Pizza/radio-pizza/commit/099825cf5b6222e813b81cabda6a9109e6669543))
* **fetchStreamStatus:** remove explicit GET and CORS ([7ade07c](https://github.com/SLB-Pizza/radio-pizza/commit/7ade07c22669ab563b8115d0bca6acae7cd3b753))
* **helmetTitling:** add case where both liveShow title and guests exist ([d9c1c06](https://github.com/SLB-Pizza/radio-pizza/commit/d9c1c0614ac7e321effad5a6ccf19416d0b6701c))


### Features

* **siteTitle:** write helper Helmet function to get site title ([ea6664e](https://github.com/SLB-Pizza/radio-pizza/commit/ea6664e7f9e9ffbd16da0aaca61a62910b977a02))



# [1.20.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.19.0...v1.20.0) (2021-06-15)


### Bug Fixes

* **fetchStreamStatus:** add more and method to fetch ([f97b442](https://github.com/SLB-Pizza/radio-pizza/commit/f97b44267fc4f3e7211b89e5785f6566b98f6696))
* **GCP:** remove context debug log ([bf0806a](https://github.com/SLB-Pizza/radio-pizza/commit/bf0806a42bff1466ece7adc0d2bf1b89fe7dcd07))
* **LiveInfo:** address bug where blank liveTitle and liveGuests could be submitted ([c134733](https://github.com/SLB-Pizza/radio-pizza/commit/c1347335872a79df862183b4f97153926274565c))
* **LiveRadioPlayButton:** extract button to component ([0d5e258](https://github.com/SLB-Pizza/radio-pizza/commit/0d5e25835c4e21af89db2afa4e1b4b278eb362ac))
* **LiveRadioPlayButton:** fix handlePlayPause ([dd6de81](https://github.com/SLB-Pizza/radio-pizza/commit/dd6de81e4c440d596cc5ecab767b48e0024559d5))
* **Marquee:** move LiveMarkerAndText to RadioPlayer ([971b41c](https://github.com/SLB-Pizza/radio-pizza/commit/971b41c1bca758dde8abb87d2675756bb3e125c0))
* **RadioPlayerPlayBtn:** address playingRadio toggle ([3fdfd50](https://github.com/SLB-Pizza/radio-pizza/commit/3fdfd50568f0a2d4016907b1fb5a1bd69e8de697))


### Features

* **live-light:** add LiveMarkerAndText to LiveBroadcastInfoDisplay ([33edb6e](https://github.com/SLB-Pizza/radio-pizza/commit/33edb6edaa8e0117e4d1b4ad7b68d8ac93ea2f9e))



# [1.19.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.18.1...v1.19.0) (2021-06-11)


### Bug Fixes

* **RadioBar:** remove setInitialSource useEffect ([eca3c96](https://github.com/SLB-Pizza/radio-pizza/commit/eca3c9691c9a986bce395cb4c86c51f4137cedc7))
* **RadioPlayer:** default mix no longer required ([4be653f](https://github.com/SLB-Pizza/radio-pizza/commit/4be653fd94cd052473e9104bb4a07f1df4767bc6))


### Features

* **RadioPlayer:** remove mandatory default mix ([560932f](https://github.com/SLB-Pizza/radio-pizza/commit/560932f0b0c3a27becad08cb6b8d8bf9c949de01))
* **util:** extract defaultMix processing to util func ([d075ba1](https://github.com/SLB-Pizza/radio-pizza/commit/d075ba19cd4c7fb8dd433198464913bf37bc8253))



## [1.18.1](https://github.com/SLB-Pizza/radio-pizza/compare/v1.18.0...v1.18.1) (2021-05-09)


### Features

* **AboutCredits:** add mailto link to my name on /about ([6099663](https://github.com/SLB-Pizza/radio-pizza/commit/6099663a61fdaeb5513f484baee8cf2f5d7740ab))



# [1.18.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.17.2...v1.18.0) (2021-05-07)


### Bug Fixes

* **full-schedule:** change loading state render to work off `fetchComplete` ([bfa9646](https://github.com/SLB-Pizza/radio-pizza/commit/bfa96464f1d7f05983d5f3056f778ed8261aa9d6))
* **HomeMixes:** correct setState function name ([67d8900](https://github.com/SLB-Pizza/radio-pizza/commit/67d8900179e52afe20d5d3c584fb55a4856c43a5))


### Features

* **AdminHeader:** add link `/guides` home based on `isAdminGuide` ([da2ea30](https://github.com/SLB-Pizza/radio-pizza/commit/da2ea304ab9404e6b7112dff17b5a68fc3cd712f))
* **BottomNav:** add Facebook icons to desktop and touch layouts ([050fcb9](https://github.com/SLB-Pizza/radio-pizza/commit/050fcb99cecdf8ad7e7301bee50bf041cae969de))



## [1.17.2](https://github.com/SLB-Pizza/radio-pizza/compare/v1.17.1...v1.17.2) (2021-05-06)



## [1.17.1](https://github.com/SLB-Pizza/radio-pizza/compare/v1.17.0...v1.17.1) (2021-05-06)



# [1.17.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.16.2...v1.17.0) (2021-05-06)


### Bug Fixes

* **/editorial:** update query params; editorial highlight processing ([bfab8aa](https://github.com/SLB-Pizza/radio-pizza/commit/bfab8aa396ade636244f4de8b446fc38714aa20c))
* **Hero:** address case where `slides` is null or has no length ([d726ae9](https://github.com/SLB-Pizza/radio-pizza/commit/d726ae9b3a8b455babb5254ef93b0bf15543b04a))
* **HomePage:** update Prismic JSON schema ([11575de](https://github.com/SLB-Pizza/radio-pizza/commit/11575de8c8d8775e496f8f742b17e92622140908))
* **HomePage:** update Prismic JSON schema ([dad6062](https://github.com/SLB-Pizza/radio-pizza/commit/dad606252295e67a3d5231951c60116ac1d890a4))
* **LPFetchAndLoad:** add missing `scrollToTop` import ([e038585](https://github.com/SLB-Pizza/radio-pizza/commit/e03858574f231012aa5102ff0d4c7e1ae21de22d))
* **PlayOverlay:** address case where mix has no img ([5607c60](https://github.com/SLB-Pizza/radio-pizza/commit/5607c60fbb4d2357fd1788390fd3add6cc073a96))
* **SlideGen:** add ResponsiveImage ([776d330](https://github.com/SLB-Pizza/radio-pizza/commit/776d330a8b638c7bfd43090b3b01d13b306b07a9))


### Features

* **Helmet:** add Ears to the concrete to each page ([40c7a14](https://github.com/SLB-Pizza/radio-pizza/commit/40c7a1465a188402cfff61f60de00f47e1d99ba6))
* **Player:** add base mix image toggle logic ([997dde5](https://github.com/SLB-Pizza/radio-pizza/commit/997dde50d4138006fbf8a433e826d389e87896cd))
* **RadioPlayer:** remove mix image when radio is playing live ([917c5ad](https://github.com/SLB-Pizza/radio-pizza/commit/917c5add0a344437a46b971d4e7bba7cc8fddbfa))
* **scheduling:** add social media links to fallback components ([6efb729](https://github.com/SLB-Pizza/radio-pizza/commit/6efb7297bc87278661fef2c4f50cc5bda30b4d42))



## [1.16.2](https://github.com/SLB-Pizza/radio-pizza/compare/v1.16.1...v1.16.2) (2021-05-06)


### Bug Fixes

* **/editorial:** address case where there are no selected editorials to filter out ([f8df0fd](https://github.com/SLB-Pizza/radio-pizza/commit/f8df0fd3e7ee4887e38a8c363a88d83132a4df40))
* **/editorial:** remove bad landing page headers from query ([7c002eb](https://github.com/SLB-Pizza/radio-pizza/commit/7c002ebe10faed6034f4d74506937e3ed9ecab1e))
* **siteUrl:** update to live halfmoonbk site URL ([1fcdf12](https://github.com/SLB-Pizza/radio-pizza/commit/1fcdf12145fab62bc2de2defce195073f0df5c0d))



## [1.16.1](https://github.com/SLB-Pizza/radio-pizza/compare/v1.16.0...v1.16.1) (2021-05-06)


### Bug Fixes

* **gatsby-config:** remove `gatsby-source-filesystem` ref to `/img` ([06ccf1f](https://github.com/SLB-Pizza/radio-pizza/commit/06ccf1f4d6dfc6b243f6e69f3fc1df4b9121d640))
* **HomeFeatures:** address case where Homepage selected Editorials is 0/null ([47284fc](https://github.com/SLB-Pizza/radio-pizza/commit/47284fc844699c0441a47773ef2ca019450a00cf))
* **HomeMixes:** address case where Homepage selected Sound Selects is 0/null ([086abac](https://github.com/SLB-Pizza/radio-pizza/commit/086abac443371e293fb1ba49d7604c127b94bf86))
* **Landings:** update Radio; Schedule header text ([49321cb](https://github.com/SLB-Pizza/radio-pizza/commit/49321cb926ce72674be8b36ffda8541a9b82a3cf))



# [1.16.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.15.0...v1.16.0) (2021-05-05)


### Bug Fixes

* **/netlify-status:** remove pointless fetching ternary ([05ac3b8](https://github.com/SLB-Pizza/radio-pizza/commit/05ac3b8a0e24be14eb085964cd8058d39249463a))
* **GCP:** change react-player volume - .65 > .85 ([4b29c26](https://github.com/SLB-Pizza/radio-pizza/commit/4b29c26cef211fc9d3a258d14d9786793a7da0ce))
* **ResponsiveImage:** change `data-lowsrc` to `src` per lazysizes spec ([c87d5c3](https://github.com/SLB-Pizza/radio-pizza/commit/c87d5c3ae063ae592b3b35105a5a388d63c2b67d))


### Features

* **/mix-help:** add base Mix help page ([4611724](https://github.com/SLB-Pizza/radio-pizza/commit/461172479db4d1d90a34d47deb88c0a59952449f))
* **Helmet:** add base now playing indo ([ccc7c0b](https://github.com/SLB-Pizza/radio-pizza/commit/ccc7c0b6b79374ea805799cbcb25b86b269e3535))
* **ResBioImage:** create component for new resident image sizes ([4f87c56](https://github.com/SLB-Pizza/radio-pizza/commit/4f87c569074f11a4c610ccc22f630f65ff8e863a))



# [1.15.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.14.1...v1.15.0) (2021-05-03)


### Bug Fixes

* **/hmbk-admin:** add null return case where data has not been fetched ([d4eae4c](https://github.com/SLB-Pizza/radio-pizza/commit/d4eae4cfe32fbb8ded60cf0c321462efbec8730f))
* **AdminSiteStatus:** add 'requires login' note ([1e6a4dc](https://github.com/SLB-Pizza/radio-pizza/commit/1e6a4dc9a3d4f568dd353280ed6ec6e1e935c837))
* **UpcomingShow:** comment out; to fix post-launch ([7f26bf8](https://github.com/SLB-Pizza/radio-pizza/commit/7f26bf8529cacdb11869de595576556a841052cd))


### Features

* **/editorial:** add filtering code to remove duplicate editorials ([faea9c3](https://github.com/SLB-Pizza/radio-pizza/commit/faea9c3ce577ed742495f66e5326cc8040866060))
* **/guides:** add individualized guide helmet details ([42b67f6](https://github.com/SLB-Pizza/radio-pizza/commit/42b67f66d7613311b655008beca56c45ebc9e841))
* **404:** add short-circuit; make footer fluid ([fe59d01](https://github.com/SLB-Pizza/radio-pizza/commit/fe59d01d8d86a1bccfbbc9b37835038a6ad0a651))
* **AdminGuides:** map guide data to categories ([b42da07](https://github.com/SLB-Pizza/radio-pizza/commit/b42da07e42bad1106c45ff33eee60fe0bf35a853))
* **AdminLink:** add subtitle to describe link ([1df746d](https://github.com/SLB-Pizza/radio-pizza/commit/1df746d1b4b31628a12d115d7b958d582e0d67db))
* **CMSLink:** create component link button to go to CMS ([37684cd](https://github.com/SLB-Pizza/radio-pizza/commit/37684cda701c325f8c412b34452232f5b3416901))
* **HMBKItem:** add Feature to query; update slice ([a981565](https://github.com/SLB-Pizza/radio-pizza/commit/a981565aadb0ca3012488b4b5ba467980dc5cea4))
* **home-fetch:** add uid and filter base functions ([14b6fe7](https://github.com/SLB-Pizza/radio-pizza/commit/14b6fe7b0194c8d98a3d649d0cda8476f7da9f82))
* **HomeFeatures:** add removeDuplicateFetchData ([d249dbd](https://github.com/SLB-Pizza/radio-pizza/commit/d249dbd8a2507cde091b11873b286cd254d3563d))
* **new-full:** fetch all schedule data on page load; port for /full-schedule ([ecb05c6](https://github.com/SLB-Pizza/radio-pizza/commit/ecb05c6d895409df43d539415a49a455d93431ec))



## [1.14.1](https://github.com/SLB-Pizza/radio-pizza/compare/v1.14.0...v1.14.1) (2021-04-26)


### Reverts

* **GCP:** fix CHANGE_URL playing; false -> true ([bbbba64](https://github.com/SLB-Pizza/radio-pizza/commit/bbbba641d6c24104245a9bcd3cd7a37d84c4a249))



# [1.14.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.13.0...v1.14.0) (2021-04-26)


### Bug Fixes

* **/live-stream-info:** remove extra LiveInfoPreview ([b747307](https://github.com/SLB-Pizza/radio-pizza/commit/b7473075d75304d431f5a756c64c2a965f0ddab9))
* **HomeFeatures:** change HomeFeatures layout to let other editorials peek through ([84bd59d](https://github.com/SLB-Pizza/radio-pizza/commit/84bd59d8da3bc7ce08ecc237e8e55d9810af5030))
* **SingleMixCard:** change navigate - /mixes > /radio ([40057d5](https://github.com/SLB-Pizza/radio-pizza/commit/40057d56985f452b897e6e9ace3eda4f6e51d7ca))
* **TagButtons:** change navigate to /radio from /mixes ([58302a2](https://github.com/SLB-Pizza/radio-pizza/commit/58302a2df9ec02023284f819098937bd013a4db8))


### Features

* **/editorial:** add Helmet; update /radio, Feature, Resident ([6643530](https://github.com/SLB-Pizza/radio-pizza/commit/664353027a65b92ec934967fde151f62cae8dc5a))
* **/full-schedule:** query CMS for all shows after today ([4bd34ef](https://github.com/SLB-Pizza/radio-pizza/commit/4bd34efaa3df87f2e2142ba4ef5a3e27be43ba86))
* **/full-schedule:** update query for recursive call ([9e7ed63](https://github.com/SLB-Pizza/radio-pizza/commit/9e7ed63d3f06b13bc36789be14b113190a45002a))
* **/hmbk-admin:** add NetlifyStatus, AdminHeader, SingleAdminLink ([65485be](https://github.com/SLB-Pizza/radio-pizza/commit/65485be31bdaa6ae15a8389e45a570b567c0ef1e))
* **/live-stream-info:** update form and preview layout ([85635ec](https://github.com/SLB-Pizza/radio-pizza/commit/85635ec5d4673773d79e5d2f3d1b19f5da331ff1))
* **/live-stream:** style Reset to Default section ([26fbf25](https://github.com/SLB-Pizza/radio-pizza/commit/26fbf2529951a04ccad655901eb2c741581ab564))
* **/netlify-status:** change update frequency 30s > 15s ([cbf6e1b](https://github.com/SLB-Pizza/radio-pizza/commit/cbf6e1b5e3aa98861cae23d3069009d2770e354f))
* **404:** add desktop and mobile to StickyItemsLayout ([1bc586c](https://github.com/SLB-Pizza/radio-pizza/commit/1bc586c4968db26949fd345598a5ad7ecbd4df06))
* **admin:** add Netlify status monitor ([b475943](https://github.com/SLB-Pizza/radio-pizza/commit/b4759434f52581c039b4445a6658b243b9238c97))
* **full-schedule:** process incoming schedule data ([42f8471](https://github.com/SLB-Pizza/radio-pizza/commit/42f8471b341fc52afa88a220496d92c6e191e27a))



# [1.13.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.12.0...v1.13.0) (2021-04-16)


### Bug Fixes

* **/about:** adjust logo sizing and titling columns ([7413020](https://github.com/SLB-Pizza/radio-pizza/commit/74130200a5cf798cc26d50f2af16b11b40e8ba55))
* **/about:** remove TextColumns slice ([205e61c](https://github.com/SLB-Pizza/radio-pizza/commit/205e61cb1397235e20d9d12b789ac0ae02bbba47))
* **Dropdown:** change sortUpcomingShowArray return to re-enable toggling ([10869f5](https://github.com/SLB-Pizza/radio-pizza/commit/10869f5739db47d3fb4bb1100d45a65ca739ff2e))
* **Dropdown:** give Dropdown button transparent background ([ec11a46](https://github.com/SLB-Pizza/radio-pizza/commit/ec11a465ccca2982ebda91a5585d8ba6d59c27e1))
* **ImageRow:** add `image_row`type to slice object ([3c20bd9](https://github.com/SLB-Pizza/radio-pizza/commit/3c20bd91a4637bcd7c318efc80746eb96a129021))
* **LiveBroadcastInfo:** add missing React import ([c640cd5](https://github.com/SLB-Pizza/radio-pizza/commit/c640cd57bdc0342dc27d8c4f76e3e1fa57f2e0fa))
* **Text:** remove exclamation marks from tune in and more residents ([650de69](https://github.com/SLB-Pizza/radio-pizza/commit/650de69327580486c7c21c07ca0cd5c7370ce07c))


### Features

* **About:** add Hero & Titling; slice zone, credits, footer ([1cfa689](https://github.com/SLB-Pizza/radio-pizza/commit/1cfa689a5fff01e16d94eaec773e4efe8562cf9b))
* **Duration:** integrate RecordedMixInfoDisplay and InfoDisplayTimerElement ([de03b82](https://github.com/SLB-Pizza/radio-pizza/commit/de03b829e149ddfbce4a39b1f76125bd24391b3f))
* **Helmet:** add first wave of Helmet details ([104dd3f](https://github.com/SLB-Pizza/radio-pizza/commit/104dd3f7d32534c5cd8dae821438e1edf157bd6d))
* **Helmet:** add prelim favicon details to Layout ([8f9fcbb](https://github.com/SLB-Pizza/radio-pizza/commit/8f9fcbba628658de4ec561e49cce92ab2f0635c6))
* **HMBKFooter:** extract into own component ([3431a3e](https://github.com/SLB-Pizza/radio-pizza/commit/3431a3e586c7c49ec35f1e2745f9835126beb4a3))
* **RadioPlayer:** extract local dispatch functions ([900e6e7](https://github.com/SLB-Pizza/radio-pizza/commit/900e6e7337e361d648ba7844c033fb7fc36a736d))



# [1.12.0](https://github.com/SLB-Pizza/radio-pizza/compare/1.10.0...v1.12.0) (2021-04-09)


### Bug Fixes

* **ContainedImageHero:** add align-items flex detail ([eca97ac](https://github.com/SLB-Pizza/radio-pizza/commit/eca97acb9763e9875dc9cb68508e4602b02df19a))
* **event-template:** rename import, props passed ([590ff62](https://github.com/SLB-Pizza/radio-pizza/commit/590ff629c13619b6ef750f7afeb0d096623730d1))
* **Event:** componentize EventHeaderButton ([d0dbc91](https://github.com/SLB-Pizza/radio-pizza/commit/d0dbc91fea3d555339aec65bc3914053c638c7a0))
* **EventHeader:** remove rogue text breaking render ([1a11d39](https://github.com/SLB-Pizza/radio-pizza/commit/1a11d3929d681437823fd90ea62f839ecd99d7be))
* **EventImage:** add z-index to .overlay-image ([ec19bad](https://github.com/SLB-Pizza/radio-pizza/commit/ec19bad44e861922b7c5fb4085e9690062b7251c))
* **EventTemplateImage:** fix non-filling blurred-bg ([bf6012e](https://github.com/SLB-Pizza/radio-pizza/commit/bf6012e2afe56bb9448d30dcd1c8aa8ff6a912da))
* **HeroArrows:** use separate SVG arrows per direction ([5a3aacb](https://github.com/SLB-Pizza/radio-pizza/commit/5a3aacb3b473db1c3fac4613dca346f584711b21))
* **Hero:** make hero-background 100% width ([7cd0bd1](https://github.com/SLB-Pizza/radio-pizza/commit/7cd0bd1abf182a1ec799b142b90dc19a861dc076))
* **ResidentLinks:** add missing return statement for returnAsSpan ([09be5a4](https://github.com/SLB-Pizza/radio-pizza/commit/09be5a4c36cb5c771601556fc4ac924e4a7c2c0e))
* **tablet:** change tablet breakpoint to 769px ([2ff28b2](https://github.com/SLB-Pizza/radio-pizza/commit/2ff28b23f92a58388ae7a218910eb27b2a5140ea))
* **UpcomingShow:** add showData null check to processUpcomingShow ([f4c3498](https://github.com/SLB-Pizza/radio-pizza/commit/f4c3498b54ccdd08e798de175496195b63d4ad37))
* **UpcomingShow:** remove conditional render ([aab5327](https://github.com/SLB-Pizza/radio-pizza/commit/aab5327997b15793e706300a2d20be7c63b87636))


### Features

* **/about:** add base query to /about ([5437908](https://github.com/SLB-Pizza/radio-pizza/commit/543790892f7e9d951668aec1de16a88bb2e51596))
* **/about:** add prismic connection to /about page ([76c90e9](https://github.com/SLB-Pizza/radio-pizza/commit/76c90e96eefaec9f6f4c28569817951a4bcb6052)), closes [#138](https://github.com/SLB-Pizza/radio-pizza/issues/138)
* **/samples:** make event-template route ([755ae83](https://github.com/SLB-Pizza/radio-pizza/commit/755ae830e231672943729f9a91720c142d9dd88d))
* **/schedule:** sort schedule_entries in updateThisWeeksSchedule ([324ca7c](https://github.com/SLB-Pizza/radio-pizza/commit/324ca7ce77da8ac6e66904a27f5bc0d8da55e6d3))
* **Event:** fix EventHeader layout issues ([db955fe](https://github.com/SLB-Pizza/radio-pizza/commit/db955feb87218104bd35f5dd39db241faedcd6be))
* **EventImageHeader:** componentize header ([9105dad](https://github.com/SLB-Pizza/radio-pizza/commit/9105dadef21d19e1a6aa0d42b1a8f7420f48175a))
* **Event:** map event_mixes to template ([543a203](https://github.com/SLB-Pizza/radio-pizza/commit/543a20358cd0738f01091359b3ccaee9efa35e51))
* **FWI:** change 'fullpage' case to render ContainedImageHero ([5c6face](https://github.com/SLB-Pizza/radio-pizza/commit/5c6face29470d31d8e35d1a5c3bcfc88b07b4411))
* **Helmet:** add favicon data to `static/img` ([278a6ff](https://github.com/SLB-Pizza/radio-pizza/commit/278a6ff8307a350ea5bdc8c448d07c0edfb04d5c))
* **LiveBroadcast:** add marquee useEffect functions ([7c245c4](https://github.com/SLB-Pizza/radio-pizza/commit/7c245c4d89c934fd9710c4745443363be99e5292))
* **Marquee:** add marquee useEffects to UpcomingShowWithResidents ([f8697d4](https://github.com/SLB-Pizza/radio-pizza/commit/f8697d490c0542e7fe7926775650f91be2f394bb))
* **Marquee:** add pause on :hover, :focus ([89b9cee](https://github.com/SLB-Pizza/radio-pizza/commit/89b9cee19c4c1262039185f11dd9a6aef5aadd3f))
* **Marquee:** add useEffects to activate marquee className and animation ([442cd51](https://github.com/SLB-Pizza/radio-pizza/commit/442cd5195aa3551bc48c67747558f96a28c34c79))
* **Samples:** make event-template sample page ([d283705](https://github.com/SLB-Pizza/radio-pizza/commit/d283705aafda8239aaf40fd9a1493b16aa36b774))
* **sortEntries:** add util func to sort ScheduleBar, UpcomingShow `schedule_entries` ([825a23d](https://github.com/SLB-Pizza/radio-pizza/commit/825a23dae2975b1a869b3c74c8a5bab9c4620680))
* **USWR:** add featured_resident filtering ([f87cffb](https://github.com/SLB-Pizza/radio-pizza/commit/f87cffbaa41c50873de92e5f44c4fd09cfb0f5ef))



# [1.10.0](https://github.com/SLB-Pizza/radio-pizza/compare/1.9.0...1.10.0) (2021-03-31)


### Bug Fixes

* **OIAT:** change left to "left" in label fallback ([dac1e7a](https://github.com/SLB-Pizza/radio-pizza/commit/dac1e7a958953d2797b0ce95d7d47d68cb32c69e))
* **query:** update query to reflect Feature migration ([aaa7261](https://github.com/SLB-Pizza/radio-pizza/commit/aaa726104bf80d7492777a941b11a2612bbf34eb))
* **UpcomingShow:** adjust styling for untitled single res Mix ([67be1fc](https://github.com/SLB-Pizza/radio-pizza/commit/67be1fcbeb57e6de4d572d9549cc32ae986ac223))


### Features

* **Dropdown:** add case to useEffect handling 0 length showData array ([86e9c61](https://github.com/SLB-Pizza/radio-pizza/commit/86e9c61536365f6a7a607e86b2508804ad81f440))
* **ScheduleBar:** render showData in ScheduleDropdown ([71aeded](https://github.com/SLB-Pizza/radio-pizza/commit/71aeded61105d00e14a98df33a7246576f14efc3))
* **SingleDateScheduleEntries:** make start_time and end_time required ([7c58896](https://github.com/SLB-Pizza/radio-pizza/commit/7c58896c181810d828f7ce4679f3dc0a739f9aec))
* **UpcomingShow:** add missed files from last commit ([1c39c5b](https://github.com/SLB-Pizza/radio-pizza/commit/1c39c5b5b8e2fe0b91fe78a2304ecd6a023f104b))
* **UpcomingShow:** componentize all upcoming show possibilities ([86bb1de](https://github.com/SLB-Pizza/radio-pizza/commit/86bb1def97722a00dfb743f042c8b6881e58c933))
* **UpcomingShow:** fix scheduled_show render with residents ([097c873](https://github.com/SLB-Pizza/radio-pizza/commit/097c873cb5d35ea8fbd6ba7c8ab2357d47166799))



# [1.9.0](https://github.com/SLB-Pizza/radio-pizza/compare/1.8.0...1.9.0) (2021-03-29)


### Features

* **/schedule:** create isCurrentShowLive util; add OnAirScheduleTag ([1bb8f36](https://github.com/SLB-Pizza/radio-pizza/commit/1bb8f3641d3a5469a98020ee79f357dcbb37fb5c))
* **/schedule:** refactor SingleScheduleEntryRow into subcomponents ([d198bd3](https://github.com/SLB-Pizza/radio-pizza/commit/d198bd3486e7de5affbb5fbf75becc8c29c9e22e))
* **Interview:** add Interview slice to Feature ([f0f5fc7](https://github.com/SLB-Pizza/radio-pizza/commit/f0f5fc79fb979347c8c9af479c41b1d92bf28b12))



# [1.8.0](https://github.com/SLB-Pizza/radio-pizza/compare/1.7.0...1.8.0) (2021-03-23)


### Bug Fixes

* **ImageEmbed:** remove links on image embeds ([039ed21](https://github.com/SLB-Pizza/radio-pizza/commit/039ed21749c6a113995246d8dcf9179e31fdd987)), closes [#136](https://github.com/SLB-Pizza/radio-pizza/issues/136)
* **TextColumns:** remove rogue return text in render ([fed7362](https://github.com/SLB-Pizza/radio-pizza/commit/fed7362d6ff1a3f74a22cb81abdb663d5824f266))


### Features

* **Divider:** add HMBK divider to Guide, Feature templates ([92a066c](https://github.com/SLB-Pizza/radio-pizza/commit/92a066cd277cfe7a91caab67586072c31c46f06b)), closes [#142](https://github.com/SLB-Pizza/radio-pizza/issues/142)
* **EmbedImage:** fix image embed, add modal ([749f525](https://github.com/SLB-Pizza/radio-pizza/commit/749f52524dd060b38f64dd2a165727d999d594bf))
* **FWI:** add quarterpage; remove RichText ([5523460](https://github.com/SLB-Pizza/radio-pizza/commit/5523460e7f81c04ed1cd5f474a511ac1babed41c))
* **HMBKItem:** add slice that renders media card and text block ([a3acc45](https://github.com/SLB-Pizza/radio-pizza/commit/a3acc45bec24a573aec8cbcd94a3954027f43c62))
* **Password:** shadow and build working Password page ([ced80bb](https://github.com/SLB-Pizza/radio-pizza/commit/ced80bb2df484b2525fb5f07bb4abad65c05a18a))
* **TextColumns:** add 5 col cap; styling for only one col ([38db4d9](https://github.com/SLB-Pizza/radio-pizza/commit/38db4d93505e321a8033273d68843ef865df7e6f))



# [1.7.0](https://github.com/SLB-Pizza/radio-pizza/compare/1.6.0...1.7.0) (2021-03-16)


### Bug Fixes

* **IconLinks:** fix props passing link to IconMaker ([1e392e1](https://github.com/SLB-Pizza/radio-pizza/commit/1e392e157687b0719d08943a61e19a8aaf3c4e70))
* **TextBlock:** remove extra `column` div for RichTextHelper ([a3ff36f](https://github.com/SLB-Pizza/radio-pizza/commit/a3ff36f3bdc7eadd3a4d491d2b5277461931eca1))


### Features

* **embed:** add Instagram posts; needs CSP in header? ([0936f8c](https://github.com/SLB-Pizza/radio-pizza/commit/0936f8c4771f8545227bcdd14bec0b196984b1f7))
* **embeds:** add `target="_blank"` to Bandcamp ([b747142](https://github.com/SLB-Pizza/radio-pizza/commit/b747142387373d3eff228c0305a8d9c2337bc3e1))
* **embeds:** handle iframe embeds in TextBlock ([b1e92dd](https://github.com/SLB-Pizza/radio-pizza/commit/b1e92dd297395eb367b564c8ee353bdaf01ff4ca))
* **embeds:** handle many TextBlock embeds ([81d7329](https://github.com/SLB-Pizza/radio-pizza/commit/81d7329e0e931eca248363fe41df2a569d0c09b4))
* **FWI:** add hero FullWidthImage slize styling ([b4aa589](https://github.com/SLB-Pizza/radio-pizza/commit/b4aa589b7a5fbb61e2b03838e280f66d2f1f4b1b)), closes [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117) [#116](https://github.com/SLB-Pizza/radio-pizza/issues/116)
* **TextColumns:** add new slice; styling ([72be8ba](https://github.com/SLB-Pizza/radio-pizza/commit/72be8babedc6937246c0bd962a578b582dc7edad)), closes [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117)
* **TextColumns:** change slice render condition ([0920192](https://github.com/SLB-Pizza/radio-pizza/commit/0920192e512663158da7d64ed584c9dbcc57c3cd)), closes [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117)



# [1.6.0](https://github.com/SLB-Pizza/radio-pizza/compare/1.5.0...1.6.0) (2021-03-09)


### Bug Fixes

* **ArticleHeadline:** correct hero height ([77d9586](https://github.com/SLB-Pizza/radio-pizza/commit/77d9586b41c2c2f872f7c7bf3009ae0789b0bf63))
* **formatDateTime:** fix initial parse of Prismic datetime string ([578d806](https://github.com/SLB-Pizza/radio-pizza/commit/578d8062d6fba34317d51ca71d1e4c7d04a27983))
* **residents:** multiple changes to landing and template ([6166204](https://github.com/SLB-Pizza/radio-pizza/commit/6166204c4f1a86f5486eb7b05fb2743a542ec091))
* **ResponsiveImage:** update `source` media breaks ([e6c9a67](https://github.com/SLB-Pizza/radio-pizza/commit/e6c9a6769e28a97645e97083b7ac6971c7f80e71))


### Features

* **Blockquote:** fix all three layouts ([e7af6aa](https://github.com/SLB-Pizza/radio-pizza/commit/e7af6aa55fbc7e1e4812ef864c8d5880c3fcc4a0)), closes [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117) [#11](https://github.com/SLB-Pizza/radio-pizza/issues/11) [#116](https://github.com/SLB-Pizza/radio-pizza/issues/116)
* **BottomNav:** add link to /schedule ([204687f](https://github.com/SLB-Pizza/radio-pizza/commit/204687f5d75ce35017d977c0229398d8ae9d3f49))
* **components:** add missing export to components index ([922465c](https://github.com/SLB-Pizza/radio-pizza/commit/922465c8b552706e756ebab0659a07cce8aa77b8))
* **EventDTLInfo:** create subcomponent ([c12c5f0](https://github.com/SLB-Pizza/radio-pizza/commit/c12c5f06d824d41ccc2f413b1f4d85b6b0c8d765))
* **Feature:** update Headline, BylineSubtitle, AuthorDetails ([b7de983](https://github.com/SLB-Pizza/radio-pizza/commit/b7de98351a90b7e63e047cd430c72d4b4110eae1))
* **Image:** [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117) - `figcaption` short-circuited ([64bb190](https://github.com/SLB-Pizza/radio-pizza/commit/64bb1908f667cd5854fa0581494cdfaca6b2b967))
* **OIAT:** [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117) - add tall, wide image classNames ([1244afb](https://github.com/SLB-Pizza/radio-pizza/commit/1244afb457ea7bd1b7c93753a75cb6c95f4869bf))
* **Resident:** update titling in Helmet ([4e5ec44](https://github.com/SLB-Pizza/radio-pizza/commit/4e5ec44ecaa8482594ffde80106b85fa78142091))
* **slices:** add SectionDivider slice to Guide ([e1ed4e7](https://github.com/SLB-Pizza/radio-pizza/commit/e1ed4e7c929c7ab87f7f6f5d63a82f7880aca440))
* **TextBlock:** add `section` to styling; update docs ([7ed6881](https://github.com/SLB-Pizza/radio-pizza/commit/7ed6881e542a38e1386a39cf64b336aa7d56ff53))
* **TextBlock:** create body link styling with `.text-block` ([d353b21](https://github.com/SLB-Pizza/radio-pizza/commit/d353b21cdf00975c7540b50df2adeb7fafbca605))
* **toggleColumn:** create toggleColumn func ([dd9a5fb](https://github.com/SLB-Pizza/radio-pizza/commit/dd9a5fb747a1bb463af4df4d6378c85631055987))



# [1.4.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.3.0...v1.4.0) (2021-03-01)



# [1.5.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.4.0...1.5.0) (2021-03-03)


### Bug Fixes

* **button.sass:** import fix from 0.9.2 ([85ffa9e](https://github.com/SLB-Pizza/radio-pizza/commit/85ffa9eb223f50482831c94cd2d27dd869a42c04))
* **dispatch:** fixed data sent from SMC to MixPlayOverlay ([f117fe4](https://github.com/SLB-Pizza/radio-pizza/commit/f117fe4c858c658bec11fe995bde9deb559901f1))
* **Slider:** 'slider-sizing' 1rem margin-top offset ([41ab6f0](https://github.com/SLB-Pizza/radio-pizza/commit/41ab6f0ee7a940b1a749ee669b9f4c29754b4b98))


### Features

* **/features:** add LPFetchAndLoading ([276dab3](https://github.com/SLB-Pizza/radio-pizza/commit/276dab343b89ba448b634a5d10ebad1bfa74c4fe))
* **DFTM:** create mix tag search sticky report section ([b6d1c89](https://github.com/SLB-Pizza/radio-pizza/commit/b6d1c8982398f65ca3deaa8674cb6448c5976e88))
* **Hero, Feature:** fix hero-sizing mismatch ([10b324d](https://github.com/SLB-Pizza/radio-pizza/commit/10b324d21e5726dd3812e2e5a6dac724c2c1e27d))



# [1.4.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.3.0...v1.4.0) (2021-03-01)


### Bug Fixes

* **navbars:** remove search icon and move radio link ([85b7b38](https://github.com/SLB-Pizza/radio-pizza/commit/85b7b38a678b355427cdc0283299a25702e84885))
* **Resident:** remove leftover <pre> tag ([17687a3](https://github.com/SLB-Pizza/radio-pizza/commit/17687a31af0424534a4a53572dd95ceda9d5f816))
* **TagQueries:** processFetchedMixes now nulls local receivedTagMixes when all tags deselected ([a54fd8d](https://github.com/SLB-Pizza/radio-pizza/commit/a54fd8d3813adb93b5db6dbbda597a71209359c6))


### Features

* **/mixes:** add base DisplayFetchedTagMixes component in return off ternary; issues ([2e9d44e](https://github.com/SLB-Pizza/radio-pizza/commit/2e9d44eef46c55184a1f4bfb0ff2cc07a88bc423))
* **/mixes:** add base progress bar ([208c37d](https://github.com/SLB-Pizza/radio-pizza/commit/208c37d64be777392edeacb28383bc63adc7fbf4))
* **/mixes:** fixes endless useEffect fetchTaggedMixes calls ([aa6b45d](https://github.com/SLB-Pizza/radio-pizza/commit/aa6b45d397c1009bcc8f503ebba5493c221301ec))
* **DFTM:** remove duplicate useLazyQuery; fix 500 error ([4585eb4](https://github.com/SLB-Pizza/radio-pizza/commit/4585eb4ecadcb71889be596f078df1e131f090cd))
* **FallbackImage:** fix local pathing to HMBK logo ([b978b3a](https://github.com/SLB-Pizza/radio-pizza/commit/b978b3a464f1438ec7876be9adb7a35942a037b0))
* **GCP:** update SELECT_MIX_SEARCH_TAG action ([1ecc956](https://github.com/SLB-Pizza/radio-pizza/commit/1ecc95681fd8a7af5ec4d7188f72b5584e38cf24))
* **SFC:** unify heights, fonts of Events and Feature cards ([3b33445](https://github.com/SLB-Pizza/radio-pizza/commit/3b33445e157d1b1cbe07d966227d04831e9fd236))
* **SMC:** add query, dispatch, and function to TagButtons ([1eb41cf](https://github.com/SLB-Pizza/radio-pizza/commit/1eb41cf83543ef6c2db9f9ab0c10dac6a59d1664))
* **TaggedMixes:** add selected mixes to component ([f85f107](https://github.com/SLB-Pizza/radio-pizza/commit/f85f107f5143c56b092841c7b3c19810caede3b7))
* **TagQueries:** add clearMixSearchTags dispatch to RadioBar logo, select BottomNav links ([e448482](https://github.com/SLB-Pizza/radio-pizza/commit/e44848218fdbd3641cf75858f20f4ee663782066))
* **TagQueries:** fix DFTM mix mapping, fetch more button; add 'remove tag from query' button ([afcbcb8](https://github.com/SLB-Pizza/radio-pizza/commit/afcbcb8bc80197a58d815ea87d8f99ac91c587c0))



# [1.3.0](https://github.com/SLB-Pizza/radio-pizza/compare/v1.2.1...v1.3.0) (2021-02-24)


### Bug Fixes

* add short-circuits to ResidentBio; TagButtons ([402674a](https://github.com/SLB-Pizza/radio-pizza/commit/402674af1f5174f1bff5b33bfb0fd3bbaa15f7ff))
* **formatDateTime:** address time === null case ([32d45fa](https://github.com/SLB-Pizza/radio-pizza/commit/32d45fa370afbdf8b9d96e97975b6984de3a2e18))
* **ResidentBio:** short-circuit residentBioData ([cbcfdf0](https://github.com/SLB-Pizza/radio-pizza/commit/cbcfdf05f4ea3d472139f7413bad01df72896aa0))


### Features

* **Icon:** add Youtube icon ([e7f5385](https://github.com/SLB-Pizza/radio-pizza/commit/e7f5385455bb08d4ed1cc75858ed45d686861d48))
* **Resident:** process associated mix, event, and feature data arrays ([456d36d](https://github.com/SLB-Pizza/radio-pizza/commit/456d36d9160b4eef67c85e92bf28bd4bc73bb6dd))
* **SingleMixCard:** add mix icons that link out ([2bc0b0a](https://github.com/SLB-Pizza/radio-pizza/commit/2bc0b0ab36486944e02f758a1e2481da8088eb7a))



## [1.2.1](https://github.com/SLB-Pizza/radio-pizza/compare/v1.2.0...v1.2.1) (2021-02-17)


### Bug Fixes

* **/residents:** change "Alumni" to "Alumnus" in index & alumni query ([0772a6b](https://github.com/SLB-Pizza/radio-pizza/commit/0772a6bae24f727e0f6ea0f1d5b51f3e08312a2f))



# [1.2.0](https://github.com/SLB-Pizza/radio-pizza/compare/e78fee92d9f5f0f2ddaf074f238e837b1013525f...v1.2.0) (2021-02-17)


### Bug Fixes

* **/events:** fix event location links boolean check ([054d733](https://github.com/SLB-Pizza/radio-pizza/commit/054d733bd979679a90accd36bd5ce52154702116))
* **/residents:** import graphql from gatsby ([0e1b978](https://github.com/SLB-Pizza/radio-pizza/commit/0e1b978e2d4f5b7baf6c66e1ec2e5860c4f37eea))
* **#130:** write closeDropUp function; add to BottomNav OutsideClick wrapper ([23f22a5](https://github.com/SLB-Pizza/radio-pizza/commit/23f22a5d87649436619576f9e22f4497b96e64d2)), closes [#130](https://github.com/SLB-Pizza/radio-pizza/issues/130)
* add 'rel=noopener' to /bio social icon links ([ba2c3ce](https://github.com/SLB-Pizza/radio-pizza/commit/ba2c3ce77bc89847c3d0dbda50a0e0ef5e2fe3d2))
* add gatsby-plugin-fontawesome-css to stop icon size jumps at load ([3bb2513](https://github.com/SLB-Pizza/radio-pizza/commit/3bb25131b149a572af143969484a613d3b1c8ee0))
* add StaticQuery import to DailyMixPagePreview and AboutPagePreview ([2d27c36](https://github.com/SLB-Pizza/radio-pizza/commit/2d27c36358ed1a75a0daee40ed6387c0b20059a0))
* add updated slice definition to /cms-help/sample-feature ([7256d9e](https://github.com/SLB-Pizza/radio-pizza/commit/7256d9e01600d31ab093747178332ae8151f903b))
* **ApolloProvider:** unwrap root element; only wrap TopNav ([889a8f4](https://github.com/SLB-Pizza/radio-pizza/commit/889a8f4b2197f7532f7631c3441a934eefbcb015))
* **Apollo:** unwrap ApolloProvider from TopNav ([88cd46e](https://github.com/SLB-Pizza/radio-pizza/commit/88cd46e3ed9829098c0561d8ce9fe17ee77e6074))
* **Blockquote:** add bgIMG === null return condition; begin Feature HeadlineBlock remap ([7e14327](https://github.com/SLB-Pizza/radio-pizza/commit/7e14327da1ae2fdc78ec2f706a1b53bdd532a7e1))
* **Blockquote:** make attributions optional via short-circuit ([f4ed26b](https://github.com/SLB-Pizza/radio-pizza/commit/f4ed26b1baeee0ea2ad233a508661dc11538b7c2))
* **BottomNav:** change toggleDropUp to closeDropUp ([718b331](https://github.com/SLB-Pizza/radio-pizza/commit/718b3315c13a1487b434e60493929f3b86b32495))
* bring in deployed changes ([cb11bd8](https://github.com/SLB-Pizza/radio-pizza/commit/cb11bd8f2ad395fc3b7a601a802b3a349c554e38))
* **build:** address breaking build by adding nullish value for mix_date ([38172c4](https://github.com/SLB-Pizza/radio-pizza/commit/38172c45484a9df322bcf15a5988e854b97b4927))
* change /sticky-bio to /bio and shorter link text ([35ef4ca](https://github.com/SLB-Pizza/radio-pizza/commit/35ef4ca15e89448e48991c9131ca6282fdbdd14a))
* change /sticky-bio to /bio and shorter link text ([ad8ec6c](https://github.com/SLB-Pizza/radio-pizza/commit/ad8ec6c3a91485448cdad816070f8af7cc08ad6c))
* change backend branch; fix indentation error ([cb59e2a](https://github.com/SLB-Pizza/radio-pizza/commit/cb59e2af7d64dca9d4243771dab0017e94d15d58))
* change homepageCarousel -> homepage_carousel; reenable Hero ([e19a003](https://github.com/SLB-Pizza/radio-pizza/commit/e19a003c6b331e7c2f1ca029c36b00313ee26630))
* change radio bar img base paths; restore original tag sizes ([db69aa8](https://github.com/SLB-Pizza/radio-pizza/commit/db69aa8090ba6f0460b702cae0fb7fc138a4368a))
* changed key map value in ScheduleShowEntry to use show.hostInfo instead of show.showName ([6346b50](https://github.com/SLB-Pizza/radio-pizza/commit/6346b50ab73a4e2c06b9dbf72ca9ebaf8b9e842f))
* **cron:** rewrite with correct syntax ([17752b8](https://github.com/SLB-Pizza/radio-pizza/commit/17752b8ba1de320c36e512c6c670569577ed1e50))
* **cron:** try two cron commands ([48cc25e](https://github.com/SLB-Pizza/radio-pizza/commit/48cc25e26eb989de92dadd11247bd80e056fc3d3))
* **dayjs:** remove async from clock functions ([989f8ff](https://github.com/SLB-Pizza/radio-pizza/commit/989f8ff9a19a6af99e7a4aa3721f30343fef6f8c))
* **deploy:** fix duplicated Hero in TopNav ([016978d](https://github.com/SLB-Pizza/radio-pizza/commit/016978d439e772e0d2307e154adc5ce2be5b913e))
* **Dropdown:** align .up-next & .dropdown ([1e7eede](https://github.com/SLB-Pizza/radio-pizza/commit/1e7eede0ee9f45bc57bb9eb93255d418984571d0))
* edit broken tablet /bio layout ([a459daa](https://github.com/SLB-Pizza/radio-pizza/commit/a459daa3c7e9aa4ab7d5c88b9179d4ecac4c974d))
* Edit incomplete about copy; add site credits for us ([edd7716](https://github.com/SLB-Pizza/radio-pizza/commit/edd771604714d574a859c68b9ec1c27f31f22094))
* **errors:** address Invariant error, gatsby 95313 error ([9a14a4d](https://github.com/SLB-Pizza/radio-pizza/commit/9a14a4d07fa5382d91126af61367e1c5dde68af6))
* **Event:** adjust query, deconstructed variables and calls ([7284eb0](https://github.com/SLB-Pizza/radio-pizza/commit/7284eb02023ef7f9dd7cbfd131fcd662587ab13f))
* **Event:** convert event times from UTC to EST before using through page ([bd33b66](https://github.com/SLB-Pizza/radio-pizza/commit/bd33b662942373326bde32070a4866b472a20908))
* **EventMapEmbed:** update .env with GATSBY_ prefix; update component ([1fb72eb](https://github.com/SLB-Pizza/radio-pizza/commit/1fb72ebc08c1075dcbf1557ab8e517e1a9a2aa47))
* **Event:** rename eventData deconstructions ([037919f](https://github.com/SLB-Pizza/radio-pizza/commit/037919f3ecb24aad793b743a743893cbeeed6781))
* **features:** fix props StickyFeature & style ([4eaf9f0](https://github.com/SLB-Pizza/radio-pizza/commit/4eaf9f057dfda4a7cd8c30f053dd9a5a2be98448))
* **features:** import graphql via gatsby to address deploy warning ([6b2fd1c](https://github.com/SLB-Pizza/radio-pizza/commit/6b2fd1c9d4bdac4fd727abd04ee5c40391ca8cdc))
* fix broken sampleSlide imports; add base CMSGuide.scss ([2505e15](https://github.com/SLB-Pizza/radio-pizza/commit/2505e156f674aa95038c503046b89b8143ee907b))
* **font:** change title font to Aldrich; change body to Authentic ([9214299](https://github.com/SLB-Pizza/radio-pizza/commit/92142998a15495818c459d186512f136eba57c05)), closes [#59](https://github.com/SLB-Pizza/radio-pizza/issues/59) [#96](https://github.com/SLB-Pizza/radio-pizza/issues/96)
* **font:** increase font size of currentlyPlaying ([9f9729b](https://github.com/SLB-Pizza/radio-pizza/commit/9f9729b096091c1ca300c0aa53f6460e4959119f)), closes [#85](https://github.com/SLB-Pizza/radio-pizza/issues/85) [#88](https://github.com/SLB-Pizza/radio-pizza/issues/88)
* **font:** reduce font sizes of schedule fonts; simplify layout ([be6a9cd](https://github.com/SLB-Pizza/radio-pizza/commit/be6a9cd1ccdc1d39f843caab66f042cb1994874f))
* **getBlockquoteStyling:** resolve error when bgImg is null ([ce5282d](https://github.com/SLB-Pizza/radio-pizza/commit/ce5282d6ed02a26c0ec8dcafa7aa0a8185942f3c))
* **getResidentString:** refactor getResidentString ([c0457e6](https://github.com/SLB-Pizza/radio-pizza/commit/c0457e634e4801b18f20cad23e25f2282ed78a22))
* **Guide:** fix date sorting ([eefe132](https://github.com/SLB-Pizza/radio-pizza/commit/eefe132e4979b22ac41d1cf773ea9354d1ee7ef4))
* **ImageRow:** change group_image to row_image ([05fd94a](https://github.com/SLB-Pizza/radio-pizza/commit/05fd94a285cd4c90932f6225e2efaa3e4f4c8418))
* **ImageRow:** revert row_image to group_img ([b263c42](https://github.com/SLB-Pizza/radio-pizza/commit/b263c423ab2774e0febf95b02229c17ae1d10451))
* **json:** add dummy JSON data to fix /bio ([d9d86f0](https://github.com/SLB-Pizza/radio-pizza/commit/d9d86f0e5f0f99f99586ac5cfd32525b6d656fe4))
* **layout:** add mixins to mix card content-text & tags ([dc71cb8](https://github.com/SLB-Pizza/radio-pizza/commit/dc71cb8c6877a2eda6e74201780151491d487133)), closes [#97](https://github.com/SLB-Pizza/radio-pizza/issues/97)
* **layout:** change min-height of resident name box ([e7bfd06](https://github.com/SLB-Pizza/radio-pizza/commit/e7bfd06ed78fd4f630d91b90b0705b9ea791f811)), closes [#105](https://github.com/SLB-Pizza/radio-pizza/issues/105)
* **layout:** fix home content bottom padding to match top padding ([abd8ac2](https://github.com/SLB-Pizza/radio-pizza/commit/abd8ac2e88bd10d6b90033aa62fb1b71fe666c54)), closes [#103](https://github.com/SLB-Pizza/radio-pizza/issues/103)
* **layout:** give cards/tags rounded borders ([7bddf51](https://github.com/SLB-Pizza/radio-pizza/commit/7bddf5183aa17cb9d718a480c7b86e6db721b16a)), closes [#90](https://github.com/SLB-Pizza/radio-pizza/issues/90)
* **layout:** home content id merged down one div ([4a65abe](https://github.com/SLB-Pizza/radio-pizza/commit/4a65abe2d26b3f35de9a6e13187c98027aedd9fe))
* **layout:** remove chat link from bottom; move to top ([75b8497](https://github.com/SLB-Pizza/radio-pizza/commit/75b84979b7f9cff90c28b80cb7277767e0dec254)), closes [#94](https://github.com/SLB-Pizza/radio-pizza/issues/94)
* **layout:** remove white inner curve on card hover ([14168a6](https://github.com/SLB-Pizza/radio-pizza/commit/14168a6a026b52a2445de80a0b85c7f4ee6b6911)), closes [#108](https://github.com/SLB-Pizza/radio-pizza/issues/108)
* **layout:** schedule dropdown closes onClick 'view full schedule' ([be0c329](https://github.com/SLB-Pizza/radio-pizza/commit/be0c32979a7d831c0a1feff247bfaca9461c9fc9)), closes [#104](https://github.com/SLB-Pizza/radio-pizza/issues/104)
* **layout:** thin card borders and fix rounded thinning ([ca909b5](https://github.com/SLB-Pizza/radio-pizza/commit/ca909b504c7362a1af8e28ad86ec7f433eeced12))
* **layout:** times removed from tablet layout; mix card font adjusted ([e2c6df9](https://github.com/SLB-Pizza/radio-pizza/commit/e2c6df9e95c57226556582d4895b9bd84a5ac981))
* make HomeMixes display only first 12 mixes ([deae45c](https://github.com/SLB-Pizza/radio-pizza/commit/deae45c90bfb194245be738e988f1a09eb497177))
* make SingleMixCard map variables less ambiguous ([ee935ca](https://github.com/SLB-Pizza/radio-pizza/commit/ee935ca0c8a3eab958ebe0aa082f7e5d93e29194))
* **mappableDataCheck:** change rejection return to 0 for falsiness; add final filteredArr length check ([a730dbf](https://github.com/SLB-Pizza/radio-pizza/commit/a730dbfd07f556724428f78fc25521f0c19b6340))
* rectify package dependencies errors; add linkResolver base ([ef8a576](https://github.com/SLB-Pizza/radio-pizza/commit/ef8a57623867fc8aac8a2ce590602e2e687da337))
* remove all .has-text-light classes ([e78fee9](https://github.com/SLB-Pizza/radio-pizza/commit/e78fee92d9f5f0f2ddaf074f238e837b1013525f)), closes [#76](https://github.com/SLB-Pizza/radio-pizza/issues/76)
* repair broken gatsby version ([aec87bb](https://github.com/SLB-Pizza/radio-pizza/commit/aec87bb01b76411f00b6e96468341cde028c8575))
* repair Sample Feature story ([885ff1f](https://github.com/SLB-Pizza/radio-pizza/commit/885ff1f680d5b01ee5eedd462b01e7851d10d7ba))
* **ResidentBio:** prevent ResidentSocialLinks breaking from incomplete media entry ([090784b](https://github.com/SLB-Pizza/radio-pizza/commit/090784b1bd7cbf577a7405a7a0e6e0cea35d0160))
* **ResidentSocialLinks:** add Facebook case ([6916ab5](https://github.com/SLB-Pizza/radio-pizza/commit/6916ab5da13b5a01a2d283ef151cc978a2856b01))
* **ResidentSocialLinks:** reactivate link icons in bio ([a79f1e5](https://github.com/SLB-Pizza/radio-pizza/commit/a79f1e56b7c0500e4b1dfa7d8c58e2569d596d0b))
* **ResponsiveImage:** change width, height ([b58d905](https://github.com/SLB-Pizza/radio-pizza/commit/b58d905e95897ed3c876cdcd7e9fd1336d3ecaf6))
* **SingleFeatureCard:** add short-circuits for null cases ([ec4d97b](https://github.com/SLB-Pizza/radio-pizza/commit/ec4d97bb23fdf52a2f76e8edad51d1aefc73a4ab))
* **SingleMixCard:** format date on title-less mixes ([0f889f2](https://github.com/SLB-Pizza/radio-pizza/commit/0f889f26b747f8b8ef6129c57870f4717efb7e61))
* **slices:** resolve broken feature documents after Feature type reset ([892836d](https://github.com/SLB-Pizza/radio-pizza/commit/892836d2514b60c51fb7368de70822018a73f64f)), closes [#116](https://github.com/SLB-Pizza/radio-pizza/issues/116) [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117)
* **style:** /sticky-bio: bio column now scrolls when necessary ([591a13c](https://github.com/SLB-Pizza/radio-pizza/commit/591a13ce48b4a13a3adfd836903690f8b951571e)), closes [#110](https://github.com/SLB-Pizza/radio-pizza/issues/110)
* **style:** hide mix-img column on mobile ([4714efa](https://github.com/SLB-Pizza/radio-pizza/commit/4714efa73530506e9b50ed3a302ed5ac90f6bfc9))
* **test:** add base text to /hero-test ([1fb23e5](https://github.com/SLB-Pizza/radio-pizza/commit/1fb23e578fa04ca09c3ac84755c1986980cf32e2))
* **Travis:** change Netlify site and auth token declarations ([19f96cc](https://github.com/SLB-Pizza/radio-pizza/commit/19f96cc1561191ce26ca01e9e37ee82b21083764))
* **travis:** place env variables on same line; add <this syntax> to deploy ([39f8b05](https://github.com/SLB-Pizza/radio-pizza/commit/39f8b05e6b47c85d6aa00bbd3bfe87cf07eea90b))
* uncomment dummySlides in Hero causing error ([1bd48d8](https://github.com/SLB-Pizza/radio-pizza/commit/1bd48d8938c7272a7be2ad91a09bed901722f3c0))
* **UpcomingShow:** add undefined return condition ([e800489](https://github.com/SLB-Pizza/radio-pizza/commit/e8004891a816c6c4130e2ae7881bae1d02afe9a1))
* update HeadlineBlock story with new slice and metadata objects ([00b7498](https://github.com/SLB-Pizza/radio-pizza/commit/00b7498a8e443a462dbefb84ef3cffab48befd22))
* update last incomplete commit ([9cdaf80](https://github.com/SLB-Pizza/radio-pizza/commit/9cdaf8097798212dc8a3a20b07f92935d5ffb214))


### Features

* '/' - add base Prismic query; pass slides as props to Hero ([0aeb6a7](https://github.com/SLB-Pizza/radio-pizza/commit/0aeb6a75bec5a7562b58d4b9a138c33a238a179e))
* **/404:** add base layout ([3a4c2e3](https://github.com/SLB-Pizza/radio-pizza/commit/3a4c2e3981861d1d5a50fc7869f7bcc5a9c77083))
* **/admin:** make colored Issue message wrapper ([5a1e6ce](https://github.com/SLB-Pizza/radio-pizza/commit/5a1e6ce8d3dae2e186b6ec8d829b90bf9a0f7594))
* **/collection:** extract playlist mapping to util function ([d4ff521](https://github.com/SLB-Pizza/radio-pizza/commit/d4ff5210b25f47754aff6a3c96d214e1ab619f6d))
* **/collections:** create Set to capture unique residents ([7f36fd9](https://github.com/SLB-Pizza/radio-pizza/commit/7f36fd92de4fb0c7232d0418f4d3f430f1787a29))
* **/collections:** pass makeCollectionDispatch data to MixPlayOverlay; get first track playing ([0fd3e83](https://github.com/SLB-Pizza/radio-pizza/commit/0fd3e83a91564d1c05635543f5705fa54b8639c1)), closes [#125](https://github.com/SLB-Pizza/radio-pizza/issues/125) [#128](https://github.com/SLB-Pizza/radio-pizza/issues/128)
* **/collections:** restore SingleCollection display data ([7342b80](https://github.com/SLB-Pizza/radio-pizza/commit/7342b8001f6bdcc7891c03f353b2987460b9e803))
* **/collections:** write playlistShuffle function; add to tests ([a775784](https://github.com/SLB-Pizza/radio-pizza/commit/a77578452702446d17d263d6cb69c635bd6f8452))
* **/events:** add load more button ([ec37ff2](https://github.com/SLB-Pizza/radio-pizza/commit/ec37ff2391da542492ade572e483ed137a693b29))
* **/events:** add map embeds to event pages ([10d11e2](https://github.com/SLB-Pizza/radio-pizza/commit/10d11e2cb92e21d477cd8acb84a1d2f4a1238405))
* **/events:** unify card height; fix event image style ([be77440](https://github.com/SLB-Pizza/radio-pizza/commit/be77440c06eaebe8b39ca4165c647f3271acfc46))
* **/feature:** add left/right feature fallbacks ([a1c3964](https://github.com/SLB-Pizza/radio-pizza/commit/a1c3964b8fcc4be41b973ae6a00ec12d6cfe07c2)), closes [#79](https://github.com/SLB-Pizza/radio-pizza/issues/79)
* **/feature:** make event card height fix global ([e2fd44f](https://github.com/SLB-Pizza/radio-pizza/commit/e2fd44f78a866cf1b73180e2a6b95ed9187b47bd))
* /features/dev-test-feature-1 > updated SliceZone returns SliceTypes; ([2a41372](https://github.com/SLB-Pizza/radio-pizza/commit/2a413727efca21d61f06b8e142d25c84dfcbb3a2))
* **/features:** set HighlightFeatures render conditions ([b2a7627](https://github.com/SLB-Pizza/radio-pizza/commit/b2a7627a530cebcc12c933a851e83f34cfffeaa5))
* **/guide:** add responsive images to CMS cards ([26c096c](https://github.com/SLB-Pizza/radio-pizza/commit/26c096ca8a87a18e1bdad6dabca0d69d162b8f25))
* **/index:** augment IndexQuery; begin passing data to HomeMixes ([112a89f](https://github.com/SLB-Pizza/radio-pizza/commit/112a89f5aa7b375e62fcd3a1e893172292080d72)), closes [#80](https://github.com/SLB-Pizza/radio-pizza/issues/80) [#36](https://github.com/SLB-Pizza/radio-pizza/issues/36)
* **/index:** map and fix heights of HomeEvents ([3e7a8b7](https://github.com/SLB-Pizza/radio-pizza/commit/3e7a8b78dde029cee3cc8d9058986cacdea3f286))
* **/mixes:** add button to fetch more mixes and go back to top ([18babef](https://github.com/SLB-Pizza/radio-pizza/commit/18babef273ad3288896171ae463ecc2f9dcbe894))
* **/mixes:** add endless_mix part to query; bring into page ([de6f02e](https://github.com/SLB-Pizza/radio-pizza/commit/de6f02eb2b5f385f16254e7e091f558db941645e))
* **/mixes:** add lead_radio_mix null base case to useEffect ([4496e6b](https://github.com/SLB-Pizza/radio-pizza/commit/4496e6beb130f2c76e223389bf43c1bcedf9e62a))
* **/mixes:** begin Collections migration ([6acaede](https://github.com/SLB-Pizza/radio-pizza/commit/6acaede7b0f19cc6df0e0b5ac3184dd617a9563d))
* **/mixes:** begin useEffect refactor for /mixes TopicHero ([6dbf732](https://github.com/SLB-Pizza/radio-pizza/commit/6dbf732a0da2b396f2f7f05d238d84ce20646aca))
* **/mixes:** finish useEffect processing /mixes hero and highlight section data ([caa874c](https://github.com/SLB-Pizza/radio-pizza/commit/caa874cc278fca09c443af813ede43f5cf1d7d8c))
* **/mixes:** implement onClick fetching from prismic ([991b796](https://github.com/SLB-Pizza/radio-pizza/commit/991b796e95a1ec36011e8f342d40adb2f8886f8a))
* **/mixes:** show CMS mixes, res links resolve ([fbd26ed](https://github.com/SLB-Pizza/radio-pizza/commit/fbd26ed9cd269b7ff8f44af4aba57be2e9c198f7))
* **/queries:** collect all load-time Apollo GQL queries in directory ([6dcfe4b](https://github.com/SLB-Pizza/radio-pizza/commit/6dcfe4bb83318af7887a487dce2dbb9be0a6b4e3))
* **/resident:** make resident links in their own mix cards plain text ([4845522](https://github.com/SLB-Pizza/radio-pizza/commit/48455226dc56ca068fc5ede617c47bb074d50702)), closes [#39](https://github.com/SLB-Pizza/radio-pizza/issues/39) [#120](https://github.com/SLB-Pizza/radio-pizza/issues/120)
* /residents is now automatically alphabetized A→Z; moreWIP ([773cf6a](https://github.com/SLB-Pizza/radio-pizza/commit/773cf6a88d9df92cf8b67289fc0ef143d6de78f6))
* **/residents:** attach queries to buttons process fetched data ([b98e499](https://github.com/SLB-Pizza/radio-pizza/commit/b98e499762ede8689853d77cc396acf1f30a11ea))
* **/residents:** change query sort to remove sort after status filtering ([2da4339](https://github.com/SLB-Pizza/radio-pizza/commit/2da433983284970e3f71a7c97df0df14518dfd56))
* **/residents:** connect to Prismic; add guest option and selection ([6e07907](https://github.com/SLB-Pizza/radio-pizza/commit/6e07907458a50eadb9d10c20c86de1694f266540))
* **/residents:** create WIP individual resident page ([cccff86](https://github.com/SLB-Pizza/radio-pizza/commit/cccff86a17da499ee4e264d4319162da63e88bc5)), closes [#120](https://github.com/SLB-Pizza/radio-pizza/issues/120)
* **/Resident:** sort Resident mixes from most recent date to least ([c3befdf](https://github.com/SLB-Pizza/radio-pizza/commit/c3befdfc2fbce6a71c17657a760dce77d127e96b))
* **/residents:** refactor resident type separation into useEffect; update query to allow base data fetch of each type ([0cfd349](https://github.com/SLB-Pizza/radio-pizza/commit/0cfd3493cd25c9fcf9f79c0ca031b55ea7232f45))
* **/schedule:** add schedule_entries null option ([88e3d7e](https://github.com/SLB-Pizza/radio-pizza/commit/88e3d7e358a487818e0a5533793f3c7279762896))
* **/schedule:** make date selection buttons functional ([8ceaa35](https://github.com/SLB-Pizza/radio-pizza/commit/8ceaa35aced8cda21faf6c8e965d11603566fae6)), closes [#19](https://github.com/SLB-Pizza/radio-pizza/issues/19)
* **/schedule:** map node data correctly ([185f502](https://github.com/SLB-Pizza/radio-pizza/commit/185f502e1ff7dcf2df75e3b40f69699919388ed9)), closes [#19](https://github.com/SLB-Pizza/radio-pizza/issues/19)
* **/schedule:** write base getSevenDays util ([c23b6e6](https://github.com/SLB-Pizza/radio-pizza/commit/c23b6e61d0280e036cf1941acad6aa6f99949f5a)), closes [#19](https://github.com/SLB-Pizza/radio-pizza/issues/19)
* **/support:** add base Support page; connect CMS ([55b4034](https://github.com/SLB-Pizza/radio-pizza/commit/55b4034f222663ec123d9ac5a66f1a5d5cc3db99))
* **/support:** add prelim scroll fade layout ([a94e2fd](https://github.com/SLB-Pizza/radio-pizza/commit/a94e2fd320c32fe50bbc47733d75d8878d339d13))
* **/support:** connect OneImageAndText component ([7a6ffb7](https://github.com/SLB-Pizza/radio-pizza/commit/7a6ffb7038ec36f285c98a593994a97a281c06d7))
* **/support:** update storybook; change fade scroll speed ([301ac33](https://github.com/SLB-Pizza/radio-pizza/commit/301ac33eeb4e7f63f55173bed1a28948fe0fdad4)), closes [#63](https://github.com/SLB-Pizza/radio-pizza/issues/63)
* add /events link to bottom nav and home event section button ([4cde088](https://github.com/SLB-Pizza/radio-pizza/commit/4cde088137e3fd5c9005dfbe94b04789a437bd94))
* add /schedule styling; regulate schedule dropdown max height ([575773c](https://github.com/SLB-Pizza/radio-pizza/commit/575773ce862ad67aa6c099b3f7b2ef3c8083e446))
* add about page copy from Surf's text ([712f188](https://github.com/SLB-Pizza/radio-pizza/commit/712f18850a984436ac419ece7e239935e235a1ef))
* add base /events layout with dummy events ([6e9035d](https://github.com/SLB-Pizza/radio-pizza/commit/6e9035dd8ac8fe0f79e0224d775ebec8767f72f2))
* add base ContentHelper to /components/slices; create Blockquote helper function ([7573c77](https://github.com/SLB-Pizza/radio-pizza/commit/7573c77b58b405ef8f32bf5e3c1714123b7a25b0))
* add base FullWidthImage to /cms-help/sample-feature ([2fb47f6](https://github.com/SLB-Pizza/radio-pizza/commit/2fb47f681f2f595dec1941e0b9f05d3fa8e90a14))
* add base HeadlineBlock story ([5cc3cff](https://github.com/SLB-Pizza/radio-pizza/commit/5cc3cffc1fcf010cfb6d413d8f6cf1b5d8144c47))
* add base switch statement for FullWidthImage className ([54045d4](https://github.com/SLB-Pizza/radio-pizza/commit/54045d4c5d9e8ea47fc6c4e1a48232c5315e5ed5))
* add base TwoImagesAndText layout to Storybook ([3f2fe9d](https://github.com/SLB-Pizza/radio-pizza/commit/3f2fe9dd896111a003a5f6706f3f115cdfd707fa))
* add Blockquote - two variations ([4f0b1bc](https://github.com/SLB-Pizza/radio-pizza/commit/4f0b1bc15e115a4ca063449c2bdf440ce5b02257))
* add Blockquote story; begin refactoring inline slice styles ([13a4968](https://github.com/SLB-Pizza/radio-pizza/commit/13a4968fefb81578d0a43143f3f433f97a1a2d2d))
* add dummy slides from Prismic; external link does not blank ([f688db8](https://github.com/SLB-Pizza/radio-pizza/commit/f688db8c48e0a779d4ff3da586c4c2a995cc78fd))
* add FeaturesQuery to Feature.js; display data object on /features/dev-text-feature-1 ([7ce1131](https://github.com/SLB-Pizza/radio-pizza/commit/7ce1131b0b23fab623410ee59f37222cf79d9637))
* add globalState ternary to Listen Live btn; needs functionality ([0a92878](https://github.com/SLB-Pizza/radio-pizza/commit/0a9287805e3a0f4ab3ef24494acd1bc029715967))
* add htmlSerializer to project ([62b8fd0](https://github.com/SLB-Pizza/radio-pizza/commit/62b8fd03bb9cb4e5cc629596df81e92907bdd6ac))
* add img to radio bar ([c1fb3b1](https://github.com/SLB-Pizza/radio-pizza/commit/c1fb3b13c89ba11a1c094fb38ce7ac949a341137)), closes [#71](https://github.com/SLB-Pizza/radio-pizza/issues/71)
* add long TwoParagraph story ([4163384](https://github.com/SLB-Pizza/radio-pizza/commit/41633844b407f72d74fc2d8949b330f9a137420e))
* add Nanoclamp to /events; remove bgColors ([ab1cc7e](https://github.com/SLB-Pizza/radio-pizza/commit/ab1cc7efedddb5c0d7dff618f3bb8813b4f8c51c))
* add pointer and grabbing cursors to <Slider> :hover and :active states ([097baa4](https://github.com/SLB-Pizza/radio-pizza/commit/097baa403b5db7bd0d845a0de75feb96c46864fd))
* add Poppins font; add base Blockquote slice ([ea88654](https://github.com/SLB-Pizza/radio-pizza/commit/ea886545483166ac947464e5cb91748036d1e8a6))
* add react-spring: /hero-test-3; address bottomNav OutsideClick ([b0e4e30](https://github.com/SLB-Pizza/radio-pizza/commit/b0e4e3019685659c324721ef411ce64142911084))
* add SampleFeature base to Storybook ([1005dea](https://github.com/SLB-Pizza/radio-pizza/commit/1005dea8959f4bde3ffd2efb761f8067d69df5cb))
* add SASS support to gatsby; FWI now display correctly ([f55e2eb](https://github.com/SLB-Pizza/radio-pizza/commit/f55e2ebb2184306e8537475a23fac38d0e0c4c34))
* add schedule selector base to /schedule ([c02125b](https://github.com/SLB-Pizza/radio-pizza/commit/c02125b0b6f91315f4b92933769be5358762986b))
* add Storybook to project; restructure slices/FWI props ([f61a423](https://github.com/SLB-Pizza/radio-pizza/commit/f61a42331807afc17224fe8fa4ed9bef9be62e08))
* add working OutsideClick base code to ScheduleBar ([c9f24a0](https://github.com/SLB-Pizza/radio-pizza/commit/c9f24a0c815ce244c87746e625c280c40209fe5f))
* add working slider with built-in links ([e40806d](https://github.com/SLB-Pizza/radio-pizza/commit/e40806d1149fe3123f1bb5d6253096aa37ae37b3))
* add working volume input slider; needs styling ([67a7c1a](https://github.com/SLB-Pizza/radio-pizza/commit/67a7c1a2ed8d8d64f3d6ebe6a2a494b80cd8286b))
* **Apollo:** add Apollo to project, base Schedule query works ([a8919eb](https://github.com/SLB-Pizza/radio-pizza/commit/a8919eb3a97b12189c5fd2d33a18ea717862432d)), closes [#25](https://github.com/SLB-Pizza/radio-pizza/issues/25)
* **ApolloProvider:** wrap root element ([959f77d](https://github.com/SLB-Pizza/radio-pizza/commit/959f77d78a7e760a57d22f6bccbe73d00e02af1d))
* **base:** add starter homepage image carousel code ([03a3885](https://github.com/SLB-Pizza/radio-pizza/commit/03a388599f529304c65e27b8f53dbe713ccc6589))
* begin adding slices to SliceZone; fix CMSHelp query ([0556d02](https://github.com/SLB-Pizza/radio-pizza/commit/0556d027233fcf7adb886c9dcd4e20a771ec28d9))
* begin text-truncate tests ([cb103a7](https://github.com/SLB-Pizza/radio-pizza/commit/cb103a7f5bba152f4626f0582dc54dd477190f5c))
* Blockquote - fix variable declarations and switch statement; now supports multi-paragraph quotes ([60875a5](https://github.com/SLB-Pizza/radio-pizza/commit/60875a5f49aec660e609490f298b9455765dc1d6))
* BottomNav social media icon links now open in new tab ([3790671](https://github.com/SLB-Pizza/radio-pizza/commit/379067138707544e5a29e408fea83b4b997e6260))
* **Card:** fix card height sizings; update play-icon hover effect ([70f8297](https://github.com/SLB-Pizza/radio-pizza/commit/70f8297f15929558fd21d7bc3bc555a63b1b04b5)), closes [#68](https://github.com/SLB-Pizza/radio-pizza/issues/68) [#97](https://github.com/SLB-Pizza/radio-pizza/issues/97)
* **CMSGuide:** build landing page with cards ([8a49ab9](https://github.com/SLB-Pizza/radio-pizza/commit/8a49ab9baa318a6d2353f027e9cbe18efb89d7d3)), closes [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117)
* **cmsNodeValidator:** get invalid mix case working ([77fee2c](https://github.com/SLB-Pizza/radio-pizza/commit/77fee2c8167f0fb50a6326aa21e677c5c6b1cacf))
* **Collections:** make base page for Collections ([773b6e9](https://github.com/SLB-Pizza/radio-pizza/commit/773b6e9c4486bc81a4c5d3c285b91780945f9ce4))
* convert Blockquote to SASS classes; add viewports to Storybook ([e3fbbc5](https://github.com/SLB-Pizza/radio-pizza/commit/e3fbbc5dff0bfd82b0645bd413ae6a0f5e7d1885))
* convert div layout to hero section; begin styling ([77523b7](https://github.com/SLB-Pizza/radio-pizza/commit/77523b760a663a5f13a9400806defc40d23b5c4e))
* convert OutsideClick internal HOC to independent component for use in BottomNav ([e7c5559](https://github.com/SLB-Pizza/radio-pizza/commit/e7c55599feeed2c7c9bf7ec807f5f3d67cf073c1))
* **Countdown:** add base countdown to Event ([ac91808](https://github.com/SLB-Pizza/radio-pizza/commit/ac9180828c0536f991cc10ad02905c278f3e3fbf))
* creat sample HeadlineBlock; connect it to front-end ([31cfdc2](https://github.com/SLB-Pizza/radio-pizza/commit/31cfdc274c0a4fb43c1373ddd0011690304378dd))
* create Home Content section in Homepage type; pass that data down to HomeContent ([659e1eb](https://github.com/SLB-Pizza/radio-pizza/commit/659e1eb60bc0ec9e6bab6aadd02fb0b6b3ce4044))
* create new /src/templates/index-page.js; renamed old ([b1a3367](https://github.com/SLB-Pizza/radio-pizza/commit/b1a33679e35ad8739108369ce4d419401fc4fcfc))
* **cron:** add a Github workflow cron job to project ([345f748](https://github.com/SLB-Pizza/radio-pizza/commit/345f748bd7c0be3b1c0782930b949398d9259e9c))
* **Curated:** add docs; pass mixLinks array as MixPlayOverlay prop ([7db30dc](https://github.com/SLB-Pizza/radio-pizza/commit/7db30dc6ce88ee45f93cbc6354b576da9748eac9)), closes [#128](https://github.com/SLB-Pizza/radio-pizza/issues/128)
* **Curated:** pull Residents and Tags into sets for use ([ce68b34](https://github.com/SLB-Pizza/radio-pizza/commit/ce68b34971f1d3c46684ce70163e41b2a6b20c0e))
* **Dropdown:** handle case where no shows are listed for today ([0ac673a](https://github.com/SLB-Pizza/radio-pizza/commit/0ac673a914d8866b4abad44fb4208a6aa4685b5f))
* **Dropdown:** pass show data to dropdown ([6374dd6](https://github.com/SLB-Pizza/radio-pizza/commit/6374dd6c26f2dccd805de55d863c5d31434ddcee)), closes [#19](https://github.com/SLB-Pizza/radio-pizza/issues/19)
* **embeds:** add .embed; fix touch sizing of iframes ([059d80a](https://github.com/SLB-Pizza/radio-pizza/commit/059d80ad171548d02aec0deae692e804910fbe8c))
* **Event:** add base Event template; temp at /events/event-test ([4f2b857](https://github.com/SLB-Pizza/radio-pizza/commit/4f2b8573db7de8fed97007911455acfda6ae9bb6))
* **Event:** add shrink effect to .event-timer on sticky ([82198f6](https://github.com/SLB-Pizza/radio-pizza/commit/82198f652b90933b4ca472c97940b1bf4858e7ab))
* **EventCountdown:** refactor into subcomponent ([12a1633](https://github.com/SLB-Pizza/radio-pizza/commit/12a1633d2ed7da90804a56200f3f9e383716cdcd))
* **EventCountdown:** set up base on scroll useEffect for once event-timer becomes sticky ([d4f04de](https://github.com/SLB-Pizza/radio-pizza/commit/d4f04de5526d7fde364b2ab536a57006f7a3b642))
* **Event:** get countdown timer components displaying correctly ([856cb2e](https://github.com/SLB-Pizza/radio-pizza/commit/856cb2e0173656186e2772ace51465a362dfa354))
* **Event:** get mapbox working in some form; might just make it a button a google map link ([690296e](https://github.com/SLB-Pizza/radio-pizza/commit/690296eb8aba7bf37a13aeb8e3328826597e7ec4))
* **EventHeader:** pass in headerButtonText and headerButtonLink ([e2341f8](https://github.com/SLB-Pizza/radio-pizza/commit/e2341f850c83266d19e8b9a264c03f755181835e))
* **Event:** pass data from template for EventCountdown ([c702818](https://github.com/SLB-Pizza/radio-pizza/commit/c702818e028f55abbff65fbaaa4f339dab89d7d7))
* **events:** map event CMS data to SingleEventCard ([c159578](https://github.com/SLB-Pizza/radio-pizza/commit/c159578ce74db13cfed02515736496a3a97528b2))
* **Event:** update queries for /events and Envent template ([8deaa0f](https://github.com/SLB-Pizza/radio-pizza/commit/8deaa0fabd6e35de19902424e911fab948563b62))
* **FallbackImage:** add image component fallback to SingleResident; ResidentBio ([9a86289](https://github.com/SLB-Pizza/radio-pizza/commit/9a862895e32c2c9f62809315c4f2088e100180b4))
* **Feature:** make article authors optional through short-circuit ([103eb60](https://github.com/SLB-Pizza/radio-pizza/commit/103eb60e41feba31911554316e93b41f46a2c590))
* **Feature:** make base /pages/features layout ([590b2b4](https://github.com/SLB-Pizza/radio-pizza/commit/590b2b405781e4e555e3d7d6b58fa03da54e3e03))
* **features:** add base /features/ query ([7caf4e9](https://github.com/SLB-Pizza/radio-pizza/commit/7caf4e9b720cce0b1d826450e1c050f3f8da0bc4))
* fix broken Storybook Blockquote props ([9230c0b](https://github.com/SLB-Pizza/radio-pizza/commit/9230c0b9191f6b23a18f5345511c47dd7648b57d))
* **FullWidthImage:** add this slice to CMSGuide ([030a426](https://github.com/SLB-Pizza/radio-pizza/commit/030a42656dcb0b4aef066dfaa6967bf18ae5f0e6))
* FWI displays, albeit wrongly; working to include SASS support ([2bc32ba](https://github.com/SLB-Pizza/radio-pizza/commit/2bc32ba7857d1635f57241f7cec1d30c408267a3))
* **GCP:** add SET_CLOCK_TIME dispatch ([573fe5e](https://github.com/SLB-Pizza/radio-pizza/commit/573fe5ecb673afc0a6695fb173c45f4cc3a5b83e))
* get TwoImagesAndText working with Prismic sourced data ([ded25e8](https://github.com/SLB-Pizza/radio-pizza/commit/ded25e8423f0f200e4e6c9a2ef1b7f8e10cf17da))
* **Hero:** add HeroArrows component using SVGR ([e16adaa](https://github.com/SLB-Pizza/radio-pizza/commit/e16adaa0e1dbfd9c4633d0a0db94ed6b8a978b9e))
* **Hero:** add SVG HeroArrows component ([708d076](https://github.com/SLB-Pizza/radio-pizza/commit/708d076e720da09e817cdbc34e97d5be87e8c9d2))
* **Hero:** update IndexPageQuery to include document _meta; add link processing ([dea3fa8](https://github.com/SLB-Pizza/radio-pizza/commit/dea3fa8acbd398ed30541ff11a00a78395772c35))
* **HomeFeatures:** add Editorials section to Prismic ([27520c0](https://github.com/SLB-Pizza/radio-pizza/commit/27520c09edb2e9196175aa92d1f03929ac7dea76))
* **HomeFeatures:** pass and map homeFeaturesData correctly ([64a0d2a](https://github.com/SLB-Pizza/radio-pizza/commit/64a0d2a1166051feccb9ccaba378f822620dc127)), closes [#118](https://github.com/SLB-Pizza/radio-pizza/issues/118)
* **HomeMixes:** add Sound Selects section to index ([94fd467](https://github.com/SLB-Pizza/radio-pizza/commit/94fd467d12aa9b5c9c988de49f515b3aaff1d44f))
* **HomeMixes:** pass and map homeMixesData correctly ([75b47af](https://github.com/SLB-Pizza/radio-pizza/commit/75b47af2954513a9cc6a05d1918421b1631d0459)), closes [#118](https://github.com/SLB-Pizza/radio-pizza/issues/118)
* **ImageHelper:** add onClick image modal; move photo data to modal ([2e1ce13](https://github.com/SLB-Pizza/radio-pizza/commit/2e1ce13a74ea66c1b56039ffe162c7f51d4cc20b)), closes [#116](https://github.com/SLB-Pizza/radio-pizza/issues/116) [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117)
* **ImageHelper:** add pointer cursor; img alt txt ([14d9940](https://github.com/SLB-Pizza/radio-pizza/commit/14d9940695ade93e452816a80aed76dd2a430854))
* **ImageHelper:** convert img element to react-imgix ([1729881](https://github.com/SLB-Pizza/radio-pizza/commit/1729881de15de19806505e4956fd7f9119467b62)), closes [#122](https://github.com/SLB-Pizza/radio-pizza/issues/122)
* **ImageHelper:** revert react-imgix components ([4b7370f](https://github.com/SLB-Pizza/radio-pizza/commit/4b7370f44cbba3a5a6f4e4c8f691bd8bbb243af3)), closes [#122](https://github.com/SLB-Pizza/radio-pizza/issues/122)
* **ImageRow:** fix CMSGuide and Feature queries ([cad6cf7](https://github.com/SLB-Pizza/radio-pizza/commit/cad6cf770af2a7af2411868ede572dfb82b1c3b5)), closes [#71](https://github.com/SLB-Pizza/radio-pizza/issues/71)
* **Inline Image:** add figcaption; add key ([6701317](https://github.com/SLB-Pizza/radio-pizza/commit/67013170743892d6e3d46ad0b036402f7e9f1bbb))
* install base prismic setup; testing next commit ([ef66f77](https://github.com/SLB-Pizza/radio-pizza/commit/ef66f778b46f4bd61493771c351411c82d6f9e77))
* **layout:** add toggle to show search layout ([0b76795](https://github.com/SLB-Pizza/radio-pizza/commit/0b7679524b139829c59023bfe3ed5ba02bded38b)), closes [#82](https://github.com/SLB-Pizza/radio-pizza/issues/82)
* **linkResolver:** add 'feature' case ([63924f2](https://github.com/SLB-Pizza/radio-pizza/commit/63924f28a3a4706cc6f7cc1fe2c3b27b478c888c))
* **linkResolver:** add 'resident' case; default ([de59542](https://github.com/SLB-Pizza/radio-pizza/commit/de59542106f8d04db59ee951059b80d672b5efbb))
* **links:** add /mixes case ([689a9a1](https://github.com/SLB-Pizza/radio-pizza/commit/689a9a1b9786ec85df3272969b6094f05511ac25))
* make bottom nav slogan link to home ([27cad2d](https://github.com/SLB-Pizza/radio-pizza/commit/27cad2dbb38c60645e25121c9089ac43b61f25ab)), closes [#102](https://github.com/SLB-Pizza/radio-pizza/issues/102)
* make BottomNav use globalContext to open/close; refactor OutsideClick.js ([4a780c4](https://github.com/SLB-Pizza/radio-pizza/commit/4a780c419441b1e6e78b9ce7649d4a5c410faf50))
* make DateSelectorButton a component; add ScheduleShowEntry ([e38dbec](https://github.com/SLB-Pizza/radio-pizza/commit/e38dbeca30b8ea1ebdcff24a48960ea032b36561))
* make dropdown schedule close onClick outside ScheduleBar ([59feb76](https://github.com/SLB-Pizza/radio-pizza/commit/59feb76847276db192ca7bc737bedb0a9844c489))
* make HeadlineBlock process and display latest pub date properly ([5a11f10](https://github.com/SLB-Pizza/radio-pizza/commit/5a11f10c9b75cad67d993e5467d37f6239d74ab4))
* make Staff custom type; add to HeadlineBlock; add updated publication check ([bf94da6](https://github.com/SLB-Pizza/radio-pizza/commit/bf94da6f05dd4e8a4ff9e8db1c7c344e6fa88c7a))
* **mappableDataCheck:** write and test function to prevent unmappable data from being passed to LayoutComponents ([3f75d40](https://github.com/SLB-Pizza/radio-pizza/commit/3f75d406dea14bbab287f6dc8c85394908560c58))
* **Mix:** add gatsby-config and mixData display ([a9dcb18](https://github.com/SLB-Pizza/radio-pizza/commit/a9dcb18d3e7e5a327eec81166b170b59e2be750c))
* **Mix:** create base template ([21e2d8a](https://github.com/SLB-Pizza/radio-pizza/commit/21e2d8ab887249070199296c0ed39490a449b06a))
* **MixPlayOverlay:** rework into card-image container; reorganize card styling ([c395880](https://github.com/SLB-Pizza/radio-pizza/commit/c395880ac4b31644b5057e94ab7e6d940576c06b))
* **Mix:** replace getResidentLinks with Link to Mix page ([d174191](https://github.com/SLB-Pizza/radio-pizza/commit/d17419185f1047d8bc2ec42684da7ff8e0e87699))
* move cms-help components to folder; add HomeContent to /cms-help ([ddf8fba](https://github.com/SLB-Pizza/radio-pizza/commit/ddf8fba8f8a1a77e920e7b8495927f04f4ebbe10))
* **password:** add base password protection for /cms-help ([a9543b0](https://github.com/SLB-Pizza/radio-pizza/commit/a9543b03370bf6a3f3065a7aa9ce2daac7e8b0e9))
* **protect:** password-protect /cms-guide route ([29c421e](https://github.com/SLB-Pizza/radio-pizza/commit/29c421e096114a9bf5433ba997506db9d5463b0b))
* pull out CMSSlides as component; update help layout ([368fa60](https://github.com/SLB-Pizza/radio-pizza/commit/368fa6094a28faf015b8922a026c5ddb5468fe43))
* **queries:** extract getDefaultMix query ([fcc29fb](https://github.com/SLB-Pizza/radio-pizza/commit/fcc29fb09dfe1fc1e19e1d5eae2a6699ff67cb58))
* **RadioBar:** set times in TopNav, pass as props to RadioBar ([ad29902](https://github.com/SLB-Pizza/radio-pizza/commit/ad299020290436b05f979ad2db3f1a59545fdbb8))
* **RadioPlayer:** pull and set initial mix data from query ([53971fe](https://github.com/SLB-Pizza/radio-pizza/commit/53971fed09ca80347c82eb69ee5cd8700d902810))
* re-enable schedule dropdown for mobile; disable modal ([b9d1a97](https://github.com/SLB-Pizza/radio-pizza/commit/b9d1a972a02a8735c960d9436448b4d30d9aad8b))
* remake Blockquote in CMS; update Blockquote component; update Features query ([5edbd31](https://github.com/SLB-Pizza/radio-pizza/commit/5edbd31c843afeddcf9de44462467c2691bfc69f))
* remove play button from SingleMixCard ([5423a2d](https://github.com/SLB-Pizza/radio-pizza/commit/5423a2d356024e6c656ee6578fbea544c18dfd5b)), closes [#113](https://github.com/SLB-Pizza/radio-pizza/issues/113)
* replace Hero.js content with /hero-test-4 index ([0b43641](https://github.com/SLB-Pizza/radio-pizza/commit/0b43641ab305baa10cd6fa0f08553723d29a29ef))
* **Resident:** add Mix _meta to link to Mix page ([59713da](https://github.com/SLB-Pizza/radio-pizza/commit/59713da43c376632a617e8aefaaf0d0b41f1446f))
* **Resident:** make mobile content selector sticky ([64c1fba](https://github.com/SLB-Pizza/radio-pizza/commit/64c1fba6cff27151114a92de0dfdfaf347646ace))
* **Resident:** map resident mixes to /resident/:uid ([178834c](https://github.com/SLB-Pizza/radio-pizza/commit/178834c91a54ae1efef395d50461737edae11df2)), closes [#121](https://github.com/SLB-Pizza/radio-pizza/issues/121)
* **resident:** map sticky-bio of Resident ([f57f2f7](https://github.com/SLB-Pizza/radio-pizza/commit/f57f2f77a86ad76d8494ef31fd1da2fa0385b136)), closes [#120](https://github.com/SLB-Pizza/radio-pizza/issues/120)
* **Resident:** update query; display data on resident template page ([bb7f1ee](https://github.com/SLB-Pizza/radio-pizza/commit/bb7f1ee063fbb5f3290c9ba0fc2be39382037f03))
* **Resident:** use mappableDataCheck to only display columns with content ([f8ff12a](https://github.com/SLB-Pizza/radio-pizza/commit/f8ff12a5559ab88c4d220b1c140ac9d0213ee9b7))
* schedule dropdown closes on 'Full Schedule' click ([994ce0a](https://github.com/SLB-Pizza/radio-pizza/commit/994ce0a4b180a4418f997d96bd4f438fbfba5481))
* **ScheduleBar:** process and show data in bar ([6a20827](https://github.com/SLB-Pizza/radio-pizza/commit/6a20827ebcade1f8cf0095a5c2c418a27fd029f0))
* **ScheduleBar:** use timeNow to query AllSchedules ([d5f2104](https://github.com/SLB-Pizza/radio-pizza/commit/d5f2104ac46a3cf311eca1039ca6a09eb83938dc)), closes [#25](https://github.com/SLB-Pizza/radio-pizza/issues/25)
* **SingleMixCard:** add default img string and FallbackImage component ([5767f85](https://github.com/SLB-Pizza/radio-pizza/commit/5767f856d59ef27be2aca284bfa43e1c5c54a7dd))
* **slice:** add ImageRow slice base ([5098896](https://github.com/SLB-Pizza/radio-pizza/commit/5098896ab997f85e2f05c951344e3de71add9a07)), closes [#116](https://github.com/SLB-Pizza/radio-pizza/issues/116) [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117)
* **slices:** add 'headline-block' class; dummy data ([1b00929](https://github.com/SLB-Pizza/radio-pizza/commit/1b00929aefe9f6aa728c15d54f2e3f6292ce6061))
* **slices:** add base ParallaxHeadlineBlock v1 ([2eeda9a](https://github.com/SLB-Pizza/radio-pizza/commit/2eeda9ae6388cfe255dd200deb0e3f9475672252))
* **slices:** create ParallaxHeadline base slice ([71ac143](https://github.com/SLB-Pizza/radio-pizza/commit/71ac143523f4b7fba7ac477677c9ee1f867bb40b))
* **slices:** make OIAT slice switch layout types ([1dc9b06](https://github.com/SLB-Pizza/radio-pizza/commit/1dc9b069e6d6f3b69854da5d5f6ba09075d3d740)), closes [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117) [#118](https://github.com/SLB-Pizza/radio-pizza/issues/118)
* **slices:** make TextBlock slice; set base style ([6603e34](https://github.com/SLB-Pizza/radio-pizza/commit/6603e341f315365b0b0b6c681b04cbe74cd3face))
* **slice:** TIAT - fix layout selector; add stories ([8855cb5](https://github.com/SLB-Pizza/radio-pizza/commit/8855cb58043ba68ddb5541ba68be0d46167a9c37)), closes [#116](https://github.com/SLB-Pizza/radio-pizza/issues/116) [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117)
* **storybook:** add left and right OneImageAndText stories ([5eb9203](https://github.com/SLB-Pizza/radio-pizza/commit/5eb9203abf6eb1e4efcc1b57d1191d3cee0764d5)), closes [#116](https://github.com/SLB-Pizza/radio-pizza/issues/116) [#117](https://github.com/SLB-Pizza/radio-pizza/issues/117)
* **style:** add pulsing bottom border to schedule-bar .is-live ([46c2ca6](https://github.com/SLB-Pizza/radio-pizza/commit/46c2ca6c5ba6ff0b10f26892d0ee29fde3cc0d97))
* successfully bring in Blockquote to /features/dev-test-feature-1 ([dcc7180](https://github.com/SLB-Pizza/radio-pizza/commit/dcc7180dc0ebe4edd078eaf3d0ea4b0355e48b09))
* **TagButtons:** make component for use outside card ([4f3ff51](https://github.com/SLB-Pizza/radio-pizza/commit/4f3ff51dc5c71dd9ea914c409f83005f06c47674))
* **test:** install react-awesome-slider on /hero-test-2 ([1d8a564](https://github.com/SLB-Pizza/radio-pizza/commit/1d8a56451640456da5bd7cf22f241ee0f09348da))
* **TextBlock:** add linkResolver to component ([3dca673](https://github.com/SLB-Pizza/radio-pizza/commit/3dca67328e3fb37d8a1002a6498cb43cb6413d53))
* **TextBlock:** componentize RichText; pass htmlSerializer ([aeac1f7](https://github.com/SLB-Pizza/radio-pizza/commit/aeac1f700ef49c5076553c903c9a0eecc5e04f24))
* **TopicPageHero:** create TopicPageHero and TopicHeroPageDetails components to begin making landing pages generic ([98b9337](https://github.com/SLB-Pizza/radio-pizza/commit/98b9337def82f4d9638a438c631d4e95e6e5cc14))
* **TopicPageHighlightSection:** make component that feeds in layout component to highlight section a la SliceZone ([585df2d](https://github.com/SLB-Pizza/radio-pizza/commit/585df2d8d6fab4eef8b75ee0adc05f1746d8b774))
* update .cms-warning; add bgAlt check ([4cb3d86](https://github.com/SLB-Pizza/radio-pizza/commit/4cb3d8692283d65a0f7cc8269c28595d8f7a49fc))
* update g-config for Feature type; get Feature template working ([1352e18](https://github.com/SLB-Pizza/radio-pizza/commit/1352e1877e71df4ec3ea8a127f6e9ad836431a96))
* wrap SingleEventCard with eventColumnLayout; refactor /events, /search ([5a9b5c3](https://github.com/SLB-Pizza/radio-pizza/commit/5a9b5c31a1cda8b9ff725de2627617bdc4e0abd0))



