"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";

import { createBookingCheckout } from "@/app/(root)/payment/actions";
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
import {
  dhakaDateString,
  getRentalBillingUnits,
  getRentalDays,
} from "@/lib/booking";
import type { TEquipment } from "@/types";

const inputClass =
  "h-11 w-full rounded-xl border-[#dce9df] bg-white px-3.5 text-sm text-[#172b24] focus-visible:border-[#166534] focus-visible:ring-[#166534]/10";
const labelClass = "text-sm font-medium text-[#172b24]";

export default function BookingDialog({
  equipment,
}: {
  equipment: TEquipment;
}) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rentalDays = getRentalDays(startDate, endDate);
  const billingUnits =
    rentalDays > 0
      ? getRentalBillingUnits(rentalDays, equipment.rentalType)
      : 0;
  const quantityNumber = Number(quantity);
  const estimatedTotal =
    billingUnits > 0 && Number.isInteger(quantityNumber) && quantityNumber > 0
      ? Math.round(equipment.rentalPrice * 100) * billingUnits * quantityNumber
      : 0;

  function validateForm(formData: FormData): string | null {
    const start = String(formData.get("startDate") ?? "");
    const end = String(formData.get("endDate") ?? "");
    const requiredQuantity = Number(formData.get("quantity"));
    const contactNumber = String(formData.get("contactNumber") ?? "").trim();
    const deliveryAddress = String(formData.get("deliveryAddress") ?? "").trim();
    const additionalNotes = String(formData.get("additionalNotes") ?? "").trim();
    const digits = contactNumber.replace(/\D/g, "");

    if (!start || !end) return "Choose both rental dates.";
    if (start < dhakaDateString()) return "The start date cannot be in the past.";
    if (end <= start) return "The end date must be after the start date.";
    if (!Number.isInteger(requiredQuantity) || requiredQuantity < 1) {
      return "Quantity must be at least one.";
    }
    if (requiredQuantity > equipment.availableQuantity) {
      return "Quantity cannot exceed the available equipment.";
    }
    if (
      !/^[+()\d\s.-]+$/.test(contactNumber) ||
      digits.length < 7 ||
      digits.length > 15 ||
      contactNumber.length > 32
    ) {
      return "Enter a valid contact number.";
    }
    if (deliveryAddress.length < 5 || deliveryAddress.length > 500) {
      return "Delivery address must be between 5 and 500 characters.";
    }
    if (additionalNotes.length > 2000) {
      return "Additional notes must be 2000 characters or fewer.";
    }
    return null;
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const { checkoutUrl } = await createBookingCheckout({
        equipmentId: equipment._id,
        startDate: String(formData.get("startDate")),
        endDate: String(formData.get("endDate")),
        quantity: Number(formData.get("quantity")),
        contactNumber: String(formData.get("contactNumber")).trim(),
        deliveryAddress: String(formData.get("deliveryAddress")).trim(),
        additionalNotes: String(formData.get("additionalNotes") ?? "").trim(),
      });

      window.location.assign(checkoutUrl);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not start secure checkout."
      );
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!submitting) setOpen(nextOpen);
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            disabled={equipment.status !== "active" || equipment.availableQuantity < 1}
            className="h-11 rounded-xl bg-[#166534] px-5 font-semibold text-white hover:bg-[#102a24]"
          />
        }
      >
        Book Now
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#102a24]">
            Book {equipment.name}
          </DialogTitle>
          <DialogDescription>
            Choose the rental dates and delivery details. The final amount is
            recalculated by the server before checkout.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitBooking} className="space-y-5">
          <fieldset
            disabled={submitting}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="space-y-2">
              <Label htmlFor="booking-start-date" className={labelClass}>
                Rental Start Date
              </Label>
              <Input
                id="booking-start-date"
                name="startDate"
                type="date"
                value={startDate}
                onChange={(event) => {
                  setStartDate(event.target.value);
                  setError(null);
                }}
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-end-date" className={labelClass}>
                Rental End Date
              </Label>
              <Input
                id="booking-end-date"
                name="endDate"
                type="date"
                min={startDate || undefined}
                value={endDate}
                onChange={(event) => {
                  setEndDate(event.target.value);
                  setError(null);
                }}
                required
                className={inputClass}
              />
              <p className="text-xs text-[#64756b]">
                The end date is the return date and is not billed as a rental
                day.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-quantity" className={labelClass}>
                Required Quantity
              </Label>
              <Input
                id="booking-quantity"
                name="quantity"
                type="number"
                min={1}
                max={equipment.availableQuantity}
                step={1}
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                  setError(null);
                }}
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-contact-number" className={labelClass}>
                Contact Number
              </Label>
              <Input
                id="booking-contact-number"
                name="contactNumber"
                type="tel"
                autoComplete="tel"
                minLength={7}
                maxLength={32}
                placeholder="+880 1XXX-XXXXXX"
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="booking-delivery-address" className={labelClass}>
                Delivery Address
              </Label>
              <Textarea
                id="booking-delivery-address"
                name="deliveryAddress"
                minLength={5}
                maxLength={500}
                required
                className="min-h-20 border-[#dce9df] bg-white text-sm focus-visible:border-[#166534] focus-visible:ring-[#166534]/10"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="booking-additional-notes" className={labelClass}>
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="booking-additional-notes"
                name="additionalNotes"
                maxLength={2000}
                className="min-h-20 border-[#dce9df] bg-white text-sm focus-visible:border-[#166534] focus-visible:ring-[#166534]/10"
              />
            </div>
          </fieldset>

          <div className="rounded-xl bg-[#f0fdf4] p-4">
            <p className="text-sm font-semibold text-[#102a24]">
              Estimated total
            </p>
            <p className="mt-1 text-xl font-bold text-[#166534]">
              ${(estimatedTotal / 100).toFixed(2)}
            </p>
            <p className="mt-1 text-xs leading-5 text-[#64756b]">
              {rentalDays > 0
                ? `${rentalDays} rental day(s), billed as ${billingUnits} ${equipment.rentalType} period(s) × ${quantityNumber || 0}. The server calculates the final amount.`
                : `Partial ${equipment.rentalType} periods are rounded up to a full period.`}
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={submitting}
                  className="border-[#dce9df] text-[#102a24]"
                />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 rounded-xl bg-[#166534] px-5 font-semibold text-white hover:bg-[#102a24]"
            >
              {submitting ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    size={16}
                    className="animate-spin"
                  />
                  Starting Checkout...
                </>
              ) : (
                "Continue to Payment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
