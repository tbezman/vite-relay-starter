import React, { ReactElement, Suspense } from "react";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";

import { AppQuery } from "./__generated__/AppQuery.graphql";
import { AppRatingsCountFragment$key } from "./__generated__/AppRatingsCountFragment.graphql";
import { AppOpenPriceFragment$key } from "./__generated__/AppOpenPriceFragment.graphql";
import { AppLastPriceFragment$key } from "./__generated__/AppLastPriceFragment.graphql";

const OpenPrice = ({ productRef }: { productRef: AppOpenPriceFragment$key }) => {
  const { stats24Hour } = useFragment(
    graphql`
      fragment AppOpenPriceFragment on Product {
        stats24Hour {
          open
        }
      }
    `,
    productRef,
  );

  return <span>{stats24Hour?.open}</span>;
};

const LastPrice = ({ productRef }: { productRef: AppLastPriceFragment$key }) => {
  const { stats24Hour } = useFragment(
    graphql`
      fragment AppLastPriceFragment on Product {
        stats24Hour {
          last
        }
      }
    `,
    productRef,
  );

  return <span>{stats24Hour?.last}</span>;
};

const RecipeRatingCount = ({ productRef }: { productRef: AppRatingsCountFragment$key }) => {
  const product = useFragment(
    graphql`
      fragment AppRatingsCountFragment on Product {
        ...AppLastPriceFragment
        ...AppOpenPriceFragment
      }
    `,
    productRef,
  );

  return (
    <span>
      <Suspense fallback="--">
        <LastPrice productRef={product} />
      </Suspense>
      <Suspense fallback={"--"}>
        <OpenPrice productRef={product} />
      </Suspense>
    </span>
  );
};

export default function App(): ReactElement {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        products {
          id
          ...AppRatingsCountFragment
        }
      }
    `,
    {},
  );

  return (
    <>
      <h2 id="ships-heading">Recipes</h2>
      <ul aria-labelledby="ships-heading">
        {data.products?.map((product) => (
          <li key={product.id}>
            {product.id}:{" "}
            <Suspense fallback={"Loading"}>
              <RecipeRatingCount productRef={product} />
            </Suspense>
          </li>
        ))}
      </ul>
    </>
  );
}
