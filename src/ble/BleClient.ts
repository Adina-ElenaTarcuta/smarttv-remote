import { BleManager, Device } from 'react-native-ble-plx';
import { Base64 } from 'js-base64';


//delay helper
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const ble = new BleManager();
// when one scan is successful it reports the devices
export function scanOnce(onDevice: (d: Device) => void, onError: (e: Error) => void) {
  const sub = ble.startDeviceScan(null, { allowDuplicates: false }, (err, device) => {
    if (err) { onError(err); return; }
    if (device) onDevice(device);
  });
  // Stop after 10s
   setTimeout(() => {ble.stopDeviceScan();}, 10000);
}
 //connect then with discover service and characteristics
export async function connectAndDiscover(device: Device) {
  const d = await device.connect();
  return d.discoverAllServicesAndCharacteristics();
}

export async function writeBase64(
  device: Device,
  serviceUUID: string,
  charUUID: string,
  base64Payload: string,
) {
  return device.writeCharacteristicWithoutResponseForService(serviceUUID, charUUID, base64Payload);
}

// send text as UTF-8 Base64 encoded
export async function writeText(
  device: Device,
  serviceUUID: string,
  charUUID: string,
  text: string,
  CHUNK_SIZE = 20
) {
    const utf8Bytes = Base64.toUint8Array(Base64.encode(text));
    for (let i = 0; i < utf8Bytes.length; i += CHUNK_SIZE) {
    const chunk = utf8Bytes.slice(i, i + CHUNK_SIZE);
    const b64 = Base64.fromUint8Array(chunk);
    await device.writeCharacteristicWithoutResponseForService(serviceUUID, charUUID, b64);
    await sleep(15); 
  }
}