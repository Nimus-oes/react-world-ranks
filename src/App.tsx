import Header from "./components/Header";
import Main from "./components/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
