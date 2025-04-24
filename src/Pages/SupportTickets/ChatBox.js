import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import TopNav from "../../Components/TopNav";
import {
  getTicketListServ,
  updateTicketServ,
} from "../../services/ticker.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import NoRecordFound from "../../Components/NoRecordFound";
import { useNavigate } from "react-router-dom";
function ChatBox() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [statics, setStatics] = useState(null);
  const [payload, setPayload] = useState({
    searchKey: "",
    status: "",
    pageNo: 1,
    pageCount: 10,
    sortByField: "",
    userType: "Driver",
  });
  const [showSkelton, setShowSkelton] = useState(false);
  const handleGetTicketFunc = async () => {
    if (list.length == 0) {
      setShowSkelton(true);
    }
    try {
      let response = await getTicketListServ(payload);
      setList(response?.data?.data);
      setStatics(response?.data?.documentCount);
    } catch (error) {}
    setShowSkelton(false);
  };
  const staticsArr = [
    {
      title: "Total Ticket",
      count: statics?.totalCount,
      bgColor: "#6777EF",
    },
    {
      title: "Open Tickets",
      count: statics?.activeCount,
      bgColor: "#63ED7A",
    },
    {
      title: "Closed Tickets",
      count: statics?.inactiveCount,
      bgColor: "#FFA426",
    },
  ];
  useEffect(() => {
    handleGetTicketFunc();
  }, [payload]);
  const [isLoadingId, setIsLoadingId] = useState("");
  const updateTicketFunc = async (formData) => {
    setIsLoadingId(formData?._id);
    try {
      let response = await updateTicketServ(formData);
      if (response?.data?.statusCode == "200") {
        toast.success(response?.data?.message);
        handleGetTicketFunc();
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
    setIsLoadingId("");
  };
  return (
    <div className="bodyContainer">
      <Sidebar selectedMenu="Support Tickets" selectedItem="" />
      <div className="mainContainer">
        <TopNav />
        <div className="p-lg-4 p-md-3 p-2">
          <div
            className="row mx-0 p-0"
            style={{
              position: "relative",
              top: "-75px",
              marginBottom: "-75px",
            }}
          >
            <div className="col-md-12 col-12 ">
              <div className="topCard shadow-sm py-4 px-3 rounded mb-3">
                <div className="d-flex align-items-center ">
                  <div
                    className="p-2 shadow rounded"
                    style={{ background: "red" }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/64/64572.png"
                      style={{ height: "60px" }}
                    />
                  </div>
                  <div className="ms-3">
                    <h5 className="text-secondary mb-0">Shubham Singh</h5>
                    <p className="text-secondary mb-0">7762042085</p>
                    <p className="text-secondary mb-0">
                      hittheshubham1810@gmail.com
                    </p>
                  </div>
                </div>
                <div className="row mt-4 d-flex align-items-center">
                  <div className=" col-md-6 col-12   ">
                    <div
                      className="d-flex algn-items-center px-4 py-2 shadow-sm text-dark my-md-0 my-2"
                      style={{ borderRadius: "20px", background: "whitesmoke" }}
                    >
                      <h5 className="mb-0">Subject :</h5>
                      <p className="mb-0 ms-2">Product Update Issue</p>
                    </div>
                  </div>
                  <div className=" col-md-4 col-12   ">
                    <div
                      className="d-flex algn-items-center px-4 py-2 shadow-sm text-dark my-md-0 my-2"
                      style={{ borderRadius: "20px", background: "whitesmoke" }}
                    >
                      <h5 className="mb-0">Category :</h5>
                      <p className="mb-0 ms-2">Product Update Issue</p>
                    </div>
                  </div>
                  <div className="col-md-2 col-12 my-md-0 my-2">
                    <select
                      className={
                        "form-control shadow-sm text-light py-0" +
                        (true ? " bg-info" : " bg-warning")
                      }
                      style={{ height: "40px", borderRadius: "20px" }}
                      // value={v?.status}
                      // onChange={(e) =>
                      //   updateTicketFunc({
                      //     status: e.target.value === "true",
                      //     _id: v?._id,
                      //   })
                      // }
                    >
                      <option value="">Select</option>
                      <option value="true">Open</option>
                      <option value="false">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 mx-3  chatBox shadow">
            {[1, 2, 3, 4, 5, 6]?.map((v, i) => {
              return (
                <div
                  className={
                    "d-flex  " + (i % 2 == 0 ? "justify-content-end" : " ")
                  }
                >
                  <div
                    className="bg-dark text-light p-1 px-4 d-flex align-items-center shadow-sm mt-3 mx-3"
                    style={{ borderRadius: "16px" }}
                  >
                    <p className="mb-0 me-2">Hello</p>
                    {i == 0 ? (
                      <img
                        style={{ height: "20px" }}
                        src="https://cdn-icons-png.flaticon.com/128/11205/11205182.png"
                      />
                    ) : (
                      <i
                        style={{ fontWeight: "400" }}
                        className="fa fa-check text-secondary"
                      />
                    )}
                  </div>
                </div>
              );
            })}

            <div className="row d-flex align-items-center bottomChatAction">
              <div className="col-10 p-0">
                <input
                  className="form-control"
                  placeholder="Start Typing ..."
                />
              </div>
              <div className="row col-2 p-0 m-0 d-flex align-items-center">
                <div className="col-3 d-flex justify-content-center p-0">
                  <img src="https://cdn-icons-png.flaticon.com/128/8191/8191607.png" />
                </div>
                <div className="col-9 p-0">
                  <button className="btn btn-sm btn-success w-100 ">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
