import { gql } from "@apollo/client";

const CATEGORIES = gql`
  query Megamenu {
    megamenu {
      content
      menu_id
    }
  }
`;
export default CATEGORIES;
