import { defineField, defineType } from "sanity";

const REPORT_TYPES = [
  { title: "Annual Report", value: "annual" },
  { title: "Impact Report", value: "impact" },
  { title: "Financial / Audited Report", value: "financial" },
  { title: "Programme Report", value: "programme" },
  { title: "Project Report", value: "project" },
  { title: "Research / Publication", value: "research" },
  { title: "Other", value: "other" },
];

export const report = defineType({
  name: "report",
  title: "Report",
  type: "document",
  description:
    "A public report, publication, or downloadable document published by Juhudi Foundation.",

  groups: [
    {
      name: "content",
      title: "Report",
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
      name: "title",
      title: "Report Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(160),
    }),

    defineField({
      name: "reportType",
      title: "Report Type",
      type: "string",
      group: "content",
      options: {
        list: REPORT_TYPES,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "content",
      description:
        "A concise public summary explaining the report and what it covers.",
      validation: (rule) => rule.required().max(500),
    }),

    defineField({
      name: "publicationDate",
      title: "Publication Date",
      type: "date",
      group: "content",
      description:
        "The date this report or publication was officially released.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "reportingPeriod",
      title: "Reporting Period",
      type: "string",
      group: "content",
      description:
        'Optional period covered by the report, such as "2026", "January–June 2026", or "FY 2026".',
      validation: (rule) => rule.max(80),
    }),

    defineField({
      name: "file",
      title: "Report File",
      type: "file",
      group: "content",
      description: "Upload the public report document.",
      options: {
        accept: "application/pdf",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      group: "relationships",
      description: "Optional programme associated with this report.",
      to: [{ type: "programme" }],
    }),

    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      group: "relationships",
      description: "Optional project associated with this report.",
      to: [{ type: "project" }],
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "presentation",
      description:
        "Optional cover or preview image used when displaying this report.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description:
            "Describe the report cover or preview image for visitors who cannot see it.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: "featured",
      title: "Featured Report",
      type: "boolean",
      group: "presentation",
      description: "Feature this report in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "presentation",
      description:
        "Optional manual display priority. Lower numbers appear first when manual ordering is used.",
      validation: (rule) => rule.integer().min(1),
    }),
  ],

  orderings: [
    {
      title: "Publication Date, Newest",
      name: "publicationDateDesc",
      by: [{ field: "publicationDate", direction: "desc" }],
    },
    {
      title: "Publication Date, Oldest",
      name: "publicationDateAsc",
      by: [{ field: "publicationDate", direction: "asc" }],
    },
    {
      title: "Display Order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
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
      reportType: "reportType",
      publicationDate: "publicationDate",
      media: "coverImage",
    },

    prepare({ title, reportType, publicationDate, media }) {
      const typeTitle =
        REPORT_TYPES.find((item) => item.value === reportType)?.title ??
        "Report";

      const publicationYear =
        typeof publicationDate === "string"
          ? new Date(publicationDate).getFullYear()
          : undefined;

      return {
        title,
        subtitle: publicationYear
          ? `${typeTitle} • ${publicationYear}`
          : typeTitle,
        media,
      };
    },
  },
});
