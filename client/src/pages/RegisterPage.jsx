import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthService";

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		profileImage: null,
	});

	const [passwordMatch, setPasswordMatch] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
	}, [formData.password, formData.confirmPassword]);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData({
			...formData,
			[name]: name === "profileImage" ? files[0] : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const register_form = new FormData();
			for (const key in formData) {
				register_form.append(key, formData[key]);
			}

			await registerUser(register_form); // service layer
			navigate("/login");
		} catch (err) {
			console.log("Registration failed", err.message);
		}
	};

	return (
		<div className="register">
			<div className="register_content">
				<form className="register_content_form" onSubmit={handleSubmit}>
					<input placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
					<input placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
					<input placeholder="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
					<input placeholder="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
					<input
						placeholder="Confirm Password"
						name="confirmPassword"
						type="password"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>

					{!passwordMatch && <p style={{ color: "red" }}>Passwords are not matched!</p>}

					<input id="image" type="file" name="profileImage" accept="image/*" style={{ display: "none" }} onChange={handleChange} required />
					<label htmlFor="image">
						<img src="/assets/addImage.png" alt="add profile photo" />
						<p>Upload Your Photo</p>
					</label>

					{formData.profileImage && (
						<img src={URL.createObjectURL(formData.profileImage)} alt="profile photo" style={{ maxWidth: "80px" }} />
					)}

					<button type="submit" disabled={!passwordMatch}>
						REGISTER
					</button>
				</form>
				<a href="/login">Already have an account? Log In Here</a>
			</div>
		</div>
	);
};

export default RegisterPage;
