/**
 * Local sandbox detection — only active when LOCAL_TEST_MODE=true
 * in local-test/.env (gitignored). Never set this in production.
 */
export function isLocalTestMode(): boolean {
  return process.env.LOCAL_TEST_MODE === "true";
}

export function isMockBilling(): boolean {
  return isLocalTestMode() && process.env.MOCK_BILLING !== "false";
}

export function isLocalTestBuildSafe(): boolean {
  return isLocalTestMode() && process.env.NODE_ENV === "development";
}
