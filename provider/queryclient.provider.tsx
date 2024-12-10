"use client"

import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient= new QueryClient();

export const QueryClintProvider: React.FC<IChildren>= ({ children }) =>{
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}