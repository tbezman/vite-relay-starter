/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AppRatingsCountFragment = {
    readonly " $fragmentRefs": FragmentRefs<"AppLastPriceFragment" | "AppOpenPriceFragment">;
    readonly " $refType": "AppRatingsCountFragment";
};
export type AppRatingsCountFragment$data = AppRatingsCountFragment;
export type AppRatingsCountFragment$key = {
    readonly " $data"?: AppRatingsCountFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AppRatingsCountFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppRatingsCountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AppLastPriceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AppOpenPriceFragment"
    }
  ],
  "type": "Product",
  "abstractKey": null
};
(node as any).hash = '65f229c95de7c2ff778eaca3ae86f1c7';
export default node;
