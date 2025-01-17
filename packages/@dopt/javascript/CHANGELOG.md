# @dopt/javascript

## 2.0.4

### Patch Changes

- Updated dependencies [aba3913d6]
  - @dopt/javascript-common@2.0.1

## 2.0.3

### Patch Changes

- bfb03f6c: Ensure that optimisticUpdates only trigger when blocks are active. This ensures that blocks don't artificially get marked as `entered: true` and `exited: true`. These state fields were newly introduced in 2.0.0. Additionally, update `@dopt/javascript` README.md to reflect changes to state management and subscribe in v2.0.0.

## 2.0.2

### Patch Changes

- 76103615: fixing formatting

## 2.0.1

### Patch Changes

- 1d53d9a0: For `Block<T>` interface and class types, update to an optional `T = unknown` generic. This will allow consumers to reference `Block` without having to write out `Block<unknown>`. Also, update Dopt's getting-started-checklist example to reflect this change.

## 2.0.0

### Major Changes

- 60df5938: ## Deprecation of Group blocks

  The 2.0.0 release will be removing the Group blocks from Dopt. This includes access to the Group blocks in the canvas, APIs, and SDKs.

  **tl;dr** We thought the abstraction of the Group block would be useful, but we’ve found it can be hard to understand and doesn’t support the logic needed for many flows. We think the new functionality added in this release (e.g., named paths, back paths, Gate blocks, branching on user properties) strike a better balance between being explicit and composable. Below you will find a more detailed explanation of how these changes manifest in the SDK.

  ## `Block`

  ### Object changes

  We've migrated the `state()` function to be a `state` accessor (property). Instead of calling `block.state()`, you will now do `block.state`.

  ```diff
  - block.state()
  + block.state
  ```

  We've renamed the `completed` state to `exited`. Because blocks can now be accessed multiple times with cyclic paths, `exited` is more meaningful.

  ```diff
  - block.state.completed
  + block.state.exited
  ```

  We've renamed the `getField` function on the block instance to `field` to match our other accessors.

  ```diff
  - block.getField('field-name')
  + block.field('field-name')
  ```

  `block.subscribe(listener)` now calls your `listener` with the `block` instance rather than just a data representation. This means that you can now call the `field` accessor, use the `transition` function, and more, with the `subscribe` function.

  ```js
  block.subscribe((changed) => changed.field('field-name'));
  ```

  ### Transitions

  The block object representation has also changed to accommodate for edges in the flow having names (called transitions).

  To support transitions, we've removed the `complete` function on blocks and replaced it with a `transition` function that can be used to specify what path to traverse from this block. The new `transition` methods requires the name of the `transition` (the label on the edge) you are transitioning to. All pre-existing edges will be migrated to be named 'default';

  ```diff
  - block.complete();
  + block.transition('default');
  ```

  We’ve also added a `transitioned` object to the block that will track the state of those paths, e.g., if the user moves along an outgoing path `next` from a block named `A`, the `block.transitioned.next` on block `A` value would change from `false` to `true`.

  The properties of the transition object are a function of the paths in the flow you’ve designed in Dopt. To flexibly accommodate for that, the block is generic with respect to the transitions associated with it.

  ```ts
  const block = dopt.block<['edge-one', 'edge-two']>('edge-id');
  ```

  You can find examples of how to instantiate these blocks with generics at [app.dopt.com](https://app.dopt.com) when you select step blocks within a flow.

  ### Removed group methods

  The following methods were all associated with groups which are deprecated.

  - `block.next`
  - `block.prev`
  - `block.goTo`
  - `block.getCompleted`
  - `block.getUncompleted`
  - `block.getActive`
  - `block.getInactive`

  ## `Flow`

  ### Object changes

  We've migrated the `state()` function to be a `state` accessor (property). Instead of calling `flow.state()`, you will now do `flow.state`.

  ```diff
  - flow.state()
  + flow.state
  ```

  The flow `exited` state has been renamed to `stopped`. The flow `exit` function has been renamed to `stop`.

  ```diff
  - flow.state.exited
  + flow.state.stopped

  - flow.exit()
  + flow.stop()
  ```

  The flow `completed` state has been renamed to `finished`. The flow `complete` function has been renamed to `finish`.

  ```diff
  - flow.state.completed
  + flow.state.finished

  - flow.complete()
  + flow.finish()
  ```

  The `flow.blocks()` function now returns full, up-to-date block instances on which methods like `field` and `transition` can be called.

  ```js
  const blocks = flow.blocks();
  blocks.forEach((block) => block.field('field-name'));
  blocks.forEach((block) => block.transition('default'));
  ```

  `flow.subscribe(listener)` now calls your `listener` with the `flow` instance rather than just a data representation. This means that you can now call the `blocks` accessor, access intent functions, and more with the `subscribe` function.

  ```js
  flow.subscribe((changed) => changed.blocks());
  ```

### Patch Changes

- Updated dependencies [60df5938]
  - @dopt/javascript-common@2.0.0

## 1.4.2

### Patch Changes

- 3398b437: adding group update support on sockets
- Updated dependencies [3398b437]
  - @dopt/javascript-common@1.4.5

## 1.4.1

### Patch Changes

- Updated dependencies [2191b727]
  - @dopt/block-types@3.0.1
  - @dopt/javascript-common@1.4.4

## 1.4.0

### Minor Changes

- a6ab2cc0: add support for uid and sid for blocks
- 7fba401d: make version parameter optional in `dopt.flow(..., version)`; make all intent functions like `complete` return void instead of a promise; unify `dopt.initialized()` to have the same meaning as `useDoptInitialized` in @dopt/react; add a `flow.initialized()` function which maps to `useFlowStatus` in @dopt/react.

## 1.3.5

### Patch Changes

- 7d57b37e: add support for sid. and still support uids
- Updated dependencies [7d57b37e]
  - @dopt/javascript-common@1.4.3

## 1.3.4

### Patch Changes

- 7440d099: moves type definitions from common library into the respective places in which they're used; removes unused type definitions; cleans up typedocs; makes sure that all @dopt/react intents do not return values
- Updated dependencies [7440d099]
  - @dopt/javascript-common@1.4.2

## 1.3.3

### Patch Changes

- Updated dependencies [d632e58e]
  - @dopt/javascript-common@1.4.1

## 1.3.2

### Patch Changes

- Updated dependencies [ef9377e2]
  - @dopt/javascript-common@1.4.0

## 1.3.1

### Patch Changes

- Updated dependencies [e619b78e]
- Updated dependencies [e619b78e]
  - @dopt/block-types@3.0.0
  - @dopt/javascript-common@1.3.0

## 1.3.0

### Minor Changes

- f2183886: adds optimisticUpdates to @dopt/javascript and unifies optimisticUpdates behavior across react and JS sdks to only work with step blocks

## 1.2.9

### Patch Changes

- ce2ac3f4: clean up type names and add JS / TS doc strings to create better typedocs for @dopt/react and @dopt/javascript packages
- Updated dependencies [ce2ac3f4]
  - @dopt/javascript-common@1.2.8
  - @dopt/block-types@2.0.4
  - @dopt/mercator@1.0.2
  - @dopt/logger@0.0.3

## 1.2.8

### Patch Changes

- Updated dependencies [4661f731]
  - @dopt/block-types@2.0.3
  - @dopt/javascript-common@1.2.7

## 1.2.7

### Patch Changes

- Updated dependencies [67d27325]
  - @dopt/block-types@2.0.2
  - @dopt/mercator@1.0.1
  - @dopt/logger@0.0.2
  - @dopt/javascript-common@1.2.6

## 1.2.6

### Patch Changes

- Updated dependencies [d02315ba]
  - @dopt/block-types@2.0.1
  - @dopt/javascript-common@1.2.5

## 1.2.5

### Patch Changes

- 2712b44c: returns field definitions with values from @blocks/service and cleans up field access in @dopt/javascript

## 1.2.4

### Patch Changes

- Updated dependencies [4478f0a5]
  - @dopt/block-types@2.0.0
  - @dopt/javascript-common@1.2.4

## 1.2.3

### Patch Changes

- Updated dependencies [a26aefdc]
  - @dopt/block-types@1.1.0
  - @dopt/javascript-common@1.2.3

## 1.2.2

### Patch Changes

- Updated dependencies [874b0427]
- Updated dependencies [b3fba687]
  - @dopt/block-types@1.0.3
  - @dopt/javascript-common@1.2.2

## 1.2.1

### Patch Changes

- Updated dependencies [f636dd8b]
  - @dopt/block-types@1.0.2
  - @dopt/javascript-common@1.2.1

## 1.2.0

### Minor Changes

- 850b6fe7: update optimisticUpdates parameter, clarifying what it does and where to use it

### Patch Changes

- Updated dependencies [850b6fe7]
  - @dopt/javascript-common@1.2.0

## 1.1.0

### Minor Changes

- a78cce92: fixes issues with state access and updates for model blocks within set blocks; adds scaffolding to retrieve field values

### Patch Changes

- Updated dependencies [a78cce92]
  - @dopt/javascript-common@1.1.0
