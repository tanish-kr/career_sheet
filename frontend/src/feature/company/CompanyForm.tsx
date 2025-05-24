import React, { type FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCloseModal, selectModalName } from "../../redux/modules/modals";
import { Form, Modal, Button } from "react-bulma-components";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
// import { type SkillState, addSkills } from "../../redux/modules/skills";
import { type CompanyState, addCompanies } from "../../redux/modules/companies";

export const CompanyForm: FC = () => {
  const modalName = useSelector(selectModalName);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompanyState>();

  const onSubmit: SubmitHandler<CompanyState> = (data) => insertCompany(data);

  const closeModal = () => {
    dispatch(setCloseModal());
  };

  const insertCompany = (data: CompanyState) => {
    dispatch(addCompanies(data));
    dispatch(setCloseModal());
  }

  return (
    <Modal
      show={modalName === "company"}
      onClose={() => {
        return closeModal();
      }}
    >
      <Modal.Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Card.Header showClose>
            <Modal.Card.Title>Add Company</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Form.Field>
              <Form.Label>Name</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="name"
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.name?.type === "required" ? "danger" : "text"
                      }
                      renderAs={"input"}
                    />
                  )}
                />
              </Form.Control>
              {errors.name?.type === "required" && (
                <Form.Help color="danger">name is required</Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>Employment Form</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="employmentForm"
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.employmentForm?.type === "required" ? "danger" : "text"
                      }
                      placeholder={"正社員"}
                      renderAs={"input"}
                    />
                  )}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Occupation</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="occupation"
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.employmentForm?.type === "required" ? "danger" : "text"
                      }
                      placeholder={"システムエンジニア"}
                      renderAs={"input"}
                    />
                  )}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Accomplishment</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="accomplishment"
                  defaultValue={""}
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.employmentForm?.type === "required" ? "danger" : "text"
                      }
                      placeholder={"その会社でやったこと"}
                      renderAs={"textarea"}
                    />
                  )}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Employees</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="employees"
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.employees?.type === "required" ? "danger" : "text"
                      }
                      renderAs={"input"}
                      type="number"
                    />
                  )}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>StartOn</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="startOn"
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.startOn?.type === "required" ? "danger" : "text"
                      }
                      renderAs={"input"}
                      type="month"
                    />
                  )}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>EndOn</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="endOn"
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.endOn?.type === "required" ? "danger" : "text"
                      }
                      renderAs={"input"}
                      type="month"
                    />
                  )}
                />
              </Form.Control>
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
