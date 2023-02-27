import { CustomLink } from "./Navbar";




export default function Footer() {
  return (
    <footer className="menu">
      <ul>
        <CustomLink to="/about">About us</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
      </ul>

      
    </footer>
  )
}