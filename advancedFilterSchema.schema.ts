import { gql } from 'graphql-modules';

export const advancedFilterSchema = gql`
  enum advancedFilterTypes {
    id
    text
    date
    number
    selection
    boolean
  }

  type filterMatcherMap {
    id: [String!]!
    text: [String!]!
    date: [String!]!
    number: [String!]!
    selection: [String!]!
    boolean: [String!]!
  }

  type filterOption {
    value: String
    label: String
  }

  type advancedFilter {
    key: String!
    label: String!
    type: advancedFilterTypes!
    isRelation: Boolean!
    options: [filterOption!]!
    defaultValue(value: String!): String!
    hidden(value: Boolean): Boolean!
  }

  type advancedFilters {
    advancedFilter(
      key: String!
      label: String!
      type: advancedFilterTypes!
    ): advancedFilter!
  }

  type Query {
    FilterMatcherMapping: filterMatcherMap!
    EntityTypeFilters(type: String!): Entity!
    FilterOptions(key: String!): [filterOption]
  }
`;
