/** Preview / test deploy — unlock every tool so you can QA the full portal. */
export function isPreviewUnlockAll(): boolean {
  return (
    process.env.NEXT_PUBLIC_LOCAL_TEST_MODE === "true" ||
    process.env.LOCAL_TEST_MODE === "true"
  );
}
