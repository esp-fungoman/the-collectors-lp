import Image from "next/image";
import { LeadForm } from "@/components/lead/LeadForm";
import { footerAssets, footerCopy } from "@/components/sections/footerContent";

export function Footer() {
  return (
    <footer id="contact" className="relative w-full scroll-mt-[5rem]">
      {/* Main stage — phone: Figma 19:2; tablet/desktop: artboard split */}
      <div className="relative flex min-h-[100svh] w-full flex-col overflow-hidden md:block md:min-h-0 md:h-[min(100vh,42rem)] lg:h-[48rem]">
        {/* Phone BG */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={footerAssets.bgMobile}
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority={false}
          />
        </div>
        {/* Tablet / desktop BG */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={footerAssets.bg}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Phone: address at top (Figma ~18px inset, ~36px top) */}
        <div className="relative z-[1] w-full px-[1.125rem] pt-[2.25rem] md:hidden">
          <Image
            src={footerAssets.address}
            alt="Phường Long Phước, Thành phố Hồ Chí Minh"
            width={554}
            height={99}
            className="h-auto w-full"
          />
        </div>

        {/* Phone: band so villa/title show before form */}
        <div className="relative min-h-[10rem] flex-1 md:hidden" aria-hidden />

        {/* Tablet/desktop: address bottom-left / Figma absolute */}
        <div className="absolute bottom-[2rem] left-[1.25rem] z-[1] hidden w-[min(18rem,42%)] md:block lg:bottom-auto lg:left-[5rem] lg:top-[35.4375rem] lg:w-[34.625rem]">
          <Image
            src={footerAssets.address}
            alt="Phường Long Phước, Thành phố Hồ Chí Minh"
            width={554}
            height={99}
            className="h-auto w-full"
          />
        </div>

        {/* Form — phone lower flow; tablet right; desktop Figma */}
        <div className="relative z-[2] mx-[1.125rem] mt-auto mb-[5.5rem] flex w-auto max-w-full flex-col self-stretch border border-[#FDD598] bg-[rgba(14,45,38,0.8)] px-[1.5rem] pb-[2rem] pt-[1.75rem] md:absolute md:top-1/2 md:right-[1.25rem] md:left-auto md:mx-0 md:mt-0 md:mb-0 md:h-auto md:max-h-[calc(100%-2rem)] md:w-[min(22rem,48%)] md:max-w-none md:-translate-y-1/2 md:self-auto md:overflow-y-auto md:px-[1.25rem] md:py-[1.25rem] lg:left-[52.375rem] lg:right-auto lg:h-[36.25rem] lg:w-[32.625rem] lg:max-h-none lg:overflow-visible lg:px-[2.5rem] lg:pb-[2.5rem] lg:pt-[2.1875rem] xl:left-[calc(50%-45rem+52.375rem)]">
          <header className="mb-[2rem] flex flex-col items-center text-center md:mb-[1.25rem]">
            <Image
              src={footerAssets.title}
              alt="Khám phá bộ sưu tập 58 dinh thự tinh hiếm"
              width={1064}
              height={624}
              className="h-auto w-full max-w-[16.625rem]"
            />
          </header>

          <LeadForm />
        </div>

        <p className="absolute right-[1.125rem] bottom-[1rem] z-[1] font-sans text-[0.75rem] font-medium text-white opacity-20 md:right-[1.25rem] md:bottom-[0.75rem] lg:right-[2.5rem] lg:bottom-[1.5rem]">
          {footerCopy.conceptLabel}
        </p>
      </div>

      {/* Copyright bar */}
      <div className="flex w-full flex-col gap-2 bg-[#C7AB86] px-[1.25rem] py-[0.75rem] text-white md:flex-row md:items-center md:justify-between md:gap-[2rem] lg:px-[5rem]">
        <p className="min-w-0 flex-1 font-sans text-[0.75rem] font-medium leading-[1.4] text-wrap md:text-balance">
          {footerCopy.disclaimer}
        </p>
        <p className="shrink-0 font-sans text-[0.75rem] font-medium leading-[1.4] md:text-right lg:whitespace-nowrap">
          {footerCopy.copyright}
        </p>
      </div>
    </footer>
  );
}
