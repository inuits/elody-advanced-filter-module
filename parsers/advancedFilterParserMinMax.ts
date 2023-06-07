import { FilterInput } from '../generated-types/type-defs';
import { filterParser, parsedInput } from './advancedFilterParser';

const FILTER_TYPE = 'MinMaxInput';

export const isMinMaxInputWithValue = (filterinput: FilterInput) =>
  filterinput?.type === FILTER_TYPE &&
  (filterinput!.minMaxInput?.max || filterinput.minMaxInput?.min)
    ? true
    : false;

export const setAdvancedFilterParserMinMax: filterParser = (
  filterInput,
  filterOutput
) => {
  filterInput
    .filter((filterinput: FilterInput) => isMinMaxInputWithValue(filterinput))
    .forEach((filterinput: FilterInput) => {
      const returnObject: parsedInput = {
        type: filterinput!.type,
      };
      if (filterinput && filterinput.key && filterinput!.minMaxInput) {
        returnObject.value = {
          min: filterinput!.minMaxInput?.min
            ? filterinput!.minMaxInput?.min
            : 0,
          max: filterinput!.minMaxInput?.max
            ? filterinput!.minMaxInput?.max
            : 0,
        };
        if (filterinput!.minMaxInput?.isRelation) {
          returnObject.relation_types = [filterinput!.key];
        } else {
          returnObject.metadata_field = filterinput!.key;
        }
        filterOutput.push(returnObject);
      }
    });

  return {
    otherFilters: filterInput.filter(
      (filterinput: FilterInput) => !isMinMaxInputWithValue(filterinput)
    ),
    filterOutput,
  };
};
