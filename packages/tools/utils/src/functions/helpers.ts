export function suspense<T extends (...args: any[]) => any>(
  execute: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      execute.apply(this, args);
      timer = null;
    }, delay);
  };
}
  
export function CumulativeOffset(element:HTMLElement) {
  let top = 0, left = 0;
  do {
    top += element.offsetTop  || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent as HTMLElement;
  } while(element);

  return {
    top: top,
    left: left
  };
};

export function ExtractSlotValue(slot:HTMLSlotElement) {
  const nodes = slot.assignedNodes();

  const values:Array<string> = [];
  nodes.forEach(node => appendLeafValue(node, values))

  return values;
}

function appendLeafValue(node:Node, L:Array<string>) {
  if (node.hasChildNodes()) 
  {
    node.childNodes.forEach(child => appendLeafValue(child, L));
  }
  else if (node.textContent)
  {
    if (node.textContent.trim() === "") return;
    L.push(node.textContent);
  }
}