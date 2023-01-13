import {
  resolveEntityFilters,
  resolveMediafileFilters,
  resolveSourceOptions,
} from '../../resolvers/filterResolver';
import { collectieOptions, typeOptions } from '../../sources/filters';
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
    FilterOptions: async (_source, { key }, { dataSources }) => {
      switch (key) {
        case 'museum' || 'source':
          return await resolveSourceOptions(dataSources);
        case 'getty':
          return collectieOptions;
        case 'type':
          return typeOptions;
        default:
          return null;
      }
    },
  },
};
