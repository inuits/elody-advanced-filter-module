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
    parentKey: String
    key: String
    itemTypes: [String]
    label: String
    isDisplayedByDefault: Boolean!
    options: [DropdownOption!]!
    advancedFilterInputForRetrievingOptions: AdvancedFilterInputType
    defaultValue(value: JSON!): JSON!
    hidden(value: Boolean): Boolean!
    tooltip(value: Boolean): Boolean
  }

  type AdvancedFilters {
    advancedFilter(
      type: AdvancedFilterTypes!
      parentKey: String
      key: String
      itemTypes: [String]
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
    metadata_key_as_label: String
    item_types: [String]
    match_exact: Boolean
    provide_value_options_for_key: Boolean
    operator: String
  }
  type AdvancedFilterInputType {
    type: AdvancedFilterTypes!
    parent_key: String
    key: String
    value: JSON!
    metadata_key_as_label: String
    item_types: [String]
    match_exact: Boolean
  }

  type Query {
    FilterMatcherMapping: FilterMatcherMap!
    EntityTypeFilters(type: String!): Entity!
    FilterOptions(input: AdvancedFilterInput!, limit: Int!): [DropdownOption!]!
  }
`;
