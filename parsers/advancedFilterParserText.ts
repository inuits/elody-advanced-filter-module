import { FilterInput } from '../../../type-defs';
import { filterParser, parsedInput } from './advancedFilterParser';

const FILTER_TYPE = 'TextInput';

export const isTextInputWithValue = (filterinput: FilterInput) =>
  filterinput?.type === FILTER_TYPE &&
  filterinput!.textInput &&
  filterinput!.textInput.value != ''
    ? true
    : false;

export const setAdvancedFilterParserText: filterParser = (
  filterInput,
  filterOutput
) => {
  filterInput
    .filter((filterinput: FilterInput) => isTextInputWithValue(filterinput))
    .forEach((filterinput: FilterInput) => {
      const returnObject: parsedInput = {
        type: filterinput!.type,
      };
      if (
        filterinput!.textInput?.value &&
        filterinput!.textInput?.value != ''
      ) {
        returnObject.value = filterinput!.textInput?.value;
        returnObject.key = filterinput!.key;
        filterOutput.push(returnObject);
      }
    });

  return {
    otherFilters: filterInput.filter(
      (filterinput: FilterInput) => !isTextInputWithValue(filterinput)
    ),
    filterOutput,
  };
};
