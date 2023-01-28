import { ReactNode, useContext } from "react";
import CardModalContext from "../../context/cardModalContext";
import "./pagecontainer.sass";

type Proptypes = {
  children: ReactNode;
};

export function PageContainer({ children }: Proptypes) {
  
  return <section className="pageContainer">{children}</section>;
}
