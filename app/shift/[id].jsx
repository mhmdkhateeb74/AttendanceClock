import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Screen from '../../components/Screen';
import { getShifts } from '../../utils/storage';
import { formatDate, formatDuration, formatTime } from '../../utils/date';

export default function ShiftDetails() {
  const { id } = useLocalSearchParams();
  const [shift, setShift] = useState(null);

  useEffect(() => {
    getShifts().then((items) => setShift(items.find((item) => item.id === id) || null));
  }, [id]);

  if (!shift) {
    return <Screen style={styles.center}><Text style={styles.missing}>המשמרת לא נמצאה</Text></Screen>;
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.icon}>🕒</Text>
        <Text style={styles.title}>פרטי משמרת</Text>
        <Detail label="תאריך" value={formatDate(shift.checkIn)} />
        <Detail label="שעת כניסה" value={formatTime(shift.checkIn)} />
        <Detail label="שעת יציאה" value={formatTime(shift.checkOut)} />
        <Detail label="משך המשמרת" value={formatDuration(shift.duration)} important />
      </View>
    </Screen>
  );
}

function Detail({ label, value, important }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.value, important && styles.important]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'center', padding: 22 },
  center: { justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, elevation: 6 },
  icon: { textAlign: 'center', fontSize: 48 },
  title: { textAlign: 'center', fontSize: 27, fontWeight: '900', marginBottom: 22, color: '#1c2b4a' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#edf0f5' },
  label: { fontWeight: '700', color: '#6d7890' },
  value: { fontWeight: '800', color: '#25324a' },
  important: { color: '#2767d8', fontSize: 18 },
  missing: { fontSize: 22, fontWeight: '800' },
});
