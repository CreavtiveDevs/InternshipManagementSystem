'use client'
import {RiSunFill, RiMoonFoggyFill} from "react-icons/ri";
import { useDarkMode } from "@/app/contexts/darkModeContext";

export const DarkModeButton = () => {
  const {setDarkMode } = useDarkMode();
  
  return (
    <button className={'mx-3 p-0.5 gap-2 rounded flex text-sm md:text-md  bg-background_shade_2 dark:bg-dark_3 outline-0'} onClick={() => setDarkMode(prevMode => !prevMode)}>

            <div className={'text-yellow dark:text-white dark:bg-dark_3 bg-white  p-1.5 rounded'}>
              <RiSunFill />
            </div>

            <div className={'text-black dark:text-yellow bg-background_shade_2 dark:bg-dark_2 p-1.5 rounded'}>
              <RiMoonFoggyFill />
            </div>

    </button>
  );
};

