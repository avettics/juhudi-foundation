import { defineField, defineType } from "sanity";

const PARTNER_TYPES = [
  { title: "Strategic Partner", value: "strategic" },
  { title: "Funding Partner", value: "funding" },
  { title: "Implementation Partner", value: "implementation" },
  { title: "Government / Institutional Partner", value: "institutional" },
  { title: "Supporting Partner", value: "supporting" },
  { title: "Other", value: "other" },
];

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  description:
    "An organization publicly recognized as a partner or supporter of Juhudi Foundation.",

  groups: [
    {
      name: "profile",
      title: "Partner Profile",
      default: true,
    },
    {
      name: "relationships",
      title: "Relationships",
    },
    {
      name: "presentation",
      title: "Presentation",
    },
  ],

  fields: [
    defineField({
      name: "name",
      title: "Partner Name",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(160),
    }),

    defineField({
      name: "partnerType",
      title: "Partner Type",
      type: "string",
      group: "profile",
      description:
        "The primary relationship this organization has with Juhudi Foundation.",
      options: {
        list: PARTNER_TYPES,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "profile",
      description:
        "Optional public description of the partner and its relationship with Juhudi Foundation.",
      validation: (rule) => rule.max(500),
    }),

    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      group: "profile",
      description: "Optional official website for the partner organization.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "programmes",
      title: "Programmes",
      type: "array",
      group: "relationships",
      description:
        "Optional Juhudi programmes associated with this partnership.",
      of: [
        {
          type: "reference",
          to: [{ type: "programme" }],
        },
      ],
      validation: (rule) => rule.unique(),
    }),

    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      group: "relationships",
      description: "Optional Juhudi projects associated with this partnership.",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      validation: (rule) => rule.unique(),
    }),

    defineField({
      name: "logo",
      title: "Partner Logo",
      type: "image",
      group: "presentation",
      description:
        "Official logo used when displaying this partner on the website.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Accessible description of the partner logo.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "featured",
      title: "Featured Partner",
      type: "boolean",
      group: "presentation",
      description: "Feature this partner in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "presentation",
      description:
        "Controls the partner's display order. Lower numbers appear first.",
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],

  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Partner Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      name: "name",
      partnerType: "partnerType",
      media: "logo",
    },

    prepare({ name, partnerType, media }) {
      const typeTitle =
        PARTNER_TYPES.find((item) => item.value === partnerType)?.title ??
        "Partner";

      return {
        title: name,
        subtitle: typeTitle,
        media,
      };
    },
  },
});
