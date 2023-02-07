import {
  useEffect,
  useState,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";
import cn from "classnames";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";

import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { Sidebar } from "../Sidebar/Sidebar";

import Logo from "../logo.svg";

import styles from "./Header.module.css";

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const router = useRouter();

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: "100%",
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon
        variant="white"
        icon="menu"
        onClick={() => setIsOpened(true)}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={"closed"}
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          variant="white"
          icon="close"
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};
