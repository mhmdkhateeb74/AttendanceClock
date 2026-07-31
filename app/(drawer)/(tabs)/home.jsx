import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../../components/Screen';
import {
  clearActiveShift,
  getActiveShift,
  getShifts,
  saveActiveShift,
  saveShifts,
} from '../../../utils/storage';
import { formatDuration, formatTime } from '../../../utils/date';

export default function HomeScreen() {
  const [activeShift, setActiveShift] = useState(null);
  const [now, setNow] = useState(new Date());
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadActiveShift();
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  async function loadActiveShift() {
    try {
      setActiveShift(await getActiveShift());
    } catch {
      Alert.alert('שגיאה', 'לא ניתן לטעון את מצב המשמרת');
    }
  }

  function spring() {
    scale.setValue(0.86);
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }

  async function toggleShift() {
    spring();
    try {
      if (!activeShift) {
        const shift = { id: Date.now().toString(), checkIn: new Date().toISOString() };
        await saveActiveShift(shift);
        setActiveShift(shift);
        Alert.alert('כניסה נרשמה', `שעת כניסה: ${formatTime(shift.checkIn)}`);
      } else {
        const checkOut = new Date().toISOString();
        const completed = {
          ...activeShift,
          checkOut,
          duration: new Date(checkOut).getTime() - new Date(activeShift.checkIn).getTime(),
        };
        const shifts = await getShifts();
        await saveShifts([completed, ...shifts]);
        await clearActiveShift();
        setActiveShift(null);
        Alert.alert('יציאה נרשמה', `משך המשמרת: ${formatDuration(completed.duration)}`);
      }
    } catch {
      Alert.alert('שגיאה', 'לא ניתן לשמור את הפעולה');
    }
  }

  const elapsed = activeShift
    ? now.getTime() - new Date(activeShift.checkIn).getTime()
    : 0;

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.greeting}>שלום וברוך הבא</Text>
        <Text style={styles.date}>{now.toLocaleDateString('he-IL')}</Text>
        <Text style={styles.clock}>{now.toLocaleTimeString('he-IL')}</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>מצב נוכחי</Text>
        <Text style={[styles.status, { color: activeShift ? '#d34444' : '#258457' }]}> 
          {activeShift ? 'במשמרת' : 'מחוץ למשמרת'}
        </Text>
        {activeShift && (
          <>
            <Text style={styles.small}>כניסה: {formatTime(activeShift.checkIn)}</Text>
            <Text style={styles.elapsed}>{formatDuration(elapsed)}</Text>
          </>
        )}
      </View>

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.attendanceButton, activeShift ? styles.exit : styles.enter]}
          onPress={toggleShift}
        >
          <Text style={styles.icon}>{activeShift ? '↩' : '✓'}</Text>
          <Text style={styles.buttonText}>{activeShift ? 'יציאה' : 'כניסה'}</Text>
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.hint}>לחץ על הכפתור כדי {activeShift ? 'לסיים' : 'להתחיל'} משמרת</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { alignItems: 'center', paddingHorizontal: 22 },
  header: { alignItems: 'center', marginTop: 20 },
  greeting: { fontSize: 27, fontWeight: '900', color: '#1c2b4a' },
  date: { marginTop: 7, color: '#6b7890', fontSize: 16 },
  clock: { marginTop: 4, fontSize: 36, fontWeight: '800', color: '#2767d8' },
  statusCard: {
    width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 22,
    alignItems: 'center', marginVertical: 32, elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10,
  },
  statusLabel: { color: '#69758b' },
  status: { fontSize: 25, fontWeight: '900', marginTop: 4 },
  small: { marginTop: 10, color: '#68758d' },
  elapsed: { fontSize: 28, fontWeight: '900', marginTop: 7, color: '#1c2b4a' },
  attendanceButton: {
    width: 185, height: 185, borderRadius: 93, alignItems: 'center', justifyContent: 'center',
    elevation: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 14,
  },
  enter: { backgroundColor: '#2ba66b' },
  exit: { backgroundColor: '#e05252' },
  icon: { color: '#fff', fontSize: 38, fontWeight: '900' },
  buttonText: { color: '#fff', fontSize: 31, fontWeight: '900' },
  hint: { color: '#7a869a', marginTop: 20 },
});
