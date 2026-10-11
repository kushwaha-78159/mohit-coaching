"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const photos = ["sir1.png","sir2.jpg","sir3.jpg","sir4.jpg","sir5.jpg","sir6.jpg","sir7.jpg","sir8.jpg"];

const classes = [
  ["Class 6th — All Subjects","Foundation in Science, Mathematics and English.","sir6.jpg"],
  ["Class 7th — All Subjects","Build strong concepts across core subjects.","sir7.jpg"],
  ["Class 8th — All Subjects","Strengthen concepts before board-level study.","sir8.jpg"],
  ["Class 9th","Focused Science and Mathematics coaching.","sir4.jpg"],
  ["Class 10th — Science, Math & English","Focused board-exam preparation.","sir5.jpg"],
  ["Class 11th — Commerce","Economics, Accounting and Business Studies.","sir2.jpg"],
  ["Class 11th — Science","Physics, Chemistry and Biology/Mathematics.","sir1.png"],
  ["Class 11th — Commerce with Math","Commerce subjects with Mathematics.","sir3.jpg"],
  ["Class 12th — Science","Board preparation and strong subject concepts.","sir1.png"],
  ["Class 12th — Accounting","Guidance for Accounting and related subjects.","sir2.jpg"]
];

function Header() {
  return <header className="site-header"><nav className="nav wrap">
    <Link href="/" className="brand"><span className="brand-mark">MC</span><span>Mohit Coaching Centre<small>Learn • Grow • Succeed</small></span></Link>
    <div className="nav-links">
      <Link href="/">Home</Link><Link href="/about">About</Link><Link href="/classes">Classes</Link>
      <Link href="/gallery">Gallery</Link><Link href="/contact">Contact</Link>
      <Link href="/register" className="nav-cta">Register Now ↗</Link>
    </div>
  </nav></header>;
}

function Footer() {
  return <footer className="footer"><div className="wrap footer-inner">
    <div><strong>Mohit Coaching Centre</strong><p>Your path to academic excellence in Faridabad, Haryana.</p><a className="footer-phone" href="tel:9873566144">☎ 9873566144</a></div>
    <div className="footer-links"><Link href="/about">About</Link><Link href="/classes">Classes</Link><Link href="/contact">Contact</Link><Link href="/register">Register</Link></div>
    <p className="copyright">© {2026} Mohit Coaching Centre. All rights reserved.</p>
  </div></footer>;
}

function EnquiryForm({ kind }: {kind:"contact"|"registration"}) {
  const [status,setStatus] = useState("");
  const [busy,setBusy] = useState(false);
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setStatus("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/site",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind,data:payload})});
      const result = await res.json();
      if(!res.ok) throw new Error(result.error || "Submission failed");
      setStatus("Thank you! Your details have been submitted successfully.");
      form.reset();
    } catch(err) { setStatus(err instanceof Error ? err.message : "Please try again."); }
    finally { setBusy(false); }
  }
  return <form className="form-card" onSubmit={submit}>
    {kind==="registration" ? <>
      <label>Student Name<input name="studentName" placeholder="Enter student name" required /></label>
      <label>Parent / Guardian Name<input name="parentName" placeholder="Enter parent or guardian name" required /></label>
      <label>Phone Number<input name="phone" type="tel" pattern="[0-9+\-\s]{10,16}" placeholder="Enter phone number" required /></label>
      <label>Email Address<input name="email" type="email" placeholder="Optional email address" /></label>
      <label>Select Class<select name="className" required defaultValue=""><option value="" disabled>Choose a class</option>{classes.map(c=><option key={c[0]}>{c[0]}</option>)}</select></label>
      <label>Subjects / Message<textarea name="message" placeholder="Subjects or anything we should know" rows={4}/></label>
    </> : <>
      <label>Your Name<input name="name" placeholder="Enter your full name" required /></label>
      <label>Phone Number<input name="phone" type="tel" placeholder="Enter phone number" /></label>
      <label>Email Address<input name="email" type="email" placeholder="Enter email address" /></label>
      <label>Subject<input name="subject" placeholder="What is your enquiry about?" /></label>
      <label>Your Message<textarea name="message" placeholder="Write your message here" rows={5} required /></label>
    </>}
    <button className="btn" disabled={busy}>{busy?"Submitting…":kind==="registration"?"Submit Registration":"Send Message"} <span>→</span></button>
    {status && <p role="status" className="form-status">{status}</p>}
  </form>;
}

export default function SitePage({page}:{page:string}) {
  const [siteContent, setSiteContent] = useState<{
    about: string;
    contact: { address: string; phone: string; email: string };
    gallery: string[];
  }>({
    about: "Mohit Coaching Centre helps students from Class 6th to 12th.",
    contact: { address: "Faridabad, Haryana, India", phone: "9873566144", email: "" },
    gallery: photos,
  });

  useEffect(() => {
    let active = true;
    fetch("/api/site")
      .then((r) => {
        if (!r.ok) throw new Error("Could not load site content");
        return r.json();
      })
      .then((data) => {
        if (active) {
          setSiteContent((previous) => ({
            ...previous,
            ...data,
            contact: { ...previous.contact, ...(data.contact || {}) },
            gallery: Array.isArray(data.gallery) ? data.gallery : previous.gallery,
          }));
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  const title:Record<string,string> = {about:"About Us",classes:"Our Classes",contact:"Contact Us",register:"Student Registration",gallery:"Our Gallery"};
  return <><Header />
    {page==="home" ? <>
      <main><section className="hero"><div className="wrap hero-grid"><div className="hero-copy">
        <span className="eyebrow"><span className="dot"/> QUALITY EDUCATION IN FARIDABAD</span>
        <h1>Build Your Future.<br/><em>Achieve Excellence.</em></h1>
        <p>Welcome to Mohit Coaching Centre — personalised learning, experienced faculty and focused preparation for students from Class 6th to 12th.</p>
        <div className="hero-actions"><Link className="btn" href="/register">Join Our Classes <span>↗</span></Link><a className="btn btn-outline" href="tel:9873566144">☎ 9873566144</a></div>
        <div className="hero-points"><span>✓ Personal Attention</span><span>✓ Concept-Based Learning</span><span>✓ Board Preparation</span></div>
      </div><div className="hero-visual"><div className="hero-image"><Image src="/images/sir1.png" alt="Mohit Coaching Centre faculty" fill priority sizes="(max-width:800px) 90vw, 45vw" style={{objectFit:"contain"}}/></div><div className="image-label"><span className="label-icon">✦</span><span><strong>Learn with confidence</strong><small>Every student matters</small></span></div><div className="gold-orbit"/></div></div></section>
      <section className="stats"><div className="wrap stats-grid"><div><strong>6th–12th</strong><span>Classes Covered</span></div><div><strong>10</strong><span>Learning Programmes</span></div><div><strong>4+</strong><span>Subject Areas</span></div><div><strong>1 Goal</strong><span>Your Success</span></div></div></section>
      <section className="section wrap"><div className="section-heading"><span className="eyebrow">WHY CHOOSE US</span><h2>Education that builds <em>confidence.</em></h2><p>Personalised learning and a supportive environment to help every student reach their potential.</p></div><div className="feature-grid">{[["01","Experienced Faculty","Learn with guidance and subject-focused support."],["02","Small-Batch Attention","Get the attention you need to understand concepts."],["03","Strong Fundamentals","Build a solid foundation for school and board exams."]].map(f=><article className="feature-card" key={f[0]}><span className="feature-number">{f[0]}</span><h3>{f[1]}</h3><p>{f[2]}</p></article>)}</div></section>
      <section className="faculty-section"><div className="wrap"><div className="section-heading"><span className="eyebrow">OUR EXPERT FACULTY</span><h2>Meet our learning <em>community.</em></h2></div><div className="photo-grid">{photos.slice(0,4).map((p,i)=><div className="photo-card" key={p}><div className="photo-frame"><Image src={"/images/"+p} alt={"Mohit Coaching Centre faculty "+(i+1)} fill sizes="(max-width:700px) 45vw, 22vw" style={{objectFit:"cover"}}/></div><h3>Expert Faculty</h3></div>)}</div><div className="center"><Link href="/gallery" className="btn btn-outline">View Gallery →</Link></div></div></section>
      <section className="cta-section"><div className="wrap cta-inner"><div><span className="eyebrow">TAKE THE NEXT STEP</span><h2>Ready to start your <em>success story?</em></h2><p>Get in touch to find the right learning programme for you.</p></div><Link href="/register" className="btn">Register Today ↗</Link></div></section></main>
    </> : <>
      <main><section className="page-banner"><div className="wrap"><span className="eyebrow">MOHIT COACHING CENTRE</span><h1>{title[page]||"Welcome"}</h1><p>Helping students learn better, grow stronger and achieve more.</p></div></section>
      {page==="about" && <section className="section wrap about-layout"><div className="about-photo"><Image src="/images/sir1.png" alt="Our faculty" fill sizes="(max-width:800px) 90vw, 40vw" style={{objectFit:"contain"}}/></div><div><span className="eyebrow">OUR STORY</span><h2>Learning with purpose.<br/><em>Growing with confidence.</em></h2><p>{siteContent.about}</p><p>We offer coaching for Classes 6th to 12th with a focus on strong academic foundations, subject understanding and personal attention.</p><p>We believe every student can progress with the right guidance, consistent practice and encouragement.</p><Link className="btn" href="/register">Join Our Classes ↗</Link></div></section>}
      {page==="classes" && <section className="section wrap"><div className="section-heading"><span className="eyebrow">LEARNING PROGRAMMES</span><h2>Find the right class for <em>your goals.</em></h2><p>Coaching for Classes 6th to 12th across core subjects and streams.</p></div><div className="class-grid">{classes.map(c=><article className="class-card" key={c[0]}><div className="class-photo"><Image src={"/images/"+c[2]} alt={c[0]} fill sizes="(max-width:700px) 90vw, 30vw" style={{objectFit:"cover"}}/></div><div className="class-body"><span className="class-tag">LEARNING PROGRAMME</span><h3>{c[0]}</h3><p>{c[1]}</p><Link href="/register">Enquire now <span>↗</span></Link></div></article>)}</div></section>}
      {page==="contact" && <section className="section wrap contact-layout"><div><span className="eyebrow">GET IN TOUCH</span><h2>Let’s talk about <em>your goals.</em></h2><p>Have a question about classes or registration? Send us a message and our team can follow up.</p><div className="contact-info"><div><span>⌖</span><div><strong>Our Location</strong><p>{siteContent.contact.address || "Faridabad, Haryana, India"}</p></div></div><div><span>☎</span><div><strong>Call Us Now</strong><p><a className="contact-phone" href="tel:9873566144">9873566144</a></p><small>Tap the number to call us.</small></div></div><div><span>✉</span><div><strong>Enquiries</strong><p><a className="contact-phone" href={"tel:" + (siteContent.contact.phone || "9873566144")}>{siteContent.contact.phone || "9873566144"}</a></p>{siteContent.contact.email && <p><a href={"mailto:" + siteContent.contact.email}>{siteContent.contact.email}</a></p>}</div></div></div></div><EnquiryForm kind="contact"/></section>}
      {page==="register" && <section className="section wrap register-layout"><div><span className="eyebrow">START YOUR JOURNEY</span><h2>Register for <em>classes.</em></h2><p>Share your details and the class you are interested in. Please check your phone number before submitting.</p><ul className="check-list"><li>Classes 6th to 12th</li><li>Science, Mathematics and Commerce</li><li>Personalised academic support</li></ul></div><EnquiryForm kind="registration"/></section>}
      {page==="gallery" && <section className="section wrap"><div className="section-heading"><span className="eyebrow">OUR CENTRE</span><h2>A glimpse of our <em>community.</em></h2><p>Photos from the original Mohit Coaching Centre website.</p></div><div className="gallery-grid">{siteContent.gallery.map((p,i)=><div className="gallery-item" key={p+i}>{p.startsWith("http")?<img src={p} alt={"Coaching centre photo "+(i+1)} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<Image src={"/images/"+p} alt={"Coaching centre photo "+(i+1)} fill sizes="(max-width:700px) 45vw, 25vw" style={{objectFit:"cover"}}/>}</div>)}</div></section>}
      </main>
    </>}
    <Footer/>
  </>;
}
