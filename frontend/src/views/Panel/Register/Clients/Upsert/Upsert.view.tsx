"use client";

import type { Client } from "@/@types";
import { PageTitle, Section } from "@/components";
import { MultiStepItem, MultiStepRoot } from "@/components/Form";
import { FormProvider } from "react-hook-form";
import { useLogic } from "./Upsert.logic";
import { GeneralStep } from "./steps";

export type UpsertProps = {
  client?: Client;
};

export const Upsert = (props: UpsertProps) => {
  const { data, methods } = useLogic(props);

  return (
    <>
      <PageTitle>
        {props.client ? `Editar ${props.client.name}` : "Criar Cliente"}
      </PageTitle>
      <Section>
        <FormProvider {...data.form}>
          <form onSubmit={methods.handleSubmit}>
            <MultiStepRoot onCancel={methods.backToClients}>
              <MultiStepItem label="Dados Gerais">
                <GeneralStep />
              </MultiStepItem>
              <MultiStepItem disabled={true}>
                <></>
              </MultiStepItem>
            </MultiStepRoot>
          </form>
        </FormProvider>
      </Section>
    </>
  );
};

export default Upsert;
