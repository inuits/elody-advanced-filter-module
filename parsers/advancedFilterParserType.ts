import { FilterInput } from "../../../generated-types/type-defs";
import { filterParser, parsedInput } from "./advancedFilterParser";
import { isSelectionInputWithValue } from "./advancedFilterParserSelection";

const FILTER_TYPE = "type";

const isTypeFilter = (filterinput: FilterInput) =>
  isSelectionInputWithValue(filterinput) && filterinput.key === FILTER_TYPE;

export const setAdvancedFilterTypeParser: filterParser = (
  filterInput,
  filterOutput
) => {
  let itemTypes: string[] = [];

  filterInput
    .filter((filterInputElement: FilterInput) =>
      isTypeFilter(filterInputElement)
    )
    .forEach((filterinput: FilterInput) => {
      itemTypes = filterinput!.multiSelectInput?.value as string[];
    });

  if (itemTypes.length === 0) itemTypes = ["asset"];

  filterOutput.push({
    type: "TextInput",
    item_types: itemTypes,
  });

  return {
    otherFilters: filterInput.filter(
      (filterInputElement: FilterInput) => !isTypeFilter(filterInputElement)
    ),
    filterOutput,
  };
};
