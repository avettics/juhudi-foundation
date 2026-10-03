import { defineField, defineType } from "sanity";

const CAMPAIGN_STATUSES = [
  { title: "Upcoming", value: "upcoming" },
  { title: "Active", value: "active" },
  { title: "Paused", value: "paused" },
  { title: "Completed", value: "completed" },
  { title: "Cancelled", value: "cancelled" },
];

const CAMPAIGN_CURRENCIES = [
  { title: "Tanzanian Shilling (TZS)", value: "TZS" },
  { title: "US Dollar (USD)", value: "USD" },
];

export const campaign = defineType({
  name: "campaign",
  title: "Campaign",
  type: "document",
  description:
    "A public Juhudi Foundation fundraising campaign supporting a programme or project.",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "details",
      title: "Campaign Details",
    },
    {
      name: "fundraising",
      title: "Fundraising",
    },
    {
      name: "presentation",
      title: "Presentation",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Campaign Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Used in the campaign page URL.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "A concise summary used on campaign cards and contribution sections.",
      validation: (rule) => rule.required().max(220),
    }),

    defineField({
      name: "content",
      title: "Campaign Story",
      type: "blockContent",
      group: "content",
      description:
        "Explain the campaign, why support is needed, and the intended outcome.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      group: "details",
      description: "The Juhudi programme this campaign supports.",
      to: [{ type: "programme" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      group: "details",
      description: "Optional specific project supported by this campaign.",
      to: [{ type: "project" }],
    }),

    defineField({
      name: "status",
      title: "Campaign Status",
      type: "string",
      group: "details",
      options: {
        list: CAMPAIGN_STATUSES,
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      group: "details",
    }),

    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      group: "details",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const document = context.document as
            | {
                startDate?: string;
              }
            | undefined;

          if (!endDate || !document?.startDate) {
            return true;
          }

          return endDate >= document.startDate
            ? true
            : "End date cannot be before the start date.";
        }),
    }),

    defineField({
      name: "goalAmount",
      title: "Fundraising Goal",
      type: "number",
      group: "fundraising",
      description: "The public fundraising target for this campaign.",
      validation: (rule) => rule.required().positive(),
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      group: "fundraising",
      description:
        "The currency in which the campaign fundraising goal is displayed.",
      options: {
        list: CAMPAIGN_CURRENCIES,
      },
      initialValue: "TZS",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "presentation",
      description:
        "Primary image used to represent this campaign across the website.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the image for visitors who cannot see it.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "featured",
      title: "Featured Campaign",
      type: "boolean",
      group: "presentation",
      description: "Feature this campaign in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      description:
        "Optional search and social metadata. Leave blank to use the campaign content.",
    }),
  ],

  orderings: [
    {
      title: "Start Date, Newest",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
    {
      title: "End Date, Soonest",
      name: "endDateAsc",
      by: [{ field: "endDate", direction: "asc" }],
    },
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      status: "status",
      programme: "programme.title",
      media: "featuredImage",
    },

    prepare({ title, status, programme, media }) {
      const statusTitle =
        CAMPAIGN_STATUSES.find((item) => item.value === status)?.title ??
        "Status not set";

      return {
        title,
        subtitle: programme ? `${programme} • ${statusTitle}` : statusTitle,
        media,
      };
    },
  },
});
