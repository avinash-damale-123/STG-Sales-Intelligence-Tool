export function applyBranchRestriction<T extends { branchCode?: string }>(
  data: T[],
  allowedBranches: string[]
) {
  return data.filter((item) => {
    if (!item.branchCode) {
      return false;
    }

    return allowedBranches.includes(item.branchCode);
  });
}

export function hasBranchAccess(
  branchCode: string,
  allowedBranches: string[]
) {
  return allowedBranches.includes(branchCode);
}
