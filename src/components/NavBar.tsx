import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Define prop types for components using isOpen
interface MenuProps {
  isOpen: boolean;
}

interface HamburgerProps {
  isOpen: boolean;
}

const Navbar = styled.nav`
  background: linear-gradient(135deg, #333 0%, #1a1a1a 100%);
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #e0e0e0;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Menu = styled.ul<MenuProps>`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #333;
    padding: 1.5rem;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: transform 0.3s ease, opacity 0.2s ease;
  }
`;

const MenuWithoutIsOpen = styled(Menu).withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})``;

const MenuItem = styled.li`
  margin: 0;
`;

const MenuLink = styled(Link)<{ active: boolean }>`
  color: ${({ active }) => (active ? '#4dabf7' : '#fff')};
  text-decoration: none;
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: color 0.2s ease;

  &:hover {
    color: #74c0fc;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 0.75rem 0;
    display: block;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #444;
  border-radius: 6px;
  background: #fff;
  outline: none;
  margin-left: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #74c0fc;
  }
`;

const HamburgerButton = styled.button<HamburgerProps>`
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    width: 32px;
    height: 24px;
    position: relative;
  }
`;

const HamburgerButtonWithoutIsOpen = styled(HamburgerButton).withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})``;

const HamburgerIcon = styled.span<HamburgerProps>`
  position: absolute;
  width: 100%;
  height: 3px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;

  &:nth-child(1) {
    top: ${({ isOpen }) => (isOpen ? '50%' : '0')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg) translateY(-50%)' : 'none')};
  }

  &:nth-child(2) {
    top: 50%;
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
    transform: translateY(-50%);
  }

  &:nth-child(3) {
    top: ${({ isOpen }) => (isOpen ? '50%' : '100%')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg) translateY(-50%)' : 'translateY(-100%)')};
  }
`;

const HamburgerIconWithoutIsOpen = styled(HamburgerIcon).withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})``;

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    router.push(query ? `/search?query=${query}` : '/search');
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <Navbar>
      <Link href="/">
        <Logo>MovieApp</Logo>
      </Link>
      <HamburgerButtonWithoutIsOpen isOpen={menuOpen} onClick={toggleMenu}>
        <HamburgerIconWithoutIsOpen isOpen={menuOpen} />
        <HamburgerIconWithoutIsOpen isOpen={menuOpen} />
        <HamburgerIconWithoutIsOpen isOpen={menuOpen} />
      </HamburgerButtonWithoutIsOpen>
      <MenuWithoutIsOpen isOpen={menuOpen}>
        <MenuItem>
          <MenuLink href="/" active={currentPath === '/'}>
            Home
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="/favorites" active={currentPath === '/favorites'}>
            Favorites
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="/trending" active={currentPath === '/trending'}>
            Trending
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href="/recommended" active={currentPath === '/recommended'}>
            Recommended
          </MenuLink>
        </MenuItem>
      </MenuWithoutIsOpen>
      <SearchWrapper>
        <SearchInput type="text" placeholder="Search movies..." onChange={handleSearch} />
      </SearchWrapper>
    </Navbar>
  );
};

export default NavBar;