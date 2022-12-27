import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Footer.module.css";

interface FooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <a href="#">OwlTop © 2020 - 2021 Все права защищены</a>
      <a href="#">Пользовательское соглашение</a>
      <a href="#">Политика конфиденциальности</a>
    </footer>
  );
};

export default Footer;
