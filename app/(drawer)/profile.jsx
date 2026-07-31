import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import Screen from '../../components/Screen';
import Field from '../../components/Field';
import { getProfileImage, getUser, saveProfileImage, saveUser } from '../../utils/storage';

export default function ProfileScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    Promise.all([getUser(), getProfileImage()]).then(([user, uri]) => {
      setUsername(user.username);
      setPassword(user.password);
      setImage(uri);
    });
  }, []);

  async function saveDetails() {
    if (!username.trim() || !password) {
      Alert.alert('שגיאה', 'שם המשתמש והסיסמה אינם יכולים להיות ריקים');
      return;
    }
    await saveUser({ username: username.trim(), password });
    Alert.alert('נשמר', 'פרטי הכניסה עודכנו בהצלחה');
  }

  async function chooseImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('נדרשת הרשאה', 'יש לאשר גישה לגלריה');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) await updateImage(result.assets[0].uri);
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('נדרשת הרשאה', 'יש לאשר גישה למצלמה');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!result.canceled) await updateImage(result.assets[0].uri);
  }

  async function updateImage(uri) {
    setImage(uri);
    await saveProfileImage(uri);
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>הפרופיל שלי</Text>
        <View style={styles.imageWrap}>
          {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text style={styles.placeholder}>👤</Text>}
        </View>
        <View style={styles.imageButtons}>
          <TouchableOpacity style={styles.secondary} onPress={chooseImage}><Text style={styles.secondaryText}>בחירה מהגלריה</Text></TouchableOpacity>
          <TouchableOpacity style={styles.secondary} onPress={takePhoto}><Text style={styles.secondaryText}>צילום חדש</Text></TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Field label="שם משתמש" value={username} onChangeText={setUsername} autoCapitalize="none" />
          <Field label="סיסמה" value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.save} onPress={saveDetails}><Text style={styles.saveText}>שמור שינויים</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logout} onPress={() => router.replace('/')}><Text style={styles.logoutText}>התנתקות</Text></TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 22, alignItems: 'center' },
  title: { fontSize: 29, fontWeight: '900', color: '#1c2b4a', marginBottom: 20 },
  imageWrap: { width: 145, height: 145, borderRadius: 73, overflow: 'hidden', backgroundColor: '#dce8fb', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#fff', elevation: 5 },
  image: { width: '100%', height: '100%' },
  placeholder: { fontSize: 70 },
  imageButtons: { flexDirection: 'row-reverse', gap: 10, marginVertical: 20 },
  secondary: { backgroundColor: '#e5edfa', paddingVertical: 11, paddingHorizontal: 14, borderRadius: 12 },
  secondaryText: { color: '#2767d8', fontWeight: '800' },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 3 },
  save: { height: 52, backgroundColor: '#2767d8', borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '900', fontSize: 17 },
  logout: { marginTop: 22, padding: 12 },
  logoutText: { color: '#d34444', fontWeight: '900', fontSize: 17 },
});
