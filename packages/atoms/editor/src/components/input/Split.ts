import { Direction } from './TreeArea';

//#region types and constants
type DirectionNextNodeMap_TYPE = {
  start: "nextSibling";
  end: "previousSibling";
}
const DirectionNextNodeMap:DirectionNextNodeMap_TYPE = {
  start: "nextSibling",
  end: "previousSibling"
}

type DirectionFSet_TYPE = {
  start: "setStart";
  end: "setEnd";
}
const DirectionFSet:DirectionFSet_TYPE = {
  start: "setStart",
  end: "setEnd"
}

type GetLeafChildDirection_TYPE = { 
  start: "firstChild", 
  end: "lastChild" 
};
const GetLeafChildDirection:GetLeafChildDirection_TYPE = { 
  start: "firstChild", 
  end: "lastChild" 
};
//#endregion

//#region helper functions
function splitNodeByChild(parent:Node, child:Node, direction:Direction) {
  if (child.parentNode !== parent)
  {
    throw new Error('error the provided child is not a child of the provided parent');
  }
  if (!parent.parentNode) 
  {
    throw new Error('parent has no parent');
  }

  const newnode = parent.cloneNode(false);

  // insert after parent 
  if (parent.nextSibling)
  {
    parent.parentNode.insertBefore(newnode, parent.nextSibling);
  }
  else 
  {
    parent.parentNode.appendChild(newnode);
  }

  let next:Node|null = direction === "start" ? child : child.nextSibling;
  while (next)
  {
    newnode.appendChild(next);
    next = next.nextSibling;
  }

  return newnode;
}
function nextNode(node:Node, ancestor: Node, direction: Direction) {
  const name = DirectionNextNodeMap[direction];
   if (node[name]) return node[name];

  let parent:Node|null = node;
  while ((parent = node.parentNode) && parent !== ancestor)
  {
    if (parent[name]) 
    {
      const leaf = getLeaf(parent[name], direction);
      if (leaf) return leaf;
    }
  }
}

//#endregion
export function getLeaf(node:Node|null, direction:Direction):Node|null {
  if (!node || !node[GetLeafChildDirection[direction]])
  {
    return node;
  }

  return getLeaf(node[GetLeafChildDirection[direction]], direction);
}
export function SplitAllTheWayUp(node:Node, editor:Node, direction:Direction) {
  const parent = node.parentNode;

  if (!parent) return node;

  if (isSpecialParent(parent, editor)) 
  {
    return node;
  }
  else 
  {
    const newnode = splitNodeByChild(parent, node, direction);
    console.log('newnode', newnode)
    return newnode;
  }
}
export function isSpecialParent(parent:Node|null, editor:Node) {
  return parent && (parent === editor);
}
export function SplitEnds(range:Range, editor: Node) {
  let samenode = false;
  if (range.startContainer === range.endContainer)
  {
    samenode = true;
  }
  const outmostparent:Array<Node> = [];

  // , "end"
  (["start", "end"] as Direction[]).forEach(direction => {
    let node = range[`${direction as Direction}Container`];
    const offset = range[`${direction as Direction}Offset`];
    
    if (node instanceof Text)
    {
      let newnode = node;
      
      if (node.textContent)
      {
        if (offset <= node.textContent.length)
        {
          if (direction === "start")
          {
            newnode = node.splitText(offset);

            if (samenode)
            {
              range.setEnd(newnode, range.endOffset);
            }
          }
          else 
          {
            node.splitText(offset);
            newnode = node;
          }
        }
      }
      
      if (newnode)
      {
        range[DirectionFSet[direction]](newnode, direction === "start" ? 0 : newnode.textContent?.length || 0);
      }
      else 
      {
        const next = nextNode(node, range.commonAncestorContainer, direction);
        if (next)
        {
          range[DirectionFSet[direction]](next, direction === "start" ? 0 : next.textContent?.length || 0);
        }
        else throw new Error(`Could not determine the next node, [${direction}]`)
      }
    }
    else // its not Text
    {
      if (direction === "end" && offset === 0)
      {
        const previous = nextNode(node, range.commonAncestorContainer, "end");
        if (previous)
        {
          range.setEnd(previous, previous.textContent?.length || 0);
        }
        else throw new Error(`Could not determine the previous node from the end`);
      }
      else if (direction === "start" && offset === node.childNodes.length)
      {
        const next = nextNode(node, range.commonAncestorContainer, "start");
        if (next)
        {
          range.setStart(next, 0);
        }
        else throw new Error(`Could not determine the previous node from the start`);
      }
      else 
      {
        const targetLeaf = getLeaf(node.childNodes[offset], direction)
        if (targetLeaf)
        {
          range[DirectionFSet[direction]](targetLeaf, direction === "start" ? 0 : targetLeaf.textContent?.length || 0);
        }
        else {
          console.log(node, offset, direction)
          throw new Error(`Could not determine the next target leaf-node, [${direction}]`)
        }
      }
    }

    let parent:Node|null = range[`${direction as Direction}Container`];
    while (parent)
    {
      if (isSpecialParent(parent.parentNode, editor)) 
      {
        outmostparent.push(parent);
        break;
      }
      else parent = parent.parentNode;
    }
  })

  // split all the way up
  console.log(outmostparent)


  // a constant attempt to keep track of both start and end needs to take place as each split would cause the other to get lost... 
  // let child = node;
  // let parent = node.parentNode;

  // while (parent && !isSpecialParent(parent, editor)) {
  //   const newnode = splitNodeByChild(parent, child, direction);
  //   if (direction === "start")
  //   {
  //     child = newnode;
  //   }
  //   else 
  //   {
  //     child = parent;
  //   }

  //   parent = parent.parentNode;
  // }

  // console.log(child)
}
