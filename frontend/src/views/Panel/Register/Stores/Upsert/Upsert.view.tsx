"use client";

import type { Store } from "@/@types";
import { PageTitle, Section } from "@/components";
import { MultiStepItem, MultiStepRoot } from "@/components/Form";
import { FormProvider } from "react-hook-form";
import { useLogic } from "./Upsert.logic";
import { GeneralStep } from "./steps";

export type UpsertProps = {
  store?: Store;
};

export const Upsert = (props: UpsertProps) => {
  const { data, methods } = useLogic(props);

  return (
    <>
      <PageTitle>
        {props.store ? `Editar ${props.store.name}` : "Criar Loja"}
      </PageTitle>
      <Section>
        <FormProvider {...data.form}>
          <form onSubmit={methods.handleSubmit}>
            <MultiStepRoot onCancel={methods.backToStores}>
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
