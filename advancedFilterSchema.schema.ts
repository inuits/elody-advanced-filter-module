import { gql } from 'graphql-modules';

export const advancedFilterSchema = gql`
  enum AdvancedFilterTypes {
    id
    text
    date
    number
    selection
    boolean
  }

  type FilterMatcherMap {
    id: [String!]!
    text: [String!]!
    date: [String!]!
    number: [String!]!
    selection: [String!]!
    boolean: [String!]!
  }

  type AdvancedFilter {
    key: String!
    label: String!
    type: AdvancedFilterTypes!
    isRelation: Boolean!
    options: [DropdownOption!]!
    advancedFilterInputForRetrievingOptions: AdvancedFilterInputType
    defaultValue(value: String!): String!
    hidden(value: Boolean): Boolean!
  }

  type AdvancedFilters {
    advancedFilter(
      key: String!
      label: String!
      type: AdvancedFilterTypes!
      advancedFilterInputForRetrievingOptions: AdvancedFilterInput
    ): AdvancedFilter!
  }

  scalar FilterValue
  input AdvancedFilterInput {
    type: AdvancedFilterTypes!
    key: String!
    value: FilterValue!
    match_exact: Boolean
    provide_value_options_for_key: Boolean
  }
  type AdvancedFilterInputType {
    type: AdvancedFilterTypes!
    key: String!
    value: FilterValue!
    match_exact: Boolean
    provide_value_options_for_key: Boolean
  }

  type Query {
    FilterMatcherMapping: FilterMatcherMap!
    EntityTypeFilters(type: String!): Entity!
    FilterOptions(input: AdvancedFilterInput!): [String!]!
  }
`;
