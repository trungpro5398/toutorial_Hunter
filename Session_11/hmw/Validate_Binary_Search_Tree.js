// Problem 98. Validate Binary Search Tree
// A valid BST is defined as follows:
// - The left subtree of a node contains only nodes with keys strictly less than the node's key.
// - The right subtree of a node contains only nodes with keys strictly greater than the node's key.
// - Both the left and right subtrees must also be binary search trees.

var isValidBST = function(root) {
    let stack = [];
    let prev = -Infinity;
    let current = root;

    while (stack.length > 0 || current !== null) {
        // Go to the leftmost node
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Visit node
        current = stack.pop();

        // Check BST condition
        if (current.val <= prev) {
            return false;
        }
        prev = current.val;

        // Move to right subtree
        current = current.right;
    }

    return true;
};