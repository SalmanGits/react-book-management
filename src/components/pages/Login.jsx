import { useState } from 'react'
import { AppFonts } from '../../../public/font/font'
import { AppColor } from '../../../public/style/color'
import Button from '../library/button/Button'
import Input from '../library/input/Input'
import { AuthService } from '../../service/auth.service'
import showToast from '../utils/toast'
import { Link, useNavigate } from 'react-router-dom'
import { setLocalStorage } from '../../storage/LocalStorage'
import { useDispatch } from 'react-redux'
import { setAuthenticated } from '../../features/book.reducer'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
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
      const res = await AuthService.login(JSON.stringify(formData))
      if (!res.success) {
        showToast(res.message, "error");

      }
      else {
        showToast(res.message, "success");
        setLocalStorage("token", res.data.token)
        setLocalStorage("user", res.data.user.id)
        dispatch(setAuthenticated(true))

        navigate("/")
      }
    }
    catch (error) {
      console.log(error);
    }

  };
  const validateForm = () => {
    const errors = {
      email: formData.email.trim() === '' ? 'Email cannot be empty' : '',
      password: formData.password.trim() === '' ? 'Password cannot be empty' : '',
    };

    return errors;
  };
  return (
    <div className="main">
      <Input
        label="Email"
        type="text"
        name="email"
        placeholder=""
        onChange={handleInputChange}
        error={formErrors.email}
        value={formData.email}
        eye=""
        labelStyle={{
          color: AppColor.lightGreyColor,
          fontSize: AppFonts.fontSizeXSmall,
          fontWeight: AppFonts.fontSemiBold,
        }}

      />
      <Input
        label="Password"
        type="text"
        placeholder=""
        name="password"
        onChange={handleInputChange}
        error={formErrors.password}
        value={formData.password}
        eye={true}

        labelStyle={{
          color: AppColor.lightGreyColor,
          fontSize: AppFonts.fontSizeXSmall,
          fontWeight: AppFonts.fontSemiBold,
        }}

      />
      <Button
        onClickEvent={handleSubmit}
        text="Login"
        style={{
          fontWeight: AppFonts.fontMedium,
          fontSize: AppFonts.fontSizeXSmall,

        }}
        className="submit_btn"
      />
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Dont have an account?{' '}
        <Link to="/signup" style={{ color: AppColor.primaryColor }}>
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default Login