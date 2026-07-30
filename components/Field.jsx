import React, { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Field = forwardRef(function Field({ label, style, ...props }, ref) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        {...props}
        style={[styles.input, style]}
        placeholderTextColor="#8a94a6"
      />
    </View>
  );
});

export default Field;

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 16 },
  label: { textAlign: 'right', marginBottom: 7, fontWeight: '700', color: '#26324a' },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#d9e0ec',
    borderRadius: 13, paddingHorizontal: 15, height: 52,
    textAlign: 'right', fontSize: 16,
  },
});
