import React, {useEffect,useState} from 'react'
const ADMIN_PASSWORD = 'fausse2025' // change or move to env variable in production
export default function AdminReservations(){
const [authed,setAuthed] = useState(false)
const [input,setInput] = useState('')
const [data,setData]=useState([])
useEffect(()=>{
if(authed){
fetch('http://127.0.0.1:5000/api/admin/reservations')
.then(r=>r.json()).then(setData)
}
},[authed])
if(!authed){
return (
<div className="card">
<h2>Admin Access</h2>
<p>Enter password to view reservations:</p>
<input className="input" type="password" value={input}
onChange={e=>setInput(e.target.value)} />
<button className="button" style={{marginTop:'1rem'}} onClick={()=>{
if(input===ADMIN_PASSWORD){ setAuthed(true) }
else alert('Invalid password')
}}>Login</button>
</div>
)
}
return (
<div className="card">
    <h2>All Reservations</h2>
<table>
<thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Time</
th><th>Guests</th><th>Table</th></tr></thead>
<tbody>
{data.map(r=> (
<tr key={r.id}>
<td>{r.id}</td><td>{r.customer.name}</td><td>{r.customer.email}</
td>
<td>{new Date(r.time_slot).toLocaleString()}</td>
<td>{r.guests}</td><td>{r.table_number}</td>
</tr>
))}
</tbody>
</table>
</div>
)
}
