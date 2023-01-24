import { ReactNode } from "react";
import "./pagecontainer.sass";

type Proptypes = {
  children: ReactNode;
};

export function PageContainer({ children }: Proptypes) {
  return <section className="pageContainer">{children}</section>;
}
