import { useEffect, useMemo, useState } from "react"
import WTable from "../../library/table/Table";
import { BookService } from './../../../service/book.service';
import { useDispatch, useSelector } from "react-redux";
import {  setUserBook } from "../../../features/book.reducer";
import "./style.css"
import tableColumns from "../../utils/column";





const OurBooks = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.books.userBook)
  const columns = useMemo(
    () =>tableColumns,
    []
  );
  useEffect(() => {
    const fetchdata = async () => {
      const res = await BookService.getBooksOfUser()
      console.log(res)



      dispatch(setUserBook(res.data))
    }

    fetchdata()
  }, [])

  return (
    <div className="container">

      <WTable columns={columns} data={data} />


    </div>
  );
}

export default OurBooks