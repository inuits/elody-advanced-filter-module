import { filterParser, parsedInput } from './advancedFilterParser';

const FILTER_TYPE = 'SelectionInput';

export const isSelectionInputWithValue = (filterinput: any) =>
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
    .filter((filterInputElement: any) =>
      isSelectionInputWithValue(filterInputElement)
    )
    .forEach((filterinput: any) => {
      filterOutput.push({
        key: filterinput!.key,
        type: "SelectionInput",
        value: filterinput.multiSelectInput?.value as string | string[],
      });
    });
  console.log(filterOutput)
  return {
    otherFilters: filterInput.filter(
      (filterInputElement: any) =>
        !isSelectionInputWithValue(filterInputElement)
    ),
    filterOutput,
  };
};
