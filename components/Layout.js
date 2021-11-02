import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
     <header>
        <h1>Jas Medicals Kakkodi</h1>
        
    </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 JAS on JAM Stack</p>
      </footer>
    </div>
  )
}
