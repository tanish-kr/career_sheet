import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ModalState, setOpenModal, setCloseModal, selectModalName } from "../../redux/modules/modals";
import { TransitionState, setLang } from "../../redux/modules/translations";
import { Form, Modal, Button } from "react-bulma-components";
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
  const modalName = useSelector(selectModalName);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const closeModal = () => {
    dispatch(setCloseModal());
  };

  return (
    <>
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
                  <Form.Input type="text" {...register("name", { required: true })} />
                </Form.Control>
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
    </>
  );
};

export default ProfileForm;
