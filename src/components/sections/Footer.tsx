import Image from "next/image";
import { LeadForm } from "@/components/lead/LeadForm";
import { footerAssets, footerCopy } from "@/components/sections/footerContent";

export function Footer() {
  return (
    <footer id="contact" className="relative w-full scroll-mt-[5rem]">
      {/* Main block — Figma 2:294 */}
      <div className="relative flex w-full flex-col overflow-hidden lg:block lg:h-[48rem]">
        <div className="absolute inset-0">
          <Image
            src={footerAssets.bg}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Spacer so BG shows above address on mobile */}
        <div className="relative h-[12rem] shrink-0 lg:hidden" aria-hidden />

        {/* Address */}
        <div className="relative z-[1] w-[min(18rem,72%)] px-[1.25rem] lg:absolute lg:left-[5rem] lg:top-[35.4375rem] lg:w-[34.625rem] lg:px-0">
          <Image
            src={footerAssets.address}
            alt="Phường Long Phước, Thành phố Hồ Chí Minh"
            width={554}
            height={99}
            className="h-auto w-full"
          />
        </div>

        {/* Form panel */}
        <div className="relative z-[2] mx-[1.25rem] mt-[1.5rem] mb-[2rem] flex flex-col border border-[#FDD598] bg-[rgba(14,45,38,0.8)] px-[1.5rem] pb-[2rem] pt-[1.75rem] lg:absolute lg:top-1/2 lg:left-[52.375rem] lg:mx-0 lg:mt-0 lg:mb-0 lg:h-[36.25rem] lg:w-[32.625rem] lg:-translate-y-1/2 lg:px-[2.5rem] lg:pb-[2.5rem] lg:pt-[2.1875rem] xl:left-[calc(50%-45rem+52.375rem)]">
          <header className="mb-[2rem] flex flex-col items-center text-center">
            <p className="font-sans text-[0.875rem] font-medium uppercase tracking-[0.04em] text-white">
              {footerCopy.formEyebrowTop}
            </p>
            <p className="mt-[0.15rem] font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#FDD598]">
              {footerCopy.formEyebrowBottom}
            </p>
            <div className="mt-[0.75rem] flex items-center gap-[0.75rem]">
              <span className="font-display text-[3rem] font-normal leading-none text-[#FDD598] lg:text-[3.625rem]">
                {footerCopy.formHighlight}
              </span>
              <span className="max-w-[6.5rem] text-left font-display text-[1rem] font-normal leading-[1.2] uppercase text-[#FDD598] lg:text-[1.125rem]">
                {footerCopy.formTitle}
              </span>
            </div>
          </header>

          <LeadForm />
        </div>

        <p className="relative z-[1] self-end px-[1.25rem] pb-[1rem] font-sans text-[0.75rem] font-medium text-white opacity-20 lg:absolute lg:right-[2.5rem] lg:bottom-[1.5rem] lg:px-0 lg:pb-0">
          {footerCopy.conceptLabel}
        </p>
      </div>

      {/* Copyright bar — Figma 2:286 */}
      <div className="flex w-full flex-col gap-[0.5rem] bg-[#C7AB86] px-[1.25rem] py-[0.75rem] text-white lg:flex-row lg:items-center lg:justify-between lg:gap-[2rem] lg:px-[5rem]">
        <p className="w-full font-sans text-[0.75rem] font-medium leading-[1.4] whitespace-nowrap">
          {footerCopy.disclaimer}
        </p>
        <p className="shrink-0 font-sans text-[0.75rem] font-medium leading-[1.4] lg:text-right lg:whitespace-nowrap">
          {footerCopy.copyright}
        </p>
      </div>
    </footer>
  );
}
