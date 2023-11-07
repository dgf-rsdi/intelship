import { useState, useEffect } from "react";
import CompanyForm from "../form/company-form";
import { fetchCompanyById, editCompanyAction } from "src/store/actionCreators/companyAction";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function EditCompany() {
  const [data, setData] = useState({
    companyName: "",
    address: "",
    owner: "",
    phone: "",
    phone2: ""
  });
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { company } = useSelector(state => state.companyReducer);
  // useEffect(() => {
  //   const pathSegments = window.location.pathname.split("/");
  //   const newId = pathSegments[2];
  //   // console.log(newId);
  //   setId(newId);
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 8000);
  //   dispatch(fetchCompanyById(newId));
  // }, [dispatch]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const pathSegments = window.location.pathname.split("/");
  //       const newId = pathSegments[2];
  //       setId(newId);
  //       // const response = await fetchCompanyById(newId)();
  //       const c = await response.json();
  //       if (!response.ok) throw c;
  //       setCompany(c);
  //     } catch (error) {
  //       router.push("/company");
  //       Swal.fire({
  //         icon: "error",
  //         iconColor: "#57240f",
  //         title: "Error!",
  //         text: error.response.data.message,
  //         color: "#080504",
  //         background: "#ebd7bb",
  //         confirmButtonColor: "#a35831"
  //       });
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   }
  //   // fetchData();
  // }, []);

  async function submitCompany(e) {
    e.preventDefault();
    try {
      const response = await editCompanyAction(company, id)();
      const c = await response.json();
      if (!response.ok) throw c;
      router.push("/company");
      Swal.fire({
        icon: "success",
        iconColor: "#57240f",
        title: "Edit Company Success!",
        color: "#080504",
        background: "#ebd7bb",
        confirmButtonColor: "#a35831"
      });
    } catch (error) {
      router.push("/company");
      Swal.fire({
        icon: "error",
        iconColor: "#57240f",
        title: "Error!",
        text: error.response.data.message,
        color: "#080504",
        background: "#ebd7bb",
        confirmButtonColor: "#a35831"
      });
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <>
      {/* <form className="bg-white rounded-md pb-4 my-1 px-10 pt-4 shadow-lg" onSubmit={submitCompany}> */}
        <CompanyForm />
      {/* </form> */}
    </>
  );
}
