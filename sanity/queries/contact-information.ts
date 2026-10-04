import { defineQuery } from "next-sanity";

export const CONTACT_INFORMATION_QUERY = defineQuery(`
  *[_type == "contactInformation" && _id == "contactInformation"][0] {
    _id,
    primaryEmail,
    secondaryEmail,
    primaryPhone,
    secondaryPhone,
    whatsappNumber,

    addressLine,
    district,
    city,
    country,
    postalAddress,
    mapUrl,

    officeHours[] {
      days,
      hours
    }
  }
`);
