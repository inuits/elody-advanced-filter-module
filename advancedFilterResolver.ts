import { ContextValue } from "base-graphql";
import {
  AdvancedFilterInputType, AutocompleteSelectionOptions,
  DamsIcons,
  Entity,
  LookupInputType,
  Resolvers,
} from "../../generated-types/type-defs";

export const advancedFilterResolver: Resolvers<ContextValue> = {
  Query: {
    FilterMatcherMapping: async (_source, {}, { dataSources }) => {
      return await dataSources.CollectionAPI.getFilterMatcherMapping();
    },
    EntityTypeFilters: async (_source, { type }) => {
      return {
        type,
        advancedFilters: {},
      } as Entity;
    },
    FilterOptions: async (_source, { input, limit, entityType }, { dataSources }) => {
      return await dataSources.CollectionAPI.GetFilterOptions(input, limit, entityType);
    },
  },
  AdvancedFilters: {
    advancedFilter: async (
      _source,
      {
        lookup,
        type,
        selectionOption,
        parentKey,
        key,
        itemTypes,
        label,
        isDisplayedByDefault,
        showTimeForDateFilter,
        advancedFilterInputForRetrievingOptions,
        aggregation
      }
    ) => {
      return {
        lookup,
        type,
        selectionOption: selectionOption || AutocompleteSelectionOptions.Auto,
        parentKey,
        key,
        itemTypes,
        label: label || "",
        isDisplayedByDefault: isDisplayedByDefault || false,
        showTimeForDateFilter: showTimeForDateFilter,
        options: [],
        advancedFilterInputForRetrievingOptions,
        aggregation,
        defaultValue: "",
        hidden: false,
      };
    },
  },
  AdvancedFilter: {
    lookup: async (parent) => {
      return parent.lookup as LookupInputType;
    },
    type: async (parent) => {
      return parent.type;
    },
    selectionOption: async (parent) => {
      return parent.selectionOption || AutocompleteSelectionOptions.Auto;
    },
    parentKey: async (parent) => {
      return parent.parentKey || "";
    },
    key: async (parent) => {
      return parent.key || "";
    },
    itemTypes: async (parent) => {
      return parent.itemTypes || [];
    },
    label: async (parent) => {
      return parent.label || "";
    },
    isDisplayedByDefault: async (parent) => {
      return parent.isDisplayedByDefault || false;
    },
    showTimeForDateFilter: async (parent) => {
      return parent.showTimeForDateFilter !== undefined ? parent.showTimeForDateFilter : true;
    },
    options: async (parent) => {
      return [
        { icon: DamsIcons.NoIcon, label: "IotDevice", value: "IotDevice" },
      ];
    },
    advancedFilterInputForRetrievingOptions: async (parent) => {
      return parent.advancedFilterInputForRetrievingOptions as AdvancedFilterInputType;
    },
    aggregation: async (parent) => {
      return parent.aggregation || "";
    },
    defaultValue: async (parent, { value }) => {
      return value;
    },
    hidden: (parent, { value }) => {
      return value ? value : false;
    },
    tooltip: (parent, { value }) => {
      return value ? value : false;
    },
  },
};
