import React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';

const REPO_URL = 'https://github.com/mhmdkhateeb74/AttendanceClock';

export default function AboutScreen() {
  async function openRepo() {
    const supported = await Linking.canOpenURL(REPO_URL);
    if (supported) Linking.openURL(REPO_URL);
    else Alert.alert('שגיאה', 'לא ניתן לפתוח את הקישור');
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.icon}>⏱</Text>
        <Text style={styles.title}>אודות האפליקציה</Text>
        <Text style={styles.text}>אפליקציית שעון נוכחות מקומית המאפשרת רישום כניסה ויציאה, חישוב משך משמרת וצפייה בהיסטוריית ההחתמות.</Text>
        <View style={styles.line} />
        <Text style={styles.label}>מפתח האפליקציה</Text>
        <Text style={styles.developer}>Mohammad Khateeb</Text>
        <TouchableOpacity style={styles.button} onPress={openRepo}><Text style={styles.buttonText}>פתיחת הריפו ב-GitHub</Text></TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'center', padding: 22 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 25, alignItems: 'center', elevation: 5 },
  icon: { fontSize: 55 },
  title: { fontSize: 28, fontWeight: '900', color: '#1c2b4a', marginVertical: 15 },
  text: { textAlign: 'center', lineHeight: 24, color: '#63708a', fontSize: 16 },
  line: { height: 1, width: '100%', backgroundColor: '#e7ebf1', marginVertical: 22 },
  label: { color: '#7b879a' },
  developer: { fontSize: 20, fontWeight: '900', marginTop: 5, color: '#25324a' },
  button: { width: '100%', backgroundColor: '#24292f', borderRadius: 14, height: 53, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: '900' },
  note: { color: '#9a6d22', textAlign: 'center', marginTop: 12, fontSize: 12 },
});
