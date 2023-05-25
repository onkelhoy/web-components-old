# Combinor 

The idea with this script(s) is to extract info from `.html` files inside subfolders of `views`.
The `javaScript` and `CSS` is "fixed" so that it no longer references by `ID`, body or any other "high" level of selections, instead they are redirected to: `<section data-tab="TARGET">`

## Configuration
As of now there can exists two levels of configurations.
1. "global level config" 
2. "local level config" 

> OBS write them in JSON!

### Global Level Config
Exists inside root of package called: `".config"` 

#### Default config:
```json
{
    "tabs": {
        "order": ["doc", "demo", "interactive", "variations", "test"]
    }
}
```

### Local Level Config
Exists inside each subfolder of views called: `".config"`

#### Default config:
> SUBFOLDER refers to the subfolder of views
```json
{
    "name": $SUBFOLDER
}
```

> THIS IS FOR ME (should be removed later)
# Vision 

> everything should exist in views. 

that includes:
- demo
- doc
- variations
- interactive

doc is no longer the combined of all but simply only the auto files + index file 
and some javascript css

all folders exists of the basic:
- index.html
- style.css
- main.js 

but they should be able to be modified 


the actual output stuff should exists inside views too, but maybe combined or something
this should not receive any "fixings"


## Start 
each subfolder (and there should be able to be more!)
should be able to be started with:

start.sh -folder=demo (default)

inside package script:

```bash
start:doc
start:variations
```

so if another folder is added there should be a added script that simply just adds like:
`start:custom: ".scripts/start.sh -- -folder=custom"`

## Build
default build builds the source 

other builds would be
```
build:doc
build:variations
build:interactive
```

## Steps 

### combine
a combine script needs to exists that 
1. moves all files into a subfolder of combined (of target) [that has .html and is not "combined" itself]
> this means that if index.html is not found it should try find other.html file and use this instead - if none is found no fixing needs and this subfolder can be ignored!

> also each subfolder should create a "tab" in combined view
2. 

### server 
in order to achive this a better server to serve these folders needs to exists 
one that does not need a build but rather serves node-modules (AND serves from folder itself!) 

