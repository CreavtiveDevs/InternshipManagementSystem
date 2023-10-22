"use client";
import { useState, useEffect } from "react";
import { BiChevronsRight } from "react-icons/bi";
import { FaEllipsisV, FaTimes } from "react-icons/fa";
import { GiTrashCan, GiPencil } from "react-icons/gi";
import AuthConnect from "@/auth";
import { format } from "date-fns";
import { Empty } from "antd";
import { useTranslations } from "next-intl";

export const LogbookDisplay = () => {
  const t = useTranslations("logbook");
  const [options, setOptions] = useState(false);
  const [logbookEntries, setLogbookEntries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch logbook entries from the API
    const fetchLogbookEntries = async () => {
      try {
        const response = await AuthConnect.get("/viewlog");
        setLogbookEntries(response.data);
      } catch (error) {
        console.error("Error fetching logbook entries:", error);
      }
    };

    fetchLogbookEntries();
  }, []);

  const optionToogle = (logid) => {
    setSelectedItem(logid);
    setOptions(!options);
  };
  const formatDate = (fullDate) => {
    const date = new Date(fullDate);
    return format(date, "dd/MM/yyyy");
  };

  return (
    <div className="m-4 rounded h-fit">
      {logbookEntries.length === 0 ? (
        <div className=" font-semibold text-lg text-center text-white">
          <Empty />
        </div>
      ) : (
        logbookEntries.map((entry) => (
          <div key={entry.logid}>
            {/* Render each logbook entry */}
            <div className="my-2 mx-1 py-2 bg-blue text-white dark:bg-dark_4 dark:text-black  flex items-center justify-between rounded">
              <div className="ml-3  flex flex-wrap gap-1 w-[5rem]">
                <p className="font-semibold">
                  {t("day")} {entry.day}
                </p>
                <p className=" bg-yellow rounded text-sm font-medium text-white px-1 py-0.5">
                  {formatDate(entry.date)}
                </p>
              </div>

              <div className="flex flex-wrap  truncate w-40 items-center pl-5">
                <div>
                  <span className="font-semibold text-lg text-center">
                    {entry.department}
                  </span>
                  <p className="text-m text-justify">{entry.description}</p>
                </div>
              </div>

              <div className="relative mr-3">
                <FaEllipsisV
                  className=" cursor-pointer"
                  onClick={() => optionToogle(entry.logid)}
                />

                {options && (
                  <div className="from-left absolute text-white -left-10 -top-[1.4rem] h-fit rounded w-[5rem] bg-dark_3">
                    <div className="relative">
                      <div className="m-0.5 p-1 rounded flex text-sm font-medium items-center cursor-pointer gap-0.5 hover:bg-b dark:hover:bg-background_shade">
                        <GiTrashCan className="text-xl text-yellow" />
                        <p className="">Delete</p>
                      </div>

                      <div className="m-0.5  p-1 rounded flex text-sm font-medium items-center cursor-pointer gap-0.5  hover:bg-background_shade">
                        <GiPencil className="text-xl text-yellow" />
                        <p>edit</p>
                      </div>
                      <span
                        onClick={optionToogle}
                        className="absolute p-[0.1rem] cursor-pointer text-lg top-[1.3rem] bg-dark_3 rounded -left-6"
                      >
                        <BiChevronsRight className="text-yellow" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};