import LoginForm from "@/app/(public)/login/login-form";

export default function Login() {
  return (
    <div className="grid grid-rows-[1fr_60px] justify-items-center p-4 mt-50 ">
      <div className="w-[20%]">
        <LoginForm />
      </div>
    </div>
  );
}
