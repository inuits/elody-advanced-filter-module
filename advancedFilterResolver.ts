import { ContextValue } from "base-graphql";
import { GraphQLScalarType, Kind } from "graphql";
import {
  AdvancedFilterInputType,
  DamsIcons,
  Entity,
  Resolvers,
} from "../../generated-types/type-defs";

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
        key,
        label,
        type,
        isDisplayedByDefault,
        advancedFilterInputForRetrievingOptions,
      }
    ) => {
      return {
        key,
        label,
        type,
        isRelation: false,
        isDisplayedByDefault: isDisplayedByDefault ?? false,
        options: [],
        defaultValue: "",
        hidden: false,
        advancedFilterInputForRetrievingOptions,
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
    isDisplayedByDefault: async (parent) => {
      return parent.isDisplayedByDefault;
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
  },
};
