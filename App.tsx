import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Pressable, Alert, Platform } from 'react-native';
import type { Device } from 'react-native-ble-plx';
import { PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';
import PairingScreen from './src/screens/PairingScreen';
import RemoteScreen from './src/screens/RemoteScreen';
import { scanOnce, connectAndDiscover, writeBase64 } from './src/ble/BleClient';
import { CMD } from './src/ble/commands';

type Tab = 'pairing' | 'remote';
type DeviceMap = Record<string, Device>;

const DEFAULT_SERVICE = '0000ffff-0000-1000-8000-00805f9b34fb';
const DEFAULT_CHAR    = '0000ff01-0000-1000-8000-00805f9b34fb';

export default function App() {
  const [tab, setTab] = useState<Tab>('pairing');

  const [devices, setDevices] = useState<DeviceMap>({});
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connected, setConnected] = useState<Device | null>(null);

  const [serviceUUID, setServiceUUID] = useState(DEFAULT_SERVICE);
  const [charUUID, setCharUUID] = useState(DEFAULT_CHAR);

  useEffect(() => {
    return () => { try { connected?.cancelConnection(); } catch {} };
  }, [connected]);

  const askPerms = async () => {
    if (Platform.OS !== 'android') return true;
    const res = await requestMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]);
    const ok = [RESULTS.GRANTED, RESULTS.LIMITED];
    return ok.includes(res[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] as any);
  };

  const onScan = async () => {
    const allowed = await askPerms();
    if (!allowed) { Alert.alert('Permission required', 'Grant Bluetooth permissions to scan.'); return; }
    setDevices({});
    scanOnce(
      (d) => setDevices((prev) => (prev[d.id] ? prev : { ...prev, [d.id]: d })),
      (e) => Alert.alert('Scan error', String((e as any)?.message ?? e)),
    );
  };

  const onConnect = async (d: Device) => {
    try {
      setConnectingId(d.id);
      const ready = await connectAndDiscover(d);
      setConnected(ready);
      setTab('remote');
      Alert.alert('Connected', ready.name || ready.id);
    } catch (e: any) {
      Alert.alert('Connect error', String(e?.message ?? e));
    } finally {
      setConnectingId(null);
    }
  };

  const onSend = async (payload: string) => {
    if (!connected) { Alert.alert('Not connected', 'Select a device on Pairing tab.'); return; }
    try {
      await writeBase64(connected, serviceUUID.trim(), charUUID.trim(), payload);
    } catch (e: any) {
      Alert.alert('Write error', String(e?.message ?? e));
    }
  };

  const TabButton = ({ id, label }: { id: Tab; label: string }) => (
    <Pressable
      onPress={() => setTab(id)}
      style={{
        flex: 1,
        backgroundColor: tab === id ? '#1F2937' : '#F3F4F6',
        borderRadius: 12,
        alignItems: 'center',
        padding: 12,
      }}
    >
      <Text style={{ color: tab === id ? 'white' : '#111827', fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, padding: 16 }}>
        {tab === 'pairing' ? (
          <PairingScreen
            serviceUUID={serviceUUID}
            setServiceUUID={setServiceUUID}
            charUUID={charUUID}
            setCharUUID={setCharUUID}
            devices={devices}
            connectingId={connectingId}
            connected={connected}
            onScan={onScan}
            onConnect={onConnect}
          />
        ) : (
          <RemoteScreen
            connected={connected}
            onSend={onSend}
          />
        )}
      </View>

      {/* Bottom tabs */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#E5E7EB', padding: 8, gap: 8 }}>
        <TabButton id="remote" label="Remote" />
        <TabButton id="pairing" label="Pairing" />
      </View>
    </SafeAreaView>
  );
}