import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { At, Lock, UserCircle } from "tabler-icons-react";
import Server from "../../src/Server";
import TailwindButton from "../../src/TailwindButton/TailwindButton";
import TailwindInput from "../../src/TailwindInput/TailwindInput";

const SignUpPage = () => {
  const [signingUp, setSigningUp] = useState(false);

  const [openSuccess, closeSuccess] = useSnackbar({ style: { backgroundColor: "green", color: "white", fontFamily: "monospace" } });
  const [openError] = useSnackbar({ style: { backgroundColor: "red", color: "white", fontFamily: "monospace" } });

  const handleSignUp = (e) => {
    e.preventDefault();
    let { firstName, lastName, username, email, password } = e.target;
    firstName = firstName.value;
    lastName = lastName.value;
    username = username.value;
    email = email.value;
    password = password.value;

    setSigningUp(true);
    Server.post("auth/sign-up", { firstName, lastName, username, email, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("x-auth-token", res.data.token);
        openSuccess("Signed up successfully! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/");
          closeSuccess();
        }, 2000);
        setSigningUp(false);
      })
      .catch((error) => {
        openError(error?.response?.data?.message || error.message || "Something unexpected went wrong.");
        setSigningUp(false);
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
          <h2 className={"text-xl font-bold"}>Let&apos;s Onboard You</h2>
          <p className={"text-sm text-gray-500 mt-1"}>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut.</p>
        </div>

        <form className={"space-y-3 mt-4"} onSubmit={handleSignUp}>
          <div className={"flex items-center justify-center gap-3"}>
            <TailwindInput name={"firstName"} type={"text"} placeholder={"First Name"} required />
            <TailwindInput name={"lastName"} type={"text"} placeholder={"Last Name"} required />
          </div>
          <TailwindInput name={"username"} type={"text"} placeholder={"Username"} required Icon={UserCircle} />
          <TailwindInput name={"email"} type={"email"} placeholder={"Your Email"} required Icon={At} />
          <TailwindInput name={"password"} type={"password"} placeholder={"Your Password"} required Icon={Lock} />
          <TailwindButton label={"Sign Up"} type={"submit"} loading={signingUp} />
        </form>

        <div className={"space-y-1 mt-4 text-center"}>
          <div className={"text-sm text-gray-500"}>
            <Link href={"/auth/sign-in"}>
              <span>
                Already have an account? <span className={"text-blue-300 cursor-pointer"}>Sign In</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
