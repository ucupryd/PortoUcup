export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold dark:text-white">Dashboard Protected Route</h1>
      <p className="mt-4 dark:text-gray-300">Hanya user yang login yang bisa melihat ini.</p>
    </div>
  );
}
