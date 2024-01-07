/* eslint-disable react/jsx-key */
import { useTable } from 'react-table';
import "./style.css"
import Button from '../button/Button';
import { AppColor } from '../../../../public/style/color';
import { AppFonts } from '../../../../public/font/font';
import { BookService } from '../../../service/book.service';
import showToast from '../../utils/toast';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRefresh } from '../../../features/book.reducer';


const WTable = ({ columns, data }) => {
    const dispatch =useDispatch()
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });
    const handleClick = async (id) => {
        const res = await BookService.unpublishBook(id)
        if (!res.success) {
            showToast(res.message, "error")
        }
        else {
            showToast(res.message, "success")
            dispatch(setRefresh())
            
            

        }
    }
    return (
        <table {...getTableProps()} className='table'>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {

                    prepareRow(row);
                    return (

                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <>

                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>



                                </>
                            ))}
                            <td>


                                <Button
                                    onClickEvent={() => handleClick(row.original._id)}
                                    text="Unpublish"
                                    style={{
                                        backgroundColor: AppColor.primaryColor,
                                        fontWeight: AppFonts.fontMedium,
                                        fontSize: AppFonts.fontSizeXSmall,
                                        padding: "5px 20px",
                                    }}
                                    className="submit_btn"
                                />
                            </td>
                        </tr>




                    );
                })}
            </tbody>
        </table>
    );
};
export default WTable;