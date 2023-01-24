import { Children, ReactNode } from "react";
import { SideBar } from "../../components/sideBar/SideBar";
import './deskboard.sass'

type Proptypes = {
  children: ReactNode;
};
export function DeskBoard({ children }: Proptypes) {
  return (
    <main className="sideBarLayout">
      <SideBar/>
      <section className="sideBarMain">{children}</section>
    </main>
  );
}
