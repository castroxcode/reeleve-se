import React, { useState, useCallback } from 'react';
import type { FormData, FormErrors } from '../types';
import { UserIcon, CpfIcon, WhatsappIcon, CheckCircleIcon, SpinnerIcon } from './icons';

const InputField: React.FC<{
  id: keyof FormData;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
  icon: React.ReactNode;
  maxLength?: number;
}> = ({ id, label, value, onChange, error, placeholder, icon, maxLength }) => (
  <div>
    <label htmlFor={id} className="sr-only">{label}</label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full rounded-lg border py-3 pl-10 pr-3 text-brand-text shadow-sm transition duration-150 focus:outline-none focus:ring-2 ${
          error 
            ? 'border-red-400 focus:ring-red-500 focus:border-red-500' 
            : 'border-brand-accent/50 focus:ring-brand-primary/50 focus:border-brand-primary/50'
        }`}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const SuccessMessage: React.FC = () => (
    <div className="text-center p-8 bg-green-50 border-2 border-green-200 rounded-lg">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold font-serif text-green-800">Inscrição Confirmada!</h3>
        <p className="mt-2 text-green-700">
            Seus dados foram enviados com sucesso. Em breve, você receberá mais informações.
        </p>
    </div>
);


const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ fullName: '', cpf: '', whatsapp: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const formatCpf = useCallback((value: string): string => {
    const digitsOnly = value.replace(/\D/g, '');
    let masked = digitsOnly;
    if (digitsOnly.length > 9) {
      masked = `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}.${digitsOnly.slice(6, 9)}-${digitsOnly.slice(9, 11)}`;
    } else if (digitsOnly.length > 6) {
      masked = `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}.${digitsOnly.slice(6, 9)}`;
    } else if (digitsOnly.length > 3) {
      masked = `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 6)}`;
    }
    return masked;
  }, []);

  const formatWhatsapp = useCallback((value: string): string => {
    const digitsOnly = value.replace(/\D/g, '');
    let masked = digitsOnly;
    if (digitsOnly.length > 0) masked = `(${digitsOnly.slice(0, 2)}`;
    if (digitsOnly.length > 2) masked = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}`;
    if (digitsOnly.length > 7) masked = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
    return masked;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof FormData, value: string };
    setApiError(null); // Clear API error on change
    let processedValue = value;
    if (name === 'cpf') {
      processedValue = formatCpf(value);
    } else if (name === 'whatsapp') {
      processedValue = formatWhatsapp(value);
    }
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if(errors[name]) {
        setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[name];
            return newErrors;
        });
    }
  };
  
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório.';
    } else if (formData.fullName.trim().split(' ').length < 2) {
        newErrors.fullName = 'Por favor, insira seu nome e sobrenome.';
    }

    const cpfDigits = formData.cpf.replace(/\D/g, '');
    if (!cpfDigits) {
      newErrors.cpf = 'CPF é obrigatório.';
    } else if (cpfDigits.length !== 11) {
      newErrors.cpf = 'CPF inválido. Deve conter 11 dígitos.';
    }

    const whatsappDigits = formData.whatsapp.replace(/\D/g, '');
    if (!whatsappDigits) {
      newErrors.whatsapp = 'WhatsApp é obrigatório.';
    } else if (whatsappDigits.length !== 11) {
      newErrors.whatsapp = 'Número inválido. Inclua DDD + 9 dígitos.';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      
      const payload = {
          ...formData,
          cpf: formData.cpf.replace(/\D/g, ''),
          whatsapp: formData.whatsapp.replace(/\D/g, ''),
      };

      try {
        const response = await fetch('https://n8n.inboundin.com/webhook/reeleve-se', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Falha ao enviar os dados. Tente novamente.');
        }

        setIsSubmitted(true);
      } catch (error) {
        console.error('Erro no envio:', error);
        setApiError('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="w-full bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8">
      <h2 className="text-center text-3xl font-serif text-brand-primary mb-2">Garanta sua Vaga</h2>
      <p className="text-center text-brand-text/80 mb-6">Preencha os campos abaixo para se inscrever.</p>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <InputField
          id="fullName"
          label="Nome Completo"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Seu nome completo"
          icon={<UserIcon className="w-5 h-5 text-gray-400" />}
        />
        <InputField
          id="cpf"
          label="CPF"
          value={formData.cpf}
          onChange={handleChange}
          error={errors.cpf}
          placeholder="000.000.000-00"
          maxLength={14}
          icon={<CpfIcon className="w-5 h-5 text-gray-400" />}
        />
        <InputField
          id="whatsapp"
          label="WhatsApp"
          value={formData.whatsapp}
          onChange={handleChange}
          error={errors.whatsapp}
          placeholder="(00) 00000-0000"
          maxLength={15}
          icon={<WhatsappIcon className="w-5 h-5 text-gray-400" />}
        />
        {apiError && <p className="text-sm text-red-600 text-center">{apiError}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-brand-primary hover:bg-brand-text text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerIcon className="w-6 h-6 animate-spin" /> : 'Inscrever-se'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;