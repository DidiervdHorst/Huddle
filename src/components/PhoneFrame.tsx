import type { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EFE9F7] p-0 sm:p-8">
      <div className="relative w-full h-[100svh] sm:h-[860px] sm:max-h-[92vh] sm:w-[400px] sm:rounded-[56px] rounded-none overflow-hidden sm:border-[10px] border-0 border-[#151022] sm:shadow-[0_30px_80px_rgba(60,30,90,0.35)]">
        {/* Notch */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[28px] bg-[#151022] rounded-b-2xl z-50 items-center justify-center">
          <div className="w-12 h-1.5 rounded-full bg-[#2a2438]" />
        </div>
        <div className="relative w-full h-full overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
