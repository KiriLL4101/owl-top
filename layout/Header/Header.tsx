import { DetailedHTMLProps, HTMLAttributes } from "react";

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {}

const Header = ({ ...props }: HeaderProps) => {
  return <header {...props}>Header</header>;
};

export default Header;
