// ### types & interfaces 
// Define a custom type for the direction of traversal
export type Direction = "start" | "end";

// Function to get the area covered by a DOM Range
export function GetArea(range: Range) {
  // Initialization
  const start = range.startContainer; // start bound of the range
  const end = range.endContainer; // end bound of the range

  const LCA = range.commonAncestorContainer; // Lowest common ancestor container of the range
  const S = new Set<Node>(); // Set to keep track of visited nodes
  const L_L = new Array<Node>(); // Array to store nodes from the start side
  const R_L = new Array<Node>(); // Array to store nodes from the end side
  const LCA_L = new Array<number>(); // Array to store indexes of child nodes of LCA

  // Start traversing from the startContainer of the range
  addLeafs(start, "start", L_L, S);
  // Start traversing from the endContainer of the range
  addLeafs(end, "end", R_L, S);

  // Traverse up the tree from the start bound towards the LCA
  traverseUp("start", start, LCA, L_L, S, LCA_L);
  // Traverse up the tree from the end bound towards the LCA
  traverseUp("end", end, LCA, R_L, S, LCA_L);

  // Initialize an array to store nodes that are children of the LCA
  const C_L = new Array<Node>();
  // Iterate through child nodes of LCA and add their leaf nodes
  for (let i = LCA_L[0] + 1; i < LCA_L[1]; i++) {
    addLeafs(LCA.childNodes[i], "start", C_L, S);
  }

  // Concatenate the nodes from start, LCA, and end and return the result
  return L_L.concat(C_L, R_L.reverse());
}

// Recursive function to add leaf nodes of a given node
function addLeafs(node: Node, dir: Direction, L: Array<Node>, S: Set<Node>) {
  // If the node has already been visited, return
  if (S.has(node)) return;

  // Mark the node as visited
  S.add(node);

  // If node is a leaf (has no children), add it to the list
  if (!node.hasChildNodes()) addLeaf(node, L);
  else {
    // Recursively call addLeafs for each child node
    for (let i = 0; i < node.childNodes.length; i++) {
      let index = i;
      // If direction is 'end', traverse children from end to start
      if (dir === "end") index = node.childNodes.length - i - 1;
      addLeafs(node.childNodes[index], dir, L, S);
    }
  }
}


// Recursive function to traverse upwards in the DOM tree
function traverseUp(direction: Direction, node: Node, LCA: Node, L: Array<Node>, S: Set<Node>, LCA_L: Array<number>) {
  // If the current node is the Lowest Common Ancestor, return
  if (node === LCA) return;

  // If node has not been visited yet
  if (!S.has(node)) {
    // Mark as visited
    S.add(node);

    // If node is a leaf, add it to the list
    if (!node.hasChildNodes()) addLeaf(node, L);
  }

  // If the parent of this node is the LCA
  if (node.parentNode && node.parentNode === LCA) {
    // Find the index of this node among the LCA's childNodes
    const index = Array.from(node.parentNode.childNodes).findIndex(child => child === node);
    if (index === -1) throw new Error('Could not determine children index of LCA');
    LCA_L.push(index);
    return;
  }

  // Define the next node to visit (sibling or parent)
  let next: Node | null = null;
  if (direction === "start") {
    next = node.nextSibling;
  } else {
    next = node.previousSibling;
  }

  // If there is a next sibling
  if (next) {
    // Add the leaf nodes of the sibling and continue traversal
    addLeafs(next, direction, L, S);
    traverseUp(direction, next, LCA, L, S, LCA_L);
  } else if (node.parentNode) {
    // If no sibling, traverse up to the parent
    traverseUp(direction, node.parentNode, LCA, L, S, LCA_L);
  }
}

// Function to add a leaf node to the list if it meets certain criteria
function addLeaf(node: Node, L: Array<Node>) {
  // Don't add if the node is a line break or doesn't have visible text
  if (node.nodeName.toLowerCase() === "br") return;
  if (node.textContent?.trim() === "") return;

  // Add the node to the list
  L.push(node);
}