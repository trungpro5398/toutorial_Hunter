// Problem 102. Binary Tree Level Order Traversal
// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

var levelOrder = function(root) {
    // Edge case: empty tree
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length; 
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // remove from front
            currentLevel.push(node.val);

            // Add children to queue for next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
};