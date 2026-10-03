import { defineField, defineType } from "sanity";

export const impactMetric = defineType({
  name: "impactMetric",
  title: "Impact Metric",
  type: "document",
  description:
    "A verified public impact figure used to communicate Juhudi Foundation's reach and results.",

  groups: [
    {
      name: "metric",
      title: "Metric",
      default: true,
    },
    {
      name: "context",
      title: "Context",
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
      title: "Metric Title",
      type: "string",
      group: "metric",
      description:
        'A short description of what is being measured, such as "Young People Reached".',
      validation: (rule) => rule.required().max(100),
    }),

    defineField({
      name: "value",
      title: "Value",
      type: "number",
      group: "metric",
      description:
        "The verified numeric value. Enter the number only; formatting is handled by the website.",
      validation: (rule) => rule.required().min(0),
    }),

    defineField({
      name: "prefix",
      title: "Prefix",
      type: "string",
      group: "metric",
      description: 'Optional text displayed before the value, such as "$".',
      validation: (rule) => rule.max(20),
    }),

    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      group: "metric",
      description:
        'Optional text displayed after the value, such as "+", "%", or "communities".',
      validation: (rule) => rule.max(30),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "context",
      description:
        "Optional supporting context explaining what this figure represents.",
      validation: (rule) => rule.max(300),
    }),

    defineField({
      name: "asOfDate",
      title: "As Of Date",
      type: "date",
      group: "context",
      description: "The date up to which this impact figure is accurate.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      group: "relationships",
      description: "Optional programme this impact figure relates to.",
      to: [{ type: "programme" }],
    }),

    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      group: "relationships",
      description: "Optional project this impact figure relates to.",
      to: [{ type: "project" }],
    }),

    defineField({
      name: "featured",
      title: "Featured Metric",
      type: "boolean",
      group: "presentation",
      description:
        "Feature this metric in prominent impact sections of the website.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "presentation",
      description:
        "Controls the metric's display order. Lower numbers appear first.",
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
      title: "As Of Date, Newest",
      name: "asOfDateDesc",
      by: [{ field: "asOfDate", direction: "desc" }],
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
      value: "value",
      prefix: "prefix",
      suffix: "suffix",
      asOfDate: "asOfDate",
    },

    prepare({ title, value, prefix, suffix, asOfDate }) {
      const formattedValue =
        typeof value === "number"
          ? new Intl.NumberFormat("en").format(value)
          : "Value not set";

      const displayValue =
        typeof value === "number"
          ? `${prefix ?? ""}${formattedValue}${suffix ?? ""}`
          : formattedValue;

      return {
        title,
        subtitle: asOfDate
          ? `${displayValue} • As of ${asOfDate}`
          : displayValue,
      };
    },
  },
});
