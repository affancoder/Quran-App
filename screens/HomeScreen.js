// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function HomeScreen() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.quran.gading.dev/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderSurah = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.english}>{item.englishName}</Text>
        <Text style={styles.translation}>{item.englishNameTranslation}</Text>
      </View>
      <Text style={styles.arabic}>{item.name.short}</Text> {/* ✅ Corrected */}
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#1E1E2C" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Surah List</Text>
      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={renderSurah}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  card: {
    backgroundColor: '#1E1E2C',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  cardTop: {
    marginBottom: 5,
  },
  english: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  translation: { color: '#dfe6e9', fontSize: 14 },
  arabic: { color: '#a29bfe', fontSize: 22, textAlign: 'right' },
});
