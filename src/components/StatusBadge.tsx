import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../ui/theme';

export default function StatusBadge({ text, type }: { text: string; type: 'ok' | 'warn' }) {
  const bg = type === 'ok' ? colors.okBg : colors.warnBg;
  const brd = type === 'ok' ? colors.okBorder : colors.warnBorder;
  const fg = type === 'ok' ? '#166534' : '#92400E';
  return (
    <View style={{ alignSelf: 'flex-start', backgroundColor: bg, borderColor: brd, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
      <Text style={{ color: fg, fontWeight: '600' }}>{text}</Text>
    </View>
  );
}