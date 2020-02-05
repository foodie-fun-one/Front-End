import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col
} from "reactstrap";
import "./Signup.css";

const SignUpForm = (props) => {
    const { register, handleSubmit, errors, watch } = useForm();
    const [newUser, setNewUser] = useState({
        email: "",
        username: "",
        password: "",
        city: "",
    })
    const password = useRef({});
    password.current = watch("password", props);
    const onSubmit = () => {
        console.log(newUser)
        axios
            .post("https://foodiefun-buildweek.herokuapp.com/api/register", newUser)
            .then(res => {
                console.log("SignUp submitted successfully", res)
                props.history.push("/explore")
            })
            .catch(err => {
                console.log("SignUp error occured", err)
            })
    };

    const handleChanges = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="signup-form-container">
            <Form className="signup-form" onSubmit={event => event.preventDefault()}>
                <Col>
                    <h2>Create an Account</h2>
                    <FormGroup>
                        <Label for="signupEmail">Email</Label>
                        <Input
                            id="signupEmail"
                            type="email"
                            name="email"
                            placeholder="i<3food@email.com"
                            onChange={handleChanges}
                            value={newUser.email}
                            innerRef={register({
                                required: "Email is required",
                                pattern: /^\S+@\S+$/i
                            })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="signupName">Name</Label>
                        <Input
                            id="signupName"
                            type="text"
                            name="username"
                            placeholder="FoodChampion2"
                            onChange={handleChanges}
                            value={newUser.username}
                            innerRef={register({
                                required: "Name is required",
                                maxLength: {
                                    value: 50,
                                    message: "Character limit exceeded"
                                }
                            })}
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="signupPassword">Password</Label>
                        <Input
                            id="signupPassword"
                            type="password"
                            name="password"
                            placeholder="********"
                            onChange={handleChanges}
                            value={newUser.password}
                            innerRef={register({
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="signupConfirmPassword">Confirm Password</Label>
                        <Input
                            id="signupConfirmPassword"
                            type="password"
                            name="password_confirm"
                            placeholder="********"
                            innerRef={register({
                                validate: value =>
                                    value === password.current || "Passwords must be the same"
                            })}
                        />
                        {errors.password_confirm && <p>{errors.password_confirm.message}</p>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="signupLocation">Location</Label>
                        <Input
                            id="signupLocation"
                            type="text"
                            name="city"
                            placeholder="Boston"
                            onChange={handleChanges}
                            value={newUser.city}
                            innerRef={register({
                                required: "Location is required"
                            })}
                        />
                        {errors.city && <p>{errors.city.message}</p>}
                    </FormGroup>
                    <FormGroup className="button-container">
                        <Button className="signup-button" type="submit" onClick={handleSubmit(onSubmit)}>
                            Create
                        </Button>
                    </FormGroup>
                    <p>Already have an account?<Link className="redirect-login" to="/login"> Login Here</Link></p>
                </Col>
            </Form>
        </div>
    )
}

export default SignUpForm;
