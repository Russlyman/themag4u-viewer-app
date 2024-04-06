import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListSelectItem from '../../components/ListSelectItem';
import { useState } from 'react';
import Colours from '../../styles/Colours';
import { Rounding } from '../../components/ListItem';

type ListSelectItemData = {
  id: string;
  name: string;
};

const IssueIndex = () => {
  const DATA: ListSelectItemData[] = [
    { id: '0', name: 'February 2024' },
    { id: '1', name: 'February 2024' },
    { id: '2', name: 'February 2024' },
    { id: '3', name: 'February 2024' },
    { id: '4', name: 'February 2024' },
    { id: '5', name: 'February 2024' },
    { id: '6', name: 'February 2024' },
    { id: '7', name: 'February 2024' },
    { id: '8', name: 'February 2024' },
    { id: '9', name: 'February 2024' },
  ];

  const issueListLength = DATA.length;

  const [selectedId, setSelectedId] = useState<string>('0');

  const renderItem = ({
    item,
    index,
  }: {
    item: ListSelectItemData;
    index: number;
  }) => {
    let rounding: Rounding | undefined;

    if (index !== 0 && issueListLength > 2) {
      // First Item
      if (index === 1) {
        rounding = Rounding.Top;
      }
      // Last Item
      else if (index === issueListLength - 1) {
        rounding = Rounding.Bottom;
      }
      // Middle Items
      else {
        rounding = Rounding.None;
      }
    }

    const component = (
      <ListSelectItem
        label={item.name}
        isSelected={item.id === selectedId}
        onPress={() => setSelectedId(item.id)}
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
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={selectedId}
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
