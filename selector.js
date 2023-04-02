export function customQuerySelector(root, selector) {
  const nodeStack = [root];

  while (nodeStack.length > 0) {
    const node = nodeStack.pop();

    if (node.matches(selector)) {
      return node;
    }
    if (node.children) {
      Array.from(node.children).forEach(child => {
        nodeStack.push(child);
      });
    }
  }

  return null;
}

export function customQuerySelectorAll(root, selector) {
  const nodeStack = [root];
  const result = [];

  while (nodeStack.length > 0) {
    const node = nodeStack.pop();
    if (node.matches(selector)) {
      result.push(node);
    }
    if (node.children) {
      Array.from(node.children).forEach(child => {
        nodeStack.push(child);
      });
    }
  }

  return result;
}
