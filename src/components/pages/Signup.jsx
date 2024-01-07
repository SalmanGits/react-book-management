import { useState } from 'react'
import { AppFonts } from '../../../public/font/font'
import { AppColor } from '../../../public/style/color'
import Button from '../library/button/Button'
import Input from '../library/input/Input'
import { AuthService } from '../../service/auth.service'
import showToast from '../utils/toast'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: '',
        bio: ""

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
                showToast('Please fill in all fields', 'error');
                return;
            }
            const res = await AuthService.signup(JSON.stringify(formData))
            console.log(res)
            if (!res.success) {
                showToast(res.message, "error");
            }
            else {
                showToast(res.message.body, "success");
                navigate('/login');
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
            name: formData.name.trim() === '' ? 'Name cannot be empty' : '',
        };

        return errors;
    };
    return (
        <div className='main'>
            <Input
                label="Name"
                type="text"
                name="name"
                placeholder=""
                onChange={handleInputChange}
                error={formErrors.email}
                value={formData.name}
                eye=""
                labelStyle={{
                    color: AppColor.lightGreyColor,
                    fontSize: AppFonts.fontSizeXSmall,
                    fontWeight: AppFonts.fontSemiBold,
                }}

            />

            <Input
                label="Email"
                type="text"
                name="email"
                placeholder=""
                onChange={handleInputChange}
                error={formErrors.password}
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
                error=""
                value={formData.password}
                eye={true}

                labelStyle={{
                    color: AppColor.lightGreyColor,
                    fontSize: AppFonts.fontSizeXSmall,
                    fontWeight: AppFonts.fontSemiBold,
                }}

            />
            <Input
                label="Bio"
                type="text"
                name="bio"
                placeholder=""
                onChange={handleInputChange}
                error=""
                value={formData.bio}
                eye=""
                labelStyle={{
                    color: AppColor.lightGreyColor,
                    fontSize: AppFonts.fontSizeXSmall,
                    fontWeight: AppFonts.fontSemiBold,
                }}

            />

            <Button
                onClickEvent={handleSubmit}
                text="Signup"
                style={{
                    backgroundColor: AppColor.primaryColor,
                    fontWeight: AppFonts.fontMedium,
                    fontSize: AppFonts.fontSizeXSmall,
                    padding: "5px 20px",
                }}
                className="submit_btn"
            />
            <p style={{ marginTop: '10px', textAlign: 'center' }}>
                have an account?{' '}
                <Link to="/login" style={{ color: AppColor.primaryColor }}>
                    Login
                </Link>
            </p>
        </div>
    )
}

export default Signup