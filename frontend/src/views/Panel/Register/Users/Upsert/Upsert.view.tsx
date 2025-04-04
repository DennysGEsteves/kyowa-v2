"use client";

import type { User } from "@/@types";
import { PageTitle, Section } from "@/components";
import { MultiStepItem, MultiStepRoot } from "@/components/Form";
import { FormProvider } from "react-hook-form";
import { useLogic } from "./Upsert.logic";
import { GeneralStep, PhotoStep } from "./steps";

export type UpsertProps = {
  user?: User;
};

export const Upsert = (props: UpsertProps) => {
  const { data, methods } = useLogic(props);

  // const ChangeActiveValueBtn = data.isUserActive
  //   ? FormBtnDanger
  //   : FormBtnAction;

  return (
    <>
      <PageTitle>
        {props.user ? `Editar ${props.user.name}` : "Criar Usuario"}
      </PageTitle>
      <Section>
        <FormProvider {...data.form}>
          <form onSubmit={methods.handleSubmit}>
            <MultiStepRoot onCancel={methods.backToUsers}>
              <MultiStepItem label="Dados Gerais">
                <GeneralStep />
              </MultiStepItem>
              <MultiStepItem label="Foto">
                <PhotoStep />
              </MultiStepItem>
            </MultiStepRoot>
          </form>
        </FormProvider>
      </Section>
    </>
  );
};

export default Upsert;
