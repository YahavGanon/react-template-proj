
export function AppHeader({ setPage }) {

	function onSetPage(ev, page) {
		ev.preventDefault()
		setPage(page)
	}

	return <header className="app-header full">
		<nav className="app-nav">
			<a className="app-nav-option" href="" onClick={(ev) => onSetPage(ev, 'home')} >Home </a> |
			<a className="app-nav-option" href="" onClick={(ev) => onSetPage(ev, 'about')} > About </a> |
			<a className="app-nav-option" href="" onClick={(ev) => onSetPage(ev, 'book')}> Book</a>
		</nav>
	</header>
}