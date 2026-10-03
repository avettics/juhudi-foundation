import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",

  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Text displayed to the visitor.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      initialValue: "internal",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "internalLink",
      title: "Destination",
      type: "reference",
      to: [
        { type: "programme" },
        { type: "project" },
        { type: "campaign" },
        { type: "story" },
        { type: "event" },
        { type: "opportunity" },
      ],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;

          if (parent?.linkType === "internal" && !value) {
            return "Select an internal destination.";
          }

          return true;
        }),
    }),

    defineField({
      name: "url",
      title: "External URL",
      type: "url",
      description: "Enter the full URL, including https://.",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (rule) =>
        rule
          .uri({
            scheme: ["http", "https", "mailto", "tel"],
          })
          .custom((value, context) => {
            const parent = context.parent as { linkType?: string } | undefined;

            if (parent?.linkType === "external" && !value) {
              return "Enter an external URL.";
            }

            return true;
          }),
    }),

    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
  ],

  preview: {
    select: {
      label: "label",
      linkType: "linkType",
      url: "url",
      internalTitle: "internalLink.title",
    },

    prepare({ label, linkType, url, internalTitle }) {
      return {
        title: label || "Untitled link",
        subtitle:
          linkType === "external"
            ? url || "External link"
            : internalTitle || "Internal link",
      };
    },
  },
});
