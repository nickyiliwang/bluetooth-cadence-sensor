const deviceName = "905-97";
//   const bleService = "cycling_speed_and_cadence";
//   let characteristicUuid = "csc_measurement";
const bleService = "battery_service";
let characteristicUuid = "battery_level";

const getDeviceInfo = () => {
  console.log("Requesting BLE device info ...");

  navigator.bluetooth
    .requestDevice({
      acceptAllDevices: true,

      // filters: [
      //   {
      //     // name: deviceName,
      //     services: bleService,
      //   },
      // ],
      optionalServices: ["00002a19-0000-1000-8000-00805f9b34fb"],

      // 00002a19-0000-1000-8000-00805f9b34fb
    })
    .then((device) => {
      console.log(device);
      return device.gatt.connect();
    })
    .then((server) => {
      console.log("Getting GATT Service... ", server);
      return server.getPrimaryService(bleService);
    })
    .then((service) => {
      console.log("Getting Characteristic...", service);
      return service.getCharacteristic(characteristicUuid);
    })
    .then((c) => {
      characteristic = c;
      return characteristic.startNotifications().then((data) => {
        console.log("Notifications started", data);
      });
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

function connectGATT() {
  console.log("triggered");

  if (bluetoothDeviceDetected.gatt.connected) {
    return Promise.resolve();
  }

  return bluetoothDeviceDetected;
}

document.getElementById("getBLE").addEventListener("click", function () {
  getDeviceInfo();
});
