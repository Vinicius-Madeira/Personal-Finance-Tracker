import SignupForm from "@/app/(public)/signup/signup-form";

export default function Signup() {
  return (
    <div className="grid grid-rows-[1fr_60px] justify-items-center p-4 mt-50 ">
      <div className="w-[20%]">
        <SignupForm />
      </div>
    </div>
  );
}
