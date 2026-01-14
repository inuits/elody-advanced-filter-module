import { ContextValue } from "base-graphql";
import {
  AdvancedFilterInputType,
  AutocompleteSelectionOptions,
  DamsIcons,
  Entity,
  FilterOptionsMappingType,
  LookupInputType,
  Resolvers,
  Operator
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
    FilterOptions: async (_source, { input, limit, entityType }, { dataSources }) => {
      return await dataSources.CollectionAPI.GetFilterOptions(input, limit, entityType);
    },
  },
  AdvancedFilters: {
    advancedFilter: async (
      _source,
      {
        lookup,
        type,
        selectionOption,
        parentKey,
        key,
        itemTypes,
        label,
        isDisplayedByDefault,
        showTimeForDateFilter,
        advancedFilterInputForRetrievingOptions,
        aggregation,
        min,
        max,
        unit,
        context,
        useNewWayToFetchOptions,
        entityType,
        matchExact,
        filterOptionsMapping,
        operator,
        facets,
        includeDefaultValuesFromIntialValues,
      }
    ) => {
      return {
        lookup,
        type,
        selectionOption: selectionOption || AutocompleteSelectionOptions.Auto,
        parentKey,
        key,
        itemTypes,
        label: label || "",
        isDisplayedByDefault: isDisplayedByDefault || false,
        showTimeForDateFilter: showTimeForDateFilter,
        options: [],
        advancedFilterInputForRetrievingOptions,
        aggregation,
        defaultValue: "",
        doNotOverrideValue: false,
        hidden: false,
        min,
        max,
        unit,
        context,
        matchExact,
        useNewWayToFetchOptions,
        entityType,
        filterOptionsMapping,
        operator,
        facets,
        includeDefaultValuesFromIntialValues,
      };
    },
  },
  AdvancedFilter: {
    lookup: async (parent) => {
      return parent.lookup as LookupInputType;
    },
    type: async (parent) => {
      return parent.type;
    },
    selectionOption: async (parent) => {
      return parent.selectionOption || AutocompleteSelectionOptions.Auto;
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
    showTimeForDateFilter: async (parent) => {
      return parent.showTimeForDateFilter !== undefined ? parent.showTimeForDateFilter : true;
    },
    options: async (parent) => {
      return [
        { icon: DamsIcons.NoIcon, label: "IotDevice", value: "IotDevice" },
      ];
    },
    advancedFilterInputForRetrievingOptions: async (parent, _, { dataSources }) => {
      const processFilterItem = async (item: AdvancedFilterInputType) => {
        const { value, ...rest } = item;

        if (typeof value !== "string") {
          return { ...rest, value };
        }

        const sessionRegex = /^session-\$(.+)$/;
        const match = value.match(sessionRegex);

        if (!match?.[1]) {
          return { ...rest, value };
        }

        const sessionValue = await dataSources.CollectionAPI.getSessionInfo(match[1]);
        return { ...rest, value: sessionValue };
      };

      const originalFilters = parent.advancedFilterInputForRetrievingOptions || [];
      const processedFilters = await Promise.all(originalFilters.map(processFilterItem));
      return processedFilters as AdvancedFilterInputType[];
    },
    aggregation: async (parent) => {
      return parent.aggregation || "";
    },
    defaultValue: async (parent, { value }, { dataSources }) => {
      if (value && typeof value === "string") {
        const sessionRegex = /^session-\$(.+)$/;
        let match = value.match(sessionRegex);
        if (match && match[1])
          return await dataSources.CollectionAPI.getSessionInfo(match[1]);

        const relationsRegex = /^parent.relationValues-\$(.+)$/;
        match =  value.match(relationsRegex);
        if (match && match[1]) {
          const relations = parent?.context || [""];
          const defaultValueInfo = match[1].split("-");
          if (defaultValueInfo[0] === "components") {
            const relation = relations[0]?.components?.filter((relation: any) => relation.label === defaultValueInfo[defaultValueInfo.length-1]);
            if (relation?.length <= 0) return [""];
            const key = relation?.[0].key;
            if (key) {
              return [
                key,
                "entities/" + key,
                "mediafiles/" + key,
              ];
            }
          }
        }
      }
      return value;
    },
    doNotOverrideDefaultValue: (parent, { value }) => {
      return value !== undefined ? value : false;
    },
    hidden: (parent, { value }) => {
      return value ? value : false;
    },
    tooltip: (parent, { value }) => {
      return value ? value : false;
    },
    min: (parent) => {
      return parent?.min ?? 0;
    },
    max: (parent) => {
      return parent?.max ?? 0;
    },
    unit: (parent) => {
      return parent?.unit ?? "";
    },
    minDropdownSearchCharacters: (parent, { value }) => {
      return value ?? 3;
    },
    useNewWayToFetchOptions: (parent) => {
      return parent.useNewWayToFetchOptions ?? false;
    },
    entityType: (parent) => {
      return parent.entityType ?? "";
    },
    filterOptionsMapping: (parent) => {
      return parent.filterOptionsMapping as FilterOptionsMappingType;
    },
    operator: (parent) => {
      return parent.operator as Operator;
    },
    facets: (parent) => {
      return parent.facets || [];
    },
    includeDefaultValuesFromIntialValues: (parent) => {
      return parent.includeDefaultValuesFromIntialValues || [];
    }
  },
};
