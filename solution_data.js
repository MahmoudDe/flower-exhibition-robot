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
  "searchStrategy": "A* (Experta rules, f = g + h)",
  "generatedTotal": 45032,
  "solutionPath": [
    "move-right",
    "move-down",
    "load Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
    "move-up",
    "move-up",
    "move-left",
    "unload Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
    "move-right",
    "move-down",
    "move-down",
    "load Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
    "move-right",
    "move-right",
    "unload Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
    "move-left",
    "move-left",
    "load Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
    "move-up",
    "move-right",
    "unload Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
    "move-left",
    "move-down",
    "load Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
    "move-up",
    "move-up",
    "move-up",
    "move-right",
    "unload Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1"
  ],
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
      "h": 2,
      "f": 2,
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
      ],
      "remaining": [
        2,
        1,
        1,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-right",
      "pos": [
        3,
        3
      ],
      "cost": 1,
      "h": 1,
      "f": 2,
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
      ],
      "remaining": [
        2,
        1,
        1,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-down",
      "pos": [
        3,
        2
      ],
      "cost": 2,
      "h": 0,
      "f": 2,
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
      ],
      "remaining": [
        2,
        1,
        1,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "load Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
      "pos": [
        3,
        2
      ],
      "cost": 3,
      "h": 3,
      "f": 6,
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
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "remaining": [
        2,
        1,
        1,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-up",
      "pos": [
        3,
        3
      ],
      "cost": 4,
      "h": 2,
      "f": 6,
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
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "remaining": [
        2,
        1,
        1,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-up",
      "pos": [
        3,
        4
      ],
      "cost": 5,
      "h": 1,
      "f": 6,
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
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "remaining": [
        2,
        1,
        1,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-left",
      "pos": [
        2,
        4
      ],
      "cost": 6,
      "h": 0,
      "f": 6,
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
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "remaining": [
        2,
        1,
        1,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "unload Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
      "pos": [
        2,
        4
      ],
      "cost": 7,
      "h": 3,
      "f": 10,
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
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-right",
      "pos": [
        3,
        4
      ],
      "cost": 8,
      "h": 2,
      "f": 10,
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
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-down",
      "pos": [
        3,
        3
      ],
      "cost": 9,
      "h": 1,
      "f": 10,
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
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-down",
      "pos": [
        3,
        2
      ],
      "cost": 10,
      "h": 0,
      "f": 10,
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
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "load Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
      "pos": [
        3,
        2
      ],
      "cost": 11,
      "h": 2,
      "f": 13,
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
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-right",
      "pos": [
        4,
        2
      ],
      "cost": 12,
      "h": 1,
      "f": 13,
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
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "move-right",
      "pos": [
        5,
        2
      ],
      "cost": 13,
      "h": 0,
      "f": 13,
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
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        2,
        2
      ],
      "isGoal": false
    },
    {
      "label": "unload Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
      "pos": [
        5,
        2
      ],
      "cost": 14,
      "h": 2,
      "f": 16,
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
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        0,
        0
      ],
      "isGoal": false
    },
    {
      "label": "move-left",
      "pos": [
        4,
        2
      ],
      "cost": 15,
      "h": 1,
      "f": 16,
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
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        0,
        0
      ],
      "isGoal": false
    },
    {
      "label": "move-left",
      "pos": [
        3,
        2
      ],
      "cost": 16,
      "h": 0,
      "f": 16,
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
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        0,
        0
      ],
      "isGoal": false
    },
    {
      "label": "load Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
      "pos": [
        3,
        2
      ],
      "cost": 17,
      "h": 2,
      "f": 19,
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
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        0,
        0
      ],
      "isGoal": false
    },
    {
      "label": "move-up",
      "pos": [
        3,
        3
      ],
      "cost": 18,
      "h": 1,
      "f": 19,
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
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        0,
        0
      ],
      "isGoal": false
    },
    {
      "label": "move-right",
      "pos": [
        4,
        3
      ],
      "cost": 19,
      "h": 0,
      "f": 19,
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
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        2,
        2
      ],
      "remaining": [
        0,
        0,
        0,
        3,
        1,
        2,
        1,
        0,
        0
      ],
      "isGoal": false
    },
    {
      "label": "unload Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
      "pos": [
        4,
        3
      ],
      "cost": 20,
      "h": 2,
      "f": 22,
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
      ],
      "remaining": [
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
      "isGoal": false
    },
    {
      "label": "move-left",
      "pos": [
        3,
        3
      ],
      "cost": 21,
      "h": 1,
      "f": 22,
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
      ],
      "remaining": [
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
      "isGoal": false
    },
    {
      "label": "move-down",
      "pos": [
        3,
        2
      ],
      "cost": 22,
      "h": 0,
      "f": 22,
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
      ],
      "remaining": [
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
      "isGoal": false
    },
    {
      "label": "load Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
      "pos": [
        3,
        2
      ],
      "cost": 23,
      "h": 4,
      "f": 27,
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
      ],
      "remaining": [
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
      "isGoal": false
    },
    {
      "label": "move-up",
      "pos": [
        3,
        3
      ],
      "cost": 24,
      "h": 3,
      "f": 27,
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
      ],
      "remaining": [
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
      "isGoal": false
    },
    {
      "label": "move-up",
      "pos": [
        3,
        4
      ],
      "cost": 25,
      "h": 2,
      "f": 27,
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
      ],
      "remaining": [
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
      "isGoal": false
    },
    {
      "label": "move-up",
      "pos": [
        3,
        5
      ],
      "cost": 26,
      "h": 1,
      "f": 27,
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
      ],
      "remaining": [
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
      "isGoal": false
    },
    {
      "label": "move-right",
      "pos": [
        4,
        5
      ],
      "cost": 27,
      "h": 0,
      "f": 27,
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
      ],
      "remaining": [
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
      "isGoal": false
    },
    {
      "label": "unload Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
      "pos": [
        4,
        5
      ],
      "cost": 28,
      "h": 0,
      "f": 28,
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
      ],
      "remaining": [
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
      "isGoal": true
    }
  ],
  "generated": [
    "g=0 h=2 f=2 pos=(2, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=1 h=3 f=4 pos=(2, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=1 h=1 f=2 pos=(3, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=1 h=3 f=4 pos=(1, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=1 h=1 f=2 pos=(2, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=1 h=3 f=4 pos=(2, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=1 h=1 f=2 pos=(3, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=1 h=3 f=4 pos=(1, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=1 h=1 f=2 pos=(2, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(3, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(4, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(2, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=0 f=2 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(3, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(4, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=0 f=2 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(2, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=0 f=2 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(1, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(2, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(1, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=2 h=2 f=4 pos=(2, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=1 f=4 pos=(3, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
    "g=3 h=1 f=4 pos=(4, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)"
  ],
  "trips": [
    {
      "name": "Trip 1",
      "label": "unload Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
      "cost": 7
    },
    {
      "name": "Trip 2",
      "label": "unload Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
      "cost": 14
    },
    {
      "name": "Trip 3",
      "label": "unload Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
      "cost": 20
    },
    {
      "name": "Trip 4",
      "label": "unload Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
      "cost": 28
    }
  ]
};
