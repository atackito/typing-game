import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Juego de Mecanografía',
  description: 'Practica y mejora tu velocidad de escritura',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
