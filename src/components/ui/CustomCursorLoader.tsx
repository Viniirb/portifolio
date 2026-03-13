// src/components/ui/CustomCursorLoader.tsx
'use client'
import dynamic from 'next/dynamic'

const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then((m) => m.CustomCursor),
  { ssr: false }
)

export function CustomCursorLoader() {
  return <CustomCursor />
}
