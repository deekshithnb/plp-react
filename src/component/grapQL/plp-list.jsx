import { gql } from "@apollo/client";

const PRODUCT_LIST = gql`
  query CategoryList($url_key: String, $page: Int = 1) {
    categoryList(filters: { url_key: { eq: $url_key } }) {
      product_count
      name
      products(pageSize: 10, currentPage: $page) {
        items {
          name
          url_key
          thumbnail {
            url
          }
          price_range {
            maximum_price {
              final_price {
                value
              }
            }
          }
        }
        page_info {
          current_page
          page_size
          total_pages
        }
        total_count
      }
      thumbnail
      type
      uid
      updated_at
      url_key
      url_path
    }
  }
`;

export default PRODUCT_LIST;
