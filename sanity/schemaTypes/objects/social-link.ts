import { defineField, defineType } from "sanity";

const SOCIAL_PLATFORMS = [
  { title: "Facebook", value: "facebook" },
  { title: "Instagram", value: "instagram" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "X", value: "x" },
  { title: "YouTube", value: "youtube" },
  { title: "TikTok", value: "tiktok" },
  { title: "WhatsApp", value: "whatsapp" },
];

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",

  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: SOCIAL_PLATFORMS,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "url",
      title: "Profile URL",
      type: "url",
      description: "Enter the full URL to the social media profile or page.",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
  ],

  preview: {
    select: {
      platform: "platform",
      url: "url",
    },

    prepare({ platform, url }) {
      const platformTitle =
        SOCIAL_PLATFORMS.find((item) => item.value === platform)?.title ??
        "Social Link";

      return {
        title: platformTitle,
        subtitle: url,
      };
    },
  },
});
