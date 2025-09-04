// import React, { useState } from "react";
// import { signupNewsletter } from "../api/client";

// export default function NewsletterForm() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [status, setStatus] = useState(null);

//   async function onSubmit(e) {
//     e.preventDefault();
//     if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
//       setStatus("Please enter a valid email.");
//       return;
//     }
//     const res = await signupNewsletter({ email, name });
//     setStatus(res.ok ? "Thanks for subscribing!" : (res.error || "Something went wrong"));
//   }

//   return (
//     <form onSubmit={onSubmit} className="grid grid-3">
//       <div>
//         <label className="label">Name</label>
//         <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
//       </div>
//       <div>
//         <label className="label">Email *</label>
//         <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
//       </div>
//       <div style={{ display: "flex", alignItems: "flex-end" }}>
//         <button className="button">Subscribe</button>
//       </div>
//       {status && <p style={{ marginTop: 8, color: "var(--gold)" }}>{status}</p>}
//     </form>
//   );
// }
