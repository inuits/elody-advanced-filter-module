import { ContextValue } from "base-graphql";
import { Entity, Resolvers } from "../../generated-types/type-defs";

export const advancedFilterResolver: Resolvers<ContextValue> = {
  Query: {
    FilterMatcherMapping: async (_source, {}, { dataSources }) => {
      return await dataSources.CollectionAPI.getFilterMatcherMapping();
    },
    EntityTypeFilters: async (_source, { type }) => {
      return {
        type,
        advancedFilters: {}
      } as Entity;
    },
    // advancedFilters: async (_source, { choice }, { dataSources }) => {
    //   let filters;
    //   if (choice === "mediaFileFilters") {
    //     filters = await resolveFiltersWithOptions(dataSources, Collection.Mediafiles);
    //   } else {
    //     filters = await resolveFiltersWithOptions(dataSources, Collection.Entities);
    //   }
    //   return filters.map(filter => ({
    //     ...filter,
    //     options: filter.options !== undefined ? filter.options : []
    //   }))
    // },
    // advancedFilters: async (_source, {}, { dataSources }) => {
    //   return {};
    // },
  },
  advancedFilters: {
    advancedFilter: async (_source, { key, label, type }) => {
      return {
        key,
        label,
        type,
        isRelation: false,
        options: [],
        defaultValue: "",
        hidden: false
      };
    },
  },
  advancedFilter: {
    key: async (parent) => {
      return parent.key;
    },
    label: async (parent) => {
      return parent.label;
    },
    type: async (parent) => {
      return parent.type;
    },
    options: async (parent) => {
      return [{ value: "IotDevice", label: "IotDevice" }];
    },
    defaultValue: async (parent, { value }) => {
      return value;
    },
    hidden: (parent, { value }) => {
      return value ? value : false;
    },
  },
};
