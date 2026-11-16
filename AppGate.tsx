import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useAuthUsuario } from './firebase/auth'
import { sincronizarAhora } from './firebase/sync'
import { LoginPage } from './routes/auth/LoginPage'
import { router } from './router'

const INTERVALO_SYNC_MS = 2 * 60_000

export function AppGate() {
  const { usuario, cargando } = useAuthUsuario()
  const uid = usuario?.uid

  useEffect(() => {
    if (!uid) return

    const sync = () => {
      sincronizarAhora(uid).catch((err) => console.error('Error al sincronizar', err))
    }

    sync()
    const id = setInterval(sync, INTERVALO_SYNC_MS)
    window.addEventListener('online', sync)
    return () => {
      clearInterval(id)
      window.removeEventListener('online', sync)
    }
  }, [uid])

  if (cargando) {
    return <div className="flex-1 flex items-center justify-center min-h-screen bg-cancha-bg text-cancha-text-dim">Cargando…</div>
  }

  if (!usuario) {
    return <LoginPage />
  }

  return <RouterProvider router={router} />
}
