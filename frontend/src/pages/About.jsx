import React from 'react'
export default function About(){
return (
<div className="grid grid-2">
<div>
<h2>Our Story</h2>
<p>Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez,
Café Fausse blends traditional Italian flavors with modern culinary innovation.
Our mission is to deliver an unforgettable dining experience shaped by craft,
creativity, and locally sourced ingredients.</p>
<div className="grid grid-2" style={{marginTop:'1rem'}}>
<div className="card"><strong>Chef Antonio Rossi</strong><p
style={{color:'var(--muted)'}}>Executive Chef & Co‑Founder</p></div>
<div className="card"><strong>Maria Lopez</strong><p
style={{color:'var(--muted)'}}>Restaurateur & Co‑Founder</p></div>
</div>
</div>
<img className="img" src="https://images.unsplash.com/photo-1544145945-
f90425340c7e?q=80&w=1200" alt="chefs"/>
</div>
)
}
