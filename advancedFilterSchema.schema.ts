// @ts-ignore
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
    metadata_on_relation
  }

  enum AutocompleteSelectionOptions {
    auto
    checkboxlist
    autocomplete
  }

  input AdvancedFilterInput {
    lookup: LookupInput
    type: AdvancedFilterTypes!
    selectionOption: AutocompleteSelectionOptions
    parent_key: String
    key: JSON
    value: JSON!
    metadata_key_as_label: String
    item_types: [String]
    match_exact: Boolean
    provide_value_options_for_key: Boolean
    operator: String
    aggregation: String
  }

  input LookupInput {
    from: String!
    local_field: String!
    foreign_field: String!
    as: String!
  }

  type AdvancedFilter {
    lookup: LookupInputType
    type: AdvancedFilterTypes!
    selectionOption: AutocompleteSelectionOptions
    parentKey: String
    key: JSON
    itemTypes: [String]
    label: String
    isDisplayedByDefault: Boolean!
    showTimeForDateFilter: Boolean
    options: [DropdownOption!]!
    advancedFilterInputForRetrievingOptions: [AdvancedFilterInputType!]
    aggregation: String
    defaultValue(value: JSON!): JSON!
    hidden(value: Boolean): Boolean!
    tooltip(value: Boolean): Boolean
  }

  type AdvancedFilterInputType {
    lookup: LookupInputType
    type: AdvancedFilterTypes!
    selectionOption: AutocompleteSelectionOptions
    parent_key: String
    key: JSON
    value: JSON!
    metadata_key_as_label: String
    item_types: [String]
    match_exact: Boolean
    aggregation: String
  }

  type AdvancedFilters {
    advancedFilter(
      lookup: LookupInput
      type: AdvancedFilterTypes!
      selectionOption: AutocompleteSelectionOptions
      parentKey: String
      key: JSON
      itemTypes: [String]
      label: String
      isDisplayedByDefault: Boolean
      showTimeForDateFilter: Boolean
      advancedFilterInputForRetrievingOptions: [AdvancedFilterInput!]
      aggregation: String
    ): AdvancedFilter!
  }

  type FilterMatcherMap {
    id: [String!]!
    text: [String!]!
    date: [String!]!
    number: [String!]!
    selection: [String!]!
    boolean: [String!]!
    type: [String!]!
    metadata_on_relation: [String!]!
  }

  type LookupInputType {
    from: String!
    local_field: String!
    foreign_field: String!
    as: String!
  }

  type Query {
    FilterMatcherMapping: FilterMatcherMap!
    EntityTypeFilters(type: String!): Entity!
    FilterOptions(input: [AdvancedFilterInput!]!, limit: Int!, entityType: String!): [DropdownOption!]!
  }
`;
