import { PropsWithChildren, createContext, useContext, useState } from "react";

import type { MenuItem } from "../types/menu.interface";
import { TopLevelCategory } from "../types/page.interface";

export interface AppContext {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<AppContext>({
  menu: [],
  firstCategory: TopLevelCategory.Courses,
});

export const AppContextProvider = ({
  menu,
  firstCategory,
  children,
}: PropsWithChildren<AppContext>) => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);

  const setMenu = (newMenu: MenuItem[]) => {
    setMenuState(newMenu);
  };

  return (
    <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useMenu hook must be used within a Context Provider");
  }

  return context;
};
