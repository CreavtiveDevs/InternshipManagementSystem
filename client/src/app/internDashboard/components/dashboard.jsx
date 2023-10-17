import {HiMiniCalendarDays} from "react-icons/hi2";
import Calendar from "@/app/internDashboard/components/calendar";
import {BiPlus} from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { LogbookDisplay } from "@/app/logbook/components/logbookDisplay";
import { useEffect, useState } from "react";
import AuthConnect from "@/auth";

export const Dashboard = (props) => {
    const [country, setCountry] = useState("Turkey");
  return(
      <main className={'m-5 bg-white dark:bg-dark_2 '}>

          <div className={'text-md lg:text-xl xl:text-2xl py-1 md:py-2 w-full max-w-[1300px] xl:mx-auto mx-2 font-bold'}>
              <p>Welcome {props.firstname} </p>
          </div>


        {/*  section 1*/}

        <div className={'flex flex-wrap  justify-center items-center  gap-4  max-w-[1300px] xl:mx-auto mx-2'}>

            {/*total days*/}
            <div className={'lg:h-[12rem] min-w-[20rem] w-[22rem] xl:w-[20rem] xl:h-[14rem]  sm:w-[18.5rem]  h-[13rem]  bg-background_shade_2 rounded'}>

                    <div className={'mx-auto my-4 flex items-center gap-2'}>
                        <div className={'w-full flex items-center mx-3 px-2'}>
                            <span className={'text-3xl rounded p-3 my-1 bg-white text-blue'}><HiMiniCalendarDays /></span>
                        </div>
                    </div>

                    <div className={'flex items-center text-md xl:text-lg mb-1 mx-3 px-2'}>
                        <p>Total Days</p>
                    </div>

                    <div className={' flex items-center text-md xl:text-lg justify-between my-2 mx-3 px-2'}>
                        <p>40</p>

                    </div>
            </div>

            {/*orgaization name*/}
            <div className={'lg:h-[12rem] min-w-[20rem] w-[22rem] xl:w-[20rem] xl:h-[14rem]  sm:w-[18.5rem]  h-[13rem]  bg-background_shade_2 rounded'}>

                    <div className={'mx-auto my-4 flex items-center gap-2'}>
                        <div className={'w-full flex items-center mx-3 px-2'}>
                            <span className={'text-3xl rounded p-3 my-1 bg-white text-blue'}><HiMiniCalendarDays /></span>
                        </div>
                    </div>

                    <div className={'flex items-center text-md xl:text-lg mb-1 mx-3 px-2'}>
                        <p>Total Days</p>
                    </div>

                    <div className={' flex items-center text-md xl:text-lg justify-between my-2 mx-3 px-2'}>
                        <p className={'truncate w-[14rem]'}>Eastern mediteranean university</p>

                    </div>
            </div>

            <div className={' flex items-center justify-center'}>
                <Calendar />
            </div>



            {/*logbook Card*/}
            <div className={'bg-background_shade sm:w-[20rem] xl:w-[20rem] w-[23rem] h-[19rem] rounded'}>

                {/*section Name and Buton*/}
                <div className={'justify-between flex items-center mx-3 mt-3 mb-2'}>
                    <p className={" font-semibold text-black dark:text-white text-sm md:text-md lg:text-lg  inline-flex text-center  border-yellow border-x-[0.4rem] md:border-x-[0.3rem] px-2"}>
                      Logbook
                    </p>

                    <Link href={'/logbook'} className={'px-2 py-1 bg-blue text-white rounded inline-flex items-center justify-center gap-1'}>
                        <BiPlus className={'text-white text-xl'}/>
                        <div>Add</div>
                    </Link>
                   
                </div>

                {/*    section container*/}
                <div className={'h-[15rem] overflow-y-scroll'}>
                <LogbookDisplay/>
                </div>

            </div>


            {/*Announcement Card*/}
            <div className={'bg-background_shade sm:w-[20rem] xl:w-[20rem] w-[23rem] h-[19rem] rounded'}>

                {/*section Name*/}
                <p className={" font-semibold m-3 text-black dark:text-white text-sm md:text-md lg:text-lg  inline-flex text-center  border-yellow border-x-[0.4rem] md:border-x-[0.3rem] px-2"}>
                  Announcements
                </p>

                {/*section container*/}
                <div className={'h-[15rem] overflow-y-scroll'}>

                    <div className={'mx-auto max-w-[18rem]  my-2 bg-background_shade_2 rounded'}>

                        <Link href={''} className={'flex justify-between items-center w-full py-3 px-2 w gap-3'}>

                            <Image src={'/envelope.png'} width={1000} height={1000} className={'w-[3rem] h-[3rem]'} alt={""} />

                            <div className={'truncate flex flex-wrap justify-start items-center gap-1'}>
                                <p className={'font-semibold capitalize '}>Title</p>
                                <span className={'truncate text-sm lg:text-md'}>Announcement content</span>
                            </div>

                            <div className={'flex items-center justify-center text-sm w-fit'}>
                                <p>21/21/21</p>
                            </div>

                        </Link>

                    </div>

                </div>

            </div>


            {/*Todo Card*/}
            <div className={'bg-background_shade sm:w-[20rem] xl:w-[20rem] w-[23rem] h-[19rem] rounded'}>

                {/*section Name*/}
                <p className={" font-semibold m-3 text-black dark:text-white text-sm md:text-md lg:text-lg  inline-flex text-center  border-yellow border-x-[0.4rem] md:border-x-[0.3rem] px-2"}>
                  To-Do
                </p>

                {/*section Container*/}
                <div className={'h-[15rem] overflow-y-scroll'}>

                  <div className={' mx-auto max-w-[18rem]  rounded bg-background_shade_2 dark:bg-dark_4 border-yellow text-black'}>
                    
            {/* Fill Internship Application Form */}
            {!props.isConfirmed ? (
                <div className={'flex justify-center items-center p-2.5 w-full gap-2 hover:bg-blue hover:text-white'}>
                <Link href={''} className={'flex items-center justify-center py-1.5 px-1'}>
                    <span className={'text-center font-bold text-md w-full '}>Fill Internship Application Form</span>
                </Link>
                </div>
            ) : (
                <div className={'flex justify-center items-center p-2.5 w-full gap-2  text-black/25 disabled'}>
                    <span className={'text-center font-bold text-md w-full '}>Fill Internship Application Form</span>
                </div>
            )}

            {/* Fill Social Insurance Form */}
            {props.isConfirmed && !props.logComplete && (country === 'Turkey' || country === 'KKTC') ? (
                <div className={'flex justify-center items-center p-2.5 w-full gap-2 hover:bg-blue hover:text-white'}>
                    <Link href={''} className={'flex items-center justify-center py-1.5 px-1'}>
                        <span className={'text-center font-bold text-md w-full '}>Fill Social Insurance Form</span>
                    </Link>
                </div>
            ) : (
                <div className={'flex justify-center items-center p-2.5 w-full gap-2 text-black/25 disabled'}>
                    <span className={'text-center font-bold text-md w-full'}>Fill Social Insurance Form</span>
                </div>
            )}

            {/* Fill Logbook */}
            {(props.isConfirmed && !props.logComplete && !(country === 'Turkey' || country === 'KKTC')) || (props.filledSocial && !props.logComplete &&(country === 'Turkey' || country === 'KKTC')) ? (
                <div className={'flex justify-center items-center p-2.5 w-full gap-2 hover:bg-blue hover:text-white'}>
                    <Link href={''} className={'flex items-center justify-center py-1.5 px-1'}>
                        <span className={'text-center font-bold text-md w-full '}>Fill Logbook</span>
                    </Link>
                </div>
            ) : (
                <div className={'flex justify-center items-center p-2.5 w-full gap-2 text-black/25 disabled'}>
                    <span className={'text-center font-bold text-md w-full '}>Fill Logbook</span>
                </div>
            )}

            {/* Write Report */}
            {props.logComplete ? (
                <div className={'flex justify-center items-center p-2.5 w-full gap-2 hover:bg-blue hover:text-white'}>
                    <Link href={''} className={'flex items-center justify-center py-1.5 px-1'}>
                        <span className={'text-center font-bold text-md w-full '}>Write Report</span>
                    </Link>
                </div>
            ) : (
                <div className={'flex justify-center items-center p-2.5 w-full gap-2 text-black/25 disabled'}>
                    <span className={'text-center font-bold text-md w-full '}>Write Report</span>
                </div>
            )}


                  </div>

                </div>

            </div>


        </div>


      </main>
  )
}