import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { At, Lock } from "tabler-icons-react";
import TailwindButton from "../../src/components/TailwindButton/TailwindButton";
import TailwindInput from "../../src/components/TailwindInput/TailwindInput";
import Server from "../../src/Server";

const SignInPage = () => {
  const [signingIn, setSigningIn] = useState(false);

  const [openSuccess, closeSuccess] = useSnackbar({ style: { backgroundColor: "green", color: "white", fontFamily: "monospace" } });
  const [openError] = useSnackbar({ style: { backgroundColor: "red", color: "white", fontFamily: "monospace" } });

  const handleSignIn = (e) => {
    e.preventDefault();
    let { email, password } = e.target;
    email = email.value;
    password = password.value;

    setSigningIn(true);
    Server.post("auth/sign-in", { email, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("x-auth-token", res.data.token);
        openSuccess("Signed in successfully! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/");
          closeSuccess();
        }, 2000);
        setSigningIn(false);
      })
      .catch((error) => {
        console.log(error);
        openError(error?.response?.data?.message || error.message || "Something unexpected went wrong.");
        setSigningIn(false);
      });
  };

  return (
    <div
      className={"w-full min-h-screen flex items-center justify-center p-4"}
      style={{
        backgroundImage: "url('/assets/backgrounds/auth-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className={"bg-gray-900 text-gray-200 p-6 rounded-md w-full max-w-sm"}>
        <div>
          <h2 className={"text-xl font-bold"}>Welcome Back</h2>
          <p className={"text-sm text-gray-500 mt-1"}>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut.</p>
        </div>

        <form className={"space-y-3 mt-4"} onSubmit={handleSignIn}>
          <TailwindInput name={"email"} type={"email"} placeholder={"Your Email"} required Icon={At} />
          <TailwindInput name={"password"} type={"password"} placeholder={"Your Password"} required Icon={Lock} />
          <TailwindButton label={"Sign In"} type={"submit"} loading={signingIn} />
        </form>

        <div className={"space-y-1 mt-4 text-center"}>
          <div className={"text-sm text-gray-500"}>
            <Link href={"/auth/forgot-password"}>Forgot Password?</Link>
          </div>

          <div className={"text-sm text-gray-500"}>
            <Link href={"/auth/sign-up"}>
              <span>
                Don&apos;t have an account yet? <span className={"text-blue-300 cursor-pointer"}>Sign Up</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
