import { defineField, defineType } from "sanity";

const PROJECT_STATUSES = [
  { title: "Planned", value: "planned" },
  { title: "Active", value: "active" },
  { title: "On Hold", value: "onHold" },
  { title: "Completed", value: "completed" },
  { title: "Cancelled", value: "cancelled" },
];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  description:
    "A specific Juhudi Foundation initiative delivered under a programme.",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "details",
      title: "Project Details",
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
      title: "Project Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Used in the project page URL.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      group: "content",
      description:
        "The Juhudi programme under which this project is delivered.",
      to: [{ type: "programme" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "A concise project summary used on cards and overview sections.",
      validation: (rule) => rule.required().max(220),
    }),

    defineField({
      name: "content",
      title: "Project Overview",
      type: "blockContent",
      group: "content",
      description:
        "The full project description, purpose, activities, approach, and expected outcomes.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      group: "details",
      options: {
        list: PROJECT_STATUSES,
        layout: "radio",
      },
      initialValue: "planned",
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
      name: "location",
      title: "Location",
      type: "string",
      group: "details",
      description:
        "The main project location, such as a district, region, or community.",
      validation: (rule) => rule.max(120),
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "presentation",
      description:
        "Primary image used to represent this project across the website.",
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
      title: "Featured Project",
      type: "boolean",
      group: "presentation",
      description: "Feature this project in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      description:
        "Optional search and social metadata. Leave blank to use the project content.",
    }),
  ],

  orderings: [
    {
      title: "Start Date, Newest",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
    {
      title: "Start Date, Oldest",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
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
      programme: "programme.title",
      status: "status",
      media: "featuredImage",
    },

    prepare({ title, programme, status, media }) {
      const statusTitle =
        PROJECT_STATUSES.find((item) => item.value === status)?.title ??
        "Status not set";

      return {
        title,
        subtitle: programme ? `${programme} • ${statusTitle}` : statusTitle,
        media,
      };
    },
  },
});
