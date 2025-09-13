import React from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import type { Device } from 'react-native-ble-plx';
import StatusBadge from '../components/StatusBadge';
import { colors } from '../ui/theme';

type Props = {
  serviceUUID: string;
  setServiceUUID: (v: string) => void;
  charUUID: string;
  setCharUUID: (v: string) => void;
  devices: Record<string, Device>;
  connectingId: string | null;
  connected: Device | null;
  onScan: () => void;
  onConnect: (d: Device) => void;
};

export default function PairingScreen({
  serviceUUID, setServiceUUID,
  charUUID, setCharUUID,
  devices, connectingId, connected,
  onScan, onConnect,
}: Props) {
  const list = Object.values(devices);

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Pairing</Text>

      <View style={{ gap: 6 }}>
        <Text>Service UUID</Text>
        <TextInput
          value={serviceUUID}
          onChangeText={setServiceUUID}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}
        />
        <Text>Write Characteristic UUID</Text>
        <TextInput
          value={charUUID}
          onChangeText={setCharUUID}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}
        />
      </View>

      <Pressable
        onPress={onScan}
        style={({ pressed }) => ({
          backgroundColor: pressed ? colors.primaryDark : colors.primary,
          padding: 14,
          borderRadius: 10,
          alignItems: 'center',
        })}
      >
        <Text style={{ color: 'white', fontWeight: '700' }}>Scan Devices</Text>
      </Pressable>

      <Text style={{ fontWeight: '600', marginTop: 4 }}>List of devices (TV)</Text>
      <FlatList
        data={list}
        keyExtractor={(d) => d.id}
        style={{ maxHeight: 220 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onConnect(item)}
            style={({ pressed }) => ({
              padding: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: pressed ? '#F1F5F9' : '#FFFFFF',
            })}
          >
            <Text style={{ fontWeight: '600' }}>{item.name || 'Unnamed device'}</Text>
            <Text style={{ opacity: 0.6, fontSize: 12 }}>{item.id}</Text>
            {connectingId === item.id && <Text style={{ marginTop: 4 }}>Connecting…</Text>}
          </Pressable>
        )}
        ListEmptyComponent={<Text>No devices yet. Tap Scan.</Text>}
      />

      <View style={{ gap: 6 }}>
        <Text style={{ fontWeight: '600' }}>Status:</Text>
        {connected ? (
          <>
            <StatusBadge text="Connection established" type="ok" />
            <StatusBadge text="Session: secure" type="ok" />
            <Text style={{ opacity: 0.7 }}>{connected.name || connected.id}</Text>
          </>
        ) : (
          <StatusBadge text="Not connected" type="warn" />
        )}
      </View>
    </View>
  );
}