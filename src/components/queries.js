import { gql } from "@apollo/client";

export const ALL_CATEGORIES = gql`
  query Categories {
    categories {
      name
    }
  }
`;

export const ALL_CURRENCIES = gql`
  query Currencies {
    currencies {
      label
      symbol
    }
  }
`;

export const ALL_ITEMS_IN_CATEGORY = gql`
  query Category($input: CategoryInput) {
    category(input: $input) {
      products {
        name
        prices {
          amount
          currency {
            symbol
          }
        }
        gallery
        id
        inStock
      }
    }
  }
`;

export const PRODUCT_BY_ID = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      category
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;
