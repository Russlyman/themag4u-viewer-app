import { ScrollView, Text, View } from 'react-native';
import ListSelect from '../../components/ListSelect';
import { useState } from 'react';

const IssueIndex = () => {
  const [issueId, setIssueId] = useState(0);
  const handleSelect = (id: number) => {
    setIssueId(id);
  };

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={{ padding: 24, rowGap: 32 }}
    >
      <View style={{ rowGap: 8 }}>
        <ListSelect
          id={-1}
          label="Latest - February 2024"
          onSelect={handleSelect}
          currentSelection={issueId}
        />
        <Text
          style={{
            paddingLeft: 16,
            fontFamily: 'Inter_600SemiBold',
            fontSize: 11.11,
            lineHeight: 11.11 + 11.11 * 0.4,
          }}
        >
          Selecting Latest will show the most recent issue of TheMag4U or older
          issues can be selected.
        </Text>
      </View>
      <View style={{ rowGap: 1 }}>
        <ListSelect
          id={0}
          label="January 2024"
          onSelect={handleSelect}
          currentSelection={issueId}
        />
        <ListSelect
          id={1}
          label="December 2023"
          onSelect={handleSelect}
          currentSelection={issueId}
        />
        <ListSelect
          id={2}
          label="November 2023"
          onSelect={handleSelect}
          currentSelection={issueId}
        />
      </View>
    </ScrollView>
  );
};

export default IssueIndex;
