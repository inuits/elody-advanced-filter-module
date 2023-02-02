import { resolveFiltersWithOptions } from "../baseGraphql/resolvers/filterResolver";
import { Collection, Resolvers } from "../../generated-types/type-defs";
import { ContextValue } from "base-graphql";

export const advancedFilterResolver: Resolvers<ContextValue> = {
  Query: {
    advancedFilters: async (_source, { choice }, { dataSources }) => {
      if (choice === "mediaFileFilters") {
        return await resolveFiltersWithOptions(
          dataSources,
          Collection.Mediafiles
        );
      } else {
        return await resolveFiltersWithOptions(
          dataSources,
          Collection.Entities
        );
      }
    },
  },
};
