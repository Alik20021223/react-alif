import { FC } from "react";
import iconList from "@shared/utils/icons";
import { IconsPropsType } from "./icon.types";

const Icon: FC<IconsPropsType> = ({ name, className }) => {
  const iconSvg = iconList[name];
  if (iconSvg) {
    return (
      <span
        className={`flex ${className}`}
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
    );
  }

  return null;
};

export default Icon;
