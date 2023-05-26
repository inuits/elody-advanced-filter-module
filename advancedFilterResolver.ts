import { resolveFiltersWithOptions } from "../baseGraphql/resolvers/filterResolver";
import { Collection, InputMaybe, Resolvers } from "../../generated-types/type-defs";
import { ContextValue } from "base-graphql";

export const advancedFilterResolver: Resolvers<ContextValue> = {
  Query: {
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
     advancedFilters: async (_source, {}, { dataSources }) => {
        return {}
    },
  },
  advancedFilters: {
    advancedFilter: async(
      _source, 
      {key, label ,type}
    ) => {
      return {
        key, 
        label,
        type,
        hidden: false
      }
    }
  },
  advancedFilter: {
    key: async (parent) => {
      return parent.key;
    },
    label: async (parent) => {
      return parent.label 
    },
    type: async (parent) => {
      return parent.type;
    },
    options: async (parent) => {
      return [{value: "IotDevice", label: "IotDevice"}]
    },
    defaultValue: async (parent, {value}) => {
      return value as InputMaybe<string>;
    },
    hidden: (parent, {value}) => {
       return value ? value : false;
    }
  }
};
