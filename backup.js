const deviceName = "905-97";
const bleService = "cycling_speed_and_cadence";
let bluetoothDeviceDetected;
let gattCharacteristic;

const isWebBLEAvailable = () => {
  if (!navigator.bluetooth) {
    console.log("Web Bluetooth is not available!");
    return false;
  }

  return true;
};

const getDeviceInfo = () => {
  // from getting all devices, we want to filter and get only one device

  // let options = {
  //   acceptAllDevices: true,
  // };

  let options = {
    filters: [
      {
        name: deviceName,
      },
    ],
  };

  console.log("Requesting BLE device info ...");

  navigator.bluetooth
    .requestDevice(options)
    .then((device) => {
      bluetoothDeviceDetected = device;
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

function connectGATT() {
  if (bluetoothDeviceDetected.gatt.connected) {
    return Promise.resolve();
  }

  return bluetoothDeviceDetected.gatt.connected().then((server) => {
    console.log("Getting GATT Service...");
    return server.getPrimaryService(bleService);
  });
}

function read() {
  return (bluetoothDeviceDetected ? Promise.resolve() : getDeviceInfo())
    .then(connectGATT)
    .then((_) => {
      console.log("Reading Cadence value ...");
      return gattCharacteristic.readValue();
    })
    .catch((error) => {
      console.log("reading Error: ", error);
    });
}

document.getElementById("getBLE").addEventListener("click", function (event) {
  if (isWebBLEAvailable()) {
    read();
  }
});

document.getElementById("start", function () {
  if (isWebBLEAvailable()) {
    start();
  }
});
document.getElementById("stop", function () {
  stop();
});
