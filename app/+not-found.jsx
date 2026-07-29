import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <Text style={styles.number}>404</Text>
      <Text style={styles.title}>דף זה לא קיים</Text>
      <Text style={styles.text}>הנתיב שביקשת אינו נמצא באפליקציה.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>חזור</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#eef3fb', justifyContent: 'center', alignItems: 'center', padding: 25 },
  number: { fontSize: 82, fontWeight: '900', color: '#2767d8' },
  title: { fontSize: 28, fontWeight: '900', color: '#1c2b4a' },
  text: { color: '#6f7b91', marginTop: 9, textAlign: 'center' },
  button: { backgroundColor: '#2767d8', borderRadius: 13, paddingVertical: 14, paddingHorizontal: 40, marginTop: 25 },
  buttonText: { color: '#fff', fontWeight: '900', fontSize: 17 },
});
