import { useRouter, useSearchParams } from "next/navigation";
import AuthConnect from "@/auth";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Modal from "../../globalComponents/modal";
import PdfViewer from "../../globalComponents/pdfViewer";

export const ConFormView = () => {
  const t = useTranslations("sif");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [info, setInfo] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [reject, setReject] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [msg, setMsg] = useState("");

  const stdid = searchParams.get("stdid");
  const intid = searchParams.get("id");

  useEffect(() => {
    const fetchStudentById = async () => {
      const response = await AuthConnect.get(
        `/getinternship/${stdid}/${intid}`
      );
      console.log(response.data);
      setInfo(response.data);
    };
    fetchStudentById();
  }, []);
  if (!info) {
    return null;
  }

  const confirmConfirmation = async (e) => {
    try {
      const response = await AuthConnect.post("/confirmcon", {
        stdid: stdid,
      });
      if (response) {
        setConfirmed(true);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      alert("Application Error"); // You can add a generic error message here
    }
  };

  const push = () => {
    router.push("/departmentDashboard");
  };

  const rejectConfirmation = async (e) => {
    try {
      const response = await AuthConnect.post("/rejectcon", {
        stdid: stdid,
      });
      if (response) {
        setRejected(true);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      alert("Application Error"); // You can add a generic error message here
    }
  };

  return (
    <main>
      <div className="my-1 flex justify-center items-center font-bold pt-5">
        <div className="border-x-[0.4rem] text-2xl border-yellow">
          <p className="px-2">Internship Confirmation Form</p>
        </div>
      </div>
      <section className="p-2 bg-white dark:bg-dark_1 flex items-center justify-center px-4 sm:px-12 md:px-20">
        <div className="from-left bg-white dark:bg-dark_2 p-5 rounded shadow-xl dark:border-none border border-background_shade_2 w-[40rem] lg:w-[40rem] h-fit pb-10">
          <div className=" w-full">
            <p
              className={
                " font-bold my-4 text-black dark:text-white text-sm md:text-md lg:text-lg  inline-flex text-center  border-yellow border-x-[0.3rem] md:border-x-[0.3rem] px-2"
              }
            >
              Information about the Company and Trainee
            </p>
            <div>
              <div className="mt-2 md:mt-4 relative flex space-x-2">
                <div className="w-1/2">
                  <span>Company Name: {info.compname}</span>
                </div>

                <div className="w-1/2">
                  <span>Working Fields: {info.fields}</span>
                </div>
              </div>

              <div className="mt-2 md:mt-4 relative flex space-x-2">
                <span>Postal Address: {info.compaddress}</span>
              </div>

              <div className="mt-2 md:mt-4 relative flex space-x-2">
                <span className="w-1/2">City: {info.city}</span>

                <div className="w-1/2">
                  <span>Country: {info.country}</span>
                </div>
              </div>

              <div className="mt-2 md:mt-4 relative flex space-x-2">
                <span className="w-1/2">Fax: {info.fax}</span>

                <div className="w-1/2">
                  <span>Telephone Number: {info.compphone}</span>
                </div>
              </div>

              <div className="mt-2 md:mt-4 relative flex space-x-2">
                <span className="w-1/2">
                  Organisational Email: {info.compemail}
                </span>

                <div className="w-1/2">
                  <span>Organisational website: {info.website}</span>
                </div>
              </div>

              <div className="mt-2 md:mt-4 relative flex space-x-2">
                <span className="w-1/2">
                  Name and Surname of Trainee: {info.stdfname} {info.stdlname}
                </span>

                <div className="w-1/2">
                  <span>
                    Internship Start Date: {info.startdate.split("T")[0]}
                  </span>
                </div>
              </div>

              <div className="mt-2 md:mt-4 relative flex space-x-2">
                <span className="w-1/2">
                  Internship End Date: {info.enddate.split("T")[0]}
                </span>

                <div className="w-1/2">
                  <span>Working Days: {info.duration}</span>
                </div>
              </div>
            </div>
            <div className={"pt-10"}>
              <p
                className={
                  " font-bold my-4 text-black dark:text-white text-sm md:text-md lg:text-lg  inline-flex text-center  border-yellow border-x-[0.4rem] md:border-x-[0.3rem] px-2"
                }
              >
                The Work to be done by the Student
              </p>
              <ul className="py-1">
                {info.intwork.map((iwork) => (
                  <li
                    key={iwork.intworkid} // Assuming value is unique
                    className="px-4 py-2"
                  >
                    {iwork.work !== null
                      ? iwork.work
                      : iwork.other !== null
                      ? iwork.other
                      : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2 md:mt-4">
              <p className="font-bold my-4 text-black dark:text-white text-lg">
                PDF Viewer
              </p>
              <PdfViewer docSrc={info.docsrc} />
            </div>
            <div className="flex justify-between mt-2">
              <button
                className="bg-red text-white px-3 py-1 mt-2 justify-start rounded"
                onClick={() => setReject(true)}
              >
                Reject
              </button>
              <button
                className="bg-blue text-white px-3 py-1 mt-2 justify-end rounded"
                onClick={() => setConfirm(true)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </section>
      {confirm && (
        <Modal onClose={() => setConfirm(false)}>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold">
              <p>
                Are you sure you want to confirm this Internship Confirmation?
              </p>
            </div>
            <div className="flex justify-between mt-2 w-10/12">
              <button
                className="bg-red text-white px-3 py-1 mt-2 justify-start rounded"
                onClick={() => setConfirm(false)}
              >
                No
              </button>
              <button
                className="bg-blue text-white px-3 py-1 mt-2 justify-end rounded"
                onClick={confirmConfirmation}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
      {confirmed && (
        <Modal onClose={() => push()}>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold">
              <p>Internship Confirmation Confirmed</p>
            </div>
            <button
              className="bg-blue text-white px-3 py-1 mt-2 justify-start rounded"
              onClick={() => push()}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      {reject && (
        <Modal onClose={() => setConfirm(false)}>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold">
              <p>
                Are you sure you want to reject this Internship Confirmation?
              </p>
            </div>
            <div className="flex justify-between mt-2 w-10/12">
              <button
                className="bg-blue text-white px-3 py-1 mt-2 justify-start rounded"
                onClick={() => setReject(false)}
              >
                No
              </button>
              <button
                className="bg-red text-white px-3 py-1 mt-2 justify-end rounded"
                onClick={rejectConfirmation}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
      {rejected && (
        <Modal onClose={() => push()}>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold">
              <p>Internship Confirmation Rejected</p>
            </div>
            <button
              className="bg-blue text-white px-3 py-1 mt-2 justify-start rounded"
              onClick={() => push()}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
};
