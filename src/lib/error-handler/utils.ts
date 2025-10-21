type ErrorItem = {
  code: string;
  message: string;
};

type ErrorMap = Record<string, ErrorItem>;

export const getErrorCodeObject = (errorDomains: ErrorMap[]) =>
  errorDomains.reduce(
    (acc, errorDomain) => ({
      ...acc,
      ...Object.fromEntries(Object.values(errorDomain).map((error) => [error.code, error.message])),
    }),
    {} as Record<string, string>
  );
