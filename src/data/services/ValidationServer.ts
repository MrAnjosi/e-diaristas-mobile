export const ValidationService = {
  cep(cep = ""): boolean {
    return RemovePoints.value(cep).length === 8;
  },
};

export const RemovePoints = {
  value(value = ""): string {
    return value.replace(/\D/g, "");
  },
};
