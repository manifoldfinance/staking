import OperationManager from "./UserOperationManager"


export default function Tabs() {
  return (
    <section className="py-[130px] px-2 mx-auto max-w-[485px]">
      <div className="flex flex-col gap-2 p-2 md:p-4 rounded-[28px] bg-dark-800 shadow-md relative w-full max-w-xl bg-grayish ">
        <OperationManager />
      </div>
    </section>
  );
}
