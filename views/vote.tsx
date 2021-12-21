import DAOProgress from '@/components/vote/daoProgress';

function VoteView() {
  return (
    <section className="pb-8 text-white sm:pt-8 md:pt-16">
      <div className="px-5 mx-auto mb-4 max-w-4xl">
        <DAOProgress />
      </div>
    </section>
  );
}

export default VoteView;
