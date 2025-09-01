import React from 'react'
import { NavLink } from 'react-router-dom'
export default function App({ children }) {
return (
<div>
<nav className="nav container">
<div style={{display:'flex',alignItems:'center',gap:'10px'}}>
<span className="tag">Fine Dining</span>
<a href="/" style={{fontWeight:800, letterSpacing:1}}>Café Fausse</a>
</div>
<div>
<NavLink to="/" className={({isActive})=> isActive? 'active': ''}
>Home</NavLink>
<NavLink to="/menu" className={({isActive})=> isActive? 'active': ''}
>Menu</NavLink>
<NavLink to="/reservations" className={({isActive})=> isActive?
'active': ''}>Reservations</NavLink>
<NavLink to="/about" className={({isActive})=> isActive? 'active': ''}
>About</NavLink>
<NavLink to="/gallery" className={({isActive})=> isActive? 'active':
''}>Gallery</NavLink>
</div>
</nav>
<main className="container">
{children}
</main>
<footer className="container footer">© {new Date().getFullYear()} Café
Fausse • 1234 Culinary Ave, Suite 100, Washington, DC 20002 • (202) 555‑4567</
footer>
</div>
)
}
