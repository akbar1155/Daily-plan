"use client"

import { Card, Row, Col, Statistic, Tabs, DatePicker } from "antd"
import { CheckCircleOutlined, ClockCircleOutlined, CalendarOutlined, FireOutlined } from "@ant-design/icons"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const { RangePicker } = DatePicker
const { TabPane } = Tabs

export default function Statistics() {

  const weeklyData = [
    { name: "Dushanba", completed: 5, pending: 2 },
    { name: "Seshanba", completed: 7, pending: 3 },
    { name: "Chorshanba", completed: 4, pending: 4 },
    { name: "Payshanba", completed: 6, pending: 1 },
    { name: "Juma", completed: 8, pending: 2 },
    { name: "Shanba", completed: 3, pending: 5 },
    { name: "Yakshanba", completed: 2, pending: 1 },
  ]

  const categoryData = [
    { name: "Ish", value: 35 },
    { name: "Shaxsiy", value: 25 },
    { name: "Sport", value: 20 },
    { name: "O'qish", value: 15 },
    { name: "Boshqa", value: 5 },
  ]

  const productivityData = [
    { time: "6:00", productivity: 20 },
    { time: "8:00", productivity: 40 },
    { time: "10:00", productivity: 80 },
    { time: "12:00", productivity: 60 },
    { time: "14:00", productivity: 90 },
    { time: "16:00", productivity: 70 },
    { time: "18:00", productivity: 50 },
    { time: "20:00", productivity: 30 },
    { time: "22:00", productivity: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  const ganttData = [
    { name: 'Apr 1', percent: 75 },
    { name: 'Apr 2', percent: 85 },
    { name: 'Apr 3', percent: 80 },
    { name: 'Apr 4', percent: 40 },
    { name: 'Apr 5', percent: 90 },
    { name: 'Apr 6', percent: 25 },
    { name: 'Apr 7', percent: 80 },
    { name: 'Apr 8', percent: 50 },
    { name: 'Apr 9', percent: 65 },
    { name: 'Apr 10', percent: 30 },
    { name: 'Apr 11', percent: 78 },
    { name: 'Apr 12', percent: 55 },
    { name: 'Apr 13', percent: 88 },
    { name: 'Apr 14', percent: 45 },
    { name: 'Apr 15', percent: 92 },
    { name: 'Apr 16', percent: 35 },
    { name: 'Apr 17', percent: 77 },
    { name: 'Apr 18', percent: 95 },
    { name: 'Apr 19', percent: 60 },
    { name: 'Apr 20', percent: 70 },
  ];







  return (
    <div className="analytics m-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Statistikalar</h1>
        <RangePicker />
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Jami vazifalar" value={120} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Bajarilgan"
              value={85}
              valueStyle={{ color: "#3f8600" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Bajarilmagan"
              value={35}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Samaradorlik"
              value={71}
              suffix="%"
              valueStyle={{ color: "#1677ff" }}
              prefix={<FireOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" className="mb-6">
        <TabPane tab="Haftalik tahlil" key="1">
          <Card title="Haftalik vazifalar statistikasi">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Bajarilgan" fill="#82ca9d" />
                <Bar dataKey="pending" name="Bajarilmagan" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>
        <TabPane tab="Kategoriyalar" key="2">
          <Card title="Vazifalar kategoriyalari">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>
        <TabPane tab="Samaradorlik vaqti" key="3">
          <Card title="Kunlik samaradorlik vaqti">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  name="Samaradorlik"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>
      </Tabs>



      <Card title="Gantt Chart" className="mb-6 p-4 shadow-lg rounded-xl">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ganttData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" tick={{ fill: '#555' }} />
            <YAxis tick={{ fill: '#555' }} domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ paddingBottom: 10 }} />
            <Line type="monotone" dataKey="percent" name="Samaradorlik (%)" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

    </div>
  )
}

