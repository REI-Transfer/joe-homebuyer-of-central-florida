// Brand for the property-record form on this site (it has no other brand file).
// Phone stays empty unless NEXT_PUBLIC_PHONE_DISPLAY / NEXT_PUBLIC_PHONE_HREF are set: the screen-out
// page then shows no call/text button, like this site's current screen-out page.
export interface Brand {
  companyName: string
  phoneDisplay: string
  phoneHref: string
  phoneAcceptsText: boolean
  showroom: boolean
  marketName: string
  recordForm: boolean
  recordMode: "one-step" | "two-step"
}
export function marketPhrase(brand: Brand): string {
  return brand.marketName ? brand.marketName : "your area"
}
const recordSwitch = (process.env.NEXT_PUBLIC_RECORD_FORM ?? "").trim().toLowerCase()
export const RECORD_BRAND: Brand = {
  companyName: '',
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "",
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF ?? "",
  phoneAcceptsText: !["0", "false", "off"].includes((process.env.NEXT_PUBLIC_PHONE_ACCEPTS_TEXT ?? "").trim().toLowerCase()),
  showroom: false,
  marketName: "",
  // NEXT_PUBLIC_RECORD_FORM=one-step|two-step turns the new form on in that version.
  recordForm: ["one-step", "two-step"].includes(recordSwitch),
  recordMode: recordSwitch === "two-step" ? "two-step" : "one-step",
}
