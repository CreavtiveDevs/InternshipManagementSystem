"use client";
import Image from "next/image";
import { FaUserGroup } from "react-icons/fa6";
import { BsBuildings } from "react-icons/bs";
import { BiPlus, BiX } from "react-icons/bi";
import { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Empty } from "antd";
import AuthConnect from "@/auth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import { DisplayAnnouncement } from "../../deptAnnouncement/components/displayAnnouncement";
import { StudentList } from "../../studentInformation/components/studentsList";
import { DeptInternshipDisplay } from "../../deptInternshipPosition/components/deptInternshipDisplay";

export const Dashboard = () => {
  const t = useTranslations("logbook");
  const [stdInfoSearch, setStdInfoSearch] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  const token = localStorage.getItem("accessToken");
  let decodedToken, firstname;
  if (token) {
    decodedToken = jwtDecode(token);
    firstname = decodedToken.firstname;
  }

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await AuthConnect.get("/getsubs");
        setSubmissions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <main className="w-full">
      <div className="m-4 mb-20 md:mb-4">
        <div
          className={
            "text-md lg:text-xl xl:text-2xl py-1 md:py-2 w-full max-w-[1300px] xl:mx-auto mx-2 font-bold"
          }
        >
          <p>welcome {firstname}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="grid grid-cols-6 col-span-3 lg:col-span-2  justify-between items-center  gap-4 w-full max-w-[1300px] self-center px-4 sm:px-10 lg:px-0">
            {/* display card */}
            <div className=" col-span-6 md:col-span-3  flex items-center justify-center">
              <div
                className={
                  "min-h-[12rem] lg:h-[12rem] xl:h-[14rem] flex flex-wrap items-center gap-2 content-center justify-around col-span-6 md:col-span-3 lg:col-span-2 bg-white shadow-lg border border-background_shade_2 rounded"
                }
              >
                <div className="flex justify-end w-full gap- items-center mx-10 my-2">
                  <div className="inline-flex justify-end w-fit px-1.5 py-0.5 rounded bg-white gap-2 items-center  border border-dark_4 ">
                    <BsBuildings className="text-[green] text-xl" />
                    <p>40</p>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center ">
                  <div className={"p-2 flex items-center w-1/4"}>
                    <span
                      className={
                        "text-4xl rounded p-4 my-1 bg-dark_3 text-white"
                      }
                    >
                      <FaUserGroup />
                    </span>
                  </div>

                  <div
                    className={
                      "flex flex-wrap justify-center text-center items-center gap-2 text-md xl:text-lg p-2"
                    }
                  >
                    <div className="w-full text-2xl md:text-4xl font-bold">
                      23
                    </div>
                    <div className="w-full text-xs">Total students</div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-span-6 md:col-span-3">
              {/*Announcement Card*/}
              <div
                className={
                  "bg-background_shade  col-span-6 md:col-span-3 lg:col-span-2 h-[19rem] rounded"
                }
              >
                {/*section Name and button*/}
                <div className="flex justify-between capitalize p-3 items-center">
                  <p
                    className={
                      " font-semibold  text-black dark:text-white text-sm md:text-md xl:text-lg  inline-flex text-center  border-yellow border-x-[0.3rem] px-2"
                    }
                  >
                    {"Announcements"}
                  </p>

                  <button className="flex gap-1 items-center p-1 rounded bg-blue text-white">
                    <BiPlus className="text-xl" />
                    <p className="text-sm md:text-md xl:text-lg ">Add</p>
                  </button>
                </div>

                {/*section container*/}
                <div className={"h-[15rem] overflow-y-auto"}>

                  <DisplayAnnouncement />

                </div>
              </div>
            </div>

            {/* Students Information */}

            <div className=" col-span-6 md:col-span-3  overflow-hidden">
              {/*body*/}

              <div
                className={
                  "bg-background_shade  col-span-6 md:col-span-3 lg:col-span-2 h-[19rem] rounded"
                }
              >
                {/*section Name and button*/}
                <div className="flex justify-between capitalize p-3 items-center relative">
                  <p
                    className={
                      " font-semibold  text-black dark:text-white text-sm md:text-md xl:text-lg  inline-flex text-center  border-yellow border-x-[0.3rem] px-2"
                    }
                  >
                    {"Students Info"}
                  </p>

                  <button
                    onClick={() => {
                      setStdInfoSearch(true);
                    }}
                    className="flex gap-1 items-center px-2.5 py-1.5 rounded bg-blue text-white "
                  >
                    <HiMagnifyingGlass className="text-lg" />
                  </button>

                  {/* search section */}
                  {stdInfoSearch && (
                    <div className=" from-top rounded  w-full h-full absolute items-center flex justify-center right-0 top-0 bg-background_shade_2">
                      <div className="flex flex-nowrap w-[75%] justify-center items-center bg-white rounded m-0">
                        <input
                          placeholder="search by Id or name"
                          id=""
                          className="outline-none w-full text-center my-0.5 px-2"
                          type="text"
                        />
                        <button
                          onClick={() => {
                            setStdInfoSearch(false);
                          }}
                          className="bg-blue text-white px-2 py-1 rounded m-1 "
                        >
                          <BiX className="text-lg" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/*section container*/}
                <div className={"h-[15rem] overflow-y-auto"}>
                  <div
                    className={"mx-auto my-2 flex justify-center items-center"}
                  >
                    <StudentList />
                  </div>
                </div>
              </div>
            </div>

            {/* internship opportunities */}

            <div className=" col-span-6 md:col-span-3">
              {/*Announcement Card*/}

              <div
                className={
                  "bg-background_shade  col-span-6 md:col-span-3 lg:col-span-2 h-[19rem] rounded"
                }
              >
                {/*section Name and button*/}
                {/*section Name and button*/}
                <div className="flex justify-between capitalize p-3 items-center">
                  <p
                    className={
                      " font-semibold  text-black dark:text-white text-sm md:text-md xl:text-lg  inline-flex text-center  border-yellow border-x-[0.3rem] px-2"
                    }
                  >
                    {"Internship Positions"}
                  </p>

                  <button className="flex gap-1 items-center p-1 text-sm md:text-md xl:text-lg rounded bg-blue text-white">
                    <BiPlus className="text-xl" />
                    <p>Add</p>
                  </button>
                </div>

                {/*section container*/}
                <div className={"h-[15rem] overflow-y-auto"}>

                    <DeptInternshipDisplay />

                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className=" col-span-3 lg:col-span-1 grid grid-rows-2">
            {/* Submitted Forms */}

            <div className=" row-span-2 bg-background_shade rounded">
              {/*section Name and button*/}
              <div className="capitalize p-3 items-center">
                <p
                  className={
                    " font-semibold  text-black dark:text-white text-sm md:text-md xl:text-lg  inline-flex text-center  border-yellow border-x-[0.3rem] px-2"
                  }
                >
                  Submitted Forms
                </p>
              </div>

              {/*section container*/}
              <div className={"h-fit overflow-y-auto"}>
                <div className={"mx-auto max-w-[90%] my-2 rounded"}>
                  <div className=" rounded h-fit">
                    {submissions.length === 0 ? (
                      <div className=" font-semibold text-lg text-center text-white">
                        <Empty />
                      </div>
                    ) : (
                      submissions.map((submission) => (
                        <Link
                          href={
                            submission.filled_iaf && !submission.iafConfirmed
                              ? `/iafview?id=${submission.internshipid}&stdid=${submission.stdid}`
                              : submission.filledConForm &&
                                !submission.conFormConfirmed
                              ? `/conformview?id=${submission.internshipid}&stdid=${submission.stdid}`
                              : submission.filledSocial &&
                                !submission.sifConfirmed
                              ? `/sifview?id=${submission.internshipid}&stdid=${submission.stdid}`
                              : submission.logComplete &&
                                !submission.logConfirmed
                              ? `/logview?id=${submission.internshipid}&stdid=${submission.stdid}`
                              : submission.compEvalFilled &&
                                !submission.compEvalConfirmed
                              ? `/compevalview?id=${submission.internshipid}&stdid=${submission.stdid}`
                              : submission.reportComplete &&
                                !submission.reportConfirmed
                              ? `/reportview?id=${submission.internshipid}&stdid=${submission.stdid}`
                              : ""
                          }
                        >
                          <div
                            key={submission.internshipid}
                            className=" flex justify-center flex-wrap"
                          >
                            <div className="my-2 mx-1 py-2 bg-blue text-white dark:bg-dark_4 dark:text-black w-full flex max-w-[30rem] items-center justify-between rounded">
                              <div
                                className={
                                  "w-2/12 flex justify-center items-center"
                                }
                              >
                                <Image
                                  src={"/avatar.png"}
                                  alt={"Profile Picture"}
                                  height={1000}
                                  width={1000}
                                  priority
                                  className={
                                    "w-[2rem] h-[2rem] rounded-full hidden lg:inline-block"
                                  }
                                />
                              </div>
                              <div className={"w-10/12 ml-5"}>
                                <div className=" flex flex-wrap">
                                  <p className="font-semibold">
                                    {submission.stdid}
                                  </p>
                                </div>
                                {submission.filled_iaf &&
                                !submission.iafConfirmed ? (
                                  <div className="flex">
                                    <span className="text-md">
                                      Internship Application Form
                                    </span>
                                  </div>
                                ) : submission.filledConForm &&
                                  !submission.conFormConfirmed ? (
                                  <div className="flex">
                                    <span className="text-md">
                                      Internship Confirmation Form
                                    </span>
                                  </div>
                                ) : submission.filledSocial &&
                                  !submission.sifConfirmed ? (
                                  <div className="flex">
                                    <span className="text-md">
                                      Social Insurance Form
                                    </span>
                                  </div>
                                ) : submission.logComplete &&
                                  !submission.logConfirmed ? (
                                  <div className="flex">
                                    <span className="text-md">Logbook</span>
                                  </div>
                                ) : submission.compEvalFilled &&
                                  !submission.compEvalConfirmed ? (
                                  <div className="flex">
                                    <span className="text-md">
                                      Company Evaluation Form
                                    </span>
                                  </div>
                                ) : submission.reportComplete &&
                                  !submission.reportConfirmed ? (
                                  <div className="flex">
                                    <span className="text-md">Report</span>
                                  </div>
                                ) : (
                                  <div className="flex">
                                    <span className="text-md">Problem</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
