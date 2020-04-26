
import React, { Component } from "react";

const chatList = [

  {
      "id": "C4U81UV4G",
      "name": "hello-mentors-pilot1",
      "created": 1491409425,
      "creator": "U4V22C6A1",
      "is_archived": false,
      "is_general": true,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U5JN4HP1S",
          "U5QUP4PT2",
          "UTTNC1BJM"
      ],
      "pins": [
          {
              "id": "F5WS7EQ84",
              "type": "F",
              "created": 1497991403,
              "user": "U4V22C6A1",
              "owner": "U4V22C6A1"
          },
          {
              "id": "F5XG5JGDV",
              "type": "F",
              "created": 1497980050,
              "user": "U4V22C6A1",
              "owner": "U4V22C6A1"
          },
          {
              "id": "F5ZPK5UKF",
              "type": "F",
              "created": 1498500283,
              "user": "U4V22C6A1",
              "owner": "U4V22C6A1"
          }
      ],
      "topic": {
          "value": "On-demand support from Prospela and your fellow E-Mentors!",
          "creator": "U4V22C6A1",
          "last_set": 1497976458
      },
      "purpose": {
          "value": "*On-demand support from Prospela and your fellow E-Mentors*. Are you struggling to engage your student? Or aren't able to answer a particular question? Perhaps you just fancy networking with other E-Mentors ... Reach out here!",
          "creator": "U4V22C6A1",
          "last_set": 1497976898
      }
  },
  {
      "id": "C4V22CBD3",
      "name": "random",
      "created": 1491409425,
      "creator": "U4V22C6A1",
      "is_archived": true,
      "is_general": false,
      "members": [],
      "topic": {
          "value": "Non-work banter and water cooler conversation",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "A place for non-work-related flimflam, faffing, hodge-podge or jibber-jabber you'd prefer to keep out of more focused work-related channels.",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C6C1NH2KW",
      "name": "z-smooz-support",
      "created": 1500649399,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EDUP9DW",
      "name": "michael-and-sahil",
      "created": 1507463000,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EDUPC6L",
      "name": "andy-and-roshaan",
      "created": 1507463002,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EDUPFG8",
      "name": "andy-and-abdul",
      "created": 1507463004,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EDUPZ1N",
      "name": "dexter-and-dhruvin",
      "created": 1507463019,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EDUQ3CG",
      "name": "emma-and-shirley",
      "created": 1507463022,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EDUQ69E",
      "name": "sonal-and-ayah",
      "created": 1507463024,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EDUQFAL",
      "name": "sarah-and-anam",
      "created": 1507463032,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EDUQNRE",
      "name": "rob-and-justice",
      "created": 1507463039,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EE5F4MN",
      "name": "z-shared-8",
      "created": 1507469070,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EE5FPC0",
      "name": "harry-and-sonam",
      "created": 1507469081,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EHRRS49",
      "name": "melissa-and-elinor",
      "created": 1507462987,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EHRSC81",
      "name": "andy-and-karamjit",
      "created": 1507462994,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EHRT7AM",
      "name": "janina-and-shania",
      "created": 1507463016,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EJ2H7GR",
      "name": "coleen-and-dharita",
      "created": 1507469053,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7EJ2HY3T",
      "name": "alexandra-and-abigail",
      "created": 1507469065,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7ELS9AMD",
      "name": "z-prospela-autumn-1",
      "created": 1507156169,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F1BKGP5",
      "name": "dexter-and-layton",
      "created": 1507462976,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F1BLWTD",
      "name": "christian-kurwinder",
      "created": 1507463006,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F1BLZFD",
      "name": "sonal-and-simranjit",
      "created": 1507463008,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F3JSUHG",
      "name": "group_channel",
      "created": 1507463011,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F3VJT1Q",
      "name": "z-shared-9",
      "created": 1507469073,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F3VK09G",
      "name": "christian-and-navjot",
      "created": 1507469077,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F56B00L",
      "name": "georgina-and-hannah",
      "created": 1507462966,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F56BVNG",
      "name": "hannah-and-anisa",
      "created": 1507462990,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F56DL1J",
      "name": "helen-and-zulakha",
      "created": 1507463029,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F5H2N8L",
      "name": "alex-and-shahana",
      "created": 1507469058,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F7NG9MK",
      "name": "helen-and-sophie",
      "created": 1507462972,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F7NGCSZ",
      "name": "sarah-and-zuzanna",
      "created": 1507462974,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F7NGS13",
      "name": "lucy-and-helin",
      "created": 1507462985,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F7NH7TP",
      "name": "christian-and-iram",
      "created": 1507462992,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F7NHK8D",
      "name": "melissa-and-sahil",
      "created": 1507462998,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7F7Z9WDT",
      "name": "z-shared-7",
      "created": 1507469067,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7FTJ796U",
      "name": "lucy-and-halima",
      "created": 1507717261,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7G06H86S",
      "name": "andy-and-razzaque",
      "created": 1507462970,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7G06JHRC",
      "name": "jason-and-manmeet",
      "created": 1507462996,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7G21K5MX",
      "name": "emma-and-rehana",
      "created": 1507717257,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7G21RZU1",
      "name": "emma-and-shubham",
      "created": 1507717283,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7G63L2LX",
      "name": "hannah-and-dipteya",
      "created": 1507463013,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7G63LVLP",
      "name": "caitlin-and-roshaan",
      "created": 1507463037,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7G6EB6BH",
      "name": "georgina-and-asifa",
      "created": 1507469061,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7GF1622F",
      "name": "michael-and-arber",
      "created": 1507717249,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7GH8HBGS",
      "name": "sophie-and-sanaa",
      "created": 1507717266,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7GJVFGRJ",
      "name": "graham-and-ryan",
      "created": 1507717237,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7GJVJL20",
      "name": "coleen-and-sahil",
      "created": 1507717259,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7GJVRKC4",
      "name": "philip-and-brinoy",
      "created": 1507717286,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7GMC3SMB",
      "name": "alexandra-and-natasha",
      "created": 1507717250,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7GMC6Z2R",
      "name": "jason-and-karan",
      "created": 1507717269,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7HDW0V3Q",
      "name": "chris-and-gurjit",
      "created": 1507717264,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7HDW37JA",
      "name": "dexter-and-aspen",
      "created": 1507717271,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7HKT65EK",
      "name": "dexter-and-seyed",
      "created": 1507717253,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C7HKTEAQ7",
      "name": "harry-and-ben",
      "created": 1507717288,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C9S8YFHUM",
      "name": "hello-mentors-pilot2",
      "created": 1521465012,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE"
      ],
      "pins": [
          {
              "id": "1507220666.000107",
              "type": "C",
              "created": 1521465019,
              "user": "USLACKBOT",
              "owner": "USLACKBOT"
          }
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CBKJEGKUY",
      "name": "caroline-elizabeth",
      "created": 1530900389,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CBL2M63NG",
      "name": "lucy-and-guian",
      "created": 1530900852,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CBMBZ6M63",
      "name": "juba-and-nana",
      "created": 1530902476,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CBSJ321CP",
      "name": "davi-and-laura",
      "created": 1531777704,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CBUJ1UK8Q",
      "name": "jarl-and-millie",
      "created": 1532359320,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCW9QU9S4",
      "name": "ollie-and-zanab",
      "created": 1537387202,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCWDY44JV",
      "name": "sandra-and-manmeet",
      "created": 1537387232,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCWRDHGTW",
      "name": "dexter-and-justice",
      "created": 1537387194,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCWRFDADS",
      "name": "zubair-and-iram",
      "created": 1537387323,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCWU02TUK",
      "name": "camilla-and-mohammed",
      "created": 1537387218,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCWU0E08K",
      "name": "camilla-and-halima",
      "created": 1537387241,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCWU17UH1",
      "name": "emma-and-fatima",
      "created": 1537387296,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCX1RNH1Q",
      "name": "stefi-and-manvir",
      "created": 1537387190,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCX1SP0E6",
      "name": "james-and-aspen",
      "created": 1537387258,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCY31219V",
      "name": "stefi-and-maida",
      "created": 1537386809,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCY3703FH",
      "name": "isabel-and-kavita",
      "created": 1537387249,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCYC4JBCN",
      "name": "andy-and-manmeet",
      "created": 1537387210,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCYC4QYDC",
      "name": "ollie-and-khadijah",
      "created": 1537387223,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CCYC5L138",
      "name": "dexter-and-merlin",
      "created": 1537387280,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CD5FD7509",
      "name": "david-and-zulakha",
      "created": 1538555545,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CD65V2QLC",
      "name": "alex-and-janies",
      "created": 1538577222,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CD691M3RB",
      "name": "ollie-and-amil",
      "created": 1538555564,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CD7CNUJTH",
      "name": "alex-and-svenja",
      "created": 1538577216,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CD7E8PD7G",
      "name": "david-and-manvir",
      "created": 1538555550,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CD7E8R05C",
      "name": "ollie-and-alya",
      "created": 1538555554,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CD7N3GVS5",
      "name": "isabel-and-brinoy",
      "created": 1538762098,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDG6R5EFP",
      "name": "ben-and-maida",
      "created": 1539765573,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDHC6L9B8",
      "name": "christele-and-iram",
      "created": 1539766318,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDR9RLH6G",
      "name": "nana-and-raed",
      "created": 1540895301,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDSGB4231",
      "name": "alex-and-raed",
      "created": 1540895306,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDVE2TA6M",
      "name": "kajsa-and-florence",
      "created": 1541435702,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDVTJ60JG",
      "name": "henning-and-william",
      "created": 1541436955,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDW201U3U",
      "name": "dani-and-adam",
      "created": 1541434855,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDW2S1NFL",
      "name": "emma-and-katie",
      "created": 1541436253,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDW94LWVB",
      "name": "ruairidh_om-kalthoom",
      "created": 1541437147,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDX43S13R",
      "name": "chris-and-josh",
      "created": 1541435946,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDX5BTMC1",
      "name": "steven-and-nicola",
      "created": 1541591576,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDX64PN49",
      "name": "dani-and-florence",
      "created": 1541594302,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDX6KSW4R",
      "name": "kajsa-and-yaw",
      "created": 1541595727,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDXP0Q1JN",
      "name": "james-and-teddy",
      "created": 1541591165,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDXU2U9T7",
      "name": "neal-and-giacomo",
      "created": 1541588409,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDXUL6XRB",
      "name": "dani-and-joshua",
      "created": 1541590106,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDYBYTJK1",
      "name": "steven-and-tony",
      "created": 1541540990,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDYQKLQR5",
      "name": "caroline-and-teddy",
      "created": 1541591347,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CDZ2MAB39",
      "name": "lucy-and-romone",
      "created": 1541608871,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE36NJWPJ",
      "name": "laraib-and-greta",
      "created": 1542231237,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE38MFUQY",
      "name": "jarl-and-micaela",
      "created": 1542236020,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE3U9JNDN",
      "name": "michael-and-silvija",
      "created": 1542298891,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE416471Q",
      "name": "emelia-and-klaudia",
      "created": 1542236776,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE42RSGQZ",
      "name": "magin-and-alexander",
      "created": 1542298856,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE42T81T3",
      "name": "jamie-and-nana",
      "created": 1542298931,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE46YL26R",
      "name": "ellie-and-poppy",
      "created": 1542236484,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE475531T",
      "name": "davi-and-emanuele",
      "created": 1542237031,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE4D45H0A",
      "name": "binal-and-perry",
      "created": 1542282345,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE4GCH8Q2",
      "name": "emma-and-carmen",
      "created": 1542291267,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE4HJP6E7",
      "name": "magin-and-olivia",
      "created": 1542298914,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE4SF994M",
      "name": "claire-and-mo",
      "created": 1542298924,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE5N1NU5V",
      "name": "emma-and-leanne",
      "created": 1542298863,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE5N26P63",
      "name": "marios-and-peter",
      "created": 1542298884,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE5N2HFRD",
      "name": "chris-and-michael",
      "created": 1542298901,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE5N2MBKR",
      "name": "kelly-and-nathan",
      "created": 1542298910,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE5S6QX54",
      "name": "binal-and-kalina",
      "created": 1542286363,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CE5SZCT8W",
      "name": "neill-and-sophie",
      "created": 1542288540,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CEJK914N4",
      "name": "patricia-and-eva",
      "created": 1543953651,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CEJK9AAKA",
      "name": "kim-and-ryan",
      "created": 1543953671,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CEK03BAQZ",
      "name": "sachin-and-richard",
      "created": 1543968937,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CELD29L2K",
      "name": "magin-and-kiefer",
      "created": 1543953657,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CELPCH0AJ",
      "name": "marine-and-eugenio",
      "created": 1543953665,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CEN634BUJ",
      "name": "colin-and-nicol",
      "created": 1544189259,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CEP16S75G",
      "name": "dominic-and-janet",
      "created": 1544296072,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CEPUV4PL6",
      "name": "alan-and-tom",
      "created": 1544211382,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CEQJGGSM6",
      "name": "sachin-and-rebeka",
      "created": 1544561218,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CERVD90A3",
      "name": "alan-and-moein",
      "created": 1544538768,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CF56R09HT",
      "name": "arran-and-halima",
      "created": 1546447782,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CFZRJQK8C",
      "name": "roo-and-theo",
      "created": 1549479744,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CFZRJUY3E",
      "name": "drew-and-tamanna",
      "created": 1549479751,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG05D2L13",
      "name": "stefi-and-portia",
      "created": 1549477208,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG0MW5RKM",
      "name": "stefi-and-megan",
      "created": 1549549428,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG0UUMLDS",
      "name": "emma-and-amina",
      "created": 1549563458,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG144A06N",
      "name": "emma-and-rose",
      "created": 1549563448,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG1D8QUMU",
      "name": "drew-and-franklin",
      "created": 1549479758,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG1SKSP5G",
      "name": "arran-and-nana",
      "created": 1549631946,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG2618URM",
      "name": "camilla-and-bolu",
      "created": 1549563465,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG2UGFGLX",
      "name": "paul-and-rebecca",
      "created": 1549631938,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG39KQK2S",
      "name": "roo-and-milena",
      "created": 1549631942,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "U4VR52RQE",
          "last_set": 1549987119
      },
      "purpose": {
          "value": "",
          "creator": "U4VR52RQE",
          "last_set": 1549987119
      }
  },
  {
      "id": "CG9B8R9UG",
      "name": "henning-and-ibrahim",
      "created": 1550516721,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG9CC7CM6",
      "name": "neal-and-azad",
      "created": 1550520077,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CG9CC9CSC",
      "name": "arran-and-khadijah",
      "created": 1550520082,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGA1B6S4T",
      "name": "neal-and-ida",
      "created": 1550520095,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGA3LR8LU",
      "name": "fraser-and-paris",
      "created": 1550520104,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGA3VTDV0",
      "name": "paul-and-alexander",
      "created": 1550516727,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGBGK5414",
      "name": "laraib-and-iris",
      "created": 1550516762,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGD8FRB7E",
      "name": "addison-and-christian",
      "created": 1550770436,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGTUH437B",
      "name": "marnie-and-alina",
      "created": 1552296853,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGUCKFXH9",
      "name": "davi-and-tony",
      "created": 1552296790,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGUCKKB7D",
      "name": "karolina-and-bleddyn",
      "created": 1552296798,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGUEXMHLL",
      "name": "roo-and-iyi",
      "created": 1552296805,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGUEY0XHS",
      "name": "maike-and-graeme",
      "created": 1552296827,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGUEY4BLL",
      "name": "chris-and-tiago",
      "created": 1552296838,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGUG1NAHY",
      "name": "dave-and-thomas",
      "created": 1552296801,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGUG21YF4",
      "name": "daniel-and-iyi",
      "created": 1552296822,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGURSADUM",
      "name": "chris-and-ettore",
      "created": 1552296831,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGX44H02U",
      "name": "nico-and-anne",
      "created": 1552601218,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGY37J03E",
      "name": "alex-and-alina",
      "created": 1552512996,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGY59MG82",
      "name": "jen-and-blessing",
      "created": 1552515216,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGYH60VMZ",
      "name": "marnie-and-thomas",
      "created": 1552562604,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGYMU5SAX",
      "name": "catarina-and-tosin",
      "created": 1552571725,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGYTJLPRB",
      "name": "paul-and-blessing",
      "created": 1552556223,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGZ4ZA85N",
      "name": "daffer-and-seun",
      "created": 1552854972,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGZLJLYS3",
      "name": "jen-and-ali",
      "created": 1552557608,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CGZPTUQA3",
      "name": "katie-and-laura",
      "created": 1552565316,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CH1DPPDDL",
      "name": "chris-and-angel",
      "created": 1552648149,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CH1DY5BDL",
      "name": "nico-and-dean",
      "created": 1552648807,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CH1G40VE0",
      "name": "daffer-and-raed",
      "created": 1552855925,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CH394AVT5",
      "name": "sachin-and-seun",
      "created": 1553000238,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CH949P1NU",
      "name": "saint-and-joshua",
      "created": 1553679493,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHBFN882G",
      "name": "saint-and-adam",
      "created": 1553679507,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHC664GSD",
      "name": "emmak-and-katie",
      "created": 1554306205,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHE9WTGDD",
      "name": "cat-and-jay",
      "created": 1553770311,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHEQ0C4BA",
      "name": "magin-and-joshua",
      "created": 1554113828,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHF7LMULE",
      "name": "daniel-and-salam",
      "created": 1553791669,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHN113W07",
      "name": "elise-and-mausum",
      "created": 1554306696,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHPACKTB7",
      "name": "paul-and-katie",
      "created": 1554402587,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHTTQH3LL",
      "name": "chris-and-adam",
      "created": 1555068367,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CHUFC5000",
      "name": "ollie-and-nasra",
      "created": 1555066964,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKNMS8HR8",
      "name": "sidd-and-lehi",
      "created": 1561796808,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKP87FDRQ",
      "name": "alex-and-chris",
      "created": 1561924389,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKQS2P1T4",
      "name": "sidd-and-zoe",
      "created": 1562057747,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKUA50GC9",
      "name": "neal-and-tania",
      "created": 1561924850,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKUU417GR",
      "name": "chloe-and-muniza",
      "created": 1561987384,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKV2HMLR1",
      "name": "bimpe-and-amber",
      "created": 1562411731,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKW00JJR1",
      "name": "nina-and-magdalena",
      "created": 1562582496,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKW24RB6W",
      "name": "michael-and-amber",
      "created": 1562588906,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKWF50E2D",
      "name": "david-and-isis",
      "created": 1562086496,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKXP4Q4CB",
      "name": "jerry-and-soph",
      "created": 1562693258,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CKZV0V8JX",
      "name": "craig-and-angel",
      "created": 1562842251,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CL0NYAN84",
      "name": "chloe-and-sahra",
      "created": 1561984471,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CL219R6AY",
      "name": "chrisc-and-josh",
      "created": 1562071427,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CL2G9UGAK",
      "name": "craig-and-oliver",
      "created": 1561926493,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CL50TDNGH",
      "name": "justin-and-ollie",
      "created": 1562841535,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CL51THYD7",
      "name": "ana-and-joseph",
      "created": 1562843987,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CL8JR5D62",
      "name": "jake-and-kevin",
      "created": 1562413788,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CL8MQRTH6",
      "name": "david-and-louis",
      "created": 1562672454,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CL9FWCYJJ",
      "name": "ana-and-jude",
      "created": 1562582142,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLBBYTEUV",
      "name": "steph-and-lucy",
      "created": 1562842912,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLCF534TW",
      "name": "matthew-and-ben",
      "created": 1562942536,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLJRZQQAX",
      "name": "angel-and-robert",
      "created": 1564489506,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLL4VF951",
      "name": "micaela-and-lisa",
      "created": 1564570558,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLVATQP9P",
      "name": "jerry-and-vincent",
      "created": 1564939174,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLWBE4V4G",
      "name": "chris-and-tori",
      "created": 1564495128,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLWRN4SE9",
      "name": "sally-and-joe",
      "created": 1564515068,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLXHAALFP",
      "name": "simon-and-dominic",
      "created": 1564571359,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLZJ73C2H",
      "name": "felicia-and-shane",
      "created": 1564688056,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CLZLZ4UPQ",
      "name": "alex-and-sreeharsh",
      "created": 1564570734,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CM0M85935",
      "name": "johnny-and-caryn",
      "created": 1565784968,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CM1LQFLRW",
      "name": "jake-and-maria",
      "created": 1564939211,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CM5NPDVEV",
      "name": "christopher-and-tatjana",
      "created": 1565783789,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CM5QCSR7T",
      "name": "samantha-and-nicholas",
      "created": 1565787288,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CM767LFFB",
      "name": "matt-and-brenda",
      "created": 1565879606,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CM8DYLXRP",
      "name": "owen-and-kyo",
      "created": 1565965842,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CM8EBGHRD",
      "name": "joe-and-daniel",
      "created": 1565280717,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMC3JMU2Z",
      "name": "federico-and-will",
      "created": 1565781348,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMCTVBR7V",
      "name": "thomas-and-cas",
      "created": 1566831950,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMDBR7V0R",
      "name": "emma-and-jorden",
      "created": 1566404545,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMDJ464AH",
      "name": "louise-and-samantha",
      "created": 1565880591,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMDU6PEVD",
      "name": "gabriel-and-harol",
      "created": 1565780131,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CME2QPDGQ",
      "name": "shailendra-and-callum",
      "created": 1565903338,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMEBD17RU",
      "name": "johnny-and-chloe",
      "created": 1565787280,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMEJN0SFK",
      "name": "piyush-rodrigo",
      "created": 1566485027,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMQ7YTZ16",
      "name": "lauren-and-marie",
      "created": 1566826641,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMQB63NAZ",
      "name": "erin-and-kat",
      "created": 1566831272,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMRNYBPB2",
      "name": "katie-and-paulina",
      "created": 1566920017,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMSDW6C8N",
      "name": "sally-and-marie",
      "created": 1566827455,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMT9C4YLD",
      "name": "lucy-and-jane",
      "created": 1567010343,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMV1EKLJK",
      "name": "thomas-and-tariq",
      "created": 1567005281,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMVSX2NSX",
      "name": "liam-and-megan",
      "created": 1568136542,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMXQB1AA2",
      "name": "stewart-and-ali",
      "created": 1567158602,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMYSB53NC",
      "name": "daniel-and-ash",
      "created": 1567514102,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CMYSPJDGQ",
      "name": "keith-and-tariq",
      "created": 1567514778,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CN0SQJJ3Z",
      "name": "keith-and-charlie",
      "created": 1567520484,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CN0TSUN2V",
      "name": "simon-and-bernice",
      "created": 1568135336,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CN1PE45L5",
      "name": "chris-and-victoria",
      "created": 1567685607,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CN263HSLQ",
      "name": "stewart-and-julien",
      "created": 1567701623,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CN5Q9GAQ0",
      "name": "daniel-and-michael",
      "created": 1568046947,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CN9CUTXU3",
      "name": "chris-and-jemma",
      "created": 1569137288,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CN9CW1Z6F",
      "name": "daniel-and-edita",
      "created": 1569137532,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNAMCKZBR",
      "name": "liam-and-michael",
      "created": 1568222646,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNLGF9X9A",
      "name": "alex-and-harry",
      "created": 1569157121,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNLHXLJLB",
      "name": "toby-and-marie",
      "created": 1569957484,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNM0VT7S9",
      "name": "alex-and-arianna",
      "created": 1569157381,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNW4XC1FW",
      "name": "pedram-and-neesha",
      "created": 1569874078,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNW5N7Z4L",
      "name": "toby-and-aishwariyaa",
      "created": 1569875253,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNX3Y68KD",
      "name": "amy-and-lucy",
      "created": 1570707234,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNX4CQG3D",
      "name": "ben-and-joshua",
      "created": 1570708152,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNX4DGW3D",
      "name": "joe-and-lucy",
      "created": 1570708197,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNY2BM56Z",
      "name": "daniel-and-mikaella",
      "created": 1569956791,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNYSB28BY",
      "name": "samia-and-chelsea",
      "created": 1569876765,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CNZGV0472",
      "name": "ben-and-matt",
      "created": 1570042656,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CP0K3BN10",
      "name": "lisa-mae-and-rasheed",
      "created": 1571120161,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CP1T89DCK",
      "name": "colin-and-xandy",
      "created": 1571118064,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CP7A8CPB4",
      "name": "davi-and-mijail",
      "created": 1571589233,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CP84K5YHF",
      "name": "marcelo-and-nya",
      "created": 1571172879,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPB6LENHJ",
      "name": "tessa-and-atif",
      "created": 1570967851,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPB6QLB44",
      "name": "tessa-and-andrew",
      "created": 1570968514,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPB7JNREY",
      "name": "sally-and-joseph",
      "created": 1570973826,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPDHPG5HV",
      "name": "samia-and-caitlin",
      "created": 1570978760,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPEHX2GSH",
      "name": "marcelo-and-adeshewa",
      "created": 1571173517,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPFJK6RT8",
      "name": "lisa-mae-and-rebecca",
      "created": 1571119640,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPGNDP7PY",
      "name": "steve-and-marina",
      "created": 1571171268,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPLU52E73",
      "name": "niki-and-nathanael",
      "created": 1572190338,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPMUUTS79",
      "name": "mai-and-oliver",
      "created": 1571588077,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPMUZQLDD",
      "name": "darci-and-lucy",
      "created": 1571588961,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPUFBDPPW",
      "name": "elaine-and-miki",
      "created": 1572211394,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPW8EMFMK",
      "name": "hugo-and-alex",
      "created": 1572292125,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPXSPLR5W",
      "name": "simon-and-simone",
      "created": 1572379282,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CPYKT1WRF",
      "name": "benjamin-and-gregorio",
      "created": 1572979078,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQ6A94VBL",
      "name": "sophie-and-tom",
      "created": 1573759629,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQ6DS1HGA",
      "name": "shailendra-and-pheya",
      "created": 1573764149,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQ6KJL25N",
      "name": "maike-and-tom",
      "created": 1572981820,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQ9JA3R3L",
      "name": "randy-and-jonathan",
      "created": 1574069172,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQB89B4RZ",
      "name": "dexter-and-ishmeet",
      "created": 1574086763,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQFN2GJP4",
      "name": "daniel-and-asher",
      "created": 1574368012,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQGL0DH98",
      "name": "marc-and-jaidev",
      "created": 1574427463,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQH2JA7KM",
      "name": "benjamin-and-aoife",
      "created": 1574368823,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQH2VRKQB",
      "name": "steve-and-thais",
      "created": 1574369299,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQH3FEKSP",
      "name": "michael-and-mulan",
      "created": 1574370050,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQJNZ5TJ8",
      "name": "saint-and-ivan",
      "created": 1573763680,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQK87BHSR",
      "name": "niki-and-claudia",
      "created": 1573764786,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQN61Q44B",
      "name": "shailendra-and-sophie",
      "created": 1574773333,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQNMS1RJL",
      "name": "sam-and-gurpreet",
      "created": 1574086254,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQQ7NFU0P",
      "name": "juba-and-jorge",
      "created": 1574068930,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQQJ0TYK1",
      "name": "emma-and-ravena",
      "created": 1574086975,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQQU3RRC6",
      "name": "samantha-and-jinafa",
      "created": 1574086512,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQRMX1BLH",
      "name": "brent-and-bhishan",
      "created": 1574773357,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQRMX8KLZ",
      "name": "lucy-and-mauriton",
      "created": 1574773367,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQU1U8PE0",
      "name": "christopher-and-dhru",
      "created": 1574367462,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQU3XV53N",
      "name": "dexter-and-jakub",
      "created": 1574370285,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQUFZDWSU",
      "name": "jamie-and-charlotte",
      "created": 1574368379,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQUPXP4EM",
      "name": "tom-and-greg",
      "created": 1574941104,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQWAPGDK9",
      "name": "connor-and-nathalie",
      "created": 1574366836,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQWCGN4LF",
      "name": "jon-and-lasma",
      "created": 1574369292,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQWL33BL6",
      "name": "drew-and-bradley",
      "created": 1574365810,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQY1255B7",
      "name": "luis-nicolas-and-elizabeth",
      "created": 1574688196,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CQZRZ34J3",
      "name": "daniel-and-titi-marian",
      "created": 1574688106,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CR30CRGE5",
      "name": "dave-and-hannan",
      "created": 1575539463,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CR3J7QK2T",
      "name": "addison-and-klaudia",
      "created": 1574875654,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CR45R3N1H",
      "name": "addison-and-lukman",
      "created": 1575907436,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CR4URRSLS",
      "name": "claire-and-joao",
      "created": 1576005866,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CR69Z69UM",
      "name": "christopher-and-simona",
      "created": 1575303981,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CR89FD9U5",
      "name": "lucy-and-eirimas",
      "created": 1575399515,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRA5NM90X",
      "name": "brent-and-ainhoa",
      "created": 1575400220,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRAEF44HF",
      "name": "nico-and-josh",
      "created": 1576148790,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRB3Z71V5",
      "name": "neill-and-qudrat",
      "created": 1575455798,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRB43CHGX",
      "name": "felicia-and-elijah",
      "created": 1575456017,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRBSWV6TF",
      "name": "david-and-sam",
      "created": 1575577036,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRCPV1D2B",
      "name": "steve-and-matilde",
      "created": 1575539526,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRDV1MKGA",
      "name": "lauren-and-louise",
      "created": 1576582009,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRF7RLRBM",
      "name": "jonathon-and-benedict",
      "created": 1576579936,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRF866AAX",
      "name": "katie-and-ab",
      "created": 1576580648,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRFAVCD6D",
      "name": "ste-and-liza",
      "created": 1576520079,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRGFN0G8Z",
      "name": "joe-and-malika",
      "created": 1576583268,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRH0S9WKT",
      "name": "alex-and-matt",
      "created": 1576602337,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRH88VBKN",
      "name": "simon-and-adam",
      "created": 1576005176,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRKBUCZJB",
      "name": "sophie-and-timothy",
      "created": 1575999442,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRKN57KHC",
      "name": "craig-and-laura",
      "created": 1575999495,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRR55J14L",
      "name": "elaine-and-stefano",
      "created": 1576520089,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRRJ9F9MK",
      "name": "louise-and-jess",
      "created": 1576519369,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRS8U2VQU",
      "name": "nina-and-charlie",
      "created": 1576581222,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRSNS7JAH",
      "name": "erin-and-luke",
      "created": 1576581659,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRSP5FKHB",
      "name": "juba-and-alex",
      "created": 1576582413,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRUDVSEH3",
      "name": "lucy-and-bianca",
      "created": 1576667742,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRUHTDN3Z",
      "name": "connor-and-jack",
      "created": 1576580628,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRV3F17AT",
      "name": "emma-and-manjit",
      "created": 1576601474,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRVKQ6FT6",
      "name": "emma-and-andrew",
      "created": 1576752160,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CRYEX52SF",
      "name": "katie-and-jake",
      "created": 1578258335,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CS3ELMR9T",
      "name": "tessa-and-josh",
      "created": 1577460880,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CS4LYD35X",
      "name": "connor-and-zahra",
      "created": 1578531667,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CS5LKUEHL",
      "name": "enrico-and-mahira",
      "created": 1577461354,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CS7JQ90JX",
      "name": "james-and-harry",
      "created": 1578851236,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CS9UPFQFJ",
      "name": "kelly-and-karolis",
      "created": 1578258369,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CS9UZNZQD",
      "name": "alex-and-sam",
      "created": 1578258372,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSAD4AQLC",
      "name": "jamie-and-max",
      "created": 1578328427,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSC5279UL",
      "name": "eban-and-luke",
      "created": 1578418564,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSCC3UVHR",
      "name": "michael-and-darcy",
      "created": 1579110376,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSLUATNR5",
      "name": "enrico-and-shana",
      "created": 1578851240,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSM98FNNA",
      "name": "katie-and-mariam",
      "created": 1578851859,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSPPPKC0M",
      "name": "marine-and-fabian",
      "created": 1579107630,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSRK5CTMM",
      "name": "simon-and-nathanael",
      "created": 1579107557,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSTG00R6Z",
      "name": "juba-and-ellie",
      "created": 1579286647,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSV1B7A8J",
      "name": "daniel-and-gil",
      "created": 1580236209,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSVBLSKF1",
      "name": "lisa-mae-and-natalie",
      "created": 1579286718,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSW7HE99T",
      "name": "adam-and-greg",
      "created": 1579552580,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSWANJNSF",
      "name": "ashley-and-laith",
      "created": 1580236111,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSXKGSFCZ",
      "name": "marcelo-and-holly",
      "created": 1580236265,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CSYV5V15J",
      "name": "binal-and-sam",
      "created": 1579713483,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT3GE761Y",
      "name": "arielle-and-ben",
      "created": 1580749281,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT69GEJ8Y",
      "name": "jonathon-and-dan",
      "created": 1580161640,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT69GEJFJ",
      "name": "steve-and-owen",
      "created": 1580161640,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT6A32F3P",
      "name": "angel-and-jeong",
      "created": 1580161635,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT7PECG00",
      "name": "daniel-and-beth",
      "created": 1580235014,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT7PZBG05",
      "name": "johnny-and-viktor",
      "created": 1580234961,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT7S3PLMB",
      "name": "mariano-and-samantha",
      "created": 1580237302,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT9L9ASQP",
      "name": "jarl-and-osmaner",
      "created": 1580236018,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CT9P039R8",
      "name": "jay-and-yilin",
      "created": 1581015974,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTAGQNAU9",
      "name": "rob-and-jon",
      "created": 1580934693,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTBLRJVB2",
      "name": "connor-and-thomas",
      "created": 1580409946,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTCC8C5Q9",
      "name": "steve-and-becky",
      "created": 1581015876,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTDSWG1K8",
      "name": "laraib-and-callum",
      "created": 1580409868,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTJQJGRTK",
      "name": "mariano-and-tori",
      "created": 1581435200,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTP45P5LZ",
      "name": "fraser-and-montana",
      "created": 1581615935,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTP48V2LR",
      "name": "toby-and-hsingfang",
      "created": 1581616038,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTQCN0F2B",
      "name": "alex-and-sherwyn",
      "created": 1581015884,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTUCVT5KM",
      "name": "angel-and-andrew",
      "created": 1582053786,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTUDFED1R",
      "name": "neal-and-assim",
      "created": 1582054405,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTUDTED28",
      "name": "daniel-and-katherine",
      "created": 1581433751,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTVQB5U3T",
      "name": "georgina-and-zahra",
      "created": 1582055369,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTWP3R0Q7",
      "name": "natasha-and-mia",
      "created": 1581433749,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTX41RYCE",
      "name": "nico-and-edjoy",
      "created": 1581433868,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTX4JRNCW",
      "name": "benjamin-and-gil",
      "created": 1581434351,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CTZ8TR2N9",
      "name": "arielle-and-cliodhna",
      "created": 1581615971,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CU1G5Q99N",
      "name": "jarl-and-rebecca",
      "created": 1581715545,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CU1GW2VEZ",
      "name": "kat-and-charis",
      "created": 1581715720,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CU362C70T",
      "name": "samanatha-and-lucia",
      "created": 1582572065,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CU3C6DSB1",
      "name": "lucy-and-melanie",
      "created": 1581715654,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CU4H4KJTT",
      "name": "jay-and-adam",
      "created": 1582572852,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CU7PL9U8P",
      "name": "binal-and-samantha",
      "created": 1582054872,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CU7R944FP",
      "name": "stewart-and-nadia",
      "created": 1582138836,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUA1EJE06",
      "name": "alexander-and-patrick",
      "created": 1582138829,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUB0A8CP5",
      "name": "sachin-and-aidan",
      "created": 1582909830,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUBKZBR5H",
      "name": "natasha-and-jenna",
      "created": 1582936479,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUC9DR57T",
      "name": "benjamin-and-jasmeet",
      "created": 1582908332,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUD1F27PB",
      "name": "kat-and-lucy",
      "created": 1582937025,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUEMN5JS1",
      "name": "enrico-and-sam",
      "created": 1582573481,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUEN6QR61",
      "name": "emma-and-louise",
      "created": 1582574108,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUFH3NE82",
      "name": "saint-and-nili",
      "created": 1583272358,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUHNAT4F4",
      "name": "david-and-jaidev",
      "created": 1583360313,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUHPGHB0A",
      "name": "nur-and-rebecca",
      "created": 1583361747,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUJ82CYSD",
      "name": "caroline-and-jack",
      "created": 1583272462,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUK2PB6FM",
      "name": "oliver-and-jafar",
      "created": 1583360706,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CULDBDHSM",
      "name": "josh-and-cas",
      "created": 1583360397,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUMU57HA8",
      "name": "sidd-and-luke",
      "created": 1582907895,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUMV2KE84",
      "name": "sally-and-frankie",
      "created": 1582908838,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUNF0K2P7",
      "name": "mai-and-cuchulahn",
      "created": 1582910247,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUQ7CAPSB",
      "name": "ben-and-katherine",
      "created": 1582907259,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CURA9RBK8",
      "name": "riley-and-linda",
      "created": 1582935936,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUS36SXNF",
      "name": "martyn-and-alfie",
      "created": 1583773776,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUS3TNS2X",
      "name": "alin-and-simran",
      "created": 1583774330,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUTD1GCCR",
      "name": "yinghao-and-stephanie",
      "created": 1583772684,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUTD1V4U9",
      "name": "niki-and-alev",
      "created": 1583772695,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUTEZATC1",
      "name": "rebecca-and-lucy",
      "created": 1583774324,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUU16SB9P",
      "name": "mark-and-anais",
      "created": 1583790204,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUWG9FZ6C",
      "name": "nur-and-zahra",
      "created": 1583360552,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUWJ3HGER",
      "name": "adam-and-thomas",
      "created": 1583362198,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CUYNC5X6J",
      "name": "josh-and-jasmeet",
      "created": 1583360436,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV0DRNV4J",
      "name": "sultan-and-aidan",
      "created": 1584120025,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV30G3604",
      "name": "lisa-mae-and-eleanor",
      "created": 1583771138,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV3F63W4Q",
      "name": "daniel-and-james",
      "created": 1583772295,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV3F83072",
      "name": "moya-and-edvin",
      "created": 1583772345,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV3FFBHPS",
      "name": "salvador-and-alex",
      "created": 1583772538,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV3HL0NLQ",
      "name": "ricardo-and-sophie",
      "created": 1583774361,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV5DNKL12",
      "name": "olivia-and-michael",
      "created": 1583863043,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV5MUJV7G",
      "name": "yinghao-and-maxime",
      "created": 1583772707,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV5T5KC80",
      "name": "pedram-and-matt",
      "created": 1583863151,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV605J25V",
      "name": "neal-and-taylor",
      "created": 1583790761,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CV83ZPE5C",
      "name": "marcelo-and-jess",
      "created": 1583863183,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CVA2C32GL",
      "name": "yannick-and-sreeharsh",
      "created": 1584029877,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CVA630G2G",
      "name": "venezia-and-alexander",
      "created": 1584032595,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CVAGAN6S1",
      "name": "riley-and-michael",
      "created": 1584029896,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CVCBU5W5V",
      "name": "alex-and-will",
      "created": 1584029941,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "CVCN048Q6",
      "name": "rebecca-and-victoria",
      "created": 1584029923,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0101DJV5PB",
      "name": "bianca-and-bernny",
      "created": 1584618894,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0108QKR2H1",
      "name": "leslie-and-anna",
      "created": 1584989578,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010B1X766Q",
      "name": "alex-and-wojciech",
      "created": 1584618690,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010B21CBQU",
      "name": "aurelie-and-violet",
      "created": 1584618817,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010BFDSPS4",
      "name": "joel-and-sam",
      "created": 1584618794,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010BFFBM96",
      "name": "jez-and-frederick",
      "created": 1584618839,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010BFL22SU",
      "name": "enrico-and-heather",
      "created": 1584618978,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010CD3AHNV",
      "name": "helpful-resources",
      "created": 1585059541,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010DBCLA3H",
      "name": "cristian-and-julie",
      "created": 1584618734,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010DMR7RSS",
      "name": "alin-and-elliott",
      "created": 1584618934,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010DNJSNCB",
      "name": "jez-and-bianca",
      "created": 1585140085,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010F59F4L9",
      "name": "william-and-weiran",
      "created": 1585140084,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010G9RLGVA",
      "name": "addison-and-ryan",
      "created": 1584796332,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010GAHA21G",
      "name": "samantha-and-muqarrab",
      "created": 1585241824,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010JA0GX8R",
      "name": "anandh-and-simona",
      "created": 1585228714,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010JGB8TDM",
      "name": "amanda-and-kate",
      "created": 1584796253,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010NFE4V24",
      "name": "community",
      "created": 1585060016,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010P0DE7AQ",
      "name": "jarrod-and-emily",
      "created": 1585076551,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010P3J1R6Z",
      "name": "dexter-and-prerna",
      "created": 1585069736,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010Q0PGML6",
      "name": "ama-with-co-founders",
      "created": 1585057687,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010QJR8XJB",
      "name": "sam-and-ardhana",
      "created": 1585065808,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010QT07HB7",
      "name": "shani-and-robert",
      "created": 1585140041,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010QV6K7ML",
      "name": "toby-and-amy",
      "created": 1585074768,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010SG075MH",
      "name": "peter-and-smarth",
      "created": 1585653001,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010TPLDS5R",
      "name": "lucy-and-satbir",
      "created": 1585679264,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010UE4AQJG",
      "name": "rupert-and-daniel",
      "created": 1585243648,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010UMPAXRB",
      "name": "samantha-and-adeena",
      "created": 1585240376,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010V3WLGJU",
      "name": "arthur-and-gabriel",
      "created": 1585241831,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010WB186DD",
      "name": "peter-and-tibebe",
      "created": 1585232953,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010YFL88M9",
      "name": "eban-and-trent",
      "created": 1585819527,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010Z0NKA4V",
      "name": "junaid-and-ryan",
      "created": 1585390814,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010Z6TGRS6",
      "name": "venezia-and-joupin",
      "created": 1585855326,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C010Z7M9UFL",
      "name": "victor-and-izzy",
      "created": 1585855844,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0110EHS109",
      "name": "steve-and-izzy",
      "created": 1585819445,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0110SZE7LJ",
      "name": "rebecca-and-adrian",
      "created": 1585907676,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0110TV9PC2",
      "name": "lucy-and-emmanouil",
      "created": 1585908349,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0110UL36RG",
      "name": "alex-and-imogen",
      "created": 1585908987,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C01112XE3F1",
      "name": "nur-and-marceli",
      "created": 1585390813,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0111KJBUTS",
      "name": "mark-and-denise",
      "created": 1585579337,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0111KQFY8Y",
      "name": "harriet-and-tibebe",
      "created": 1585579452,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0112K9PCE6",
      "name": "mark-and-michael",
      "created": 1585940987,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C01137EMRNV",
      "name": "billy-and-melissa",
      "created": 1585855324,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C01140JE0P2",
      "name": "llyr-and-ellen",
      "created": 1585652992,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C01144CE3QE",
      "name": "alexandros-and-hardik",
      "created": 1585590865,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0114P2RCS0",
      "name": "michael-and-sandeep",
      "created": 1585679217,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C01178Y488P",
      "name": "christian-and-tyler",
      "created": 1585679207,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011AD1P7AR",
      "name": "bea-and-shafeeq",
      "created": 1585855818,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011ALK8ZKR",
      "name": "jon-and-eric",
      "created": 1585819595,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011BHWM8DU",
      "name": "z-shared-23",
      "created": 1585855380,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011BHWM8H4",
      "name": "z-shared-23",
      "created": 1585855380,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011BSVUX4P",
      "name": "anthony-and-bella",
      "created": 1586351306,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011C45NV27",
      "name": "igor-and-ben",
      "created": 1586283888,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011CMTJT2S",
      "name": "chris-and-aman",
      "created": 1585940939,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011DR20HUH",
      "name": "claire-and-ranjit",
      "created": 1586192820,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011EUHBRFU",
      "name": "michael-and-martin",
      "created": 1586376936,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011F911CFQ",
      "name": "luke-and-sanil",
      "created": 1586269222,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011FHF4DT8",
      "name": "stephen-and-chris",
      "created": 1586283862,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011FHFJU5C",
      "name": "anthony-and-isabella",
      "created": 1586283890,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011G0HKQUB",
      "name": "vadim-and-george",
      "created": 1586377936,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011GUJ18BY",
      "name": "mariano-and-stephen",
      "created": 1586376955,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011HATB43Y",
      "name": "tom-and-stephanie",
      "created": 1586419623,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011JEGT7RC",
      "name": "jake-and-victoria",
      "created": 1586508308,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011JR512GH",
      "name": "anthony-and-isabella-",
      "created": 1586285973,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011KBWSKEE",
      "name": "ryan-and-mohammed",
      "created": 1586508229,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011KER0LTF",
      "name": "ben-and-will",
      "created": 1586377008,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011LNTFHGC",
      "name": "jasper-and-razvan",
      "created": 1586283903,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011MG8C2MU",
      "name": "alina-and-samuel",
      "created": 1586891310,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011MGAASCX",
      "name": "alexander-and-chloe",
      "created": 1587146101,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011MGAV14P",
      "name": "jarrod-and-chloe",
      "created": 1587146117,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011PM5E2JE",
      "name": "mack-and-george",
      "created": 1586780973,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011PU5MG2G",
      "name": "thomas-and-ben",
      "created": 1586377026,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011V2W8EUQ",
      "name": "oleksiy-and-cherelle",
      "created": 1586283877,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C011VMGMGV7",
      "name": "anthony-isabella",
      "created": 1586508262,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0120SPSTHB",
      "name": "kamila-and-mariya",
      "created": 1587146109,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C01215VTAAV",
      "name": "claire-and-aran",
      "created": 1586782305,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0127MC54CV",
      "name": "kat-and-maciek",
      "created": 1587496863,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0128DES068",
      "name": "simon-and-bianca",
      "created": 1587146127,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4VR52RQE",
          "U6D2VCN07"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C0129336JEN",
      "name": "michael-and-mani",
      "created": 1587496842,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012A98EU7P",
      "name": "ryan-and-conal",
      "created": 1587579054,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012ASTKYGH",
      "name": "matt-and-schueb",
      "created": 1587028557,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012BLRFYV6",
      "name": "marcus-and-diogo",
      "created": 1586780704,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012BSRBHB5",
      "name": "jake-and-andrei",
      "created": 1587579177,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012DNQU97W",
      "name": "jez-and-stephanie",
      "created": 1587460334,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012ESV14V7",
      "name": "luke-and-laith",
      "created": 1587146091,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012HHARBTK",
      "name": "alex-and-shalayna",
      "created": 1587374445,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012J3QQB2L",
      "name": "nora-and-billy",
      "created": 1586891285,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012J49AAQ0",
      "name": "claire-and-shkurte",
      "created": 1586891766,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  },
  {
      "id": "C012MMHPM6D",
      "name": "laraib-and-james",
      "created": 1587496854,
      "creator": "U4VR52RQE",
      "is_archived": false,
      "is_general": false,
      "members": [
          "U4V22C6A1",
          "U4VR52RQE",
          "U6D2VCN07",
          "UTTNC1BJM"
      ],
      "topic": {
          "value": "",
          "creator": "",
          "last_set": 0
      },
      "purpose": {
          "value": "",
          "creator": "",
          "last_set": 0
      }
  }

];

export default chatList;
