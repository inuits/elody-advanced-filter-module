import { FilterInput } from '../../../generated-types/type-defs';
import { filterParser, parsedInput } from './advancedFilterParser';

const FILTER_TYPE = 'SelectionInput';

export const isSelectionInputWithValue = (filterinput: FilterInput) =>
  filterinput?.type === FILTER_TYPE &&
  filterinput!.multiSelectInput?.value &&
  filterinput!.multiSelectInput?.value?.length > 0
    ? true
    : false;

export const setadvancedFilterParserSelection: filterParser = (
  filterInput,
  filterOutput
) => {
  filterInput
    .filter((filterInputElement: FilterInput) =>
      isSelectionInputWithValue(filterInputElement)
    )
    .forEach((filterinput: FilterInput) => {
      filterOutput.push({
        key: filterinput!.key,
        type: "SelectionInput",
        value: filterinput.multiSelectInput?.value as string | string[],
      });
    });
  console.log(filterOutput)
  return {
    otherFilters: filterInput.filter(
      (filterInputElement: FilterInput) =>
        !isSelectionInputWithValue(filterInputElement)
    ),
    filterOutput,
  };
};
