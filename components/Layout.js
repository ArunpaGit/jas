import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Stay Healthy</span>
              <span>JAS Medicals</span>
            </h1>
            <h2>Health is wealth</h2>
          </a>
        </Link>
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