const { useState } = React

import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'

export function App() {
    const [page, setPage] = useState('book')
    console.log(page)
    return <section className="app">
        <header className="app-header">
            <h1 className='main-title-root' onClick={() => setPage('home')}>Miss Book</h1>
            <AppHeader setPage={setPage} />
        </header>
        <main className="container">
            {page === 'home' && <Home />}
            {page === 'about' && <About />}
            {page === 'book' && <BookIndex />}
        </main>
    </section>
}