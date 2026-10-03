import { defineField, defineType } from "sanity";

export const programme = defineType({
  name: "programme",
  title: "Programme",
  type: "document",
  description:
    "A long-term programme area through which Juhudi Foundation delivers its mission.",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
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
      title: "Programme Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(100),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Used in the programme page URL.",
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
        "A concise summary used on programme cards and overview sections.",
      validation: (rule) => rule.required().max(220),
    }),

    defineField({
      name: "content",
      title: "Programme Overview",
      type: "blockContent",
      group: "content",
      description:
        "The full programme introduction, purpose, approach, and areas of work.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "focusAreas",
      title: "Focus Areas",
      type: "array",
      group: "content",
      description: "The main areas of focus within this programme.",
      of: [
        {
          type: "string",
        },
      ],
      validation: (rule) =>
        rule
          .unique()
          .max(12)
          .warning("Keep the programme focused on its main areas of work."),
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "presentation",
      description: "Primary image used for the programme across the website.",
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
      title: "Featured Programme",
      type: "boolean",
      group: "presentation",
      description: "Feature this programme in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "presentation",
      description: "Controls the programme order. Lower numbers appear first.",
      validation: (rule) => rule.required().integer().min(1),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      description:
        "Optional search and social metadata. Leave blank to use the programme content.",
    }),
  ],

  orderings: [
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
      subtitle: "shortDescription",
      media: "featuredImage",
    },
  },
});
