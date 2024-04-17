import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListSelectItem from '../../components/ListSelectItem';
import Colours from '../../styles/Colours';
import { shouldRound } from '../../helpers/RoundingHelpers';
import {
  LibrarySetStringActionType,
  useLibraryContext,
} from '../../context/LibraryContext';

const AreaIndex = () => {
  const { state, dispatch } = useLibraryContext();

  const areaList = Object.entries(state.library.area).map(([areaId, area]) => ({
    areaId,
    name: area.name,
  }));

  const renderItem = ({
    item,
    index,
  }: {
    item: { areaId: string; name: string };
    index: number;
  }) => {
    const rounding = shouldRound(index, areaList.length);

    const component = (
      <ListSelectItem
        label={item.name}
        isSelected={item.areaId === state.currentSelection.areaId}
        onPress={() =>
          dispatch({
            type: LibrarySetStringActionType.SetAreaId,
            payload: item.areaId,
          })
        }
        rounding={rounding}
      />
    );

    if (index === 0) {
      return (
        <View style={styles.tippedItemContainer}>
          {state.useCache && (
            <Text style={[styles.tipText, styles.noConnectionText]}>
              Connect to the Internet to view Issues and Areas that are not
              downloaded to your device.
            </Text>
          )}
          {component}
          <Text style={styles.tipText}>
            Selecting Closest will use the nearest distribution area to your
            current location or you can manually choose.
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
      data={areaList}
      renderItem={renderItem}
      keyExtractor={item => item.areaId}
      extraData={state.currentSelection.areaId}
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
    color: '#f03e3e',
    paddingBottom: 12,
    textAlign: 'center',
  },
  tippedItemContainer: { rowGap: 8, paddingBottom: 31 },
  itemList: { padding: 24, rowGap: 1 },
});

export default AreaIndex;
