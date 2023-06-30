import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { Form, Modal } from "react-bulma-components";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { setCloseModal, selectModalName } from "../../redux/modules/modals";
import {
  QualificationState,
  addQualifications,
} from "../../redux/modules/qualifications";

export const QualificationForm: FC = () => {
  const modalName = useSelector(selectModalName);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<QualificationState>();

  const onSubmit: SubmitHandler<QualificationState> = (data) =>
    updateQualifications(data);
  const closeModal = () => {
    dispatch(setCloseModal());
  };

  const updateQualifications = (data: QualificationState) => {
    dispatch(addQualifications(data));
    dispatch(setCloseModal());
  };

  return (
    <Modal
      show={modalName === "qualification"}
      onClose={() => {
        return closeModal();
      }}
    >
      <Modal.Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Card.Header showClose>
            <Modal.Card.Title>Qualification</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Form.Field>
              <Form.Label>Name</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="name"
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
                  name="acquisitionDate"
                  rules={{ required: false }}
                  defaultValue={"2001-01-01"}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      onChange={(date) => {
                        onChange(date ? date.toString() : "");
                      }}
                      onBlur={onBlur}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      selected={value ? new Date(value) : null}
                    />
                  )}
                />
              </Form.Control>
              {errors.acquisitionDate?.type === "required" && (
                <Form.Help color="danger"></Form.Help>
              )}
            </Form.Field>
          </Modal.Card.Body>
        </form>
      </Modal.Card>
    </Modal>
  );
};
