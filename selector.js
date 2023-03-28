function customQuerySelector(root, selector) {
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();

    if (node.matches(selector)) {
      return node;
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        stack.push(node.children[i]);
      }
    }
  }

  return null;
}

function customQuerySelectorAll(root, selector) {
  const stack = [root];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node.matches(selector)) {
      result.push(node);
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        stack.push(node.children[i]);
      }
    }
  }

  return result;
}
