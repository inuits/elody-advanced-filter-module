import { gql } from "graphql-modules";

export const advancedFilterSchema = gql`
  enum AdvancedFilterTypes {
    id
    text
    date
    number
    selection
    boolean
    relation
  }

  type FilterMatcherMap {
    id: [String!]!
    text: [String!]!
    date: [String!]!
    number: [String!]!
    selection: [String!]!
    boolean: [String!]!
    # relation: [String!]!
  }

  type AdvancedFilter {
    type: AdvancedFilterTypes!
    key: String!
    label: String!
    isDisplayedByDefault: Boolean!
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
      isDisplayedByDefault: Boolean
      advancedFilterInputForRetrievingOptions: AdvancedFilterInput
    ): AdvancedFilter!
  }

  scalar FilterValue
  input AdvancedFilterInput {
    type: AdvancedFilterTypes!
    key: String!
    value: FilterValue!
    parent: String
    item_types: [String]
    match_exact: Boolean
    provide_value_options_for_key: Boolean
  }
  type AdvancedFilterInputType {
    type: AdvancedFilterTypes!
    key: String!
    value: FilterValue!
    parent: String
    item_types: [String]
    match_exact: Boolean
    provide_value_options_for_key: Boolean
  }

  type Query {
    FilterMatcherMapping: FilterMatcherMap!
    EntityTypeFilters(type: String!): Entity!
    FilterOptions(input: AdvancedFilterInput!, limit: Int!): [String!]!
  }
`;
