import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="App">
      <div className="form-div">
        <h2 style={{ textAlign: "center" }}>Shipment Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
          <input
            {...register("name", { required: true })}
            placeholder="Your name"
          />
          {errors.name?.type === "required" && (
            <span className="errorHandle">Name is required</span>
          )}
          <input
            {...register("email", { required: true })}
            defaultValue={loggedInUser.email}
            placeholder="Email"
          />
          {errors.email && (
            <span className="errorHandle">Email is required</span>
          )}
          <input
            {...register("address", { required: true })}
            placeholder="Address"
          />
          {errors.address && (
            <span className="errorHandle">Address is required</span>
          )}
          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
          />
          {errors.phone && (
            <span className="errorHandle">Phone number is required</span>
          )}
          <input className="sub-button" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Shipment;
