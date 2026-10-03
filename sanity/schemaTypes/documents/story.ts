import { defineField, defineType } from "sanity";

const STORY_TYPES = [
  { title: "Impact Story", value: "impact" },
  { title: "News", value: "news" },
  { title: "Update", value: "update" },
];

export const story = defineType({
  name: "story",
  title: "Story",
  type: "document",
  description:
    "An impact story, news article, or update published by Juhudi Foundation.",

  groups: [
    {
      name: "content",
      title: "Content",
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
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Story Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(140),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Used in the story page URL.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "storyType",
      title: "Story Type",
      type: "string",
      group: "content",
      options: {
        list: STORY_TYPES,
        layout: "radio",
      },
      initialValue: "impact",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "A concise summary used on story cards, listings, and previews.",
      validation: (rule) => rule.required().max(220),
    }),

    defineField({
      name: "content",
      title: "Story Content",
      type: "blockContent",
      group: "content",
      description: "The full story, article, or update.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      group: "content",
      description: "The public publication date displayed with this story.",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      group: "relationships",
      description: "Optional programme associated with this story.",
      to: [{ type: "programme" }],
    }),

    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      group: "relationships",
      description: "Optional project associated with this story.",
      to: [{ type: "project" }],
    }),

    defineField({
      name: "campaign",
      title: "Campaign",
      type: "reference",
      group: "relationships",
      description: "Optional campaign associated with this story.",
      to: [{ type: "campaign" }],
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "presentation",
      description:
        "Primary image used to represent this story across the website.",
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
      title: "Featured Story",
      type: "boolean",
      group: "presentation",
      description: "Feature this story in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      description:
        "Optional search and social metadata. Leave blank to use the story content.",
    }),
  ],

  orderings: [
    {
      title: "Publication Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Publication Date, Oldest",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
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
      storyType: "storyType",
      publishedAt: "publishedAt",
      media: "featuredImage",
    },

    prepare({ title, storyType, publishedAt, media }) {
      const typeTitle =
        STORY_TYPES.find((item) => item.value === storyType)?.title ?? "Story";

      const publicationYear =
        typeof publishedAt === "string"
          ? new Date(publishedAt).getFullYear()
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
