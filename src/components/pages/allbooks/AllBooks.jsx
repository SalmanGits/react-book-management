import { useEffect, useMemo, useState } from "react"
import WTable from "../../library/table/Table";
import { BookService } from './../../../service/book.service';
import { useDispatch, useSelector } from "react-redux";
import { setAllBookData } from "../../../features/book.reducer";
import Pagination from "../../utils/pagination/Pagination";
import Button from "../../library/button/Button";
// import { AppColor } from "../../../../public/style/color";
import { AppFonts } from "../../../../public/font/font";
import { useNavigate } from "react-router-dom";
import "./style.css"
import tableColumns from "../../utils/column";




const AllBooks = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.books.allBookData)
    const refresh = useSelector((state) => state.books.refresh)
    // const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(3)
    const [totalCount, setTotalCount] = useState()
    const [totalPages, setTotalPages] = useState()
    const navigate = useNavigate()
    console.log(data)
    const columns = useMemo(
        () => tableColumns,
        []
    );
    const fetchdata = async () => {
        const res = await BookService.getAllBooks(page, perPage)
        console.log(res)
        dispatch(setAllBookData(res.data))
        setTotalPages(res.totalPages)
        setTotalCount(res.totalCount)
    }
    useEffect(() => {

        fetchdata()
        // if (!data.length) {
        //     setPage(page - 1)

        // } else {
        //     return false
        // }

    }, [page, refresh])

    return (
        <div className="container">
            <div className="button_header">
                <Button
                    onClickEvent={() => navigate("/addbook")}
                    text="Add Book"
                    style={{

                        fontWeight: AppFonts.fontMedium,
                        fontSize: AppFonts.fontSizeXSmall,
                        padding: "5px 20px",
                    }}
                    className="submit_btn"
                />
            </div>
            <WTable columns={columns} data={data} button={true} />

            <Pagination page={page} setPage={setPage} totalCount={totalCount} totalPages={totalPages} setPerPage={setPerPage} perPage={perPage} />
        </div>
    );
}

export default AllBooks