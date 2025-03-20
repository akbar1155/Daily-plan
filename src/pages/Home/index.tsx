import { Card, Row, Col, Progress, Calendar, Badge, Statistic } from "antd"
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import "./styles.scss"
import { ClipboardList } from "lucide-react"
export default function Dashboard() {
  // Mock data for tasks
  const tasks = [
    { id: 1, title: "Loyiha taqdimoti", completed: false, priority: "high", category: "ish" },
    { id: 2, title: "Jismoniy mashq", completed: true, priority: "medium", category: "sport" },
    { id: 3, title: "Kitob o'qish", completed: false, priority: "low", category: "shaxsiy" },
    { id: 4, title: "Dasturlash o'rganish", completed: false, priority: "high", category: "o'qish" },
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
      <h1 className="text-2xl font-bold my-6 text-[#838383] ">Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6} className="">
          <Card className="h-full bg-white border-0">
            <Statistic
              title={<span className="text-[#838383] font-medium text-xl">Bugungi vazifalar</span>}
              valueRender={() => (
                <div className="flex items-center gap-4 mt-5">
                  <ClipboardList width={30} height={30} stroke="#1890ff" style={{ fontSize: "32px" }} />
                  <span style={{ color: "#1890ff", fontSize: "32px" }}>
                    {tasks.length} / {tasks.length}
                  </span>
                </div>
              )}
            />
          </Card>



        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="h-full bg-white border-0">
            <Statistic
              title={<span className="text-[#838383]  font-medium text-xl">Bajarilgan</span>}
              valueRender={() => (
                <div className="flex items-center gap-4 mt-5">
                  <CheckCircleOutlined width={30} height={30} style={{ color: "#3f8600", fontSize: "32px" }} />
                  <span style={{ color: "#3f8600", fontSize: "32px", }}>
                    {tasks.filter((t) => t.completed).length}
                  </span>
                </div>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>

          <Card className="h-full bg-white border-0">
            <Statistic
              title={<span className="text-[#838383] font-medium text-xl">Bajarilmagan</span>}
              valueRender={() => (
                <div className="flex items-center gap-4 mt-5">
                  <ClockCircleOutlined style={{ color: "#cf1322", fontSize: "28px" }} />
                  <span style={{ color: "#cf1322", fontSize: "32px" }}>
                    {tasks.filter((t) => !t.completed).length}
                  </span>
                </div>
              )}
            />
          </Card>

        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="h-full bg-white border-0 ">
            <div className="text-center">
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
          </Card>
        </Col>

      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={12}>
          <Card
            className="h-full bg-white border-0 text-black"
            title={<span className="text-[#838383]  font-medium">Bugungi vazifalar</span>}
          >
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <Badge
                      status={task.priority === "high" ? "error" : task.priority === "medium" ? "warning" : "success"}
                    />
                    <span className={`ml-2 ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{task.category}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            className="h-full bg-white border-0 text-black"
            title={<span className="text-[#838383] font-medium">Kalendar</span>}
          >
            <div className="bg-white p-2 rounded-lg">
              <Calendar
                fullscreen={false}

                className="custom-calendar"
                cellRender={dateCellRender}
              />
            </div>
          </Card>
        </Col>


      </Row>
    </div>
  )
}

