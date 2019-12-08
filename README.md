# Heavy Industries `vue-trans`

A Vue plugin to help transition elements in and out upon page navigation. Depends on Vue Router and Vuex.

## Warning

This package is very alpha. It works, and it's fun to play with, but it needs documentation and testing. Use at your own risk.

## Why?

Because it's tricky do to certain transitions—particularly leave transitions—without a little extra help. Vue's philosophy is that the route is the single source of truth for a given view. In principle, when the URL changes, the view must immediately update, leaving no time for fancy out-transition effects. Fortunately, it's *possible* with a little cleverness, and this plugin is designed to automate that cleverness away.

## Installation

Via npm:

```
$ npm install --save @heavyind/vue-trans
```

Via yarn:

```
yarn add @heavyind/vue-trans
```

Via unpkg:

```
<script src="http://unpkg.com/@heavyind/vue-trans"></script>
```

## Usage

### How it's exposed in a build system:

Easy peasy:

```
import VueTrans from '@heavyind/vue-trans';
````

#### How it's exposed from a `<script>` tag:

Including the unpkg script exposes a the plugin globally as VueTrans. For a sanity check:

```
console.log(VueTrans);
```

### Putting it all together

1. **Install** After you have a reference to `VueTrans`, you're going to have to install it. It depends on Vuex, so you'll also need to pass your store in:

```
Vue.use(VueTrans, myStore);
```

2. **Initialize** In most cases you just want to call the built-in `transInitialize` function in your main App component's `mounted` hook*:
```
new Vue ({
    el: "#app",
    //...
    mounted () {
        this.transInitialize();
    }
});
```

3. **Replace** First, replace your `<router-view>` with the now-global `<trans-router-view>`. For any links that you want to use to trigger a route transition, use `<trans-link>` instead of `<router-link>`.

4. **Write a trans** Use the global `<trans>` component to wrap the content that you'd like to transition in and out. Here's an example of what that might look like.

Within `<template>`:
```
<trans name="fifo" :duration="500">
    <h1>Welcome</h1>
</trans>
```
Within `<style>`:
```
.fifo-enter-active {
    opacity: 1;
    transition: opacity;
}
.fifo-enter {
    opacity: 0;
}
</style>
```

You can also set durations within CSS; they'll be sniffed automatically to defer the route transition. It's a giant win for reusability, though, to leave styles such that they simply declare what property you'd like to transition (here `opacity`), and leave the timing to each `<trans>`. All `duration` values are in milliseconds, and can be specified by an object: `{ enter: n1, leave: n2 }`. If just a number is passed (e.g., `:duration="200"`), this value is used for both `enter` and `leave`.

---

A note on initializing: Usage without initializing is undefined, and it notably breaks configuration options like `showOnce`, which allows you to transition an element in only once per instance of the app (think global navigation headers). It's not called for you within the plugin because You might want to defer it until, say, a loading screen has finished, so that transitions react only after the main app content has been furnished.

## Building for development

Clone, `cd`, install, and build:

```
$ git clone https://github.com/heavyind/vue-trans && cd vue-trans
$ npm i
$ npm run watch
```

This project uses Rollup.

## Caveats

Currently, `<trans>` components must exist in some parent element of the page component they're being used in. For instance, in a SFC `<template>`, don't use `<trans>` as the top-level element. In a template string or render function for a page, just make sure it's wrapped in something else (e.g., `"<div><trans></trans></div>"`).

## How it works from 10,000 feet

Vue offers `<transitions>`s that can be applied to the `<router-view>` with an optional explicit `duration` prop that, given no styling, allows the route view to simply remain in-DOM until it times out. So you set the leave duration to *n* milliseconds and now you've delayed overarching route transitions, giving subcomponents enough time to animate their leave transitions. Easy enough, right?

Well, no. First of all, there's a sequencing issue: by this time, Vue has already pruned the route view from the virtual DOM, so it won't propagate any flags down to child components to tell them it's time to leave. Once you solve that issue, you'll have to sort out how long the leave duration of the transition on `<router-view>` should be when subcomponents can have arbitrary values. Ideally, we'd set it to the same duration as the longest leave duration of any subcomponent on a given page, but how? And what if we want to override *that* value with a hardcoded one in particular instances, like when we click a special link? It can get very messy very fast.

Here's how VueTrans solves this: when a `<trans-link>` is clicked, navigation is deferred until `<trans>` components are notified that they'll have to start leaving. This gives them a window during which to start their CSS transitions, which are honored in-DOM even after their VNodes are pruned. After click and before navigation, the transition durations of elements wrapped in `<trans>` components are sniffed and logged. The max of these durations is then set as the explicit duration of the `<transition>` over `<router-view>` within the wrapper component `<trans-router-view>`. If explicit durations are set on `<trans>` components, these override sniffed durations. At last, navigation is begun, with everything in its right place for a smooth page transition out. 


## License

MIT
