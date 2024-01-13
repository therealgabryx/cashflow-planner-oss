export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 bg-gradient-to-b text-black">
      <div>MAIN PAGE</div>
      <br />
      <div>
        <a href="/planner" className="text-blue-500">
          Planner
        </a>
      </div>
    </main>
  );
}
