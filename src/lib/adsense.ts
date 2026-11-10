/** AdSense writes data-ad-status="filled" | "unfilled" on the <ins> element once it has an answer. */
export type AdStatus = "filled" | "unfilled" | "pending";

export function readAdStatus(value: string | null | undefined): AdStatus {
  if (value === "filled") return "filled";
  if (value === "unfilled") return "unfilled";
  return "pending";
}

/** The banner is only shown when an ad was actually served. Pending and unfilled stay collapsed. */
export function shouldShowAd(status: AdStatus): boolean {
  return status === "filled";
}
