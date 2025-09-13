import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import type { Device } from 'react-native-ble-plx';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../components/IconButton';
import { colors } from '../ui/theme';
import { CMD } from '../ble/commands';
import DirectionalPad from '../components/DirectionalPad';

type Props = {
  connected: Device | null;
  onSend: (payload: string) => void;
};

export default function RemoteScreen({ connected, onSend }: Props) {
  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Remote</Text>
      <Text style={{ opacity: 0.6 }}>
        {connected ? `Connected to ${connected.name || connected.id}` : 'Not connected'}
      </Text>

      {/* Top row: Back / Home */}
      <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
        <IconButton icon={<Ionicons name="arrow-back" size={28} color="#1F2937" />} label="Back" onPress={() => onSend(CMD.BACK)} />
        <IconButton icon={<Ionicons name="home" size={28} color="#1F2937" />} label="Home" onPress={() => onSend(CMD.HOME)} />
      </View>

      {/* Directional Pad */}
      <DirectionalPad
        onUp={() => onSend(CMD.UP)}
        onDown={() => onSend(CMD.DOWN)}
        onLeft={() => onSend(CMD.LEFT)}
        onRight={() => onSend(CMD.RIGHT)}
        onOk={() => onSend(CMD.OK)}
      />

      {/* Volume / Channel */}
      <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'space-between' }}>
        <View style={{ gap: 10, flex: 1 }}>
          <Text style={{ fontWeight: '600' }}>Volume</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable onPress={() => onSend(CMD.VOL_UP)} style={({ pressed }) => ({
              flex: 1, padding: 14, borderRadius: 10,
              backgroundColor: pressed ? '#3B82F6' : '#60A5FA', alignItems: 'center',
            })}><Text style={{ color: 'white', fontWeight: '700' }}>VOL +</Text></Pressable>
            <Pressable onPress={() => onSend(CMD.VOL_DOWN)} style={({ pressed }) => ({
              flex: 1, padding: 14, borderRadius: 10,
              backgroundColor: pressed ? '#3B82F6' : '#60A5FA', alignItems: 'center',
            })}><Text style={{ color: 'white', fontWeight: '700' }}>VOL -</Text></Pressable>
            <Pressable onPress={() => onSend(CMD.MUTE)} style={({ pressed }) => ({
              padding: 14, borderRadius: 10,
              backgroundColor: pressed ? '#3B82F6' : '#93C5FD', alignItems: 'center',
            })}><Text style={{ color: 'white', fontWeight: '700' }}>MUTE</Text></Pressable>
          </View>
        </View>

        <View style={{ gap: 10, flex: 1 }}>
          <Text style={{ fontWeight: '600' }}>Channel</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable onPress={() => onSend(CMD.CH_UP)} style={({ pressed }) => ({
              flex: 1, padding: 14, borderRadius: 10,
              backgroundColor: pressed ? '#10B981' : '#34D399', alignItems: 'center',
            })}><Text style={{ color: 'white', fontWeight: '700' }}>CH +</Text></Pressable>
            <Pressable onPress={() => onSend(CMD.CH_DOWN)} style={({ pressed }) => ({
              flex: 1, padding: 14, borderRadius: 10,
              backgroundColor: pressed ? '#10B981' : '#34D399', alignItems: 'center',
            })}><Text style={{ color: 'white', fontWeight: '700' }}>CH -</Text></Pressable>
          </View>
        </View>
      </View>

      {/* Keyboard placeholder */}
      <Pressable
        onPress={() => Alert.alert('Keyboard', 'Text input → map to TV protocol (future work).')}
        style={({ pressed }) => ({
          marginTop: 10,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: pressed ? '#F1F5F9' : '#FFFFFF',
          alignItems: 'center',
        })}
      >
        <Text style={{ fontWeight: '600' }}>Keyboard</Text>
      </Pressable>
    </View>
  );
}