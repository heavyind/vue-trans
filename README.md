# Heavy Industries `vue-trans`

## What this is

You're looking at a Vue plugin to help transition elements in and out upon page transition.

## Why this is

Because it's tricky to do so without a little extra help. Page leave animations are particularly thorny, owing to Vue's philosophy that the route is the single source of truth for a given view. In principle, when the URL changes, the view must also instantly change.

## From 10,000 feet

Vue also offers transitions that can be applied to the `<router-view>` with an optional explicit `duration` prop. Using this, we can delay overarching route transitions, giving subcomponents enough time to animate their transitions out. Easy, except not. How long, for instance, should the leave duration of the transition on `<router-view>` be, when subcomponents can have arbitrary leave durations? Ideally, we'd set it to the same duration as the longest leave duration of any subcomponent on a given page. That's handled for you with `vue-trans`.

## How to use

The plumbing is pretty simple, actually: trade `<router-link>` for `<trans-link>` any time you want to trigger animations, and reflect your app's routing through `<trans-router-view>` instead of plain ol' `<router-view>`. Any element or component that you'd like to attach a transition to can simply be wrapped as `<trans><my-component></my-component></trans>`, et *voilà*: you're done.
