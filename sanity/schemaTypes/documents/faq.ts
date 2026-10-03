import { defineField, defineType } from "sanity";

const FAQ_CATEGORIES = [
  { title: "General", value: "general" },
  { title: "Programmes & Projects", value: "programmes" },
  { title: "Contributions", value: "contributions" },
  { title: "Volunteering & Opportunities", value: "opportunities" },
  { title: "Partnerships", value: "partnerships" },
  { title: "Other", value: "other" },
];

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  description:
    "A frequently asked question and public answer used across the Juhudi Foundation website.",

  groups: [
    {
      name: "content",
      title: "FAQ",
      default: true,
    },
    {
      name: "presentation",
      title: "Presentation",
    },
  ],

  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(200),
    }),

    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 6,
      group: "content",
      description: "A clear public answer to this question.",
      validation: (rule) => rule.required().max(1200),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      description: "Used to group related questions across the website.",
      options: {
        list: FAQ_CATEGORIES,
        layout: "dropdown",
      },
      initialValue: "general",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "featured",
      title: "Featured FAQ",
      type: "boolean",
      group: "presentation",
      description:
        "Feature this question in prominent FAQ sections of the website.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "presentation",
      description:
        "Controls the question's display order within its category. Lower numbers appear first.",
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],

  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
    {
      title: "Question A–Z",
      name: "questionAsc",
      by: [{ field: "question", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      question: "question",
      category: "category",
    },

    prepare({ question, category }) {
      const categoryTitle =
        FAQ_CATEGORIES.find((item) => item.value === category)?.title ?? "FAQ";

      return {
        title: question,
        subtitle: categoryTitle,
      };
    },
  },
});
