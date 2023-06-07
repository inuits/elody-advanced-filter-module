import { setAdvancedFilterParserMinMax } from './advancedFilterParserMinMax';
import { setadvancedFilterParserSelection } from './advancedFilterParserSelection';
import { setAdvancedFilterParserText } from './advancedFilterParserText';
import { setAdvancedFilterTypeParser } from './advancedFilterParserType';
export interface parsedInput {
  key?: string;
  type: string;
  value?: string | string[] | { min: number; max: number };
  item_types?: string[];
  metadata_field?: string;
  relation_types?: string[];
}

export type filterParser = (
  filterInput: any[],
  filterOutput: parsedInput[]
) => {
  otherFilters: any[];
  filterOutput: parsedInput[];
};

const PARSERS: filterParser[] = [
  // setAdvancedFilterTypeParser,
  setadvancedFilterParserSelection,
  setAdvancedFilterParserText,
  setAdvancedFilterParserMinMax,
];

export const filterInputParser = (
  filterinput: any[]
): parsedInput[] => {
  let filterInputForParser: any[] =
    filterinput === null ? [] : (filterinput as any[]);
  let advancedResult: parsedInput[] = [];
  try {
    PARSERS.forEach((parser) => {
      const { otherFilters, filterOutput } = parser(
        filterInputForParser,
        advancedResult
      );
      filterInputForParser = otherFilters;
      advancedResult = filterOutput;
    });
  } catch (e) {
    console.log(e);
  }

  return advancedResult;
};
