import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

const SurahScreen = ({ route }) => {
  const [surah, setSurah] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    fetch(`https://api.quran.gading.dev/surah/${id}`)
      .then(res => res.json())
      .then(data => setSurah(data.data));
  }, []);

  if (!surah) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ padding: 15 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        {surah.name.transliteration.en} ({surah.name.short})
      </Text>
      {surah.verses.map((verse) => (
        <View key={verse.number.inSurah} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, textAlign: 'right' }}>{verse.text.arab}</Text>
          <Text style={{ color: 'gray' }}>{verse.translation.en}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default SurahScreen;
