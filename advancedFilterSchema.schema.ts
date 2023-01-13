import { gql } from 'graphql-modules';

export const advancedFilterSchema = gql`
  type filterOption {
    value: String
    label: String
  }

  enum advancedFilterTypes {
    tekst
    multiselect
    checklist
    minmax
  }

  type advancedFilter {
    key: String!
    label: String
    type: advancedFilterTypes!
    isRelation: Boolean
    options: [filterOption]
  }

  type Query {
    FilterOptions(key: String!): [filterOption]
    advancedFilters(choice: String!): [advancedFilter]
  }
`;
