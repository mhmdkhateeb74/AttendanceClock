import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Screen from '../../../components/Screen';
import { getShifts } from '../../../utils/storage';
import { formatDate, formatDuration, formatTime } from '../../../utils/date';

export default function HistoryScreen() {
  const router = useRouter();
  const [shifts, setShifts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const data = await getShifts();
    setShifts(data);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  async function refresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>היסטוריית החתמות</Text>
        <Text style={styles.subtitle}>כל המשמרות שנשמרו במכשיר</Text>
      </View>
      <FlatList
        data={shifts}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={refresh}
        contentContainerStyle={shifts.length === 0 ? styles.emptyList : styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/shift/[id]', params: { id: item.id } })}
          >
            <View>
              <Text style={styles.date}>{formatDate(item.checkIn)}</Text>
              <Text style={styles.time}>כניסה: {formatTime(item.checkIn)}</Text>
              <Text style={styles.time}>יציאה: {formatTime(item.checkOut)}</Text>
            </View>
            <View style={styles.durationBox}>
              <Text style={styles.durationLabel}>משך</Text>
              <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <LottieView
              source={require('../../../assets/animations/Juggling_ball.json')}
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.emptyTitle}>עדיין אין משמרות</Text>
            <Text style={styles.emptyText}>המשמרת הראשונה תופיע כאן לאחר יציאה</Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 14, alignItems: 'flex-end' },
  title: { fontSize: 27, fontWeight: '900', color: '#1c2b4a' },
  subtitle: { color: '#718098', marginTop: 5 },
  list: { padding: 18, gap: 13 },
  emptyList: { flexGrow: 1 },
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 18, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', elevation: 3 },
  date: { fontSize: 18, fontWeight: '900', textAlign: 'right', color: '#25324a' },
  time: { textAlign: 'right', color: '#718098', marginTop: 4 },
  durationBox: { backgroundColor: '#e8f0ff', padding: 11, borderRadius: 13, alignItems: 'center' },
  durationLabel: { fontSize: 12, color: '#62708a' },
  duration: { fontWeight: '900', color: '#2767d8', marginTop: 3 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  animation: { width: 210, height: 210 },
  emptyTitle: { fontSize: 23, fontWeight: '900', color: '#25324a' },
  emptyText: { marginTop: 8, color: '#718098', textAlign: 'center' },
});
