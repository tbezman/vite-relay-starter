/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AppOpenPriceFragment = {
    readonly stats24Hour: {
        readonly open: string | null;
    } | null;
    readonly " $refType": "AppOpenPriceFragment";
};
export type AppOpenPriceFragment$data = AppOpenPriceFragment;
export type AppOpenPriceFragment$key = {
    readonly " $data"?: AppOpenPriceFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AppOpenPriceFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppOpenPriceFragment",
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
          "name": "open",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};
(node as any).hash = 'dcb13e0317b3d475d049f5b873d81adb';
export default node;
