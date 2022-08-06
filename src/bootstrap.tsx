import { App } from "@/App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createRoot } from "react-dom/client";

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache({ addTypename: false }),
});

const root = createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
