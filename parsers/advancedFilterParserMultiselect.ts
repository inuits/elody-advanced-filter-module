import { FilterInput } from '../../../type-defs';
import { filterParser, parsedInput } from './advancedFilterParser';

const FILTER_TYPE = 'MultiSelectInput';

export const isMultiselectInputWithValue = (filterinput: FilterInput) =>
  filterinput?.type === FILTER_TYPE &&
  filterinput!.multiSelectInput?.value &&
  filterinput!.multiSelectInput?.value?.length > 0
    ? true
    : false;

export const setadvancedFilterParserMultiselect: filterParser = (
  filterInput,
  filterOutput
) => {
  filterInput
    .filter((filterInputElement: FilterInput) =>
      isMultiselectInputWithValue(filterInputElement)
    )
    .forEach((filterinput: FilterInput) => {
      filterOutput.push({
        type: filterinput!.type,
        value: filterinput!.multiSelectInput?.value as string | string[],
        item_types: [filterinput!.key],
      });
    });
  return {
    otherFilters: filterInput.filter(
      (filterInputElement: FilterInput) =>
        !isMultiselectInputWithValue(filterInputElement)
    ),
    filterOutput,
  };
};
