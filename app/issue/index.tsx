import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListSelectItem from '../../components/ListSelectItem';
import Colours from '../../styles/Colours';
import { SettingsSet, useSettingsContext } from '../../context/SettingsContext';
import { shouldRound } from '../../helpers/RoundingHelpers';
import { Library } from '../../types/Library';

export const TESTING_DATA: Library = {
  area: {
    '0': {
      name: 'Coventry East',
    },
    '1': {
      name: 'Coventry West',
    },
  },
  issue: {
    '0': {
      name: 'February 2024',
      pdfs: {
        '0': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        '1': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    },
    '1': {
      name: 'March 2024',
      pdfs: {
        '0': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        '1': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    },
    '2': {
      name: 'April 2024',
      pdfs: {
        '0': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        '1': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    },
  },
};

const IssueIndex = () => {
  const { state, dispatch } = useSettingsContext();

  const issueList = Object.entries(TESTING_DATA.issue)
    .filter(([issueId, issue]) => issue.pdfs[state.areaId])
    .map(([issueId, issue]) => ({ issueId, name: issue.name }));

  const renderItem = ({
    item,
    index,
  }: {
    item: { issueId: string; name: string };
    index: number;
  }) => {
    const rounding = shouldRound(index, issueList.length);

    const component = (
      <ListSelectItem
        label={item.name}
        isSelected={item.issueId === state.issueId}
        onPress={() =>
          dispatch({ type: SettingsSet.IssueId, payload: item.issueId })
        }
        rounding={rounding}
      />
    );

    if (index === 0) {
      return (
        <View style={styles.tippedItemContainer}>
          {component}
          <Text style={styles.tipText}>
            Selecting Latest will show the most recent issue of TheMag4U or
            older issues can be selected.
          </Text>
        </View>
      );
    }

    return component;
  };

  return (
    <FlatList
      contentContainerStyle={styles.itemList}
      alwaysBounceVertical={false}
      data={issueList}
      renderItem={renderItem}
      keyExtractor={item => item.issueId}
      extraData={state.issueId}
    />
  );
};

const styles = StyleSheet.create({
  tipText: {
    color: Colours.primary,
    paddingLeft: 16,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11.11,
    lineHeight: 11.11 + 11.11 * 0.4,
  },
  tippedItemContainer: { rowGap: 8, paddingBottom: 31 },
  itemList: { padding: 24, rowGap: 1 },
});

export default IssueIndex;
