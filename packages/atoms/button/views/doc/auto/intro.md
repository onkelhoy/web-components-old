## Introduction to the Button Component

The Button component is a versatile and customizable UI element that can be easily integrated into your web applications. It provides a consistent and interactive way for users to trigger actions or navigate through your application.

To use the Button component in your HTML code, follow these simple steps:

1. Make sure you have the necessary dependencies installed. The Button component relies on the Circular Tools and Circular Templates libraries. You can install them using a package manager like npm:

```bash
npm install @henry2/tools-utils @henry2/templates-box
```

2. Import the Button component and its required styles into your JavaScript file:

```javascript
import { Button } from './component.js';
import { style } from './style.js';
```

3. Register the Button element with the browser's custom elements:

```javascript
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-button')) {
  cElements.define('o-button', Button);
}
```

4. In your HTML code, you can now use the `<o-button>` element as follows:

```html
<o-button></o-button>
```

You can customize the Button component by using its available properties. Here are some examples:

- `size`: Sets the size of the button. Possible values are "small", "medium" (default), and "large".
- `mode`: Specifies the button's mode. It can be "hug" (default) or "stretch".
- `variant`: Defines the button's variant. Available options include "filled" (default), "outlined", and "text".
- `tabIndex`: Specifies the tab order of the button within the document.

Additionally, you can provide content within the button using named slots. The slots available are "left", "right", and the default slot.

Here's an example of a customized Button component:

```html
<o-button size="large" mode="stretch" variant="outlined" tabindex="2">
    <span slot="left">Left Content</span>
    Button Text
    <span slot="right">Right Content</span>
</o-button>
```

With the Button component, you can create interactive and visually appealing buttons that seamlessly fit into your web application's design.