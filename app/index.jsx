import React, { useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import Field from '../components/Field';
import { getUser } from '../utils/storage';

export default function LoginScreen() {
  const router = useRouter();
  const passwordRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!username.trim() || !password) {
      Alert.alert('שגיאה', 'יש למלא שם משתמש וסיסמה');
      return;
    }
    try {
      setLoading(true);
      const user = await getUser();
      if (username.trim() === user.username && password === user.password) {
        Keyboard.dismiss();
        router.replace('/(drawer)/(tabs)/home');
      } else {
        Alert.alert('כניסה נכשלה', 'שם המשתמש או הסיסמה אינם נכונים');
      }
    } catch {
      Alert.alert('שגיאה', 'לא ניתן לקרוא את פרטי המשתמש');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable style={styles.page} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <View style={styles.logo}><Text style={styles.logoText}>⏱</Text></View>
          <Text style={styles.title}>שעון נוכחות</Text>
          <Text style={styles.subtitle}>התחבר כדי להתחיל את יום העבודה</Text>

          <Field
            label="שם משתמש"
            placeholder="הקלד שם משתמש"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
          <Field
            ref={passwordRef}
            label="סיסמה"
            placeholder="הקלד סיסמה"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={login}
          />

          <TouchableOpacity style={styles.button} onPress={login} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'מתחבר...' : 'כניסה'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#eaf1fb' },
  center: { flex: 1, justifyContent: 'center', padding: 22 },
  card: {
    backgroundColor: '#fff', borderRadius: 24, padding: 24,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 }, elevation: 7, alignItems: 'center',
  },
  logo: { width: 74, height: 74, borderRadius: 37, backgroundColor: '#dceaff', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  logoText: { fontSize: 38 },
  title: { fontSize: 30, fontWeight: '900', color: '#1c2b4a' },
  subtitle: { color: '#68758d', marginTop: 6, marginBottom: 27, textAlign: 'center' },
  button: { width: '100%', backgroundColor: '#2767d8', height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});
