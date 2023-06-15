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
    type: AdvancedFilterTypes!
    key: String!
    label: String!
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
    item_types: [String]
    provide_value_options_for_key: Boolean
  }
  type AdvancedFilterInputType {
    type: AdvancedFilterTypes!
    key: String!
    value: FilterValue!
    match_exact: Boolean
    item_types: [String]
    provide_value_options_for_key: Boolean
  }

  type Query {
    FilterMatcherMapping: FilterMatcherMap!
    EntityTypeFilters(type: String!): Entity!
    FilterOptions(input: AdvancedFilterInput!, limit: Int!): [String!]!
  }
`;
