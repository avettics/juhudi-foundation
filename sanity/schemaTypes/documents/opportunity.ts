import { defineField, defineType } from "sanity";

const OPPORTUNITY_TYPES = [
  { title: "Volunteer", value: "volunteer" },
  { title: "Internship", value: "internship" },
  { title: "Employment", value: "employment" },
  { title: "Partnership", value: "partnership" },
  { title: "Programme Application", value: "programmeApplication" },
  { title: "Other", value: "other" },
];

const OPPORTUNITY_MODES = [
  { title: "On Site", value: "onSite" },
  { title: "Remote", value: "remote" },
  { title: "Hybrid", value: "hybrid" },
];

export const opportunity = defineType({
  name: "opportunity",
  title: "Opportunity",
  type: "document",
  description:
    "A volunteering, internship, employment, partnership, programme application, or other opportunity with Juhudi Foundation.",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "details",
      title: "Opportunity Details",
    },
    {
      name: "relationships",
      title: "Relationships",
    },
    {
      name: "application",
      title: "Application",
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
      title: "Opportunity Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(140),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Used in the opportunity page URL.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "opportunityType",
      title: "Opportunity Type",
      type: "string",
      group: "content",
      options: {
        list: OPPORTUNITY_TYPES,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "content",
      description: "A concise summary used on opportunity cards and listings.",
      validation: (rule) => rule.required().max(220),
    }),

    defineField({
      name: "content",
      title: "Opportunity Details",
      type: "blockContent",
      group: "content",
      description:
        "Full information about the opportunity, requirements, responsibilities, eligibility, and other important details.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "mode",
      title: "Participation Mode",
      type: "string",
      group: "details",
      options: {
        list: OPPORTUNITY_MODES,
        layout: "radio",
      },
      initialValue: "onSite",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "details",
      description: "The main location for this opportunity.",
      hidden: ({ parent }) => parent?.mode === "remote",
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: "deadline",
      title: "Application Deadline",
      type: "datetime",
      group: "details",
      description:
        "Optional deadline after which applications should no longer be accepted.",
    }),

    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      group: "relationships",
      description: "Optional programme associated with this opportunity.",
      to: [{ type: "programme" }],
    }),

    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      group: "relationships",
      description: "Optional project associated with this opportunity.",
      to: [{ type: "project" }],
    }),

    defineField({
      name: "applicationLink",
      title: "Application Link",
      type: "link",
      group: "application",
      description:
        "The action visitors use to apply, register interest, or learn how to participate.",
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "presentation",
      description:
        "Optional image used to represent this opportunity across the website.",
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
    }),

    defineField({
      name: "featured",
      title: "Featured Opportunity",
      type: "boolean",
      group: "presentation",
      description:
        "Feature this opportunity in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      description:
        "Optional search and social metadata. Leave blank to use the opportunity content.",
    }),
  ],

  orderings: [
    {
      title: "Deadline, Soonest",
      name: "deadlineAsc",
      by: [{ field: "deadline", direction: "asc" }],
    },
    {
      title: "Deadline, Latest",
      name: "deadlineDesc",
      by: [{ field: "deadline", direction: "desc" }],
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
      opportunityType: "opportunityType",
      deadline: "deadline",
      media: "featuredImage",
    },

    prepare({ title, opportunityType, deadline, media }) {
      const typeTitle =
        OPPORTUNITY_TYPES.find((item) => item.value === opportunityType)
          ?.title ?? "Opportunity";

      const deadlineDate =
        typeof deadline === "string"
          ? new Intl.DateTimeFormat("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(deadline))
          : undefined;

      return {
        title,
        subtitle: deadlineDate
          ? `${typeTitle} • Deadline ${deadlineDate}`
          : typeTitle,
        media,
      };
    },
  },
});
