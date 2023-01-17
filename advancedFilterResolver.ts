import {
  resolveEntityFilters,
  resolveMediafileFilters,
} from '../../resolvers/filterResolver';
import { Resolvers } from '../../type-defs';
import { ContextValue } from '../../types';

export const advancedFilterResolver: Resolvers<ContextValue> = {
  Query: {
    advancedFilters: async (_source, { choice }, { dataSources }) => {
      if (choice === 'mediaFileFilters') {
        return await resolveMediafileFilters(dataSources);
      } else {
        return await resolveEntityFilters(dataSources);
      }
    },
  },
};
