import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "./components/GlobalStyle";
import Layout from "./layouts/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </Provider>
  );
}
export type AppDispatch = typeof store.dispatch;
export default App;
