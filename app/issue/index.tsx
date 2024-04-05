import { FlatList, ScrollView, Text, View } from 'react-native';
import ListSelectItem from '../../components/ListSelectItem';
import { useState } from 'react';

{
  /* <Text
  style={{
    paddingLeft: 16,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11.11,
    lineHeight: 11.11 + 11.11 * 0.4,
  }}
>
  Selecting Latest will show the most recent issue of TheMag4U or older issues
  can be selected.
</Text>; */
}

type ListSelectItemData = {
  id: string;
  label: string;
};

const IssueIndex = () => {
  const DATA: ListSelectItemData[] = [
    { id: '0', label: 'February 2024' },
    { id: '1', label: 'February 2024' },
    { id: '2', label: 'February 2024' },
    { id: '3', label: 'February 2024' },
  ];

  const [selectedId, setSelectedId] = useState<string>('0');

  const renderItem = ({ item }: { item: ListSelectItemData }) => {
    return (
      <ListSelectItem
        label={item.label}
        isSelected={item.id === selectedId}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={{ padding: 24, rowGap: 1 }}
      alwaysBounceVertical={false}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={selectedId}
    />
  );
};

export default IssueIndex;
