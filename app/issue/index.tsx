import { FlatList, ScrollView, Text, View } from 'react-native';
import ListSelectItem from '../../components/ListSelectItem';
import { useState } from 'react';

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
  ];

  const [selectedId, setSelectedId] = useState<string>('0');

  const renderItem = ({
    item,
    index,
  }: {
    item: ListSelectItemData;
    index: number;
  }) => {
    const component = (
      <ListSelectItem
        label={item.name}
        isSelected={item.id === selectedId}
        onPress={() => setSelectedId(item.id)}
      />
    );

    if (index === 0) {
      return (
        <View style={{ rowGap: 8, paddingBottom: 31 }}>
          {component}
          <Text
            style={{
              paddingLeft: 16,
              fontFamily: 'Inter_600SemiBold',
              fontSize: 11.11,
              lineHeight: 11.11 + 11.11 * 0.4,
            }}
          >
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
