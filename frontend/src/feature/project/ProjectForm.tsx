import React, { type FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCloseModal, selectModalName } from "../../redux/modules/modals";
import { Form, Modal, Button, Heading, Content, Box, Icon } from "react-bulma-components";
import { useForm, type SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import { type ProjectState, addProject } from "../../redux/modules/projects";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProjectFormProps {
  companyId: string
};

export const ProjectForm: FC<ProjectFormProps> = ({ companyId }) => {
  const modalName = useSelector(selectModalName);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<ProjectState>();

  const onSubmit: SubmitHandler<ProjectState> = (data) => insertProject(data);

  const closeModal = () => {
    dispatch(setCloseModal());
  };

  const insertProject = (data: ProjectState) => {
    dispatch(addProject(data));
    dispatch(setCloseModal());
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "technologies"
  })

  return (
    <Modal
      show={modalName === "project"}
      onClose={() => {
        return closeModal();
      }}
    >
      <Modal.Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Card.Header showClose>
            <Modal.Card.Title>Add Project</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <input {...register("companyId", { value: companyId })} type="hidden" />
            <Form.Field>
              <Form.Label>Title</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="title"
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.title?.type === "required" ? "danger" : "text"
                      }
                      renderAs={"input"}
                    />
                  )}
                />
              </Form.Control>
              {errors.title?.type === "required" && (
                <Form.Help color="danger">name is required</Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>プロジェクト概要</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="summary"
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.title?.type === "required" ? "danger" : "text"
                      }
                      renderAs={"input"}
                    />
                  )}
                />
              </Form.Control>
              {errors.summary?.type === "required" && (
                <Form.Help color="danger">name is required</Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>メンバー数</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="member"
                  defaultValue={0}
                  rules={{ required: true }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.title?.type === "required" ? "danger" : "text"
                      }
                      renderAs={"input"}
                    />
                  )}
                />
              </Form.Control>
              {errors.summary?.type === "required" && (
                <Form.Help color="danger">name is required</Form.Help>
              )}
            </Form.Field>
            <Form.Field>
              <Form.Label>担当</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="jobRole"
                  defaultValue={""}
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.jobRole?.type === "required" ? "danger" : "text"
                      }
                      placeholder={"詳細設計、開発、テスト"}
                      renderAs={"input"}
                    />
                  )}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>業務内容</Form.Label>
              <Form.Control>
                <Controller
                  control={control}
                  name="description"
                  defaultValue={""}
                  rules={{ required: false }}
                  render={({ field: { ref, ...inputProps } }) => (
                    <Form.Input
                      {...inputProps}
                      domRef={ref}
                      color={
                        errors.description?.type === "required" ? "danger" : "text"
                      }
                      renderAs={"textarea"}
                    />
                  )}
                />
              </Form.Control>
            </Form.Field>
            <Heading renderAs="h3" size={5}>
              使用技術
              <Icon onClick={() => append({ name: "", version: "" })}>
                <FontAwesomeIcon icon={faPlus} />
              </Icon>
            </Heading>
            <Content>
              {fields.map((field, index) => (
                <Box key={field.id}>
                  <Form.Field>
                    <Form.Label>Skill Name</Form.Label>
                    <Form.Input
                      {...register(`technologies.${index}.name` as const, { required: 'スキル名は必須です' })}
                      placeholder="例: JavaScript"
                      color={errors.technologies?.[index]?.name ? 'danger' : undefined}
                      renderAs={"input"}
                    ></Form.Input>
                  </Form.Field>
                  <Form.Field>
                    <Form.Label>Version</Form.Label>
                    <Form.Input
                      {...register(`technologies.${index}.version` as const, { required: false })}
                      placeholder="例: JavaScript"
                      color={errors.technologies?.[index]?.version ? 'danger' : undefined}
                      renderAs={"input"}
                    />
                    <Button color="danger" onClick={() => remove(index)}>Remove a Skill</Button>
                  </Form.Field>
                </Box>
              ))}
            </Content>
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
