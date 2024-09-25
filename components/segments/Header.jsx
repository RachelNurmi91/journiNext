import Link from "next/link"
import HeaderNav from "./HeaderNav"

const Header = ({ 
  title, 
  subtitle,
  navLeft,
  navLeftLink,
  navRight,
  navRightLink,
  showNav = false,
}) => {

  return (
    <div>
      {showNav && 
        <HeaderNav leftIcon={navLeft} leftLink={navLeftLink} rightIcon={navRight} rightLink={navRightLink}/>
      }
      <div className={subtitle ? '' : 'flex justify-between'}>
        <h1 className="journi-page-title">{title}</h1>
        {subtitle && 
          <p>{subtitle}</p>
        }
      </div>
    </div>

  )
}

export default Header