export function getParent(element: HTMLElement) {
  let parent = element.parentElement;
  if (parent === null) {
    parent = (element.getRootNode() as any).host;
  }

  return parent;
}
export function findElement(
  element: HTMLElement,
  selector: string
): [HTMLElement, HTMLElement[]] | null {
  const parent = getParent(element);

  if (parent) {
    let target = parent.querySelector<HTMLElement>(selector);
    if (!target && parent.shadowRoot)
      target = parent.shadowRoot.querySelector<HTMLElement>(selector);
    if (target) {
      const path: HTMLElement[] = [];
      let targetParent: HTMLElement | null = target;

      while (targetParent) {
        targetParent = getParent(targetParent);
        if (!targetParent) break;

        path.push(targetParent);
        if (targetParent === parent) break;
      }
      return [target, path];
    }

    return findElement(parent, selector);
  }

  return null;
}
export function fullParentPath(element: HTMLElement): HTMLElement[] {
  const path: HTMLElement[] = [];
  let parent: HTMLElement | null = element;
  while (parent) {
    parent = getParent(parent);
    if (!parent) break;

    path.push(parent);
    if (parent === document.documentElement) break;
  }

  return path;
}
