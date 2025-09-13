import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../ui/theme';

type Props = {
  icon?: React.ReactNode;
  label?: string;
  round?: boolean;
  onPress: () => void;
};

export default function IconButton({ icon, label, round = true, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        padding: 14,
        borderRadius: round ? 999 : 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 56,
        backgroundColor: pressed ? '#DBEAFE' : '#EFF6FF',
        borderColor: '#93C5FD',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      })}
    >
      <View style={{ alignItems: 'center' }}>
        {icon}
        {!!label && <Text style={{ fontSize: 12, marginTop: 4 }}>{label}</Text>}
      </View>
    </Pressable>
  );
}
