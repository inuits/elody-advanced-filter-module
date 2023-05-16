import { resolveFiltersWithOptions } from "../baseGraphql/resolvers/filterResolver";
import { Collection, Resolvers } from "../../generated-types/type-defs";
import { ContextValue } from "base-graphql";

export const advancedFilterResolver: Resolvers<ContextValue> = {
  Query: {
    advancedFilters: async (_source, { choice }, { dataSources }) => {
      let filters;
      if (choice === "mediaFileFilters") {
        filters = await resolveFiltersWithOptions(dataSources, Collection.Mediafiles);
      } else {
        filters = await resolveFiltersWithOptions(dataSources, Collection.Entities);
      }
      return filters.map(filter => ({
        ...filter, 
        options: filter.options !== undefined ? filter.options : [] 
      }))
    },
  },
};
