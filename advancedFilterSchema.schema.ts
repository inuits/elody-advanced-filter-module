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
    inner_exact_matches: JSON
    operator: String
    aggregation: String
    returnIdAtIndex: Int
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
    doNotOverrideDefaultValue(value: Boolean): Boolean
    hidden(value: Boolean): Boolean!
    tooltip(value: Boolean): Boolean
    min: Int
    max: Int
    unit: String
    context: JSON
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
    inner_exact_matches: JSON
    aggregation: String
    returnIdAtIndex: Int
    context: JSON
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
      min: Int
      max: Int
      unit: String
      context: JSON
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
