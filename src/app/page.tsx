import TodosList from "@/components/features/todos/TodosList";
import {ChartBarCategory} from "@/components/sections/ChartBarCategory";
import {ChartLineValue} from "@/components/sections/ChartLineValue";
import {PieChartUserGender} from "@/components/sections/PieChartUsersGender";
import React from "react";

function page() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-1 md:col-span-2">
          <ChartLineValue />
        </div>
        <div>
          <ChartBarCategory />
        </div>
        <div>
          <PieChartUserGender />
        </div>
        <div className="col-span-1 md:col-span-2">
          <TodosList />
        </div>
      </div>
    </div>
  );
}

export default page;
