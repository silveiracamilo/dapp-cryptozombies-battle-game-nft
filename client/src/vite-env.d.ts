/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENVIRONMENT: string
    readonly VITE_API_BASE_URL: string
    readonly VITE_WEBSOCKET_BASE_URL: string
    readonly VITE_CRYPTOZOMBIES_BATTLE_CONTRACT_ADDRESS: string
    readonly VITE_CRYPTOZOMBIES_BATTLE_RANKING_CONTRACT_ADDRESS: string
    readonly VITE_CRYPTOZOMBIES_BATTLE_MARKET_CONTRACT_ADDRESS: string
    readonly VITE_OWNER_ADDRESS: string
    readonly VITE_FROM_BLOCK: number
    readonly VITE_RPC_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
