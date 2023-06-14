import { GetArea, Direction } from './TreeArea';

export interface Info {
  nodes: Array<Node>;
  range: Range;
}

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

function SplitEnds(range:Range) {
  (["start", "end"] as Direction[]).forEach(direction => {
    const node = range[`${direction as Direction}Container`];
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
    else 
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
        else throw new Error(`Could not determine the next target leaf-node, [${direction}]`)
      }
    }
  })
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
type GetLeafChildDirection_TYPE = { start: "firstChild", end: "lastChild" };
const GetLeafChildDirection:GetLeafChildDirection_TYPE = { start: "firstChild", end: "lastChild" };
function getLeaf(node:Node|null, direction:Direction):Node|null {
  if (!node || !node[GetLeafChildDirection[direction]])
  {
    return node;
  }

  return getLeaf(node[GetLeafChildDirection[direction]], direction);
}

function SplitAncestors(node:Node, direction:Direction) {

}

function MapParents(node:Node, S:Set<Node>, L:Array<Node>) {

}

export function GroupSelection(selection:Selection):Info {
  const range = selection.getRangeAt(0);
  SplitEnds(range);

  // assign the node-list
  let nodes:Array<Node> = [];
  // edge cases
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

  return {
    nodes,
    range
  }
}