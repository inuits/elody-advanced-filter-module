import { resolveFilters } from '../../resolvers/filterResolver';
import { Collection, Resolvers } from '../../type-defs';
import { ContextValue } from '../../types';

export const advancedFilterResolver: Resolvers<ContextValue> = {
  Query: {
    advancedFilters: async (_source, { choice }, { dataSources }) => {
      if (choice === 'mediaFileFilters') {
        return await resolveFilters(dataSources, Collection.Mediafiles);
      } else {
        return await resolveFilters(dataSources, Collection.Entities);
      }
    },
  },
};
