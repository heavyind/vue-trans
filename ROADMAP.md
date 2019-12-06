1. Test coverage
2. Explore whether or not TranksLink is even necessary in most cases (it's probably not)
  - Pass router to Plugin in config to access `beforeEach`
  - Pass config boolean `transOnRouterLink` to represent whether or not transitions should fire on
    on `<router-link>` navigations (defaults to `true`).
  - Use TransLink only in special circumstances where explicit durations are required.
