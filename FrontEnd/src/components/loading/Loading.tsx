import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import loading from "../../assets/gifs/loading.gif";
import "./loading.sass";

type Proptypes = {
  isLoading: boolean;
};
export function Loading({isLoading}:Proptypes) {
  return (
    <>
    {isLoading ? (<section className="loading">
        <PageContainer>
          <section className="myLoading">
            <img src={loading} alt="" />
          </section>
        </PageContainer>
      </section>) : (
        <></>
      )}
      
    </>
  );
}
