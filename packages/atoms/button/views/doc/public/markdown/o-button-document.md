# Button

Atomic Type: atoms

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
## Introduction to the Button Component

The Button component is a versatile and customizable UI element that can be easily integrated into your web applications. It provides a consistent and interactive way for users to trigger actions or navigate through your application.

To use the Button component in your HTML code, follow these simple steps:

1. Make sure you have the necessary dependencies installed. The Button component relies on the Circular Tools and Circular Templates libraries. You can install them using a package manager like npm:

```bash
npm install @circular-tools/utils @circular-templates/box
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

With the Button component, you can create interactive and visually appealing buttons that seamlessly fit into your web application's design.properties:

| name    | default-value | type           | description                  |
|---------|---------------|----------------|------------------------------|
| size    | "medium"      | Size           | Size of the button           |
| mode    | "hug"         | ButtonMode     | Button mode                  |
| variant | "filled"      | ButtonVariant  | Button variant               |
| tabIndex| 1             | number         | Tab index of the button      |


events:

| name   | type                          | description                   |
|--------|-------------------------------|-------------------------------|
| N/A    | N/A                           | No specific events mentioned  |


public functions:

| name   | arguments                          | description                    |
|--------|-----------------------------------|--------------------------------|
| render | N/A                               | Renders the button component   |# Documentation

## Table of Contents
- [css-variables](#css-variables)
- [parts](#parts)
- [slots](#slots)

## `Button` Class

### Description
The `Button` class is a custom button element that extends the `BoxTemplate` class. It provides customizable properties and styling options for buttons.

### Usage
```html
<button is="circular-button"></button>
```

### Properties
| Name      | Type           | Default Value | Description                                                      |
| --------- | -------------- | ------------- | ---------------------------------------------------------------- |
| `size`    | `Size`         | `"medium"`    | The size of the button. Possible values: `"small"`, `"medium"`, `"large"`. |
| `mode`    | `ButtonMode`   | `"hug"`       | The mode of the button. Possible values: `"hug"`, `"fill"`.      |
| `variant` | `ButtonVariant`| `"filled"`    | The variant style of the button. Possible values: `"filled"`, `"underlined"`, `"outlined"`. |
| `tabIndex`| `number`       | `1`           | The tab index of the button.                                     |

### CSS Variables
#### `css-variables` Table
| Name                 | Default Value | Type          | Description                                               |
| -------------------- | ------------- | ------------- | --------------------------------------------------------- |
| `--button-cursor`    | `pointer`     |               | The cursor style for the button.                          |
| `--button-font-family`| `var(--font-family, inherit)`|       | The font family for the button.                      |
| `--button-padding`   |               | CSS unit      | The padding for the button.                                |
| `--button-border-width` |          | CSS unit      | The border width for the button.                           |
| `--button-background-color-<variant>` |  |           | The background color for the specified variant.           |
| `--button-text-color-<variant>` |        |               | The text color for the specified variant.                 |
| `--button-background-color-<variant>-hover` | |         | The background color for the specified variant when hovered.   |
| `--button-text-color-<variant>-hover` |   |              | The text color for the specified variant when hovered.         |
| `--button-background-color-<variant>-active` | |      | The background color for the specified variant when active.    |
| `--button-text-color-<variant>-active` |    |             | The text color for the specified variant when active.          |
| `--button-background-color-<variant>-disabled` | |   | The background color for the specified variant when disabled.  |
| `--button-text-color-<variant>-disabled` |  |              | The text color for the specified variant when disabled.        |
| `--button-cursor-disabled` | `not-allowed` |            | The cursor style for the disabled button.                   |

### Parts
#### `parts` Table
| Name | Description |
| ---- | ----------- |
| `left` | The left slot of the button. |
| `right` | The right slot of the button. |

### Slots
#### `slots` Table
| Name | Default Value | Description |
| ---- | ------------- | ----------- |
| `left` | `<span> </span>` | The content placed in the left slot of the button. |
|        |               | 
|        |               | 
| `right` | `<span> </span>` | The content placed in the right slot of the button. |

Note: The