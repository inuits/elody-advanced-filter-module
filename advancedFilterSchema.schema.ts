import { gql } from "graphql-modules";

export const advancedFilterSchema = gql`
  enum AdvancedFilterTypes {
    id
    text
    date
    number
    selection
    boolean
    type
  }

  type FilterMatcherMap {
    id: [String!]!
    text: [String!]!
    date: [String!]!
    number: [String!]!
    selection: [String!]!
    boolean: [String!]!
    type: [String!]!
  }

  type AdvancedFilter {
    type: AdvancedFilterTypes!
    key: String
    parentKey: String
    label: String
    isDisplayedByDefault: Boolean!
    options: [DropdownOption!]!
    advancedFilterInputForRetrievingOptions: AdvancedFilterInputType
    defaultValue(value: JSON!): JSON!
    hidden(value: Boolean): Boolean!
    tooltip(value: String): String
  }

  type AdvancedFilters {
    advancedFilter(
      type: AdvancedFilterTypes!
      key: String
      parentKey: String
      label: String
      isDisplayedByDefault: Boolean
      advancedFilterInputForRetrievingOptions: AdvancedFilterInput
    ): AdvancedFilter!
  }

  input AdvancedFilterInput {
    type: AdvancedFilterTypes!
    parent_key: String
    key: String
    value: JSON!
    item_types: [String]
    match_exact: Boolean
    provide_value_options_for_key: Boolean
  }
  type AdvancedFilterInputType {
    type: AdvancedFilterTypes!
    parent_key: String
    key: String
    value: JSON!
    item_types: [String]
    match_exact: Boolean
  }

  type Query {
    FilterMatcherMapping: FilterMatcherMap!
    EntityTypeFilters(type: String!): Entity!
    FilterOptions(input: AdvancedFilterInput!, limit: Int!): [DropdownOption!]!
  }
`;
