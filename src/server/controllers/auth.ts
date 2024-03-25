import { prisma } from "~/utils/prisma-client";

type SignUpParams = {
  email: string;
  password: string;
  name: string;
};

export const signupFn = async ({
  email,
  password,
  name,
}: SignUpParams): Promise<{
  id: number;
  email: string;
  verified: boolean;
  otp: string;
}> => {
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

  if (existingUser) {
    if (existingUser.verified) {
      throw new Error("User with this email already exists and is verified");
    } else {
      const otp = generateOTP(8);
      return {
        id: existingUser.id,
        email: existingUser.email,
        verified: existingUser.verified,
        otp,
      };
    }
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  const otp = generateOTP(8);
  return {
    id: newUser.id,
    email: newUser.email,
    verified: newUser.verified,
    otp,
  };
};

export const changeVerifyStatus = async ({
  email,
}: {
  email: string;
}): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.verified) {
    return "User is already verified";
  }

  await prisma.user.update({
    where: { email },
    data: { verified: true },
  });

  return "User verified successfully";
};

export const signinFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ email: string; name: string; id: number }> => {
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
    id: existingUser.id,
  };
};
