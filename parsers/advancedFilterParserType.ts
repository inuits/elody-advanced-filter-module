import { filterParser, parsedInput } from "./advancedFilterParser";
import { isSelectionInputWithValue } from "./advancedFilterParserSelection";

const FILTER_TYPE = "type";

const isTypeFilter = (filterinput: any) =>
  isSelectionInputWithValue(filterinput) && filterinput.key === FILTER_TYPE;

export const setAdvancedFilterTypeParser: filterParser = (
  filterInput,
  filterOutput
) => {
  let itemTypes: string[] = [];

  filterInput
    .filter((filterInputElement: any) =>
      isTypeFilter(filterInputElement)
    )
    .forEach((filterinput: any) => {
      itemTypes = filterinput!.multiSelectInput?.value as string[];
    });

  if (itemTypes.length === 0) itemTypes = ["asset"];

  filterOutput.push({
    type: "TextInput",
    item_types: itemTypes,
  });

  return {
    otherFilters: filterInput.filter(
      (filterInputElement: any) => !isTypeFilter(filterInputElement)
    ),
    filterOutput,
  };
};
