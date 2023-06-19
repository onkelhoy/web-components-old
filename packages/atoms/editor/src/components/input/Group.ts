import { GetArea } from './TreeArea';
import { SplitAllTheWayUp, SplitEnds, getLeaf, isSpecialParent } from './Split';

export interface Info {
  nodes: Array<Node>;
  range: Range;
}


function buildParentSet(nodes: Array<Node>, surroundNodeName: string, editor: Node) {
  const S = new Set<Node>();
  const L = new Array<Node>(); // FIXME DONT NEED
  const OL = new Array<Node>();

  // NOTE this is not good enough as we break out when we encounter nodes we already visited : thus those could still be wrapped by higher parent
  let MODIFIER_COUNT = 0;

  nodes.forEach(child => {
    let parent = child.parentNode;

    if (isSpecialParent(parent, editor)) OL.push(child);

    while (parent && !isSpecialParent(parent, editor)) {
      if (parent.nodeName.toLowerCase() === surroundNodeName)
      {
        console.log('child.nodeName', child.nodeName, child.textContent)
        MODIFIER_COUNT++; // NOT GOOD
        const grandpapa = parent.parentNode;
        if (grandpapa)
        {
          let next = parent?.nextSibling
          let specialPAPA = isSpecialParent(grandpapa, editor);
          Array.from(parent.childNodes).reverse().forEach(child2 => {
            // NOTE this would harm the order of nodes
            if (next)
            {
              grandpapa.insertBefore(child2, next);
            }
            else grandpapa.appendChild(child2);

            if (specialPAPA)
            {
              OL.push(child2)
            }
          });
          // its being removed??
          grandpapa.removeChild(parent);
          parent = grandpapa;

          if (specialPAPA)
          {
            break;
          }
        }
      }

      if (S.has(parent)) break;

      L.push(parent);
      S.add(parent);

      if (isSpecialParent(parent.parentNode, editor))
      {
        OL.push(parent);
        break;
      }
      parent = parent.parentNode;
    }
  })

  return {
    list: L,
    outmost: OL.length === 0 ? nodes : OL,
    mode: MODIFIER_COUNT === L.length && L.length > 0 ? "delete" : "insert"
  }
}

function getNodeRange(range: Range) {
  // assign the node-list
  let nodes:Array<Node> = [];
  if (range.collapsed)
  {
    console.error('The range is collapsed');
    nodes = [];
  }
  else if (!range)
  {
    console.info('The range is undefined');
    nodes = [];
  }
  else if (range.startContainer === range.endContainer)
  {
    console.info("The left and right side of range is same");
    nodes = [range.startContainer];
  }
  else
  {
    nodes = GetArea(range);
  }

  return nodes;
}
function getOutmostParent(node:Node, editor:Node):Node|null {
  if (!node.parentNode) return node;
  if (isSpecialParent(node.parentNode, editor)) return node;

  return getOutmostParent(node.parentNode, editor);
} 
function getLeafs(node:Node, L: Array<Node>) {
  if (node.hasChildNodes()) node.childNodes.forEach(child => getLeafs(child, L));
  else L.push(node);
}
function search(node:Node, C:Array<boolean>, surroundNodeName:string) {
  if (node.parentNode)
  {
    if (node.parentNode.nodeName.toLowerCase() === surroundNodeName)
    {
      C.push(true);
      console.log('hass')
    }

    search(node.parentNode, C, surroundNodeName);
  }
}
export function GroupSelection(selection:Selection, surroundNodeName:string, editor:Node):Info {
  const range = selection.getRangeAt(0);
  // const nodes = getNodeRange(range);

  // console.log(nodes);

  // const cloned = range.cloneContents();
  // console.log(cloned.childNodes);


  const startnode = range.startContainer;
  const startparent = range.startContainer.parentNode;
  const beforestartparent = startparent?.previousSibling;

  // console.log(afterend)

  // use this later 
  const fragment = range.extractContents();

  // clean fragment & determine if insert or delete
  const L = new Array<Node>();
  const C = new Array<boolean>();
  // fragment.childNodes.forEach(child => getLeafs(child, L));

  // determine the count
  // L.forEach(node => search(node, C, surroundNodeName.toLowerCase()));

  // cleanup
  // const all = fragment.querySelectorAll(surroundNodeName);
  // all.forEach(element => {
  //   Array.from(element.childNodes).reverse().forEach(child => element.parentNode?.insertBefore(child, element));
  //   element.parentNode?.removeChild(element);
  // })

  // perform task
  if (C.length <= L.length)
  {
    // insert
    console.log('insert!! HE')
  }

  console.log(fragment)

  // get target element 
  // let target: Node|null = null;
  // if (startparent)
  // {
  //   if (isSpecialParent(startparent, editor)) 
  //   {
  //     if (startnode) target = startnode;
  //     else target = startparent.firstChild;
  //   }
  //   else target = getOutmostParent(startparent, editor);
  // }
  // else if (beforestartparent)
  // {
  //   if (isSpecialParent(beforestartparent, editor)) target = beforestartparent;
  //   else target = getOutmostParent(beforestartparent, editor);
  // }

  // if (target)
  // {
  //   if (target.nextSibling)
  //   {
  //     Array.from(fragment.childNodes).reverse().forEach(child => target?.parentNode?.insertBefore(child, target.nextSibling));
  //   }
  //   else if (target.parentNode)
  //   {
  //     fragment.childNodes.forEach(child => target?.parentNode?.appendChild(child));
  //   }
  // }
  // else 
  // {
  //   throw new Error('could not determine where to insert nodes');
  // }

  // TODO what if the referenced node is deep inside some ancestor path - we want to insert at "editor" level or special parent
  // if (beforestart) {
  //   const next = beforestart.nextSibling;
  //   if (next)
  //   {
  //     fragment.childNodes.forEach(child => startparent?.insertBefore(child, beforestart));
  //   }
  //   else 
  //   {
  //     Array.from(fragment.childNodes).reverse().forEach(child => startparent?.appendChild(child));
  //   }
  // }
  // else if (startparent) {
  //   Array.from(fragment.childNodes).reverse().forEach(child => startparent?.appendChild(child));
  // }
  // else if (beforestartparent) {
  //   console.log('beforestartparent exists', beforestartparent)
  // }

  // SplitEnds(range, editor);


  // const afterend = SplitAllTheWayUp(range.endContainer, editor, "end");
  // const start = SplitAllTheWayUp(range.startContainer, editor, "start");

  // const nextstart = getLeaf(start, "start");
  // if (nextstart)
  // {
  //   range.setStart(nextstart, 0);
  //   const endcontainer = getLeaf(afterend.previousSibling, "end");

  //   if (endcontainer && endcontainer.textContent) {
  //     console.log('setting the end', endcontainer, endcontainer.textContent.length - 1)
  //     range.setEnd(endcontainer, endcontainer.textContent.length - 1)
  //   }
  // }
  // else
  // {
  //   throw new Error("Could not establish the next node")
  // }

  // // need to set the start and end again

  // // console.log(range.endContainer, range.startContainer, afterend, start);

  // // console.log('getting parentset')
  // // const parentset = buildParentSet(nodes, surroundNodeName, editor);

  // // if (parentset.mode === "insert")
  // // {
  // const surrounder = document.createElement(surroundNodeName);

  // // could do editor but in special cases like headings etc.. we want to be relative
  // // if (parentset.outmost.length > 0 && parentset.outmost[0].parentNode)
  // // {
  // //   parentset.outmost[0].parentNode.insertBefore(surrounder, parentset.outmost[0]);
  // //   parentset.outmost.forEach(node => surrounder.appendChild(node));
  // // }
  // // }

  return {
    nodes: [],
    range
  }
}