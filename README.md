# Heavy Industries `vue-trans`

A Vue plugin to help transition elements in and out upon page navigation. Depends on Vue Router and Vuex.

## Warning

This project works, and it's fun to play with, but it needs documentation and testing. Use at your own risk.

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
<script src="https://unpkg.com/@heavyind/vue-trans"></script>
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

1. **Install** After you have a reference to `VueTrans`, you're going to have to install it. It depends on Vuex, so you'll also need to pass your store and router instances in. For the sake of this example, we're also going to set `mixin` to true:

```
Vue.use(VueTrans, { store, router, mixin: true });
```

We'll talk more about the mixin flag later.

2. **Initialize** In most cases you just want to call the built-in `initialize` function in your main App component's `mounted` hook*:

```
new Vue ({
    el: "#app",
    //...
    mounted () {
        this.$trans.initialize();
    }
});
```

3. **Replace** First, replace your `<router-view>` with the now-global `<trans-view>`. For any links that you want to use to trigger a route transition, use `<trans-link>` instead of `<router-link>`.

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

.fifo-leave-active {
  opacity: 0;
  transition: opacity;
}
```

You can also set durations within CSS; they'll be sniffed automatically to defer the route transition. It's a giant win for reusability, though, to author styles such that they simply declare what property you'd like to transition (here `opacity`), and leave the timing to each `<trans>`. Note that all `duration` values are in milliseconds, and can be specified by an integer as well as an object: `{ enter: n1, leave: n2 }`. If an integer is passed (e.g., `:duration="200"`), this value is used for both `enter` and `leave`.


### Usage with `{ mixin: false }`

When you set `{ mixin: true }`, a global mixin is used to attach the `$trans` property to each of your Vue components. It is convenient, but set to `false` by default because this package intends to make no assumptions about your code. If you prefer not to use it, you may include the mixin on a per-component basis: 

```
import { createTransMixin } from "@heavyind/vue-trans";


// Within your component
export default {
  // ...
  mixins: [createTransMixin(cfg)]
  // ...
}
```

The `cfg` object takes your `storeNamespace` and `mixinNamespace`. If you don't pass a `cfg`, `storeNamespace` will default to `"trans"` and `mixinNamespace` will default to `"$trans"`. Alternatively, simply alias the necessary Vuex actions within the component you're using. For most applications you'll only need the `initialize` action, anyway.

---

*A note on initializing: Usage without initializing is undefined, and it notably breaks configuration options like `showOnce`, which allows you to transition an element in only once per instance of the app (think global navigation headers). It's not called for you within the plugin because you might want to defer it until, say, a loading screen has finished, so that transitions react only after the main app content has been furnished.

## Configuration

VueTrans configuration requires your Vuex store and allows for configuration of other attributes.

### Default configuration

The default configuration object looks like this:

```
{ store: null,
  router: null,
  mixin: false,
  mixinNamespace: "$trans",
  storeNamespace: "trans",
  transComponentName: "trans",
  transLinkComponentName: "trans-link",
  transViewComponentName: "trans-view"
}
```

In most cases you'll likely only want to change `store`, `router`, and maybe `mixin`. The other options are there if you anticipate a naming collision between the default VueTrans namespaces and your project.

### Configuration in-depth 

`store` *Store*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The store instance you intend to use.

`router` *Router*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The router instance you intend to use.

`mixin` *Boolean*?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Whether or not you would like to include a global mixin to alias certain properties and actions (via `mixinNamespace`).

`mixinNamespace` *String*?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The name bound globally to your components to alias certain properties and actions should `mixin` be set to `true` in your configuration object. Defaults to `"$trans"`.

`storeNamespace` *String*?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The namespace used within your store. It defaults to `"trans"`.

`transComponentName` *String*?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The global name of the Trans component. Defaults to `"trans"` (e.g., `<trans>`). Must adhere to Vue's rules about component names.

`transLinkComponentName` *String*?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The global name of the TransLink component. Defaults to `"trans-link"` (e.g., `<trans-link>`). Must adhere to Vue's rules about component names.

`transViewComponentName` *String*?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The global name of the TransView component. Defaults to `"trans-view"` (e.g., `<trans-view>`). Must adhere to Vue's rules about component names.

## Building for development

Clone, `cd`, install, and build:

```
$ git clone https://github.com/heavyind/vue-trans && cd vue-trans
$ npm i
$ npm run watch
```

This project uses Rollup.

## Caveats

Currently, `<trans>` components must exist in some parent element of the page component they're being used in. For instance, in a single file component's `<template>`, don't use `<trans>` as the top-level element. In a template string or render function for a page, just make sure it's wrapped in something else (e.g., `"<div><trans></trans></div>"`).

## How it works from 10,000 feet

Say you want to create a leave animation on particular sub-components in your app (while keeping its architecture sane). You might be aware that Vue offers `<transition>` components that can be applied to `<router-view>`. You might also know that there's an optional explicit `duration` prop that, given no styling, allows the route view to simply remain in-DOM until it times out. So you imagine you can set the leave duration here to *n* milliseconds in order to delay overarching route transitions, giving sub-components enough time to animate their leave transitions. Easy enough, right?

Well, no. First of all, there's a sequencing issue: by this time, Vue has already pruned the route view from the virtual DOM, so it won't propagate any flags down to child components to tell them it's time to leave. Once you solve that issue, you'll have to sort out how long the leave duration of the transition on `<router-view>` should be when sub-components can have arbitrary values. Ideally, we'd set it to the same duration as the longest leave duration of any sub-component on a given page, but how? And what if we want to override *that* value with a hardcoded one in particular instances, like when we click a special link? It can get very messy very fast.

Here's how VueTrans solves this: when a `<trans-link>` is clicked, navigation is deferred and `<trans>` components are notified that they'll have to start leaving. This gives them a window during which to start their CSS transitions, which are honored in-DOM even after their VNodes are pruned. Next the transition durations of elements wrapped in `<trans>` components are sniffed and logged. The max of these durations is then set as the explicit duration of the `<transition>` over `<router-view>` within the wrapper component `<trans-router-view>`. If explicit durations are set on `<trans>` components, these override sniffed durations. At last, navigation is begun, with everything in its right place for a smooth page transition out. 


## License

MIT
