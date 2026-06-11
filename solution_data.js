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
  "defaultAlgorithm": "astar",
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
  "algorithms": [
    {
      "id": "astar",
      "name": "A*",
      "description": "Optimal search using f(n) = g(n) + h(n)",
      "cost": 28,
      "generatedTotal": 11353,
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
        "g=2 h=2 f=4 pos=(3, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=2 h=2 f=4 pos=(4, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=2 h=0 f=2 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=2 h=2 f=4 pos=(1, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=2 h=2 f=4 pos=(2, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=1 f=4 pos=(4, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=1 f=4 pos=(3, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=2 f=5 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 2) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=2 f=5 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 2, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=4 f=7 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 2, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=2 f=5 pos=(3, 2) cargo=(0, 0, 0, 0, 1, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=3 f=6 pos=(3, 2) cargo=(0, 0, 1, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=3 f=6 pos=(3, 2) cargo=(0, 1, 0, 0, 0, 0, 1, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=2 f=5 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 2, 2) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=4 f=7 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 2, 1, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=2 f=5 pos=(3, 2) cargo=(0, 0, 0, 3, 1, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=3 f=6 pos=(3, 2) cargo=(2, 1, 1, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=2 h=4 f=6 pos=(2, 5) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=2 h=4 f=6 pos=(1, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)"
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
    },
    {
      "id": "dfs",
      "name": "DFS",
      "description": "Depth-first search (stack order, not optimal)",
      "cost": 58,
      "generatedTotal": 235,
      "solutionPath": [
        "move-down",
        "move-right",
        "load Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
        "move-down",
        "move-left",
        "move-left",
        "move-up",
        "move-up",
        "move-right",
        "move-up",
        "unload Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
        "move-down",
        "move-down",
        "move-right",
        "load Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
        "move-down",
        "move-left",
        "move-left",
        "move-up",
        "move-up",
        "move-right",
        "move-up",
        "move-right",
        "move-right",
        "move-down",
        "unload Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
        "move-down",
        "move-left",
        "load Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
        "move-down",
        "move-left",
        "move-left",
        "move-up",
        "move-up",
        "move-right",
        "move-up",
        "move-right",
        "move-right",
        "move-up",
        "unload Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
        "move-down",
        "move-down",
        "move-down",
        "move-left",
        "load Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
        "move-down",
        "move-left",
        "move-left",
        "move-up",
        "move-up",
        "move-right",
        "move-up",
        "move-right",
        "move-right",
        "move-down",
        "move-right",
        "move-down",
        "unload Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2"
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
          "label": "move-down",
          "pos": [
            2,
            2
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
          "label": "move-right",
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
          "label": "move-down",
          "pos": [
            3,
            1
          ],
          "cost": 4,
          "h": 4,
          "f": 8,
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
            1
          ],
          "cost": 5,
          "h": 3,
          "f": 8,
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
            1,
            1
          ],
          "cost": 6,
          "h": 4,
          "f": 10,
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
            1,
            2
          ],
          "cost": 7,
          "h": 3,
          "f": 10,
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
            1,
            3
          ],
          "cost": 8,
          "h": 2,
          "f": 10,
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
          "label": "move-right",
          "pos": [
            2,
            3
          ],
          "cost": 9,
          "h": 1,
          "f": 10,
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
            2,
            4
          ],
          "cost": 10,
          "h": 0,
          "f": 10,
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
          "cost": 11,
          "h": 3,
          "f": 14,
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
            2,
            3
          ],
          "cost": 12,
          "h": 2,
          "f": 14,
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
            2,
            2
          ],
          "cost": 13,
          "h": 1,
          "f": 14,
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
            2
          ],
          "cost": 14,
          "h": 0,
          "f": 14,
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
          "label": "load Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
          "pos": [
            3,
            2
          ],
          "cost": 15,
          "h": 2,
          "f": 17,
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
            1
          ],
          "cost": 16,
          "h": 3,
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
          "label": "move-left",
          "pos": [
            2,
            1
          ],
          "cost": 17,
          "h": 4,
          "f": 21,
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
          "label": "move-left",
          "pos": [
            1,
            1
          ],
          "cost": 18,
          "h": 5,
          "f": 23,
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
          "label": "move-up",
          "pos": [
            1,
            2
          ],
          "cost": 19,
          "h": 4,
          "f": 23,
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
          "label": "move-up",
          "pos": [
            1,
            3
          ],
          "cost": 20,
          "h": 3,
          "f": 23,
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
            2,
            3
          ],
          "cost": 21,
          "h": 2,
          "f": 23,
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
          "label": "move-up",
          "pos": [
            2,
            4
          ],
          "cost": 22,
          "h": 3,
          "f": 25,
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
          "cost": 23,
          "h": 2,
          "f": 25,
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
            4
          ],
          "cost": 24,
          "h": 1,
          "f": 25,
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
            4,
            3
          ],
          "cost": 25,
          "h": 0,
          "f": 25,
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
          "label": "unload Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
          "pos": [
            4,
            3
          ],
          "cost": 26,
          "h": 2,
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
            0,
            0,
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            4,
            2
          ],
          "cost": 27,
          "h": 1,
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
            0,
            0,
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            3,
            2
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
            0,
            0,
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
            2,
            1,
            2,
            2
          ],
          "isGoal": false
        },
        {
          "label": "load Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
          "pos": [
            3,
            2
          ],
          "cost": 29,
          "h": 4,
          "f": 33,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            1
          ],
          "cost": 30,
          "h": 5,
          "f": 35,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            1
          ],
          "cost": 31,
          "h": 6,
          "f": 37,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            1,
            1
          ],
          "cost": 32,
          "h": 7,
          "f": 39,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            1,
            2
          ],
          "cost": 33,
          "h": 6,
          "f": 39,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            1,
            3
          ],
          "cost": 34,
          "h": 5,
          "f": 39,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            2,
            3
          ],
          "cost": 35,
          "h": 4,
          "f": 39,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            2,
            4
          ],
          "cost": 36,
          "h": 3,
          "f": 39,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
          "cost": 37,
          "h": 2,
          "f": 39,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            4
          ],
          "cost": 38,
          "h": 1,
          "f": 39,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
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
            4,
            5
          ],
          "cost": 39,
          "h": 0,
          "f": 39,
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
            0,
            0
          ],
          "remaining": [
            0,
            0,
            0,
            0,
            0,
            2,
            1,
            2,
            2
          ],
          "isGoal": false
        },
        {
          "label": "unload Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
          "pos": [
            4,
            5
          ],
          "cost": 40,
          "h": 4,
          "f": 44,
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
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-down",
          "pos": [
            4,
            4
          ],
          "cost": 41,
          "h": 3,
          "f": 44,
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
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-down",
          "pos": [
            4,
            3
          ],
          "cost": 42,
          "h": 2,
          "f": 44,
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
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-down",
          "pos": [
            4,
            2
          ],
          "cost": 43,
          "h": 1,
          "f": 44,
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
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-left",
          "pos": [
            3,
            2
          ],
          "cost": 44,
          "h": 0,
          "f": 44,
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
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "load Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
          "pos": [
            3,
            2
          ],
          "cost": 45,
          "h": 2,
          "f": 47,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-down",
          "pos": [
            3,
            1
          ],
          "cost": 46,
          "h": 3,
          "f": 49,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-left",
          "pos": [
            2,
            1
          ],
          "cost": 47,
          "h": 4,
          "f": 51,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-left",
          "pos": [
            1,
            1
          ],
          "cost": 48,
          "h": 5,
          "f": 53,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-up",
          "pos": [
            1,
            2
          ],
          "cost": 49,
          "h": 4,
          "f": 53,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-up",
          "pos": [
            1,
            3
          ],
          "cost": 50,
          "h": 5,
          "f": 55,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-right",
          "pos": [
            2,
            3
          ],
          "cost": 51,
          "h": 4,
          "f": 55,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-up",
          "pos": [
            2,
            4
          ],
          "cost": 52,
          "h": 5,
          "f": 57,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-right",
          "pos": [
            3,
            4
          ],
          "cost": 53,
          "h": 4,
          "f": 57,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-right",
          "pos": [
            4,
            4
          ],
          "cost": 54,
          "h": 3,
          "f": 57,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-down",
          "pos": [
            4,
            3
          ],
          "cost": 55,
          "h": 2,
          "f": 57,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-right",
          "pos": [
            5,
            3
          ],
          "cost": 56,
          "h": 1,
          "f": 57,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "move-down",
          "pos": [
            5,
            2
          ],
          "cost": 57,
          "h": 0,
          "f": 57,
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
            3,
            1,
            2,
            1,
            0,
            0
          ],
          "remaining": [
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
          "isGoal": false
        },
        {
          "label": "unload Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
          "pos": [
            5,
            2
          ],
          "cost": 58,
          "h": 0,
          "f": 58,
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
        "g=2 h=0 f=2 pos=(3, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=2 h=2 f=4 pos=(1, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=2 h=2 f=4 pos=(2, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=1 f=4 pos=(3, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=3 h=3 f=6 pos=(1, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=4 h=2 f=6 pos=(4, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=5 h=1 f=6 pos=(4, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=5 h=3 f=8 pos=(5, 1) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=6 h=2 f=8 pos=(5, 2) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=7 h=3 f=10 pos=(5, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=8 h=4 f=12 pos=(5, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=8 h=2 f=10 pos=(4, 3) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=9 h=3 f=12 pos=(4, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=10 h=4 f=14 pos=(4, 5) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=10 h=2 f=12 pos=(3, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=11 h=3 f=14 pos=(3, 5) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=12 h=4 f=16 pos=(2, 5) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=13 h=5 f=18 pos=(1, 5) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)",
        "g=14 h=4 f=18 pos=(1, 4) cargo=(0, 0, 0, 0, 0, 0, 0, 0, 0) remaining=(2, 1, 1, 3, 1, 2, 1, 2, 2)"
      ],
      "trips": [
        {
          "name": "Trip 1",
          "label": "unload Pavilion 1:Rose:redx2, Pavilion 1:Rose:pinkx1, Pavilion 1:Rose:whitex1",
          "cost": 11
        },
        {
          "name": "Trip 2",
          "label": "unload Pavilion 2:Tulip:redx3, Pavilion 2:Tulip:yellowx1",
          "cost": 26
        },
        {
          "name": "Trip 3",
          "label": "unload Pavilion 3:Orchid:purplex2, Pavilion 3:Orchid:pinkx1",
          "cost": 40
        },
        {
          "name": "Trip 4",
          "label": "unload Pavilion 4:Goliat Rose:goldx2, Pavilion 4:Goliat Rose:light pinkx2",
          "cost": 58
        }
      ]
    }
  ]
};
