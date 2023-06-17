// use this to check node
export function isSpecialNode(node:Node|null, editor:Node) {
  if (node === editor) return true;
  if (!node) return false;
  const nodename = node.nodeName;

  switch (nodename) {
    case "P":
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
      return true;
    default:
      return false;
  }
}

// split a node 
function splitNodeIndividual(node:Node, child:Node) {
  if (!node.parentNode) throw new Error('the node provided must have a parent to perform a split');
  const copy = node.cloneNode(false);

  let target:Node|null = child;
  while (target)
  {
    copy.appendChild(target);
    target = target.nextSibling;
  }

  if (copy.childNodes.length > 0)
  {
    if (node.nextSibling)
    {
      node.parentNode.insertBefore(copy, node.nextSibling);
    }
    else 
    {
      node.parentNode.appendChild(copy);
    }
  }

  return copy;
}

// split a node all the way up
function splitNode(node:Node, at:number, editor:Node) {
  let child = node;
  if (node instanceof Text)
  {
    child = node.splitText(at);
  }
  else 
  {
    child = node.childNodes[at];
  }

  const original = child;
  let parent = child.parentNode;
  while (parent && !isSpecialNode(parent, editor))
  {
    child = splitNodeIndividual(parent, child);
    parent = child.parentNode;
  }

  return original;
}
type LeafType = "firstChild"|"lastChild";
function edgeLeaf(node:Node|null, type:LeafType):Node|null {
  if (!node || !node.hasChildNodes() || !node[type])
  {
    return node;
  }

  return edgeLeaf(node[type], type);
}
type NeighbourType = "previousSibling"|"nextSibling";
function neighbourNode(node:Node, ancestor: Node, type: NeighbourType) {
  const map:Record<NeighbourType, LeafType> = {
    "previousSibling": "lastChild",
    "nextSibling": "firstChild",
  }

  if (node[type]) return edgeLeaf(node[type], map[type]);
  
  let parent:Node|null = node;
  while ((parent = node.parentNode) && parent !== ancestor)
  {
    if (parent[type]) 
    {
      const leaf = edgeLeaf(parent[type], map[type]);
      if (leaf) return leaf;
    }
  }
}
function getRange(selection:Selection, editor: Node) {
  let range = selection.getRangeAt(0);
  const afterend = splitNode(range.endContainer, range.endOffset, editor);
  const first = splitNode(range.startContainer, range.startOffset, editor);
  const start = edgeLeaf(first, "firstChild");

  if (!start) throw new Error('Could not determine start node in range');
  const end = neighbourNode(afterend, editor, "previousSibling");
  if (!end) throw new Error('Could not determine end node in range')

  selection.removeAllRanges();
  range = document.createRange();

  range.setStart(start, 0);
  range.setEnd(end, end.textContent?.length || 0);
  
  // // range.setEndAfter(end);
  selection.addRange(range);

  // console.log(range)
  return range;
}
function topmostParent(node:Node, editor:Node) {
  let parent:RisktNode = node;
  while (parent && parent.parentNode !== editor)
  {
    parent = parent.parentNode;
  }

  return parent;
}
function getleafs(node:Node, L:Array<Node>) {
  if (!node.hasChildNodes()) addLeaf(node, L);
  else 
  {
    node.childNodes.forEach(child => getleafs(child, L));
  }
}
// Function to add a leaf node to the list if it meets certain criteria
function addLeaf(node: Node, L: Array<Node>) {
  if (isemptyLeaf(node)) return;

  // Add the node to the list
  L.push(node);
}
function isemptyLeaf(node:Node) {
  if (node.hasChildNodes()) return false;
  // Don't add if the node is a line break or doesn't have visible text
  if (node.nodeName.toLowerCase() === "br") return true;
  if (node.textContent?.trim() === "") return true;

  return false;
}

// get nodes in range 
interface Group {
  parent: Node;
  nodes: Array<Node>;
}
type RisktNode = Node|null|undefined;
export function basic_modify(selection:Selection, modifier: string, editor:Node) {
  const range = getRange(selection, editor);

  const inbetween = new Array<Node>();
  const topmoststart = topmostParent(range.startContainer, editor);
  const topmostend = topmostParent(range.endContainer, editor);

  let current:RisktNode = topmoststart;
  while (current) 
  {
    inbetween.push(current);
    if (current === topmostend) break;
    current = current.nextSibling;
  }
  const leafs = new Array<Node>();
  inbetween.forEach(node => getleafs(node, leafs))

  const GROUPS = new Array<Group>();

  let modifercount = 0;
  let currentNodes = new Array<Node>();
  let currentParent:Node|null = null;
  leafs.forEach(leaf => {
    let parent = leaf.parentNode;
    let hasmodifierparent = false;

    while (parent)
    {
      if (parent.nodeName === modifier)
      {
        hasmodifierparent = true;
      }

      // if special parent we want to end the current group
      if (isSpecialNode(parent, editor))
      {
        if (currentNodes.length > 0 && parent !== currentParent)
        {
          if (!currentParent) throw new Error("current nodes exists but not parent..")
          GROUPS.push({
            nodes: currentNodes,
            parent: currentParent || parent,
          });

          currentNodes = [];
        }

        currentParent = parent;
        break;
      }

      parent = parent.parentNode;
    }

    if (hasmodifierparent) modifercount++;
    currentNodes.push(leaf);
  })

  if (currentParent)
  {
    GROUPS.push({
      nodes: currentNodes,
      parent: currentParent,
    })
  }

  console.log(GROUPS, modifercount, leafs);
}
