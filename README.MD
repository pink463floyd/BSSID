    launch with 'node server.js' command.

    Express module which will provide a REST interface for retrieving
    ssid and mac info for roaming devices:
   
    1) First - populate the table 
 
    http://162.254.165.41:3000/usermac/22/bssid/288
    http://162.254.165.41:3000/usermac/32/bssid/388

    [
      {
        "mac": "22",
        "bssid": "288",
        "timestamp": 1420639677900
      },
      {
        "mac": "32",
        "bssid": "388",
        "timestamp": 1413769450212
      },
    ]

    2) Get all:
       http://162.254.165.41:3000/usermac

    3) Get a specific user:
       http://162.254.165.41:3000/usermac/22
