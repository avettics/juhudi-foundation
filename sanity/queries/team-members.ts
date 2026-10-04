import { defineQuery } from "next-sanity";

/**
 * Public Juhudi Foundation team members grouped and ordered
 * for leadership, board, team, and advisory displays.
 */
export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(group asc, order asc, name asc) {
    _id,
    name,
    role,
    group,
    bio,

    photo {
      asset,
      alt,
      hotspot,
      crop
    },

    linkedinUrl,
    order
  }
`);
