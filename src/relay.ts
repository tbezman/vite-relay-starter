import { ApolloServerBase, gql, PluginDefinition } from "apollo-server-core";
import { Environment, GraphQLResponse, Network, Observable, RecordSource, Store } from "relay-runtime";
import { products, stats, StatType } from "./stats";
import { Resolvers } from "./resolvers-types";

type LocalProduct = {
  id: string;
  stats24Hours: StatType["stats_24hour"] & { productId: string };
  stats30Day: StatType["stats_30day"] & { productId: string };
};

let items: LocalProduct[] = [];
for (const product of products) {
  const statsForProduct = stats[product.id];

  if (statsForProduct) {
    const localProduct: LocalProduct = {
      id: product.id,
      stats24Hours: { ...statsForProduct.stats_24hour, productId: product.id },
      stats30Day: { ...statsForProduct.stats_30day, productId: product.id },
    };

    items.push(localProduct);
  }
}

items = items.slice(0, 10);

const delay = async <T>(result: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, Math.random() * 3000);
  });
};

type GraphQLData = Record<string, unknown>;

const thing = {
  subscribers: new Set<(obj: GraphQLData) => void>(),

  subscribe: (cb: (data: GraphQLData) => void) => {
    thing.subscribers.add(cb);
  },

  unsubscribe: (cb: () => void) => {
    thing.subscribers.delete(cb);
  },

  push: (obj: GraphQLData) => {
    console.log("Length", thing.subscribers.size);
    thing.subscribers.forEach((sub) => sub(obj));
  },
};

const plugin: PluginDefinition = {
  async requestDidStart() {
    return {
      executionDidStart() {
        let runningResult: GraphQLData = {};
        return {
          willResolveField({ info }) {
            return (error, result) => {
              const clonedResult = JSON.parse(JSON.stringify(result));

              if (!runningResult) {
                runningResult = { result: clonedResult };
              }

              // console.log(runningResult);

              let curr = info.path;
              const path = [];
              while (curr.prev) {
                path.unshift(curr.key);

                curr = curr.prev;
              }

              path.unshift(curr.key);

              let root = runningResult;
              for (let i = 0; i < path.length - 1; i++) {
                const key = path[i];
                root = root[key] as GraphQLData;
              }

              root[path[path.length - 1]] = clonedResult;

              thing.push(runningResult);
            };
          },
        };
      },
    };
  },
};

const resolvers: Resolvers = {
  Product: {
    stats24Hour: async (root) => {
      return { productId: root.id };
    },
  },

  Stats24Hour: {
    open: async (root) => {
      if (!root.productId) {
        return null;
      }

      const product = getProduct(root.productId);

      return await delay(product.stats24Hours.open);
    },

    last: async (root) => {
      if (!root.productId) {
        return null;
      }

      const product = getProduct(root.productId);

      return await delay(product.stats24Hours.last);
    },
  },

  Query: {
    products: async () => {
      return await delay(
        items.map((it) => {
          return { id: it.id };
        }),
      );
    },
  },
};

const server = new ApolloServerBase({
  plugins: [plugin],
  typeDefs: gql`
    type Query {
      products: [Product!]
    }

    type Product {
      id: String!
      stats24Hour: Stats24Hour
    }

    type Stats24Hour {
      productId: String
      open: String
      last: String
    }
  `,
  resolvers,
});

const getProduct = (id: string) => {
  return items.find((item) => item.id === id) as LocalProduct;
};

export const RelayEnvironment = new Environment({
  network: Network.create((params, variables) =>
    Observable.create((sink) => {
      const callback = (data: GraphQLData) => {
        sink.next({ data: data });
      };

      thing.subscribe(callback);

      server.executeOperation({ query: params.text!, variables }).then((result) => {});
    }),
  ),
  store: new Store(new RecordSource()),
});
