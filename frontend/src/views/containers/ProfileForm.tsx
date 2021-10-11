import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ModalState, setOpenModal, setCloseModal, selectModalName } from "../../redux/modules/modals";
import { TransitionState, setLang } from "../../redux/modules/translations";
import { Form, Modal, Button } from "react-bulma-components";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string,
  address?: string,
  birthday?: Date,
  gender?: number,
  about?: string,
  nearestStation?: string,

}

export const ProfileForm: FC = () => {
  const modalName = useSelector(selectModalName);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const closeModal = () => {
    dispatch(setCloseModal());
  };

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
                <Form.Input type="text" {...register("name", { required: true })}
                  color={errors.name?.type === "required" ? "danger" : "text" } />
              </Form.Control>
              {errors.name?.type === "required" &&
                <Form.Help color="danger">
                  name is required
                </Form.Help>
              }
            </Form.Field>
            <Form.Field>
              <Form.Label>Birthday</Form.Label>
              <Form.Control>
                <Form.Input type="date" {...register("birthday", { required: false })}
                  color={errors.birthday?.type === "required" ? "danger" : "text" }
                  value="2001-01-01"
                />
              </Form.Control>
              {errors.birthday?.type === "required" &&
                <Form.Help color="danger">
                </Form.Help>
              }
            </Form.Field>
            <Form.Field>
              <Form.Label>Gender</Form.Label>
              <Form.Control>
                <Form.Radio {...register("gender", { required: false })}
                  color={errors.gender?.type === "required" ? "danger" : "text" }
                  value="male"
                >
                  male
                </Form.Radio>
                <Form.Radio {...register("gender", { required: false })}
                  color={errors.gender?.type === "required" ? "danger" : "text" }
                  value="female"
                >
                  female
                </Form.Radio>
              </Form.Control>
              {errors.birthday?.type === "required" &&
                <Form.Help color="danger">
                </Form.Help>
              }
            </Form.Field>
            <Form.Field>
              <Form.Label>About</Form.Label>
              <Form.Control>
                <Form.Textarea {...register("about", { required: false })}
                  color={errors.about?.type === "required" ? "danger" : "text" } />
              </Form.Control>
              {errors.about?.type === "required" &&
                <Form.Help color="danger">
                </Form.Help>
              }
            </Form.Field>
            <Form.Field>
              <Form.Label>NearestStation</Form.Label>
              <Form.Control>
                <Form.Input type="text" {...register("nearestStation", { required: false })}
                  color={errors.nearestStation?.type === "required" ? "danger" : "text" } />
              </Form.Control>
              {errors.nearestStation?.type === "required" &&
                <Form.Help color="danger">
                </Form.Help>
              }
            </Form.Field>

          </Modal.Card.Body>
          <Modal.Card.Footer>
            <Button color="success" submit={true}>Save</Button>
            <Button color="grey-light"
              onClick={() => {return closeModal()}}>
              Cancel
            </Button>
          </Modal.Card.Footer>
        </form>
      </Modal.Card>
    </Modal>
  );
};

export default ProfileForm;
