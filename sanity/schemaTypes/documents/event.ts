import { defineField, defineType } from "sanity";

const EVENT_FORMATS = [
  { title: "In Person", value: "inPerson" },
  { title: "Online", value: "online" },
  { title: "Hybrid", value: "hybrid" },
];

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  description:
    "A Juhudi Foundation event, activity, workshop, training, or community gathering.",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "schedule",
      title: "Schedule & Location",
    },
    {
      name: "relationships",
      title: "Relationships",
    },
    {
      name: "participation",
      title: "Participation",
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
      title: "Event Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(140),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Used in the event page URL.",
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
      description: "A concise summary used on event cards and listings.",
      validation: (rule) => rule.required().max(220),
    }),

    defineField({
      name: "content",
      title: "Event Details",
      type: "blockContent",
      group: "content",
      description:
        "Full information about the event, its purpose, activities, and what participants should expect.",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "startAt",
      title: "Start Date & Time",
      type: "datetime",
      group: "schedule",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "endAt",
      title: "End Date & Time",
      type: "datetime",
      group: "schedule",
      validation: (rule) =>
        rule.custom((endAt, context) => {
          const document = context.document as
            | {
                startAt?: string;
              }
            | undefined;

          if (!endAt || !document?.startAt) {
            return true;
          }

          return new Date(endAt).getTime() >=
            new Date(document.startAt).getTime()
            ? true
            : "End date and time cannot be before the start date and time.";
        }),
    }),

    defineField({
      name: "format",
      title: "Event Format",
      type: "string",
      group: "schedule",
      options: {
        list: EVENT_FORMATS,
        layout: "radio",
      },
      initialValue: "inPerson",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      group: "schedule",
      description:
        "Name of the physical venue where the event will take place.",
      hidden: ({ parent }) => parent?.format === "online",
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "schedule",
      description:
        "Area, district, region, or other useful location information.",
      hidden: ({ parent }) => parent?.format === "online",
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: "onlineUrl",
      title: "Online Event URL",
      type: "url",
      group: "schedule",
      description: "Link participants use to join an online or hybrid event.",
      hidden: ({ parent }) => parent?.format === "inPerson",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "programme",
      title: "Programme",
      type: "reference",
      group: "relationships",
      description: "Optional programme associated with this event.",
      to: [{ type: "programme" }],
    }),

    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      group: "relationships",
      description: "Optional project associated with this event.",
      to: [{ type: "project" }],
    }),

    defineField({
      name: "participationLink",
      title: "Participation Link",
      type: "link",
      group: "participation",
      description:
        "Optional action for registration, application, attendance information, or another participation step.",
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "presentation",
      description:
        "Primary image used to represent this event across the website.",
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
      title: "Featured Event",
      type: "boolean",
      group: "presentation",
      description: "Feature this event in prominent areas of the website.",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      description:
        "Optional search and social metadata. Leave blank to use the event content.",
    }),
  ],

  orderings: [
    {
      title: "Start Date, Soonest",
      name: "startAtAsc",
      by: [{ field: "startAt", direction: "asc" }],
    },
    {
      title: "Start Date, Latest",
      name: "startAtDesc",
      by: [{ field: "startAt", direction: "desc" }],
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
      startAt: "startAt",
      format: "format",
      media: "featuredImage",
    },

    prepare({ title, startAt, format, media }) {
      const formatTitle =
        EVENT_FORMATS.find((item) => item.value === format)?.title ?? "Event";

      const eventDate =
        typeof startAt === "string"
          ? new Intl.DateTimeFormat("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(startAt))
          : undefined;

      return {
        title,
        subtitle: eventDate ? `${eventDate} • ${formatTitle}` : formatTitle,
        media,
      };
    },
  },
});
