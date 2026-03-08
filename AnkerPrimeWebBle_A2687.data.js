(function () {
  var data = {
    images: {
      chargerBaseLive: 'img/imgl_device_a2687_black_normal.png',
      cableOverlays: {
        C1: 'img/imgl_usb_a2687_black_normal_c1.png',
        C2: 'img/imgl_usb_a2687_black_normal_c2.png',
        C3: 'img/imgl_usb_a2687_black_normal_c3.png'
      }
    },
    cableProfiles: {
      '0100': {
        cableLabel: '5A-100W MAX',
        chargingInfo: null
      },
      '0200': {
        cableLabel: 'EPR-240W MAX',
        chargingInfo: null
      },
      '0201': {
        cableLabel: 'EPR-240W MAX',
        chargingInfo: 'Apple PD Fast Charging'
      }
    }
  };

  window.A17A5_UI_DATA = data;
})();
