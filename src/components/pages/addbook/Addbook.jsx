import { useState } from 'react'
import { AppFonts } from '../../../../public/font/font'
import { AppColor } from '../../../../public/style/color'
import Button from '../../library/button/Button'
import Input from '../../library/input/Input'

import showToast from '../../utils/toast'
import { useNavigate } from 'react-router-dom'

import "./style.css"
import { getLocalStorage } from '../../../storage/LocalStorage'
import { BookService } from '../../../service/book.service'

const Addbook = () => {
  const navigate = useNavigate()
  const authorId = getLocalStorage("user")
  const [bookData, setbookData] = useState({
    title: '',
    description: '',
    genre: "",
    author: authorId
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    genre: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setbookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async () => {
    try {
      const validationErrors = validateForm();
      if (Object.values(validationErrors).some((error) => error !== '')) {
        setFormErrors(validationErrors);
        showToast('Please fill in all fields.', 'error');
        return;
      }
      const res = await BookService.publishBook(JSON.stringify(bookData))
      if (!res.success) {
        showToast(res.message, "error");

      }
      else {
        showToast(res.message, "success");
        navigate("/allbooks")
      }
    }
    catch (error) {
      console.log(error);
    }

  };
  const validateForm = () => {
    const errors = {
      title: bookData.title.trim() === '' ? 'Title cannot be empty' : '',
      description: bookData.description.trim() === '' ? "Description cannot be empty" : "",
      genre: bookData.genre.trim() === '' ? 'Genre cannot be empty' : '',
    };

    return errors;
  };
  return (
    <div className='main'>
      <h1>Add Book</h1>
      <Input
        label="Title"
        type="text"
        name="title"
        placeholder=""
        onChange={handleInputChange}
        error={formErrors.title}
        value={bookData.title}
        eye=""
        labelStyle={{
          fontSize: AppFonts.fontSizeXSmall,
          fontWeight: AppFonts.fontSemiBold,

        }}

      />

      <Input
        label="Description"
        type="text"
        placeholder=""
        name="description"
        onChange={handleInputChange}
        error={formErrors.description}
        value={bookData.description}
        eye=""

        labelStyle={{

          fontSize: AppFonts.fontSizeXSmall,
          fontWeight: AppFonts.fontSemiBold,

        }}

      />
      <Input
        label="Genre"
        type="text"
        name="genre"
        placeholder=""
        onChange={handleInputChange}
        error={formErrors.genre}
        value={bookData.genre}
        eye=""
        labelStyle={{
          color: AppColor.lightGreyColor,
          fontSize: AppFonts.fontSizeXSmall,
          fontWeight: AppFonts.fontSemiBold,
        }}

      />
      <Button
        onClickEvent={handleSubmit}
        text="Submit"
        style={{

          fontWeight: AppFonts.fontMedium,
          fontSize: AppFonts.fontSizeXSmall,
          padding: "5px 20px",
          margin: "8px"
        }}
        className="submit_btn"
      />

    </div>
  )
}

export default Addbook