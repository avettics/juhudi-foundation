import { defineField, defineType } from "sanity";

export const contactInformation = defineType({
  name: "contactInformation",
  title: "Contact Information",
  type: "document",
  description:
    "Official public contact and location information for Juhudi Foundation.",

  groups: [
    {
      name: "contact",
      title: "Contact Details",
      default: true,
    },
    {
      name: "location",
      title: "Location",
    },
    {
      name: "hours",
      title: "Office Hours",
    },
  ],

  fields: [
    defineField({
      name: "primaryEmail",
      title: "Primary Email",
      type: "email",
      group: "contact",
      description: "The main public email address for Juhudi Foundation.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "secondaryEmail",
      title: "Secondary Email",
      type: "email",
      group: "contact",
      description: "Optional additional public email address.",
    }),

    defineField({
      name: "primaryPhone",
      title: "Primary Phone",
      type: "string",
      group: "contact",
      description:
        "The main public phone number, including the international country code.",
      validation: (rule) => rule.required().max(30),
    }),

    defineField({
      name: "secondaryPhone",
      title: "Secondary Phone",
      type: "string",
      group: "contact",
      description:
        "Optional additional public phone number, including the international country code.",
      validation: (rule) => rule.max(30),
    }),

    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      group: "contact",
      description:
        "Optional public WhatsApp number, including the international country code.",
      validation: (rule) => rule.max(30),
    }),

    defineField({
      name: "addressLine",
      title: "Street / Office Address",
      type: "string",
      group: "location",
      description: "The public street or office address for Juhudi Foundation.",
      validation: (rule) => rule.max(200),
    }),

    defineField({
      name: "district",
      title: "District",
      type: "string",
      group: "location",
      initialValue: "Kigamboni",
      validation: (rule) => rule.max(100),
    }),

    defineField({
      name: "city",
      title: "City",
      type: "string",
      group: "location",
      initialValue: "Dar es Salaam",
      validation: (rule) => rule.required().max(100),
    }),

    defineField({
      name: "country",
      title: "Country",
      type: "string",
      group: "location",
      initialValue: "Tanzania",
      validation: (rule) => rule.required().max(100),
    }),

    defineField({
      name: "postalAddress",
      title: "Postal Address",
      type: "string",
      group: "location",
      description: "Optional official postal address or P.O. Box.",
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: "mapUrl",
      title: "Map URL",
      type: "url",
      group: "location",
      description:
        "Optional public map link visitors can use to locate the Juhudi Foundation office.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "officeHours",
      title: "Office Hours",
      type: "array",
      group: "hours",
      description: "Public office opening hours displayed on the website.",
      of: [
        {
          type: "object",
          name: "officeHoursEntry",
          title: "Office Hours Entry",
          fields: [
            defineField({
              name: "days",
              title: "Days",
              type: "string",
              description: 'For example, "Monday – Friday".',
              validation: (rule) => rule.required().max(80),
            }),

            defineField({
              name: "hours",
              title: "Hours",
              type: "string",
              description: 'For example, "8:00 AM – 5:00 PM".',
              validation: (rule) => rule.required().max(80),
            }),
          ],

          preview: {
            select: {
              days: "days",
              hours: "hours",
            },

            prepare({ days, hours }) {
              return {
                title: days,
                subtitle: hours,
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      email: "primaryEmail",
      city: "city",
      country: "country",
    },

    prepare({ email, city, country }) {
      const location = [city, country].filter(Boolean).join(", ");

      return {
        title: "Contact Information",
        subtitle: location || email || "Official contact details",
      };
    },
  },
});
