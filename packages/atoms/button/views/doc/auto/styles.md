# Documentation

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