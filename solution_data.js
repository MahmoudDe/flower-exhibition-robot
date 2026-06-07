window.FLOWER_ROBOT_DATA = {
  "grid": {
    "width": 5,
    "height": 5
  },
  "warehouse": [
    3,
    2
  ],
  "start": [
    2,
    3
  ],
  "maxLoad": 4,
  "optimalCost": 28,
  "items": [
    [
      "Pavilion 1",
      "Rose",
      "red",
      2,
      [
        2,
        4
      ]
    ],
    [
      "Pavilion 1",
      "Rose",
      "pink",
      1,
      [
        2,
        4
      ]
    ],
    [
      "Pavilion 1",
      "Rose",
      "white",
      1,
      [
        2,
        4
      ]
    ],
    [
      "Pavilion 2",
      "Tulip",
      "red",
      3,
      [
        4,
        3
      ]
    ],
    [
      "Pavilion 2",
      "Tulip",
      "yellow",
      1,
      [
        4,
        3
      ]
    ],
    [
      "Pavilion 3",
      "Orchid",
      "purple",
      2,
      [
        4,
        5
      ]
    ],
    [
      "Pavilion 3",
      "Orchid",
      "pink",
      1,
      [
        4,
        5
      ]
    ],
    [
      "Pavilion 4",
      "Goliat Rose",
      "gold",
      2,
      [
        5,
        2
      ]
    ],
    [
      "Pavilion 4",
      "Goliat Rose",
      "light pink",
      2,
      [
        5,
        2
      ]
    ]
  ],
  "targets": [
    {
      "name": "Warehouse",
      "pos": [
        3,
        2
      ]
    },
    {
      "name": "Pavilion 1",
      "pos": [
        2,
        4
      ]
    },
    {
      "name": "Pavilion 2",
      "pos": [
        4,
        3
      ]
    },
    {
      "name": "Pavilion 3",
      "pos": [
        4,
        5
      ]
    },
    {
      "name": "Pavilion 4",
      "pos": [
        5,
        2
      ]
    }
  ],
  "states": [
    {
      "label": "Initial state",
      "pos": [
        2,
        3
      ],
      "cost": 0,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "move-right",
      "pos": [
        3,
        3
      ],
      "cost": 1,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "move-down",
      "pos": [
        3,
        2
      ],
      "cost": 2,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "arrive Warehouse",
      "pos": [
        3,
        2
      ],
      "cost": 2,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "load Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
      "pos": [
        3,
        2
      ],
      "cost": 3,
      "cargo": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "move-right",
      "pos": [
        4,
        2
      ],
      "cost": 4,
      "cargo": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "move-up",
      "pos": [
        4,
        3
      ],
      "cost": 5,
      "cargo": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "arrive Pavilion 2",
      "pos": [
        4,
        3
      ],
      "cost": 5,
      "cargo": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "unload Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
      "pos": [
        4,
        3
      ],
      "cost": 6,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "move-left",
      "pos": [
        3,
        3
      ],
      "cost": 7,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "move-down",
      "pos": [
        3,
        2
      ],
      "cost": 8,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "arrive Warehouse",
      "pos": [
        3,
        2
      ],
      "cost": 8,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "load Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
      "pos": [
        3,
        2
      ],
      "cost": 9,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "move-right",
      "pos": [
        4,
        2
      ],
      "cost": 10,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "move-right",
      "pos": [
        5,
        2
      ],
      "cost": 11,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "arrive Pavilion 4",
      "pos": [
        5,
        2
      ],
      "cost": 11,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0
      ]
    },
    {
      "label": "unload Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
      "pos": [
        5,
        2
      ],
      "cost": 12,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-left",
      "pos": [
        4,
        2
      ],
      "cost": 13,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-left",
      "pos": [
        3,
        2
      ],
      "cost": 14,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "arrive Warehouse",
      "pos": [
        3,
        2
      ],
      "cost": 14,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "load Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
      "pos": [
        3,
        2
      ],
      "cost": 15,
      "cargo": [
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-left",
      "pos": [
        2,
        2
      ],
      "cost": 16,
      "cargo": [
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-up",
      "pos": [
        2,
        3
      ],
      "cost": 17,
      "cargo": [
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-up",
      "pos": [
        2,
        4
      ],
      "cost": 18,
      "cargo": [
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "arrive Pavilion 1",
      "pos": [
        2,
        4
      ],
      "cost": 18,
      "cargo": [
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        0,
        0,
        0,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "unload Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
      "pos": [
        2,
        4
      ],
      "cost": 19,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-right",
      "pos": [
        3,
        4
      ],
      "cost": 20,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-down",
      "pos": [
        3,
        3
      ],
      "cost": 21,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-down",
      "pos": [
        3,
        2
      ],
      "cost": 22,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "arrive Warehouse",
      "pos": [
        3,
        2
      ],
      "cost": 22,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "load Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
      "pos": [
        3,
        2
      ],
      "cost": 23,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-right",
      "pos": [
        4,
        2
      ],
      "cost": 24,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-up",
      "pos": [
        4,
        3
      ],
      "cost": 25,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-up",
      "pos": [
        4,
        4
      ],
      "cost": 26,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "move-up",
      "pos": [
        4,
        5
      ],
      "cost": 27,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "arrive Pavilion 3",
      "pos": [
        4,
        5
      ],
      "cost": 27,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        2,
        1,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        0,
        0,
        2,
        2
      ]
    },
    {
      "label": "unload Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
      "pos": [
        4,
        5
      ],
      "cost": 28,
      "cargo": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "delivered": [
        2,
        1,
        1,
        3,
        1,
        2,
        1,
        2,
        2
      ]
    }
  ],
  "generated": [
    "g=0 h=2 pos=(2, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=0 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=3 pos=(3, 2) cargo=(2, 1, 1, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=2 pos=(3, 2) cargo=(0, 0, 0, 3, 1, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=4 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 2, 1, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=2 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 2, 2) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=3 pos=(3, 2) cargo=(0, 0, 1, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=2 pos=(3, 2) cargo=(0, 0, 0, 0, 1, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=4 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 2, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=3 pos=(3, 2) cargo=(0, 1, 0, 0, 0, 0, 1, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=2 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 2, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=2 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 2) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=5 h=0 pos=(4, 3) cargo=(0, 0, 0, 3, 1, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=5 h=0 pos=(5, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 2, 2) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=5 h=0 pos=(4, 3) cargo=(0, 0, 0, 0, 1, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=5 h=0 pos=(5, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 2, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=5 h=0 pos=(5, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 2) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=6 h=2 pos=(4, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 0, 0, 2, 1, 2, 2)",
    "g=6 h=2 pos=(5, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 0, 0)",
    "g=6 h=2 pos=(4, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 0, 2, 1, 2, 2)",
    "g=6 h=2 pos=(5, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 0, 2)",
    "g=6 h=2 pos=(5, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 0)",
    "g=6 h=0 pos=(2, 4) cargo=(2, 1, 1, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=6 h=0 pos=(2, 4) cargo=(0, 0, 1, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)"
  ],
  "trips": [
    {
      "name": "Trip 1",
      "label": "unload Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
      "cost": 6
    },
    {
      "name": "Trip 2",
      "label": "unload Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
      "cost": 12
    },
    {
      "name": "Trip 3",
      "label": "unload Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
      "cost": 19
    },
    {
      "name": "Trip 4",
      "label": "unload Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
      "cost": 28
    }
  ]
};
