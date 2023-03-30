import { CustomLink } from "../CustomLink";


export default function Footer():JSX.Element {
  

  return (
  <footer className="menu">
      <ul>
        <CustomLink to="/about">About us</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
      </ul>

      
    </footer>
  )
}