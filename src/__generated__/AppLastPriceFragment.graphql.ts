/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AppLastPriceFragment = {
    readonly stats24Hour: {
        readonly last: string | null;
    } | null;
    readonly " $refType": "AppLastPriceFragment";
};
export type AppLastPriceFragment$data = AppLastPriceFragment;
export type AppLastPriceFragment$key = {
    readonly " $data"?: AppLastPriceFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AppLastPriceFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppLastPriceFragment",
  "selections": [
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};
(node as any).hash = 'ed7ceb0e569bfb54fe2ab8fcb33ca7b9';
export default node;
