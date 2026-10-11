import { defineArrayMember, defineField } from "sanity";
import { pageContentDefaults } from "../../content/defaults";

// Fixed editorial fields; layout, navigation and actions remain in the application.
export const pageContentFields = [
  defineField({
    name: "homePage",
    title: "Home page",
    type: "object",
    group: "homePage",
    initialValue: pageContentDefaults.home,
    fields: [
      defineField({
        name: "hero",
        title: "Hero",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "imageAlt",
            title: "Image Alt",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "image",
            title: "Photograph",
            type: "image",
            description:
              "Replaces the existing local photograph when set. Add alt text and adjust the crop/hotspot.",
            options: { hotspot: true },
            fields: [
              defineField({
                name: "alt",
                title: "Alternative text",
                type: "string",
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "introduction",
        title: "Introduction",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "impact",
        title: "Impact",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "work",
        title: "Work",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "projects",
        title: "Projects",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "involvement",
        title: "Involvement",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "volunteerDescription",
            title: "Volunteer Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "partnerDescription",
            title: "Partner Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "contributionDescription",
            title: "Contribution Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "contribution",
        title: "Contribution",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({ name: "seo", title: "SEO", type: "seo" }),
    ],
  }),
  defineField({
    name: "aboutPage",
    title: "About page",
    type: "object",
    group: "aboutPage",
    initialValue: pageContentDefaults.about,
    fields: [
      defineField({
        name: "introduction",
        title: "Introduction",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "summary",
            title: "Summary",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "imageAlt",
            title: "Image Alt",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "image",
            title: "Photograph",
            type: "image",
            description:
              "Replaces the existing local photograph when set. Add alt text and adjust the crop/hotspot.",
            options: { hotspot: true },
            fields: [
              defineField({
                name: "alt",
                title: "Alternative text",
                type: "string",
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "purpose",
        title: "Purpose",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "missionTitle",
            title: "Mission Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "missionDescription",
            title: "Mission Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "visionTitle",
            title: "Vision Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "visionDescription",
            title: "Vision Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "story",
        title: "Story",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "introduction",
            title: "Introduction",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "paragraph1",
            title: "Paragraph1",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "paragraph2",
            title: "Paragraph2",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "paragraph3",
            title: "Paragraph3",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "closing",
            title: "Closing",
            type: "string",
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "principles",
        title: "Principles",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "items",
            title: "Principles",
            type: "array",
            of: [
              defineArrayMember({
                name: "principle",
                type: "object",
                fields: [
                  defineField({
                    name: "title",
                    type: "string",
                    validation: (rule) => rule.required(),
                  }),
                  defineField({
                    name: "description",
                    type: "text",
                    rows: 3,
                    validation: (rule) => rule.required(),
                  }),
                ],
                preview: {
                  select: { title: "title", subtitle: "description" },
                },
              }),
            ],
            validation: (rule) => rule.required().min(1),
          }),
        ],
      }),
      defineField({
        name: "team",
        title: "Team",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({ name: "seo", title: "SEO", type: "seo" }),
    ],
  }),
  defineField({
    name: "ourWorkPage",
    title: "Our Work page",
    type: "object",
    group: "ourWorkPage",
    initialValue: pageContentDefaults.ourWork,
    fields: [
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({ name: "seo", title: "SEO", type: "seo" }),
    ],
  }),

  defineField({
    name: "getInvolvedPage",
    title: "Get Involved page",
    type: "object",
    group: "getInvolvedPage",
    initialValue: pageContentDefaults.getInvolved,
    fields: [
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
      }),
    ],
  }),

  defineField({
    name: "volunteerPage",
    title: "Volunteer page",
    type: "object",
    group: "volunteerPage",
    initialValue: pageContentDefaults.volunteer,
    fields: [
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
      }),
    ],
  }),

  defineField({
    name: "partnerPage",
    title: "Partner page",
    type: "object",
    group: "partnerPage",
    initialValue: pageContentDefaults.partner,
    fields: [
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
      }),
    ],
  }),
  defineField({
    name: "contributePage",
    title: "Contribute page",
    type: "object",
    group: "contributePage",
    initialValue: pageContentDefaults.contribute,
    fields: [
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
      }),
    ],
  }),
  defineField({
    name: "projectsPage",
    title: "Projects page",
    type: "object",
    group: "projectsPage",
    initialValue: pageContentDefaults.projects,
    fields: [
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
      }),
    ],
  }),
  defineField({
    name: "galleryPage",
    title: "Gallery page",
    type: "object",
    group: "galleryPage",
    initialValue: pageContentDefaults.gallery,
    fields: [
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
      }),
    ],
  }),
  defineField({
    name: "contactPage",
    title: "Contact page",
    type: "object",
    group: "contactPage",
    initialValue: pageContentDefaults.contact,
    fields: [
      defineField({
        name: "header",
        title: "Header",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required(),
          }),
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
      }),
    ],
  }),
];
