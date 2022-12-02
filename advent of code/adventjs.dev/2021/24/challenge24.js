export default function checkIsSameTree(treeA, treeB) {
  if (treeA === treeB) return true;
  if (treeA.value !== treeB.value) return false;

  const treeAHasLeft = treeA.left !== null;
  const treeBHasLeft = treeB.left !== null;

  if (treeAHasLeft !== treeBHasLeft) return false;
  const isSameLeftBranch = checkIsSameTree(treeA.left, treeB.left);
  if (!isSameLeftBranch) return false;

  const treeAHasRight = treeA.right !== null;
  const treeBHasRight = treeB.right !== null;

  if (treeAHasRight !== treeBHasRight) return false;
  const isSameRightBranch = checkIsSameTree(treeA.right, treeB.right);
  if (!isSameRightBranch) return false;

  return true;
}
