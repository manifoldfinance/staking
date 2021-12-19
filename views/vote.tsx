import DAOProgress from '@/components/vote/daoProgress';

function VoteView() {
  return (
    <section className="sm:pt-8 md:pt-16 pb-8 text-white">
      <div className="px-5 max-w-4xl mx-auto mb-4">
        <DAOProgress />
      </div>
    </section>
  );
}

export default VoteView;
