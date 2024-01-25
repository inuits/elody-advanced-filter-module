import { ContextValue } from "base-graphql";
import {
  AdvancedFilterInputType,
  DamsIcons,
  Entity,
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
    FilterOptions: async (_source, { input, limit }, { dataSources }) => {
      return await dataSources.CollectionAPI.GetFilterOptions(input, limit);
    },
  },
  AdvancedFilters: {
    advancedFilter: async (
      _source,
      {
        type,
        parentKey,
        key,
        itemTypes,
        label,
        isDisplayedByDefault,
        advancedFilterInputForRetrievingOptions,
      }
    ) => {
      return {
        type,
        parentKey: parentKey,
        key,
        itemTypes,
        label: label || "",
        isDisplayedByDefault: isDisplayedByDefault || false,
        options: [],
        advancedFilterInputForRetrievingOptions,
        defaultValue: "",
        hidden: false,
      };
    },
  },
  AdvancedFilter: {
    type: async (parent) => {
      return parent.type;
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
    options: async (parent) => {
      return [
        { icon: DamsIcons.NoIcon, label: "IotDevice", value: "IotDevice" },
      ];
    },
    advancedFilterInputForRetrievingOptions: async (parent) => {
      return parent.advancedFilterInputForRetrievingOptions as AdvancedFilterInputType;
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
