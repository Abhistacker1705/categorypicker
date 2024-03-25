import { prisma } from "~/utils/prisma-client";

type SignUpParams = {
  email: string;
  password: string;
  name: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  verified: boolean;
};

export const signupFn = async ({ email, password, name }: SignUpParams) => {
  function generateOTP(length: number) {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser && !existingUser.verified) {
    await prisma.user.delete({
      where: { email },
    });
  }
  if (existingUser?.verified) {
    throw new Error("User with this email already exists and is verified");
  }

  const otp = generateOTP(8); //Not safe but used now for this project

  const newUser: User = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return {
    id: newUser.id,
    email: newUser.email,
    verified: newUser.verified,
    otp,
  };
};

//verifyStatus
export const changeVerifyStatus = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    await prisma.user.update({
      where: { email },
      data: { verified: true },
    });
  }
  return "User verified successfully";
};

//sign in
export const signinFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ email: string; name: string }> => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (!existingUser.verified) {
    throw new Error("User not verified");
  }

  if (existingUser.password !== password) {
    throw new Error("Incorrect password");
  }

  return {
    email: existingUser.email,
    name: existingUser.name,
  };
};
