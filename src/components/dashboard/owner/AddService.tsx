"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { createService } from "@/lib/action";
import {
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_CONDITIONS,
  EQUIPMENT_STATUSES,
  RENTAL_TYPES,
} from "@/lib/validation";
import { useSession } from "@/lib/auth-client";

const inputClass =
  "h-11 w-full rounded-xl border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] placeholder:text-[#94a49a] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10";

const textareaClass =
  "min-h-24 w-full rounded-xl border-[#dce9df] bg-white px-3.5 py-2.5 text-sm text-[#172b24] placeholder:text-[#94a49a] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10";

const selectClass =
  "h-11 w-full rounded-xl border border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] focus-visible:border-[#166534] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534]/10";

const labelClass = "text-sm font-medium text-[#172b24]";
const primaryButtonClass =
  "h-11 rounded-xl bg-[#166534] px-5 text-sm font-semibold text-white hover:bg-[#102a24]";

export default function AddService() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {data:session} = useSession();
  const user = session?.user;

  const location = "Dhaka";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);


    try {
      const result = await createService(new FormData(form));

      if (!result.success) {
        toast.add({
          type: "error",
          title: "Could not add equipment",
          description: result.message,
        });
        return;
      }

      toast.add({
        type: "success",
        title: "Equipment added",
        description: result.message,
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.add({
        type: "error",
        title: "Could not add equipment",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  console.log(user, "user");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className={primaryButtonClass} />}>
        <Plus aria-hidden="true" size={18} />
        Add Equipment
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#102a24]">
            Add a new service
          </DialogTitle>
          <DialogDescription>
            Fill in the details of the equipment you want to rent out.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5">
          <fieldset
            disabled={isSubmitting}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name" className={labelClass}>
                Equipment Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Bosch Hammer Drill"
                minLength={2}
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description" className={labelClass}>
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the equipment and what it is best used for..."
                minLength={10}
                required
                className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className={labelClass}>
                Category
              </Label>
              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select category
                </option>
                {EQUIPMENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className={labelClass}>
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Dhaka"
                minLength={2}
                required
                readOnly
                defaultValue={location || "Dhaka"}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentalPrice" className={labelClass}>
                Rental Price ($)
              </Label>
              <Input
                id="rentalPrice"
                name="rentalPrice"
                type="number"
                min={1}
                step="any"
                placeholder="e.g. 25"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentalType" className={labelClass}>
                Rental Type
              </Label>
              <select
                id="rentalType"
                name="rentalType"
                required
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select rental type
                </option>
                {RENTAL_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableQuantity" className={labelClass}>
                Available Quantity
              </Label>
              <Input
                id="availableQuantity"
                name="availableQuantity"
                type="number"
                min={1}
                step={1}
                placeholder="e.g. 5"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition" className={labelClass}>
                Condition
              </Label>
              <select
                id="condition"
                name="condition"
                required
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select condition
                </option>
                {EQUIPMENT_CONDITIONS.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition
                      .split("-")
                      .map(
                        (part) => part.charAt(0).toUpperCase() + part.slice(1)
                      )
                      .join(" ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand" className={labelClass}>
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                placeholder="e.g. Bosch"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className={labelClass}>
                Model
              </Label>
              <Input
                id="model"
                name="model"
                placeholder="e.g. GSB 16 RE"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="image" className={labelClass}>
                Equipment Image
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                className={`${inputClass} file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#f0fdf4] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#166534]`}
              />
              <p className="text-xs text-[#64756b]">
                JPG or PNG, up to 5MB. The image is uploaded to imgbb.
              </p>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="rentalTerms" className={labelClass}>
                Rental Terms and Conditions
              </Label>
              <Textarea
                id="rentalTerms"
                name="rentalTerms"
                placeholder="e.g. Deposit required, damage responsibility, late return fees..."
                minLength={10}
                required
                className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className={labelClass}>
                Status
              </Label>
              <select
                id="status"
                name="status"
                required
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select status
                </option>
                {EQUIPMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-[#dce9df] px-5 text-sm font-semibold text-[#102a24] hover:bg-[#f0fdf4] hover:text-[#166534]"
                />
              }
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={primaryButtonClass}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    size={16}
                    className="animate-spin"
                  />
                  Adding...
                </>
              ) : (
                "Add Equipment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
