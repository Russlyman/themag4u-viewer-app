import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListSelectItem from '../../components/ListSelectItem';
import Colours from '../../styles/Colours';
import { shouldRound } from '../../helpers/RoundingHelpers';
import {
  LibrarySetStringActionType,
  useLibraryContext,
} from '../../context/LibraryContext';

const IssueIndex = () => {
  const { state, dispatch } = useLibraryContext();

  const issueList = Object.entries(state.library.issue)
    .filter(([issueId, issue]) => issue.pdfs[state.currentSelection.areaId])
    .map(([issueId, issue]) => ({
      issueId,
      name: issue.name,
      cached: state.useCache
        ? state.cache[state.currentSelection.areaId] &&
          state.cache[state.currentSelection.areaId].includes(issueId)
        : true,
    }));

  const renderItem = ({
    item,
    index,
  }: {
    item: { issueId: string; name: string; cached: boolean };
    index: number;
  }) => {
    const rounding = shouldRound(index, issueList.length);

    let component;
    if (item.cached) {
      component = (
        <ListSelectItem
          label={item.name}
          isSelected={item.issueId === state.currentSelection.issueId}
          onPress={() =>
            dispatch({
              type: LibrarySetStringActionType.SetIssueId,
              payload: item.issueId,
            })
          }
          rounding={rounding}
          disabled={false}
        />
      );
    } else {
      component = (
        <ListSelectItem
          label={item.name}
          isSelected={false}
          rounding={rounding}
          disabled={true}
        />
      );
    }

    if (index === 0) {
      return (
        <>
          {state.useCache && (
            <Text style={[styles.tipText, styles.noConnectionText]}>
              Connect to the Internet to view Issues and Areas that are not
              downloaded to your device.
            </Text>
          )}
          <View style={styles.tippedItemContainer}>
            {component}
            <Text style={styles.tipText}>
              Selecting Latest will show the most recent issue of TheMag4U or
              older issues can be selected.
            </Text>
          </View>
        </>
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
      extraData={state.currentSelection.issueId}
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
  noConnectionText: {
    paddingLeft: 0,
    color: Colours.error,
    paddingBottom: 24,
    textAlign: 'center',
  },
  tippedItemContainer: { rowGap: 8, paddingBottom: 31 },
  itemList: { padding: 24, rowGap: 1 },
});

export default IssueIndex;
