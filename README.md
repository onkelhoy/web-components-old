# Henry's Ecosystem

## Starting
To create a new package you run the command `"create"` like:
```bash
npm run create
```
Which will give you some numerical options to choose - then a name and thats it. 

## Developing
Everything for code related is inside the `"src"` folder, you'll find `"component.ts"`, `"style.scss"` & `"types.ts"` for example which are the three most used files for your development. 

>### Why types ?
>In order to keep the component file clean and not cluttered with all the different types (which has a tendancy to grow as it evolves). It makes it easier for documentation too. 

### Commands
>The rest can be found in package.json, I choose these as they "stick out"
1. `"npm run doc"` - this runs the doc script that would generate the auto files if not exists
2. `"npm run doc:force"` - same as above but it would enforce new files to generate (auto)

### Styles 

Try to use css-variables as much as you can, with fallback values:
```css
padding: var(--mycomponent-padding-large, var(--padding-large, 1rem));
```
This is good as we allow for theme's to specifically target the component, but also a common variable in this case "padding-large". This could be used by many components and thus can allow for themeing to be an ease (`global level styling`). 

Another recommendation to follow for design is to use the :host as much as you can. 

As the host has direct outside access for being targeted by CSS directly. In other words, when used by another component - that component can then change design directly using css (allows for `local level styling`).

When we cannot use the host but still like to expose some internal elements for local level styling we can use the part:
```html 
<div part="div">
    im inside the shadow-dom
</div>
```
Which can be used then like:
```css
my-component::part(div) {
    color: blue;
}
```

## Important Folders
1. `"src"` - self explained

2. `"demo"` - from here the files are served when running the `"npm start"` command

3. `".generate/doc/auto/"` - this is where the auto doc files will be created from chatgtp


## Restrictions
1. Use NPM (need the package-lock.json when building variations [inside extract-types.js])