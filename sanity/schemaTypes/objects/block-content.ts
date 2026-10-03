import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Rich Content",
  type: "array",

  of: [
    defineArrayMember({
      type: "block",

      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],

      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],

      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],

        annotations: [
          defineArrayMember({
            name: "externalLink",
            title: "External Link",
            type: "object",

            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.required().uri({
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),

              defineField({
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          }),

          defineArrayMember({
            name: "internalLink",
            title: "Internal Link",
            type: "object",

            fields: [
              defineField({
                name: "reference",
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
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      },
    }),

    defineArrayMember({
      type: "image",
      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the image for people who cannot see it.",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional caption displayed with the image.",
        }),
      ],
    }),
  ],
});
