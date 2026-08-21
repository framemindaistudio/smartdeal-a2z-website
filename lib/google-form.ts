// Google Form submission target for ContactForm. Google Forms accepts
// unauthenticated POSTs to its formResponse endpoint, so no API key or
// backend is needed — just the form's own field IDs below.
//
// Form: "SmartDeal A2Z — Website Enquiries"
// https://docs.google.com/forms/d/148KmC77Pz9CJwIMtbg1OqH2STgK9UtAMCDqaRoV_eW8/edit
// Responses spreadsheet is linked from that form's Responses tab.
export const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdgGBxZnof7lcYpil7OHudkGG390Ut0CbbYbo_QT3Y7m16SRw/formResponse";

export const GOOGLE_FORM_ENTRY_IDS = {
  name: "entry.2020089748",
  phone: "entry.1523235171",
  email: "entry.804861528",
  context: "entry.1118298039",
  message: "entry.1420905203",
  propertyType: "entry.1379113430",
  location: "entry.1428611523",
  expectedPrice: "entry.1475578390",
} as const;
