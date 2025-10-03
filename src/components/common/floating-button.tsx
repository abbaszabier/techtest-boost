"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DialogCustom from "@/components/common/dialog-custom";
import { Plus } from "lucide-react";
import Wizard from "@/components/wizard";
import Step1 from "@/components/steps/step1";
import Step2 from "@/components/steps/step2";
import Step3 from "@/components/steps/step3";
import Step4 from "@/components/steps/step4";
import { useWizardStore } from "@/store/useWizardStore";

export default function FloatingButton() {
  const [open, setOpen] = useState(false);
  const step = useWizardStore((s) => s.step);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
      >
        <Plus />
      </Button>

      <DialogCustom
        open={open}
        onOpenChange={setOpen}
        title="Create Post"
        size="lg"
        disableOutsideClose
      >
        <Wizard>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 setOpen={setOpen} />}
        </Wizard>
      </DialogCustom>
    </>
  );
}
