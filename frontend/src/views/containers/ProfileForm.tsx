import React, { FC } from "react";
import { Form } from "react-bulma-components";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string,
  address: string,
  birthDate: Date,
  gender: number,
  about: string,
  nearestStation: string,

}

export const ProfileForm: FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("name"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} />
    </form>
  );
};

export default ProfileForm;
