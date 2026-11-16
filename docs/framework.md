# MD•APP Framework

## Pages
`content/pages/*.md` automatically become routes.

## Modules
`content/modules/*.md` automatically become reusable UI snippets.

## Built-in applications
Pages can declare a runtime application in frontmatter:

```md
---
title: Ingolf
app: golf
---
```

The runtime maps `app` to the built-in application and keeps the page declarative.

## Module syntax

@module
key: value
@end

## Philosophy
Keep application logic in the runtime and application content/composition in MD.
