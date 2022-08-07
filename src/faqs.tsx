import qa from '@/data/qa.json';

function FAQPage() {
  return (
    <section className="pt-8 md:pt-16 pb-8">
      <div className="px-5 max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-center">FAQs</h1>
        </div>

        <div>
          <ul className="divide-y -mt-8 -mb-8">
            {qa.map((datum, index) => (
              <li key={index} className="border-primary-300 pb-8 pt-8">
                <div>
                  <h2 className="text-lg leading-5 font-semibold mb-2">
                    {datum.question}
                  </h2>

                  <p className="text-gray-300">{datum.answer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default FAQPage;
