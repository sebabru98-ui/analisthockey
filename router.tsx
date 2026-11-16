import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Root } from './routes/Root'
import { EquiposListPage } from './routes/equipos/EquiposListPage'
import { EquipoDetallePage } from './routes/equipos/EquipoDetallePage'
import { TemporadaPage } from './routes/temporada/TemporadaPage'
import { JugadoraDetallePage } from './routes/jugadoras/JugadoraDetallePage'
import { AjustesPage } from './routes/ajustes/AjustesPage'
import { NuevoPartidoRedirect } from './routes/partidos/NuevoPartidoRedirect'
import { PartidoSetupPage } from './routes/partidos/PartidoSetupPage'
import { PartidoVivoPage } from './routes/partidos/PartidoVivoPage'
import { PartidoResumenPage } from './routes/partidos/PartidoResumenPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Navigate to="/equipos" replace /> },
      { path: 'equipos', element: <EquiposListPage /> },
      { path: 'equipos/:equipoId', element: <EquipoDetallePage /> },
      { path: 'equipos/:equipoId/temporada', element: <TemporadaPage /> },
      { path: 'equipos/:equipoId/jugadoras/:jugadoraId', element: <JugadoraDetallePage /> },
      { path: 'equipos/:equipoId/partidos/nuevo', element: <NuevoPartidoRedirect /> },
      { path: 'ajustes', element: <AjustesPage /> },
    ],
  },
  // Las pantallas de partido no usan el layout Root: necesitan toda la
  // superficie de pantalla y su propia navegación (con confirmación al salir).
  { path: '/partidos/:partidoId/setup', element: <PartidoSetupPage /> },
  { path: '/partidos/:partidoId/vivo', element: <PartidoVivoPage /> },
  { path: '/partidos/:partidoId/resumen', element: <PartidoResumenPage /> },
])
