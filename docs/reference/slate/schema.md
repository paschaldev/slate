# `Schema`

Every Slate editor has a "schema" associated with it, which contains information about the structure of its content. For the most basic cases, you'll just rely on Slate's default core schema. But for advanced use cases, you can enforce rules about what the content of a Slate document can contain.

## Properties

```js
{
  document: Object,
  blocks: Object,
  inlines: Object,
}
```

The top-level properties of a schema give you a way to define validation "rules" that the schema enforces.

### `document`

`Object`

```js
{
  document: {
    nodes: [{ types: ['paragraph'] }]
  }
}
```

A set of validation rules that apply to the top-level document.

### `blocks`

`Object`

```js
{
  blocks: {
    list: {
      nodes: [{ types: ['item'] }]
    },
    item: {
      parent: { types: ['list'] }
    },
  }
}
```

A dictionary of blocks by type, each with its own set of validation rules.

### `inlines`

`Object`

```js
{
  inlines: {
    emoji: {
      isVoid: true,
      nodes: [{ objects: ['text'] }]
    },
  }
}
```

A dictionary of inlines by type, each with its own set of validation rules.

## Rule Properties

```js
{
  data: Object,
  first: Object,
  isVoid: Boolean,
  last: Object,
  nodes: Array,
  marks: Array,
  normalize: Function,
  parent: Object,
  text: RegExp,
}
```

Slate schemas are built using a set of validation rules. Each of the properties will validate certain pieces of the document based on the properties it defines.

### `data`

`Object`

```js
{
  data: {
    href: v => isUrl(v),
  }
}
```

A dictionary of data attributes and their corresponding validation functions. The functions should return a boolean indicating whether the data value is valid or not.

### `first`

`Object`

```js
{
  first: { types: ['quote', 'paragraph'] },
}
```

Will validate the first child node. The `first` definition can declare `objects` and `types` properties.

### `isVoid`

`Boolean`

```js
{
  isVoid: true,
}
```

Will validate a node's `isVoid` property.

### `last`

`Object`

```js
{
  last: { types: ['quote', 'paragraph'] },
}
```

Will validate the last child node. The `last` definition can declare `objects` and `types` properties.

### `nodes`

`Array`

```js
{
  nodes: [
    { types: ['image', 'video'], min: 1, max: 3 },
    { types: ['paragraph'], min: 0 },
  ]
}
```

Will validate a node's children. The `nodes` definitions can declare the `objects`, `types`, `min` and `max` properties.

> 🤖 The `nodes` array is order-sensitive! The example above will require that the first node be either an `image` or `video`, and that it be followed by one or more `paragraph` nodes.

### `marks`

`Array`

```js
{
  marks: [{ type: 'bold' }, { type: 'italic' }]
}
```

Will validate a node's marks. The `marks` definitions can declare the `type` property, providing a list of mark types to be allowed. If declared, any marks that are not in the list will be removed.

### `normalize`

`normalize(change: Change, violation: String, context: Object) => Void`

```js
{
  normalize: (change, violation, context) => {
    switch (violation) {
      case 'child_object_invalid':
        change.wrapBlockByKey(context.child.key, 'paragraph')
        return
      case 'child_type_invalid':
        change.setNodeByKey(context.child.key, 'paragraph')
        return
    }
  }
}
```

A function that can be provided to override the default behavior in the case of a rule being invalid. By default, Slate will do what it can, but since it doesn't know much about your schema, it will often remove invalid nodes. If you want to override this behavior and "fix" the node instead of removing it, pass a custom `normalize` function.

For more information on the arguments passed to `normalize`, see the [Violations](#violations) section.

### `parent`

`Array`

```js
{
  parent: {
    types: ['list']
  }
}
```

Will validate a node's parent. The parent definition can declare the `objects` and/or `types` properties.

### `text`

`Array`

```js
{
  text: /^\w+$/
}
```

Will validate a node's text.

## Static Methods

### `Schema.create`

`Schema.create(properties: Object) => Schema`

Create a new `Schema` instance with `properties`.

### `Schema.fromJSON`

`Schema.fromJSON(object: Object) => Schema`

Create a schema from a JSON `object`.

### `Schema.isSchema`

`Schema.isSchema(maybeSchema: Any) => Boolean`

Returns a boolean if the passed in argument is a `Schema`.

## Instance Methods

### `toJSON`

`toJSON() => Object`

Returns a JSON representation of the schema.

## Violations

When supplying your own `normalize` property for a schema rule, it will be called with `(change, violation, context)`. The `violation` will be one of a set of potential violation strings, and `context` will vary depending on the violation.

A set of the invalid violation strings are available as constants via the [`slate-schema-violations`](../slate-schema-violations/index.md) package.
