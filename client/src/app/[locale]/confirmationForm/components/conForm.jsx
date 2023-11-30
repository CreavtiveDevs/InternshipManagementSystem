import { useRouter } from "next/navigation";
import AuthConnect from "@/auth";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Modal from "../../globalComponents/modal";
import { DateInput } from "../../globalComponents/dateInput";
import { useReactToPrint } from "react-to-print";
import { PrintConfirmation } from "../../globalComponents/printConfirmation";
import UploadConForm from "./uploadConForm";

export const ConForm = () => {
  const [company, setCompany] = useState(null);
  const [student, setStudent] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState("");
  const [selectedWork, setSelectedWork] = useState([]);
  const [other, setOther] = useState("");
  const [hasValidationError, setHasValidationError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState(true);
  const [msg, setMsg] = useState("");
  const [docSrc, setDocSrc] = useState("");

  const [formData, setFormData] = useState({
    stdfname: "",
    stdlname: "",
    startdate: "",
    enddate: "",
    companyname: "",
    fields: "",
    website: "",
    compemail: "",
    compaddress: "",
    city: "",
    country: "",
    compphone: "",
    fax: "",
    selectedWork: [],
    other: "",
  });

  useEffect(() => {
    const getCompany = async (e) => {
      try {
        const response = await AuthConnect.post("/getstdcomp", {
          stdid: "22702906",
        });
        console.log(response.data);
        setCompany(response.data.company);
        setStudent(response.data.student);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getCompany();
  }, []);

  const handleWorkChange = (e) => {
    const workid = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedWork([...selectedWork, workid]);
      console.log(selectedWork);
    } else {
      setSelectedWork(selectedWork.filter((id) => id !== workid));
      console.log(selectedWork);
    }
  };

  const componentRef = useRef();
  const handlePrinting = useReactToPrint({
    content: () => componentRef.current,
  });

  const submitToggle = () => {
    setForm(!form);
  };

  const handleDocUploadSuccess = async (result) => {
    if (result.event === "success") {
      const url = result.info.secure_url;
      try {
        const response = await AuthConnect.post("/saveconform", {
          stdid: "22702906",
          docSrc: url,
        });
        if (response) {
          setConfirmed(true);
        }
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
          alert("Application Error"); // You can add a generic error message here
        }
      }
    }
  };

  const submitConForm = async (e) => {
    e.preventDefault();
    if (
      endDate === null ||
      startDate === null ||
      days === "" ||
      selectedWork.length === 0
    ) {
      setHasValidationError(true);
      return;
    }
    setFormData({
      stdfname: student.firstname,
      stdlname: student.lastname,
      startdate: startDate.toISOString().slice(0, 10),
      enddate: endDate.toISOString().slice(0, 10),
      companyname: company.name,
      fields: company.fields,
      website: company.website,
      compemail: company.email,
      compaddress: company.address,
      city: company.city,
      country: company.country,
      compphone: company.phoneno,
      fax: company.fax,
      selectedWork: selectedWork,
      other: other,
    });
    try {
      const response = await AuthConnect.post("/submitconform", {
        stdid: "22702906",
        startDate: startDate,
        endDate: endDate,
        duration: days,
        worktobeDone: selectedWork,
        other: other,
      });
      if (response) {
        handlePrinting();
        submitToggle();
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        alert("Application Error"); // You can add a generic error message here
      }
    }
  };

  if (!company) {
    return null;
  }

  return (
    <main>
      <div className="my-1 flex justify-center items-center font-bold pt-5">
        <div className="invisible absolute">
          <PrintConfirmation formData={formData} ref={componentRef} />
        </div>
        <div className="border-x-[0.4rem] text-2xl border-yellow dark:text-white">
          <p className="px-2">Internship Confirmation Form</p>
        </div>
      </div>
      <section className="p-2 bg-white dark:bg-dark_1 flex items-center justify-center px-4 sm:px-12 md:px-20">
        {form ? (
          <div className="bg-white dark:bg-dark_2 p-3.5 flex rounded shadow-xl dark:border-none border border-background_shade_2 w-[40rem] lg:w-[50rem] h-fit pb-10">
            <div className=" w-full    ">
              <p
                className={
                  " font-bold my-4 text-black dark:text-white text-sm md:text-md lg:text-lg  inline-flex text-center  border-yellow border-x-[0.3rem] md:border-x-[0.3rem] px-2"
                }
              >
                Information about the Company and Trainee
              </p>

              <form>
                <div className="mx-4 lg:mx-16">
                  <div className="   mt-2 relative  md:mt-1  lg:flex  lg:space-x-5   ">
                    <div className=" max-lg:md:mx-12 lg:w-1/2">
                      <span>Company Name: {company.name}</span>
                    </div>

                    <div className=" max-lg:md:mx-12 lg:w-1/2">
                      <span>Working Fields: {company.fields}</span>
                    </div>
                  </div>
                </div>

                <div className="mx-4 lg:mx-16">
                  <div className="mt-2 relative  md:mt-1  lg:flex  lg:space-x-5">
                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <span>Postal Address: {company.address}</span>
                    </div>

                    <div className=" max-lg:md:mx-12 lg:w-1/2">
                      <span>City: {company.city}</span>
                    </div>
                  </div>

                  <div className="mt-2 relative  md:mt-1  lg:flex  lg:space-x-5">
                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <span>Country: {company.country} </span>
                    </div>

                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <span>Fax: {company.fax}</span>
                    </div>
                  </div>

                  <div className="mt-2 relative  md:mt-1  lg:flex  lg:space-x-5">
                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <span>Telephone Number: {company.phoneno}</span>
                    </div>

                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <span>Organisation email: {company.email}</span>
                    </div>
                  </div>

                  <div className="mt-2 relative  md:mt-1  lg:flex  lg:space-x-5">
                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <span>Organisational website: {company.website}</span>
                    </div>

                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <span>
                        Name and Surname of Trainee: {student.firstname}{" "}
                        {student.lastname}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 relative  md:mt-1  lg:flex  lg:space-x-5">
                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <DateInput
                        placeholder="Internship Start Date"
                        onDateChange={(date) => setStartDate(date)}
                        value={startDate}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <DateInput
                        placeholder="Internship End Date"
                        onDateChange={(date) => setEndDate(date)}
                        value={endDate}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                  <div className="mt-2 relative  md:mt-1  lg:flex  lg:space-x-5">
                    <div className="max-lg:md:mx-12 lg:w-1/2">
                      <select
                        id="days"
                        name="days"
                        className="select w-full text-dark_2 dark:text-yellow bg-white dark:bg-dark_2 px-4 py-2.5 border-b-dark_2 dark:border-b-yellow border-x-0 border-t-0 mt-1 border-2 focus:outline-none"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                      >
                        <option
                          value=""
                          disabled
                          selected
                          className="text-dark_2 dark:text-yellow"
                        >
                          Duration(Working Days)
                        </option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                    </div>
                  </div>
                </div>

                <p
                  className={
                    " font-bold my-6 text-black dark:text-white text-sm md:text-md lg:text-lg  inline-flex text-center  border-yellow border-x-[0.4rem] md:border-x-[0.3rem] px-2"
                  }
                >
                  The Work To Be Done By The Student
                </p>
                <div className="mx-4 lg:mx-16 space-y-2 ">
                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={1}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          {" "}
                          Developing Software{" "}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={2}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          Operating system installation and maintenance{" "}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={3}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          Working as part of a team in a large software project{" "}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={4}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          Hardware fault diagnosis and repairs{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={5}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          Designing WEB pages
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={6}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          Developing a WEB application using ASP, .NET, PHP etc{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={7}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          Designing/working with databases{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={8}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          Learning to use complex company software{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" flex ">
                    <div className=" inline-flex   space-x-2 ">
                      <div>
                        <input
                          type={"checkbox"}
                          name=""
                          id=""
                          value={9}
                          onChange={handleWorkChange}
                        />
                      </div>
                      <div>
                        <label className=" dark:text-yellow">
                          Network installation and maintenance
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className=" flex ">
                    <div className=" inline-flex  space-x-2 ">
                      <div>
                        <label className=" dark:text-yellow ">
                          Other (please state in the box below){" "}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex pt-4">
                    <textarea
                      type={"text"}
                      name=""
                      id=""
                      className="input  w-full text-dark_2 dark:text-yellow placeholder:text-dark_2 dark:placeholder:text-yellow bg-white dark:bg-dark_2 px-4  border-b-dark_2 dark:border-b-yellow rounded mt-1 border-2  focus:outline-none h-[8rem]"
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex items-center justify-end text-white pt-10">
                    <button
                      type="button"
                      className="bg-blue py-2 px-3.5 rounded "
                      onClick={submitConForm}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <UploadConForm
            submitToggle={submitToggle}
            handleDocUploadSuccess={handleDocUploadSuccess}
          />
        )}
        ;
      </section>
      {hasValidationError && (
        <Modal onClose={() => setHasValidationError(false)}>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold">
              <p>Please fill in all required fields.</p>
            </div>
            <button
              onClick={() => setHasValidationError(false)}
              className="bg-blue text-white px-3 py-1 mt-2"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      {confirmed && (
        <Modal onClose={() => push()}>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold">
              <p>Internship Confirmation Form Submitted</p>
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
