import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import TopNav from "../../Components/TopNav";
import {
  getAttributeSetServ,
  addAttributeSetServ,
  updateAttributeSetServ,
  deleteAttributeSetServ,
} from "../../services/attributeSet.services";
import {
getSubCategoryServ,
} from "../../services/subCategory.service"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import NoRecordFound from "../../Components/NoRecordFound";
function AttributeSetList() {
  const [list, setList] = useState([]);
  const [statics, setStatics] = useState(null);
  const [payload, setPayload] = useState({
    searchKey: "",
    status: "",
    pageNo: 1,
    pageCount: 10,
    sortByField: "",
  });
  const [showSkelton, setShowSkelton] = useState(false);
  const handleGetCategoryFunc = async () => {
    if (list.length == 0) {
      setShowSkelton(true);
    }
    try {
      let response = await getAttributeSetServ(payload);
      setList(response?.data?.data);
      setStatics(response?.data?.documentCount);
    } catch (error) {}
    setShowSkelton(false);
  };
  const staticsArr = [
    {
      title: "Total Attribute Set",
      count: statics?.totalCount,
      bgColor: "#6777EF",
    },
    {
      title: "Active Attribute Set",
      count: statics?.activeCount,
      bgColor: "#63ED7A",
    },
    {
      title: "Inactive Attribute Set",
      count: statics?.inactiveCount,
      bgColor: "#FFA426",
    },
  ];
  useEffect(() => {
    handleGetCategoryFunc();
  }, [payload]);
  const [isLoading, setIsLoading] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    status: "",
    subCategoryId: "",
    show: false,
  });
  const handleAddCategoryFunc = async () => {
    setIsLoading(true);
    try {
      let response = await addAttributeSetServ(addFormData);
      if (response?.data?.statusCode == "200") {
        toast.success(response?.data?.message);
        setAddFormData({
          name: "",
          status: "",
          subCategoryId: "",
          show: false,
        });
        handleGetCategoryFunc();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Internal Server Error"
      );
    }
    setIsLoading(false);
  };
  const handleDeleteCategoryFunc = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmed) {
      try {
        let response = await deleteAttributeSetServ(id);
        if (response?.data?.statusCode == "200") {
          toast?.success(response?.data?.message);
          handleGetCategoryFunc();
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Internal Server Error"
        );
      }
    }
  };
  const [editFormData, setEditFormData] = useState({
    name: "",
    status: "",
    subCategoryId: "",
    _id: "",
  });
  const handleUpdateCategoryFunc = async () => {
    setIsLoading(true);
    try {
      let response = await updateAttributeSetServ(editFormData);
      if (response?.data?.statusCode == "200") {
        toast.success(response?.data?.message);
        setEditFormData({
          name: "",
          status: "",
          subCategoryId: "",
          _id: "",
        });
        handleGetCategoryFunc();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Internal Server Error"
      );
    }
    setIsLoading(false);
  };
  const [subCategoryArr, setSubCategoryArr]=useState([]);
  const getSubCategoryList =async ()=>{
    try {
      let response = await getSubCategoryServ({status:true});
      if(response?.data?.statusCode=="200"){
        setSubCategoryArr(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getSubCategoryList()
  }, [])
  return (
    <div className="bodyContainer">
      <Sidebar
        selectedMenu="Product Management"
        selectedItem="Attribute Sets"
      />
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
            {staticsArr?.map((v, i) => {
              return (
                <div className="col-md-4 col-12 ">
                  <div className="topCard shadow-sm py-4 px-3 rounded mb-3">
                    <div className="d-flex align-items-center ">
                      <div
                        className="p-2 shadow rounded"
                        style={{ background: v?.bgColor }}
                      >
                        <img src="https://cdn-icons-png.flaticon.com/128/666/666120.png" />
                      </div>
                      <div className="ms-3">
                        <h6>{v?.title}</h6>
                        <h2 className="text-secondary">{v?.count}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row m-0 p-0 d-flex align-items-center my-4 topActionForm">
            <div className="col-lg-2 mb-2 col-md-12 col-12">
              <h3 className="mb-0 text-bold text-secondary">Attribute Sets</h3>
            </div>
            <div className="col-lg-4 mb-2 col-md-12 col-12">
              <div>
                <input
                  className="form-control borderRadius24"
                  placeholder="Search"
                  onChange={(e) =>
                    setPayload({ ...payload, searchKey: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 mb-2  col-md-6 col-12">
              <div>
                <select
                  className="form-control borderRadius24"
                  onChange={(e) =>
                    setPayload({ ...payload, status: e.target.value })
                  }
                >
                  <option value="">Select Status</option>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 mb-2 col-md-6 col-12">
              <div>
                <button
                  className="btn btn-primary w-100 borderRadius24"
                  style={{ background: "#6777EF" }}
                  onClick={() => setAddFormData({ ...addFormData, show: true })}
                >
                  Add Attribute Set
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="card-body px-2">
              <div className="table-responsive table-invoice">
                <table className="table">
                  <tbody>
                    <tr style={{ background: "#F3F3F3", color: "#000" }}>
                      <th
                        className="text-center py-3"
                        style={{ borderRadius: "30px 0px 0px 30px" }}
                      >
                        Sr. No
                      </th>

                      <th className="text-center py-3">Attribute Set Name</th>
                      <th className="text-center py-3">Sub Category</th>
                      <th className="text-center py-3">Status</th>
                      <th className="text-center py-3">Created At</th>
                      <th
                        className="text-center py-3 "
                        style={{ borderRadius: "0px 30px 30px 0px" }}
                      >
                        Action
                      </th>
                    </tr>
                    <div className="py-2"></div>
                    {showSkelton
                      ? [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((v, i) => {
                          return (
                            <>
                              <tr key={i}>
                                <td className="text-center">
                                  <Skeleton width={50} height={50} />
                                </td>

                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                                <td className="text-center">
                                  <Skeleton width={100} height={25} />
                                </td>
                              </tr>
                              <div className="py-2"></div>
                            </>
                          );
                        })
                      : list?.map((v, i) => {
                          return (
                            <>
                              <tr>
                                <td className="text-center">{i + 1}</td>

                                <td className="font-weight-600 text-center">
                                  {v?.name}
                                </td>
                                <td className="font-weight-600 text-center">
                                  {v?.subCategoryId?.name}
                                </td>
                                <td className="text-center">
                                  {v?.status ? (
                                    <div
                                      className="badge py-2"
                                      style={{ background: "#63ED7A" }}
                                    >
                                      Active
                                    </div>
                                  ) : (
                                    <div
                                      className="badge py-2 "
                                      style={{ background: "#FFA426" }}
                                    >
                                      Inactive
                                    </div>
                                  )}
                                </td>
                                <td className="text-center">
                                  {moment(v?.createdAt).format("DD-MM-YY")}
                                </td>
                                <td className="text-center">
                                  <a
                                    onClick={() => {
                                      setEditFormData({
                                        name: v?.name,
                                        status: v?.status,
                                        _id: v?._id,
                                        subCategoryId: v?.subCategoryId,
                                      });
                                    }}
                                    className="btn btn-info mx-2 text-light shadow-sm"
                                  >
                                    Edit
                                  </a>
                                  <a
                                    onClick={() =>
                                      handleDeleteCategoryFunc(v?._id)
                                    }
                                    className="btn btn-warning mx-2 text-light shadow-sm"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                              <div className="py-2"></div>
                            </>
                          );
                        })}
                  </tbody>
                </table>
                {list.length == 0 && !showSkelton && <NoRecordFound />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {addFormData?.show && (
        <div
          className="modal fade show d-flex align-items-center  justify-content-center "
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                borderRadius: "16px",
                background: "#f7f7f5",
                width: "364px",
              }}
            >
              <div className="d-flex justify-content-end pt-4 pb-0 px-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9068/9068699.png"
                  style={{ height: "20px" }}
                  onClick={() =>
                    setAddFormData({
                      name: "",
                      status: "",
                      subCategoryId: "",
                      show: false,
                    })
                  }
                />
              </div>

              <div className="modal-body">
                <div
                  style={{
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                  className="d-flex justify-content-center w-100"
                >
                  <div className="w-100 px-2">
                    <h5 className="mb-4">Add Attribute Set</h5>
                    <label className="mt-3">Name</label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) =>
                        setAddFormData({ ...addFormData, name: e.target.value })
                      }
                    />
                    <label className="mt-3">Sub Category</label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setAddFormData({
                          ...addFormData,
                          subCategoryId: e.target.value,
                        })
                      }
                      value={addFormData?.subCategoryId}
                    >
                      <option value="">Select Status</option>
                      {subCategoryArr?.map((v, i)=>{
                        return(
                          <option value={v?._id}>{v?.name}</option>
                        )
                      })}
                    </select>
                    <label className="mt-3">Status</label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setAddFormData({
                          ...addFormData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Status</option>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                    {addFormData?.name && addFormData?.status ? (
                      <button
                        className="btn btn-success w-100 mt-4"
                        onClick={!isLoading && handleAddCategoryFunc}
                      >
                        {isLoading ? "Saving..." : "Submit"}
                      </button>
                    ) : (
                      <button
                        className="btn btn-success w-100 mt-4"
                        style={{ opacity: "0.5" }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {addFormData?.show && <div className="modal-backdrop fade show"></div>}
      {editFormData?._id && (
        <div
          className="modal fade show d-flex align-items-center  justify-content-center "
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                borderRadius: "16px",
                background: "#f7f7f5",
                width: "364px",
              }}
            >
              <div className="d-flex justify-content-end pt-4 pb-0 px-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9068/9068699.png"
                  style={{ height: "20px" }}
                  onClick={() =>
                    setEditFormData({
                      name: "",
                      image: "",
                      status: "",
                      subCategoryId: "",
                      _id: "",
                    })
                  }
                />
              </div>

              <div className="modal-body">
                <div
                  style={{
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                  className="d-flex justify-content-center w-100"
                >
                  <div className="w-100 px-2">
                    <h5 className="mb-4">Update Attribute Set</h5>
                    <label className="mt-3">Name</label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      value={editFormData?.name}
                    />
                    <label className="mt-3">Sub Category</label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          subCategoryId: e.target.value,
                        })
                      }
                      value={editFormData?.subCategoryId}
                    >
                      <option value="">Select Status</option>
                      {subCategoryArr?.map((v, i)=>{
                        return(
                          <option value={v?._id}>{v?.name}</option>
                        )
                      })}
                    </select>
                    <label className="mt-3">Status</label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          status: e.target.value,
                        })
                      }
                      value={editFormData?.status}
                    >
                      <option value="">Select Status</option>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                    {editFormData?.name &&
                    editFormData?.status &&
                    editFormData?.subCategoryId ? (
                      <button
                        className="btn btn-success w-100 mt-4"
                        onClick={!isLoading && handleUpdateCategoryFunc}
                      >
                        {isLoading ? "Saving..." : "Submit"}
                      </button>
                    ) : (
                      <button
                        className="btn btn-success w-100 mt-4"
                        style={{ opacity: "0.5" }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {editFormData?._id && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default AttributeSetList;
