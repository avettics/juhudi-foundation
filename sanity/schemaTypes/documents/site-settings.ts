import { defineField, defineType } from "sanity";

type SocialLinkValue = {
  platform?: string;
};

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description:
    "Global configuration used across the Juhudi Foundation website.",

  groups: [
    {
      name: "general",
      title: "General",
      default: true,
    },
    {
      name: "actions",
      title: "Actions",
    },
    {
      name: "social",
      title: "Social",
    },
    {
      name: "footer",
      title: "Footer",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      group: "general",
      initialValue: "Juhudi Foundation",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "general",
      initialValue: "Uplift • Empower • Inspire",
      validation: (rule) => rule.required().max(100),
    }),

    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      group: "general",
      description:
        "A short description of Juhudi Foundation used across the website.",
      validation: (rule) => rule.required().max(240),
    }),

    defineField({
      name: "contributionCta",
      title: "Contribution Call to Action",
      type: "link",
      group: "actions",
      description:
        "The primary contribution action displayed across the website.",
    }),

    defineField({
      name: "getInvolvedCta",
      title: "Get Involved Call to Action",
      type: "link",
      group: "actions",
      description:
        "The primary action directing visitors to ways they can get involved.",
    }),

    defineField({
      name: "socialLinks",
      title: "Social Media",
      type: "array",
      group: "social",
      of: [{ type: "socialLink" }],
      validation: (rule) =>
        rule.custom((links) => {
          if (!links?.length) return true;

          const platforms = links
            .map((link) => (link as SocialLinkValue).platform)
            .filter(
              (platform): platform is string => typeof platform === "string",
            );

          return new Set(platforms).size === platforms.length
            ? true
            : "Each social platform can only be added once.";
        }),
    }),

    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
      group: "footer",
      description:
        "A short organization statement displayed in the website footer.",
      validation: (rule) => rule.max(240),
    }),

    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      group: "footer",
      description:
        "Optional organization name or copyright text. The website adds the current year automatically.",
      initialValue: "Juhudi Foundation",
      validation: (rule) => rule.max(100),
    }),

    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
      description:
        "Default metadata used when a page does not provide its own SEO settings.",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Global website configuration",
      };
    },
  },
});
