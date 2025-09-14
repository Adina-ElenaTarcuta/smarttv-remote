import React from 'react';
import { View, Text, Pressable } from 'react-native';

const rows = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m'],
];

export default function AlphabetKeyboard({ onKey }: { onKey: (k: string) => void }) {
  return (
    <View style={{ gap: 8 }}>
      {rows.map((row, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
          {row.map((k) => (
            <Pressable
              key={k}
              onPress={() => onKey(k)}
              style={({ pressed }) => ({
                paddingVertical: 10, paddingHorizontal: 12,
                borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1',
                backgroundColor: pressed ? '#F1F5F9' : '#FFFFFF',
              })}
            >
              <Text style={{ fontWeight: '600', textTransform: 'uppercase' }}>{k}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
        <Pressable onPress={() => onKey(' ')} style={({ pressed }) => ({
          paddingVertical: 10, paddingHorizontal: 60, borderRadius: 8,
          borderWidth: 1, borderColor: '#CBD5E1', backgroundColor: pressed ? '#F1F5F9' : '#FFFFFF',
        })}><Text>Space</Text></Pressable>
        <Pressable onPress={() => onKey('BACKSPACE')} style={({ pressed }) => ({
          paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8,
          borderWidth: 1, borderColor: '#CBD5E1', backgroundColor: pressed ? '#F1F5F9' : '#FFFFFF',
        })}><Text>⌫</Text></Pressable>
        <Pressable onPress={() => onKey('ENTER')} style={({ pressed }) => ({
          paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8,
          borderWidth: 1, borderColor: '#CBD5E1', backgroundColor: pressed ? '#3B82F6' : '#60A5FA',
        })}><Text style={{ color: 'white', fontWeight: '700' }}>Enter</Text></Pressable>
      </View>
    </View>
  );
}