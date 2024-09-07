// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <BrowserRouter>
          <main className="light text-foreground bg-background">
            <App />
          </main>
        </BrowserRouter>
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)