# Variations script

## configuration
as normal we use the `".config"` file that should exist inside the variations folder.
here we can use the interface:
```typescript
{
  variations?: {
    properties?: {
      <prop-name>: {
        default?: string;
        variants?: string[];
      }
    },
    html?: string
  }
}
```


## how it works

