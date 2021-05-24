// This is an input class. Do not edit.
class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export function validateBst(tree: BST): boolean {
  const stack: BST[] = [tree];
  while (stack.length > 0) {
    let root = stack.pop()!;
    if (root.left !== null) {
      if (root.value <= root.left.value) return false;
      stack.push(root.left);
    } else if (root.right !== null) {
      if (root.value > root.right.value) return false;
      stack.push(root.right);
    }
  }
  // Write your code here.
  return true;
}

const root = new BST(10);
root.left = new BST(5);
root.left.left = new BST(2);
root.left.left.left = new BST(1);
root.left.right = new BST(5);
root.right = new BST(15);
root.right.left = new BST(13);
root.right.left.right = new BST(14);
root.right.right = new BST(22);

console.log(validateBst(root));
