import './pagetitle.sass'

type PropTypes = {
  title: string;
};

export function PageTitle({ title }: PropTypes) {
  return (
    <section className="title">
      {title}
    </section>
  );
}
