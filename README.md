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
<script src="https://unpkg.com/@heavyind/vue-trans@0.0.3/dist/vue-trans.umd.js"></script>
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

Vue offers `<transitions>`s that can be applied to the `<router-view>` with an optional explicit `duration` prop that, given no styling, allows the route view to simply remain in-DOM until it times out. Imagine this transition's leave duration to `500ms', one can delay overarching route transitions, giving subcomponents enough time to animate their leave transitions. Easy!

Except not. How long, for instance, should the leave duration of the transition on `<router-view>` be, when subcomponents can have arbitrary leave durations? Ideally, we'd set it to the same duration as the longest leave duration of any subcomponent on a given page. And what if we want to do something like override the value we just calculated in special circumstances, for instance for a particular link? It can get very messy very fast.


## License

MIT
