import { gql } from 'graphql-modules';

export const advancedFilterSchema = gql`
  type filterOption {
    value: String
    label: String
  }

  enum advancedFilterTypes {
    id
    selection
    date
    boolean
    text
  }

  type advancedFilter {
    key: String!
    label: String!
    type: advancedFilterTypes!
    isRelation: Boolean
    options: [filterOption]
    defaultValue(value: String): String
    hidden(value: Boolean): Boolean!
  }

  type advancedFilters {
    advancedFilter(
      key: String!
      label: String!
      type: advancedFilterTypes!
    ) : advancedFilter
  }

  type Query {
    FilterOptions(key: String!): [filterOption]
    advancedFilters(entityType: String!): advancedFilters
  }
`;
