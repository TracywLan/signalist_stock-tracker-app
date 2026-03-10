import Link from "next/link";
import Image from "next/image"
import Navitems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = () => {
  return (
    <header className="stick top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image src="/assets/icons/logo.svg" alt="Signalist logo" width={140} height={32} />
        </Link>
        <nav className="hidden sm:block">
          <Navitems />
        </nav>
        <UserDropdown />
      </div>
    </header>
  )
}


export default Header
