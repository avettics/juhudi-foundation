import { defineField, defineType } from "sanity";

const TESTIMONIAL_TYPES = [
  { title: "Beneficiary / Participant", value: "participant" },
  { title: "Community Member", value: "community" },
  { title: "Volunteer", value: "volunteer" },
  { title: "Partner", value: "partner" },
  { title: "Other", value: "other" },
];

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description:
    "An approved public testimonial about Juhudi Foundation's programmes, projects, or work.",

  groups: [
    {
      name: "content",
      title: "Testimonial",
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
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 6,
      group: "content",
      description:
        "The approved testimonial exactly as it should appear publicly.",
      validation: (rule) => rule.required().max(800),
    }),

    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      description: "The public name of the person giving the testimonial.",
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: "testimonialType",
      title: "Testimonial Type",
      type: "string",
      group: "content",
      description: "The person's relationship with Juhudi Foundation.",
      options: {
        list: TESTIMONIAL_TYPES,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role / Description",
      type: "string",
      group: "content",
      description:
        'Optional public context, such as "Youth Programme Participant" or "Community Leader".',
      validation: (rule) => rule.max(140),
    }),

    defineField({
      name: "organisation",
      title: "Organisation",
      type: "string",
      group: "content",
      description: "Optional public organization associated with the person.",
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      group: "relationships",
      description: "Optional programme associated with this testimonial.",
      to: [{ type: "programme" }],
    }),

    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      group: "relationships",
      description: "Optional project associated with this testimonial.",
      to: [{ type: "project" }],
    }),

    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      group: "presentation",
      description:
        "Optional approved photograph of the person giving the testimonial.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description:
            "Describe the photograph for visitors who cannot see it.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: "featured",
      title: "Featured Testimonial",
      type: "boolean",
      group: "presentation",
      description:
        "Feature this testimonial in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "presentation",
      description:
        "Controls the testimonial's display order. Lower numbers appear first.",
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
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      name: "name",
      role: "role",
      testimonialType: "testimonialType",
      media: "photo",
    },

    prepare({ name, role, testimonialType, media }) {
      const typeTitle =
        TESTIMONIAL_TYPES.find((item) => item.value === testimonialType)
          ?.title ?? "Testimonial";

      return {
        title: name,
        subtitle: role ? `${role} • ${typeTitle}` : typeTitle,
        media,
      };
    },
  },
});
