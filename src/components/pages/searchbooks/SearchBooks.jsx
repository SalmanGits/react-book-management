import { useEffect, useMemo, useState } from "react"
import WTable from "../../library/table/Table";
import { BookService } from './../../../service/book.service';
import { useDispatch, useSelector } from "react-redux";
import { setSearchedBook } from "../../../features/book.reducer";
import "./style.css"
import { AppColor } from "../../../../public/style/color";
import { AppFonts } from "../../../../public/font/font";
import Input from "../../library/input/Input";
import showToast from "../../utils/toast";
import tableColumns from "../../utils/column";
import { useDebounce } from "use-debounce";



const SearchBooks = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.books.searchedBook)
  const [title, setTitle] = useState("")
  const [debouncedValue] = useDebounce(title, 500);
  const columns = useMemo(
    () => tableColumns,
    []
  );
  useEffect(() => {

    const fetchdata = async () => {

      const res = await BookService.searchBook(debouncedValue)
      console.log(res)
      if (!res.success) {
        showToast(res.message, "error")

      }
      else {
        dispatch(setSearchedBook(res.data))
      }




    }

    fetchdata()
  }, [debouncedValue, dispatch])
  const handleInputChange = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div className="container">
      <div className="input_div">
        <Input
          label="Search"
          type="text"
          placeholder=""
          name="password"
          onChange={handleInputChange}
          error=""
          value={title}
          eye=""
          labelStyle={{
            color: AppColor.lightGreyColor,
            fontSize: AppFonts.fontSizeXSmall,
            fontWeight: AppFonts.fontSemiBold,
          }}

        />
      </div>
      {
        data?.length ? <WTable columns={columns} data={data} /> : ""
      }



    </div>
  );
}

export default SearchBooks