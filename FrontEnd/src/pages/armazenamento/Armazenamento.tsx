import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import DonutChart from "react-donut-chart";
import './armazenamento.sass'

export function Armazenamento() {
  return (
    <>
      <PageContainer>
      <PageTitle title="Armazenamento"></PageTitle>
        <div className="grafico">
          <DonutChart
            onMouseEnter={(item) => item}
            legend={true}
            colorFunction={(colors, index) => colors[index % colors.length]}
            selectedOffset={0}
            colors={[
              "#f44310",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#03a9f4",
              "#00bcd4",
              "#009688",
              "#4caf50",
              "#8bc34a",
              "#cddc39",
              "#ffeb3b",
              "#ffc107",
              "#ff9800",
              "#ff5722",
              "#795548",
              "#607d8b",
            ]}
            data={[
                {
                    label: "Livre",
                    value: 100,
                    isEmpty: true,
                  },
              {
                label: "Fotos",
                value: 25,
              },
              {
                label: "Videos",
                value: 25,
              },
              {
                label: "Documentos",
                value: 70,
              },
              {
                label: "Musicas",
                value: 25,
              },
              
            ]}
          />
        </div>
        ;
      </PageContainer>
    </>
  );
}
