import { Progress, Calendar, Badge, Statistic } from "antd"
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import "./styles.scss"
import { ClipboardList } from "lucide-react"

import AIRecommendations from "./components/AIRecommendations"
export default function Dashboard() {
  // Mock data for tasks
  const tasks = [
    { id: 1, title: "Loyiha taqdimoti", completed: false, priority: "high", category: "ish" },
    { id: 2, title: "Jismoniy mashq", completed: true, priority: "medium", category: "sport" },
    { id: 3, title: "Kitob o'qish", completed: false, priority: "low", category: "shaxsiy" },
    { id: 4, title: "Dasturlash o'rganish", completed: false, priority: "high", category: "o'qish" },
    { id: 5, title: "Do'stlar bilan uchrashuv", completed: true, priority: "low", category: "ijtimoiy" },
    { id: 6, title: "Hisobot tayyorlash", completed: false, priority: "high", category: "ish" },
    { id: 7, title: "Video kurs ko'rish", completed: false, priority: "medium", category: "o'qish" },
    { id: 8, title: "Uy tozalash", completed: true, priority: "medium", category: "shaxsiy" },
    { id: 9, title: "Yangi maqola yozish", completed: false, priority: "medium", category: "ish" },
    { id: 10, title: "Onaga qo‘ng‘iroq qilish", completed: true, priority: "low", category: "shaxsiy" },
    { id: 15, title: "Sport zalga borish", completed: false, priority: "medium", category: "sport" },
    { id: 16, title: "Yotoqxonani tartibga keltirish", completed: true, priority: "low", category: "shaxsiy" },
    { id: 17, title: "Kursdagi topshiriqni bajarish", completed: false, priority: "high", category: "o'qish" },
    { id: 18, title: "Ijtimoiy tarmoqlarda post joylash", completed: false, priority: "low", category: "ijtimoiy" },
  ]



  // Calendar data
  const getListData = (value: any) => {
    const day = value.date()
    const month = value.month()

    // Mock data for calendar events
    if (day === 8 && month === new Date().getMonth()) {
      return [
        { type: "warning" as "warning", content: "Muhim uchrashuv" },
        { type: "success" as "success", content: "Loyiha topshirish" },
      ]
    }
    if (day === 10 && month === new Date().getMonth()) {
      return [{ type: "warning" as "warning", content: "Hisobot tayyorlash" }]
    }
    if (day === 15 && month === new Date().getMonth()) {
      return [
        { type: "error" as "error", content: "Deadline" },
        { type: "success" as "success", content: "Trening" },
      ]
    }
    return []
  }

  const dateCellRender = (value: any) => {
    const listData = getListData(value)
    return (
      <ul className="events p-0 m-0 list-none">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="dashboard mx-4">
      <h1 className="text-2xl font-bold my-3 text-[#838383] ">Dashboard</h1>
      <div className="flex  gap-4 justify-between">


        <div className="w-full  ">
          <div className="flex justify-between items-center gap-2">


            <Statistic
              className="bg-white  rounded-lg shadow-md p-4 w-full"
              title={<span className="text-[#838383] font-medium text-lg">Bugungi vazifalar</span>}
              valueRender={() => (
                <div className="flex items-center gap-4 mt-5">
                  <ClipboardList width={30} height={30} stroke="#1890ff" style={{ fontSize: "32px" }} />
                  <span style={{ color: "#1890ff", fontSize: "32px" }}>
                    {tasks.length}
                  </span>
                </div>
              )}
            />

            <Statistic
              className="bg-white  rounded-lg shadow-md p-4 w-full"
              title={<span className="text-[#838383]  font-medium text-lg">Bajarilgan</span>}
              valueRender={() => (
                <div className="flex items-center gap-4 mt-5">
                  <CheckCircleOutlined width={30} height={30} style={{ color: "#3f8600", fontSize: "32px" }} />
                  <span style={{ color: "#3f8600", fontSize: "32px", }}>
                    {tasks.filter((t) => t.completed).length}
                  </span>
                </div>
              )}
            />


            <Statistic
              className="bg-white  rounded-lg shadow-md p-4 w-full"
              title={<span className="text-[#838383] font-medium text-lg">Bajarilmagan</span>}
              valueRender={() => (
                <div className="flex items-center gap-4 mt-5">
                  <ClockCircleOutlined style={{ color: "#cf1322", fontSize: "28px" }} />
                  <span style={{ color: "#cf1322", fontSize: "32px" }}>
                    {tasks.filter((t) => !t.completed).length}
                  </span>
                </div>
              )}
            />
          </div>

          <div className="text-center rounded-lg shadow-md p-4 mt-4 bg-white">
            <p className="mb-2 text-[#838383]  font-medium text-base">Haftalik progress</p>
            <Progress
              type="circle"
              percent={75}
              strokeWidth={12}
              strokeColor={"#1890ff"} // Progress chizig‘i rangi
              trailColor={"#d9d9d9"} // Orqa fon rangi
              format={(percent) => <span className="text-black font-medium">{percent}%</span>}
              className="text-black"
            />
          </div>

        </div>
        <AIRecommendations />
      </div>

      <div className="my-4 flex gap-4 justify-between">

        <div className="w-full bg-white border-0 text-black rounded-lg shadow-md p-4">
          <span className="text-[#838383] text-lg font-medium">Bugungi vazifalar</span>

          <div className="max-h-full overflow-y-auto mt-2">
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <Badge
                      status={
                        task.priority === "high"
                          ? "error"
                          : task.priority === "medium"
                            ? "warning"
                            : "success"
                      }
                    />
                    <span className={`ml-2 ${task.completed ? "line-through text-gray-400" : ""}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{task.category}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div
          className=" w-full bg-white border-0 text-black rounded-lg shadow-md p-4"
        >
          <span className="text-[#838383] text-lg font-medium">Kalendar</span>
          <div className="bg-white p-2 rounded-lg">
            <Calendar
              fullscreen={false}

              className="custom-calendar"
              cellRender={dateCellRender}
            />
          </div>
        </div>


      </div>
    </div>
  )
}

