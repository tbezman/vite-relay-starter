/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AppQueryVariables = {};
export type AppQueryResponse = {
    readonly products: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"AppRatingsCountFragment">;
    }> | null;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery {
  products {
    id
    ...AppRatingsCountFragment
  }
}

fragment AppLastPriceFragment on Product {
  stats24Hour {
    last
  }
}

fragment AppOpenPriceFragment on Product {
  stats24Hour {
    open
  }
}

fragment AppRatingsCountFragment on Product {
  ...AppLastPriceFragment
  ...AppOpenPriceFragment
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "products",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AppRatingsCountFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "products",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Stats24Hour",
            "kind": "LinkedField",
            "name": "stats24Hour",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "last",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "open",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e8988ba656f63d30a3e1285b03cd8323",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  products {\n    id\n    ...AppRatingsCountFragment\n  }\n}\n\nfragment AppLastPriceFragment on Product {\n  stats24Hour {\n    last\n  }\n}\n\nfragment AppOpenPriceFragment on Product {\n  stats24Hour {\n    open\n  }\n}\n\nfragment AppRatingsCountFragment on Product {\n  ...AppLastPriceFragment\n  ...AppOpenPriceFragment\n}\n"
  }
};
})();
(node as any).hash = 'b34b918ae51a2795428027444320c6e2';
export default node;
