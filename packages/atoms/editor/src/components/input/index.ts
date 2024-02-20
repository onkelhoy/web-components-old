// utils 
import { html, property, query } from "@pap-it/system-utils";

// atoms
import "@pap-it/button/wc";
import "@pap-it/icon/wc";

// templates
import { Base } from "@pap-it/system-base";

import { style } from "./style";
import { GroupSelection } from "./Group";
import { basic_modify } from "./utils";

export type Modifier = "bold" | "italic" | "underline" | "strikethrough"

// this is used to check nodes whom parent is of target type
type ExtendedNode = { node: Node, parent: Node | null };
const ModifierMap = {
  bold: "STRONG",
  italic: "I",
  strikethrough: "S",
  underline: "U"
}

export class Input extends Base {
  static style = style;

  @query('#editor') editorElement!: HTMLDivElement;

  // event handlers
  private handlemodify(modifier: Modifier) {
    return () => {
      // Get the current selection
      const selection = this.getSelection();

      if (selection && selection.type !== "None") {
        basic_modify(selection, ModifierMap[modifier], this.editorElement);

        // const info = GroupSelection(selection, ModifierMap[modifier], this.editorElement);
        // console.log(info)

        // this is the mode to tell if we globally need to insert or remove (remove only if no nodes with insert)
        // let mode = 'remove';
        // individual level of info for nodes, if parent then it means remove (from the parent)
        // const extendedNodes: ExtendedNode[] = [];

        // // first we need to check if 1 node is not already inside the type
        // for (let i=0; i<info.leafnodes.length; i++)
        // {
        //   const node = info.leafnodes[i];

        //   let foundinparent = false;
        //   let target:Node|null = node;
        //   let parent:Node|null = null;
        //   while (target = target?.parentNode)
        //   {
        //     // we reached the editor -> (thus no find -> insert)
        //     if (target === this.editorElement)
        //     {
        //       mode = 'insert';
        //       break;
        //     }

        //     // check if a parent has already
        //     if (target.nodeName.toLowerCase() === ModifierMap[modifier])
        //     {
        //       // exists already -> undo from selection
        //       foundinparent = true; 
        //       parent = target;
        //     }
        //   }

        //   // we did not find -> so its a insert mode (so we can cancel the loop)
        //   if (!foundinparent) 
        //   {
        //     mode = 'insert';
        //   }

        //   extendedNodes.push({
        //     node,
        //     parent,
        //   })
        // }

        // // now we iterate the nodes & either do insert or remove
        // for (let i=0; i<extendedNodes.length; i++)
        // {
        //   const {node, parent} = extendedNodes[i];

        //   console.log({node, parent});

        //   if (i === 0)
        //   {

        //   }
        //   else if (i === extendedNodes.length - 1)
        //   {

        //   }
        //   else 
        //   {
        //     if (mode === "insert")
        //     {
        //       // this.surroundNode(document.createElement(ModifierMap[modifier]), node);
        //     }
        //     else 
        //     {
        //       // this.surroundNode(document.createElement(ModifierMap[modifier]), node);
        //     }
        //   }
        // }
      }
    }
  }
  private splitNode(node: Node, at?: number) {
    if (at === undefined) return [node];

    // do {

    // }
    // while (target = target.childNodes)
    // if (node.nodeType !== node.TEXT_NODE)

    // const textContent = node.textContent;
    // if (textContent)
    // {
    //   const a = textContent.slice(0, at);
    //   const b = textContent.slice(at, textContent.length);
    // }
  }
  private surroundNode(surround: Node, node: Node, at?: number) {
    if (!at) {
      const parent = node.parentNode;
      if (parent) {
        parent.insertBefore(surround, node);
        surround.appendChild(node);
      }
    }
  }

  // public functions
  private getSelection() {
    const selection: Selection | null = (this.shadowRoot as any).getSelection ? (this.shadowRoot as any).getSelection() : document.getSelection();
    return selection;
  }
  private insert(text: string) {
    // Get the current selection
    const selection = this.getSelection();

    // Check if there is a selection
    if (selection) {
      console.log(selection)
      if (selection.rangeCount) {
        // Get the first range of the selection
        const range = selection.getRangeAt(0);

        // Create a text node with the text to insert
        const textNode = document.createTextNode(text);

        // Insert the text node at the current cursor position
        range.insertNode(textNode);

        // Move the cursor to after the inserted text
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  render() {
    return html`
      <div class="controls">
        <pap-button @click="${this.handlemodify("bold")}" variant="clear" radius="small" size="medium">
          <pap-icon customsize="20" name="format_bold"></pap-icon>
        </pap-button>
        <pap-button @click="${this.handlemodify('italic')}" variant="clear" radius="small" size="medium">
          <pap-icon customsize="20" name="format_italic"></pap-icon>
        </pap-button>
        <pap-button @click="${this.handlemodify('underline')}" variant="clear" radius="small" size="medium">
          <pap-icon customsize="20" name="format_underline"></pap-icon>
        </pap-button>
        <pap-button @click="${this.handlemodify('strikethrough')}" variant="clear" radius="small" size="medium">
          <pap-icon customsize="20" name="format_strikethrough"></pap-icon>
        </pap-button>
      </div>
      <div id="editor" contenteditable="true">
        <u>He</u><i>l</i>lo
        <strong>World Bajs</strong>
        <p><i><u>BA</u>AA</i>AA</p>
      </div>
      <slot name="under"></slot>
    `
  }
}
