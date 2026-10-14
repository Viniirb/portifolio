import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/site'

export const alt = `${SITE_NAME} — Engenheiro de Software Sênior`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 96,
          background: 'radial-gradient(circle at 85% 10%, #2a1260 0%, #080810 55%)',
          color: '#f8f8ff',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: '#a78bfa' }}>
          {'< ENGENHEIRO DE SOFTWARE SÊNIOR />'}
        </div>
        <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1, marginTop: 28, letterSpacing: -4 }}>
          VINICIUS
        </div>
        <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1, color: '#7c3aed', letterSpacing: -4 }}>
          BARBOSA
        </div>
        <div style={{ fontSize: 30, marginTop: 40, color: '#a0a0b8' }}>
          .NET · IA aplicada · Arquitetura distribuída · viniciusrb.dev
        </div>
      </div>
    ),
    size
  )
}
