import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCloseModal, selectModalName } from "../../redux/modules/modals";
import { Form, Modal, Button } from "react-bulma-components";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SkillState, addSkills } from "../../redux/modules/skills";

export const SkillForm: FC = () => {
  const modalName = useSelector(selectModalName);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SkillState>();

  const onSubmit: SubmitHandler<SkillState> = (data) => insertSkill(data);

  const closeModal = () => {
    dispatch(setCloseModal());
  };

  const insertSkill = (data: SkillState) => {
    dispatch(addSkills(data));
    dispatch(setCloseModal());
  };

  return (
    <Modal
      show={modalName === "skill"}
      onClose={() => {
        return closeModal();
      }}
    >
      <Modal.Card>
        <form onSubmit={() => { void handleSubmit(onSubmit) }}>
          <Modal.Card.Header showClose>
            <Modal.Card.Title>Skill</Modal.Card.Title>
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
                    />
                  )}
                />
              </Form.Control>
              {errors.name?.type === "required" && (
                <Form.Help color="danger">name is required</Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>Experience</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="experience"
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <ul>
                      <li>
                        <Form.Radio {...inputProps} domRef={ref} value="20">
                          半年以内
                        </Form.Radio>
                      </li>
                      <li>
                        <Form.Radio {...inputProps} domRef={ref} value="40">
                          半年以上-1年未満
                        </Form.Radio>
                      </li>
                      <li>
                        <Form.Radio {...inputProps} domRef={ref} value="60">
                          1年以上-3年未満
                        </Form.Radio>
                      </li>
                      <li>
                        <Form.Radio {...inputProps} domRef={ref} value="80">
                          3年以上- 5年未満
                        </Form.Radio>
                      </li>
                      <li>
                        <Form.Radio {...inputProps} domRef={ref} value="100">
                          5年以上
                        </Form.Radio>
                      </li>
                    </ul>
                  )}
                />
              </Form.Control>
              {errors.experience?.type === "required" && (
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
