import TaskBoard from "./TaskBoard/TaskBoard";
import TaskChart from "./TaskChart";
import ActivityLog from "./Activitylog";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="text-2xl font-bold text-center mb-6">
        Welcome to Your Dashboard Prince
      </header>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p>View and edit your profile info.</p>
        </div>

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-2">My Projects</h2>
          <p>Manage your active projects and tasks.</p>
        </div>

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p>Customize your dashboard preferences.</p>
        </div>
      </div> */}
      <TaskChart />
      <TaskBoard />
      <ActivityLog />
    </div>
  );
};

export default Dashboard;
