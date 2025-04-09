import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import {
  MultiStepNextBtn,
  MultiStepPrevBtn,
  MultiStepSubmitBtn,
} from "./Button";

export interface MultiStepContextProps {
  changeStep: (step?: number) => void;
  step: number;
  isLast: boolean;
  isFirst: boolean;
  navRef: React.RefObject<HTMLDivElement>;
}

export const MultiStepContext = createContext<MultiStepContextProps>(
  {} as MultiStepContextProps,
);

export type MultiStepRootProps = {
  children: React.ReactElement<{ label?: string; disabled?: boolean }>[];
  onCancel?: () => void;
};

export const MultiStepRoot = (props: MultiStepRootProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const childrenNodes = props.children.filter((child) => !child.props.disabled);

  const steps = childrenNodes.map((step) => ({
    label: step.props.label,
  }));

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  function handleNextStep(step?: number) {
    if (step) {
      setCurrentStep(step);
      return;
    }

    if (isLastStep) return;

    setCurrentStep((prev) => prev + 1);
  }

  function handlePrevStep() {
    if (isFirstStep) return;
    setCurrentStep((step) => step - 1);
  }

  return (
    <MultiStepContext.Provider
      value={{
        changeStep: handleNextStep,
        navRef,
        step: currentStep,
        isFirst: isFirstStep,
        isLast: isLastStep,
      }}
    >
      <div className="flex gap-4 border-b border-gray-200">
        <div className="w-1/4 border-r border-gray-200 px-10">
          <ol
            className={twMerge(
              "relative mt-6 border-gray-500 text-gray-400",
              childrenNodes.length > 1 && "border-s",
            )}
          >
            {steps.map((step, index) => (
              <li
                key={step.label}
                className="m-6 mb-10  ms-6 flex flex-col justify-center"
              >
                <span
                  className={twMerge(
                    "absolute -start-4 flex size-8 items-center justify-center rounded-full  ring-2 ring-black",
                    currentStep >= index ? "bg-black" : "bg-white text-black",
                  )}
                >
                  {currentStep > index ? (
                    <svg
                      className="size-3.5  text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>
                <h3 className="text-xl font-bold leading-tight text-black">
                  {step.label}
                </h3>
              </li>
            ))}
          </ol>
        </div>
        <div className="p-5">{childrenNodes[currentStep]}</div>
      </div>
      <div className="flex justify-end gap-6 p-6" ref={navRef}>
        <button
          onClick={props.onCancel}
          className="rounded-full px-4 py-2 font-bold hover:border hover:border-gray-600  hover:text-black hover:shadow focus:outline-none"
          type="button"
        >
          Cancelar
        </button>
        {!isFirstStep && (
          <MultiStepPrevBtn onClick={handlePrevStep} label="voltar" />
        )}
      </div>
    </MultiStepContext.Provider>
  );
};

export type MultiStepItemProps = {
  children: React.ReactElement;
} & MultiStepRootProps["children"][0]["props"];

/** Used as a child of `MultiStepRoot`, get the props needed to be used in the parent */
export const MultiStepItem = (props: MultiStepItemProps) => props.children;

export type MultiStepButtonProps = {
  type?: "SUBMIT" | "BUTTON";
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

/** Custom button that will be rendered inside the navigation bar */
export const MultiStepNextButton = (props: MultiStepButtonProps) => {
  const [render, setRender] = useState(false);
  const { navRef } = useContext(MultiStepContext);

  useEffect(() => {
    if (navRef.current) {
      setRender(true);
    }
  }, [navRef]);

  function handleClick() {
    !props.loading && props.onClick?.();
  }

  if (render) {
    return createPortal(
      <MultiStepNextBtn onClick={handleClick} label={props.label} />,
      navRef.current as HTMLDivElement,
    );
  }

  return <></>;
};

export const MultiStepSubmitButton = (props: MultiStepButtonProps) => {
  const [render, setRender] = useState(false);
  const { navRef } = useContext(MultiStepContext);

  useEffect(() => {
    if (navRef.current) {
      setRender(true);
    }
  }, [navRef]);

  function handleClick() {
    !props.loading && props.onClick?.();
  }

  if (render) {
    return createPortal(
      <MultiStepSubmitBtn
        onClick={handleClick}
        label={props.label}
        loading={props.loading}
      />,
      navRef.current as HTMLDivElement,
    );
  }

  return <></>;
};
