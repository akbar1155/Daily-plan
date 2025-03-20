import { Badge, Layout } from "antd";
// import QuestionIcon from "assets/icons/questionIcon";
// import PlusIcon from "assets/icons/PlusIcon";
// import ShareButton from "components/ui/button/shareBtn";
import { useState } from "react";
// import { useTranslation } from "react-i18next";
import i18next from "services/i18n";
import { storage } from "services";
import { Bell, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderMain = () => {
  const [language, setLanguage] = useState(storage.get("i18nextLng") || "uz");
  // const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Header className="sticky bg-[#fff] px-6 h-[68px] flex justify-end items-center top-0 z-10">
      <div className="flex items-center gap-4">

        <select
          className="px-4  py-1.5 bg-[#EDF1F7] text-black flex items-center justify-center border border-[#a6aeba] gap-2 rounded-full hover:bg-[#d8d9db] transition-colors duration-200 text-sm font-medium appearance-none cursor-pointer"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            i18next.changeLanguage(e.target.value);
          }}
        >
          <option value="en">English</option>
          <option value="uz">O‘zbek</option>
          <option value="ru">Russian</option>
        </select>
        <div className="flex items-center gap-4">
          <Badge count={5} style={{ backgroundColor: '#52c41a' }} >
            <Bell stroke="#a6aeba" style={{ width: "35px", height: "40px" }} className="cursor-pointer" />
          </Badge>
          <CircleUserRound onClick={() => navigate("/profile")} stroke="#a6aeba" style={{ width: "35px", height: "40px" }} className="cursor-pointer" />
        </div>
      </div>
    </Header>
  );
};

export default HeaderMain;
