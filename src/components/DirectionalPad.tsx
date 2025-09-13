import React from 'react';
import { View } from 'react-native';
import IconButton from './IconButton';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

type Props = {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onOk: () => void;
};

export default function DirectionalPad({ onUp, onDown, onLeft, onRight, onOk }: Props) {
  return (
    <View style={{ alignItems: 'center', gap: 12 }}>
      <IconButton icon={<MaterialIcons name="keyboard-arrow-up" size={28} color="#1F2937" />} onPress={onUp} />
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <IconButton icon={<MaterialIcons name="keyboard-arrow-left" size={28} color="#1F2937" />} onPress={onLeft} />
        <IconButton icon={<Ionicons name="checkmark" size={26} color="#1F2937" />} label="OK" onPress={onOk} />
        <IconButton icon={<MaterialIcons name="keyboard-arrow-right" size={28} color="#1F2937" />} onPress={onRight} />
      </View>
      <IconButton icon={<MaterialIcons name="keyboard-arrow-down" size={28} color="#1F2937" />} onPress={onDown} />
    </View>
  );
}