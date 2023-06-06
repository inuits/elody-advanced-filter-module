import { ContextValue } from "base-graphql";
import { GraphQLScalarType, Kind } from "graphql";
import { DamsIcons, Entity, Resolvers } from "../../generated-types/type-defs";

export const advancedFilterResolver: Resolvers<ContextValue> = {
  FilterValue: new GraphQLScalarType({
    name: "FilterValue",
    description: "Custom scalar representing various types",
    serialize(value: any) {
      return value;
    },
    parseValue(value: any) {
      return value;
    },
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
        case Kind.INT:
        case Kind.BOOLEAN:
          return ast.value;
        case Kind.OBJECT:
          const { fields } = ast;
          const filterValue: any = {};

          fields.forEach((field) => {
            const key = field.name.value;
            const value = field.value;
            filterValue[key] = value;
          });

          return filterValue;
        default:
          return null;
      }
    },
  }),
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
  AdvancedFilters: {
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
  AdvancedFilter: {
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
      return [{ icon: DamsIcons.NoIcon, label: "IotDevice", value: "IotDevice" }];
    },
    defaultValue: async (parent, { value }) => {
      return value;
    },
    hidden: (parent, { value }) => {
      return value ? value : false;
    },
  },
};
