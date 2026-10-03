import { defineField, defineType } from "sanity";

const TEAM_GROUPS = [
  { title: "Leadership", value: "leadership" },
  { title: "Board", value: "board" },
  { title: "Team", value: "team" },
  { title: "Advisory", value: "advisory" },
];

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  description:
    "A person publicly presented as part of Juhudi Foundation's leadership, board, team, or advisory group.",

  groups: [
    {
      name: "profile",
      title: "Profile",
      default: true,
    },
    {
      name: "presentation",
      title: "Presentation",
    },
  ],

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      group: "profile",
      description: "The person's public role or position at Juhudi Foundation.",
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: "group",
      title: "Team Group",
      type: "string",
      group: "profile",
      description:
        "Controls where this person is grouped when the team is displayed.",
      options: {
        list: TEAM_GROUPS,
        layout: "radio",
      },
      initialValue: "team",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 5,
      group: "profile",
      description:
        "A concise public biography describing the person's role, experience, and contribution.",
      validation: (rule) => rule.max(800),
    }),

    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      group: "presentation",
      description:
        "Public profile photograph used on the Juhudi Foundation website.",
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
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      group: "profile",
      description: "Optional public LinkedIn profile.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "presentation",
      description:
        "Controls the order within the person's team group. Lower numbers appear first.",
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],

  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [
        { field: "group", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
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
      group: "group",
      media: "photo",
    },

    prepare({ name, role, group, media }) {
      const groupTitle =
        TEAM_GROUPS.find((item) => item.value === group)?.title ?? "Team";

      return {
        title: name,
        subtitle: role ? `${role} • ${groupTitle}` : groupTitle,
        media,
      };
    },
  },
});
