import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ModalState,
  setOpenModal,
  setCloseModal,
  selectModalName,
} from "../../redux/modules/modals";
import { selectProfile } from "../../redux/modules/profiles";
import DatePicker from "react-datepicker";
import { TransitionState, setLang } from "../../redux/modules/translations";
import { ProfileState, setProfile } from "../../redux/modules/profiles";
import { Form, Modal, Button } from "react-bulma-components";
import {
  useForm,
  useController,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

export const ProfileForm: FC = () => {
  const modalName = useSelector(selectModalName);
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ProfileState>();

  // TODO: submitでpostするdispatchを呼ぶ
  const onSubmit: SubmitHandler<ProfileState> = (data) => updateProfile(data);

  const closeModal = () => {
    dispatch(setCloseModal());
  };

  const updateProfile = (data: ProfileState) => {
    dispatch(setProfile(data));
    dispatch(setCloseModal());
  }

  return (
    <Modal
      show={modalName === "profile"}
      onClose={() => {
        return closeModal();
      }}
    >
      <Modal.Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Card.Header showClose>
            <Modal.Card.Title>Profile</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Form.Field>
              <Form.Label>Name</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="name"
                  defaultValue={profile.name || ""}
                  rules={{ required: true }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.name?.type === "required" ? "danger" : "text"
                      }
                    />
                  )}
                />
              </Form.Control>
              {errors.name?.type === "required" && (
                <Form.Help color="danger">name is required</Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>Birthday</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="birthday"
                  rules={{ required: false }}
                  defaultValue={profile.birthday ? new Date(profile.birthday) : new Date(2001, 0, 1)}
                  render={({ field: { onChange, onBlur, value, ...inputProps } }) => (
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      onChange={onChange}
                      onBlur={onBlur}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      selected={value as Date}
                    />
                  )}
                />
              </Form.Control>
              {errors.birthday?.type === "required" && (
                <Form.Help color="danger"></Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>Gender</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="gender"
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <>
                      <Form.Radio
                        {...inputProps}
                        domRef={ref}
                        color={
                          errors.gender?.type === "required" ? "danger" : "text"
                        }
                        value="male"
                      >
                        male
                      </Form.Radio>
                      <Form.Radio
                        {...inputProps}
                        domRef={ref}
                        color={
                          errors.gender?.type === "required" ? "danger" : "text"
                        }
                        value="famel"
                      >
                        female
                      </Form.Radio>
                    </>
                  )}
                />
              </Form.Control>
              {errors.gender?.type === "required" && (
                <Form.Help color="danger"></Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>About</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="about"
                  defaultValue={profile.about || ""}
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Textarea
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.about?.type === "required" ? "danger" : "text"
                      }
                    />
                  )}
                />
              </Form.Control>
              {errors.about?.type === "required" && (
                <Form.Help color="danger"></Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>NearestStation</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="nearestStation"
                  defaultValue={profile.nearestStation || ""}
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.nearestStation?.type === "required"
                          ? "danger"
                          : "text"
                      }
                    />
                  )}
                />
              </Form.Control>
              {errors.nearestStation?.type === "required" && (
                <Form.Help color="danger"></Form.Help>
              )}
            </Form.Field>
          </Modal.Card.Body>
          <Modal.Card.Footer>
            <Button color="success" submit={true}>
              Save
            </Button>
            <Button
              color="grey-light"
              onClick={() => {
                return closeModal();
              }}
            >
              Cancel
            </Button>
          </Modal.Card.Footer>
        </form>
      </Modal.Card>
    </Modal>
  );
};

export default ProfileForm;
