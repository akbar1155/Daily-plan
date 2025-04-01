import React, { useState } from "react";
import { Button, Layout, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

import { Award, Calendar, ChartNoAxesCombined, DatabaseZap, LayoutDashboard, LogOut, NotebookPenIcon, SettingsIcon, UserRound } from "lucide-react";
import LogoText from "assets/icons/LogoText";
const { Sider } = Layout;

const Sidebar: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  const handleOk = () => {
    navigate("/");

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <Sider
      className="h-screen bg-[#fff] top-0 left-0 z-20 flex flex-col"
      width={270}
    >
      <div className="flex flex-col h-full">
        <div className=" flex-grow">
          <div className="  h-[68px] px-4 border-b  text-xl font-bold flex items-center space-x-2">


            <LogoText />
          </div>
          <div className="space-y-2 mt-3 px-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full text-[17px] flex  items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-[#EDF1F7] text-[#838383]  " : ""
                }`
              }

            >
              <LayoutDashboard />
              <span>Dashboard</span>

            </NavLink>
            <NavLink
              to="/dailyplan"
              className={({ isActive }) =>
                `w-full text-[17px] flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-[#EDF1F7] text-[#838383]  " : ""
                }`
              }

            >
              <Calendar />
              <span>Kundalik reja</span>

            </NavLink>
            <NavLink
              to="/allplans"
              className={({ isActive }) =>
                `w-full text-[17px] flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-[#EDF1F7] text-[#838383]  " : ""
                }`
              }

            >
              <DatabaseZap />
              <span>Barcha rejalar</span>

            </NavLink>
            <NavLink
              to="/goals"
              className={({ isActive }) =>
                `w-full text-[17px] flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-[#EDF1F7] text-[#838383]  " : ""
                }`
              }

            >
              <Award />
              <span>Maqsadlar</span>

            </NavLink>
            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                `w-full text-[17px] flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-[#EDF1F7] text-[#838383] " : ""
                }`
              }

            >
              <ChartNoAxesCombined />
              <span>Statistikalar</span>

            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `w-full text-[17px] flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-[#EDF1F7] text-[#838383]  " : ""
                }`
              }

            >
              <UserRound />
              <span>Profil</span>

            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `w-full text-[17px] flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-[#EDF1F7] text-[#838383]  " : ""
                }`
              }

            >
              <NotebookPenIcon />
              <span>Qaydlar</span>

            </NavLink>
          </div>
        </div>

        <div className="px-6 mt-auto ">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `w-full text-[17px] flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-[#EDF1F7] " : ""
              }`
            }

          >
            <SettingsIcon />
            <span className="ml-2">Sozlamalar</span>
          </NavLink>
        </div>
        <div className="px-6 mt-auto mb-6">
          <div className="h-[1px] w-full bg-[#EDF1F7] mb-4"></div>
          <button
            className="w-full h-[45px] mt-6  bg-[#EDF1F7] text-[16px] flex gap-3 items-center justify-start px-3 py-2 rounded-lg"

            onClick={handleLogout}
          >
            <span className=" p-1 rounded-[200px] !w-10 !h-10 flex items-center justify-center">
              <LogOut />
            </span>
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold">Chiqish</span>
            </div>
          </button>
          <Modal
            title="Notification"
            open={isModalOpen}
            onOk={handleOk}
            okType="primary"
            onCancel={handleCancel}
            footer={null}
          >
            <div className="text-[20px]">Are you sure?</div>
            <div className="ml-[75%] flex w-[120px] justify-between">
              <Button
                style={{ backgroundColor: "#4096FF" }}
                type="primary"
                onClick={handleCancel}
              >
                No
              </Button>
              <Button
                style={{ backgroundColor: "#4096FF" }}
                type="primary"
                onClick={handleOk}
              >
                Yes
              </Button>
            </div>
          </Modal>
        </div>

      </div>
    </Sider>
  );
};

export default Sidebar;
