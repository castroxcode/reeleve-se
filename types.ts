
export interface FormData {
  fullName: string;
  cpf: string;
  whatsapp: string;
}

export type FormErrors = {
  [K in keyof FormData]?: string;
};
