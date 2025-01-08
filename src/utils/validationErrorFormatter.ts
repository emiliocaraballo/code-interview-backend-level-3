export const formatValidationErrors = (err: any) => {
    return err.details.map((detail: any) => ({
      field: detail.context?.key,
      message: detail.message,
    }));
  };
  