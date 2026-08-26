let emailVerificationInProgress = false;

export const startEmailVerification = () => {
  emailVerificationInProgress = true;
};

export const clearEmailVerification = () => {
  emailVerificationInProgress = false;
};

export const isEmailVerificationInProgress = () => emailVerificationInProgress;
