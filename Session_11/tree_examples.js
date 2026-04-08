class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function buildDemoTree() {
  const root = new TreeNode(8);
  root.left = new TreeNode(4);
  root.right = new TreeNode(12);
  root.left.left = new TreeNode(2);
  root.left.right = new TreeNode(6);
  root.right.left = new TreeNode(10);
  root.right.right = new TreeNode(14);
  return root;
}

function cloneTree(root) {
  if (root === null) return null;

  const copied = new TreeNode(root.value);
  copied.left = cloneTree(root.left);
  copied.right = cloneTree(root.right);
  return copied;
}

function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i += 1) {
      const node = queue.shift();
      level.push(node.value);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function isSameTree(first, second) {
  if (first === null && second === null) return true;
  if (first === null || second === null) return false;
  if (first.value !== second.value) return false;

  return (
    isSameTree(first.left, second.left) &&
    isSameTree(first.right, second.right)
  );
}

function invertTree(root) {
  if (root === null) return null;

  const left = invertTree(root.left);
  const right = invertTree(root.right);

  root.left = right;
  root.right = left;
  return root;
}

function printTreeShape() {
  console.log("Demo tree:");
  console.log("        8");
  console.log("      /   \\");
  console.log("     4     12");
  console.log("    / \\    / \\");
  console.log("   2   6  10  14");
}

function runMaxDepthExample(root) {
  console.log("\n=== Example 1: LC 104 - Maximum Depth of Binary Tree ===");
  console.log("Goal: find the longest path from root down to a leaf.");
  console.log("Real life: deepest folder nesting.");
  console.log("Clear solution:");
  console.log("1. If node is null -> depth = 0");
  console.log("2. Ask left subtree for its depth");
  console.log("3. Ask right subtree for its depth");
  console.log("4. Current node depth = 1 + max(leftDepth, rightDepth)");
  console.log("\nStep trace on demo tree:");
  console.log("- Node 2 is a leaf -> depth 1");
  console.log("- Node 6 is a leaf -> depth 1");
  console.log("- Node 4 = 1 + max(1, 1) = 2");
  console.log("- Node 10 is a leaf -> depth 1");
  console.log("- Node 14 is a leaf -> depth 1");
  console.log("- Node 12 = 1 + max(1, 1) = 2");
  console.log("- Node 8 = 1 + max(2, 2) = 3");
  console.log("Answer:", maxDepth(root));
}

function runSameTreeExample(root) {
  const sameTree = cloneTree(root);
  const differentTree = cloneTree(root);
  differentTree.right.right.value = 99;

  console.log("\n=== Example 2: LC 100 - Same Tree ===");
  console.log("Goal: check whether 2 trees have the same shape and same values.");
  console.log("Real life: compare 2 menu trees or 2 folder trees.");
  console.log("Clear solution:");
  console.log("1. Both null -> same");
  console.log("2. One null, one not -> different");
  console.log("3. Values different -> different");
  console.log("4. Otherwise compare left subtrees and right subtrees");
  console.log("\nStep trace:");
  console.log("- Compare root 8 with 8 -> same, continue");
  console.log("- Compare left child 4 with 4 -> same, continue");
  console.log("- Compare right-right child 14 with 14 -> same");
  console.log("- Entire structure matches -> true");
  console.log("Same tree result:", isSameTree(root, sameTree));
  console.log("\nSecond test:");
  console.log("- Compare right-right child 14 with 99 -> values differ");
  console.log("- Stop immediately -> false");
  console.log("Different tree result:", isSameTree(root, differentTree));
}

function runInvertTreeExample(root) {
  const original = cloneTree(root);
  const inverted = invertTree(cloneTree(root));

  console.log("\n=== Example 3: LC 226 - Invert Binary Tree ===");
  console.log("Goal: swap left and right children at every node.");
  console.log("Real life: mirror a left-right layout.");
  console.log("Clear solution:");
  console.log("1. Go down to children first");
  console.log("2. Get inverted left subtree");
  console.log("3. Get inverted right subtree");
  console.log("4. Swap them");
  console.log("\nStep trace:");
  console.log("- At node 2: no children, keep as is");
  console.log("- At node 6: no children, keep as is");
  console.log("- At node 4: swap left=2 and right=6 -> now left=6, right=2");
  console.log("- At node 10: no children, keep as is");
  console.log("- At node 14: no children, keep as is");
  console.log("- At node 12: swap left=10 and right=14 -> now left=14, right=10");
  console.log("- At node 8: swap left=4-subtree and right=12-subtree");
  console.log("Original level order:", levelOrder(original));
  console.log("Inverted level order:", levelOrder(inverted));
}

const tree = buildDemoTree();

console.log("=== Session 11 Tree Examples ===");
printTreeShape();
console.log("\nQuick view:");
console.log("- Level order:", levelOrder(tree));
console.log("- This is a BST, so inorder would be sorted.");

runMaxDepthExample(tree);
runSameTreeExample(tree);
runInvertTreeExample(tree);

console.log("\n=== Why These 3 Easy Examples Matter ===");
console.log("- Max Depth teaches recursive return values.");
console.log("- Same Tree teaches comparing shape + value together.");
console.log("- Invert Tree teaches how to modify left/right branches safely.");
