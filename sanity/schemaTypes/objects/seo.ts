import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",

  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "Optional title for search engines and social sharing. Leave blank to use the page title.",
      validation: (rule) =>
        rule
          .max(60)
          .warning("Meta titles longer than 60 characters may be truncated."),
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Optional summary for search engines and social sharing.",
      validation: (rule) =>
        rule
          .max(160)
          .warning(
            "Meta descriptions longer than 160 characters may be truncated.",
          ),
    }),

    defineField({
      name: "socialImage",
      title: "Social Image",
      type: "image",
      description:
        "Optional image used when this page is shared on social platforms.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the image for accessibility.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description:
        "Enable this only when this page should not appear in search engine results.",
      initialValue: false,
    }),
  ],
});
