"use client";

import { InputFotos } from "@/components/ui/InputFotos";
import Required from "@/components/ui/Required";
import { getIconByStatus } from "@/lib/utils/alerts";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function FormAddReclamacao() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${apiUrl}/api/reclamacao/adicionar`, {
      method: "POST",
      credentials: "include" as RequestCredentials,
      body: formData,
    });

    const data = await response.json();

    if (data.message) {
      Swal.fire({
        title:"Adicionar Reclamação",
        text: data.message,
        icon: getIconByStatus(response.status)
      }).then(() => {
        if (response.status === 201) {
          router.push(`/reclamacao/${data.reclamacao.id}`)
        }
      });
    }
  }
  return(
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-gray-800 rounded-xl p-2 px-10"
    >
      <label htmlFor="titulo">
        Titulo<Required/>
      </label>
      <input
        required
        id="titulo"
        name="titulo"
        type="text"
        placeholder="Insira o título"
      />
      <label htmlFor="descricao">
        Descrição<Required/>
      </label>
      <input
        required
        id="descricao"
        name="descricao"
        type="text"
        placeholder="Insira a descrição"
      />
      <label htmlFor="cidade">
        Cidade<Required/>
      </label>
      <input
        required
        id="cidade"
        name="cidade"
        type="text"
        placeholder="Insira a cidade"
      />
      <label htmlFor="endereco">Endereço</label>
      <input
        id="endereco"
        name="endereco"
        type="text"
        placeholder="Insira a cidade"
      />
      <label htmlFor="fotos">Fotos (máximo 5)</label>
      <InputFotos />
      <button type="submit" className="rounded">
        Adicionar
      </button>
    </form>
  );
}

