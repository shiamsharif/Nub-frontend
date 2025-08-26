import TaskDetails from "../_components/task-details";
import { Card, CardContent } from "@/components/ui/card";
import { fetchTaskDetails } from "@/lib/dashboard";

type TaskDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function TaskDetailsPage({
  params,
}: {
  params: Promise<TaskDetailsPageProps["params"]>;
}) {
  const { id } = await params;
  const task = await fetchTaskDetails(id);

  // Handle case where task is not found
  if (!task) {
    return (
      <div className="container mx-auto py-44">
        <Card className="max-w-lg mx-auto bg-zinc-50 dark:bg-zinc-800">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-300 text-lg">
                No tasks found
              </p>
              <p className="text-gray-400 dark:text-gray-300 text-sm mt-2">
                Please check the task ID
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <TaskDetails task={task} />;
}
