"use client";

import { getIconByStatus } from "@/lib/utils/alerts";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { H1 } from "@/components/ui/titles";
import Button from "@/components/ui/Button";

export function FormAtualizarReclamacao({ reclamacao, reclamacaoId }: { reclamacao: any; reclamacaoId: number; }) {
  const router =  useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Only send the editable fields (no files)
    const formData = new FormData();
    formData.append('titulo', (form.querySelector('#titulo') as HTMLInputElement).value);
    formData.append('descricao', (form.querySelector('#descricao') as HTMLInputElement).value);
    formData.append('cidade', (form.querySelector('#cidade') as HTMLInputElement).value);
    formData.append('endereco', (form.querySelector('#endereco') as HTMLInputElement).value);

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reclamacao/${reclamacaoId}/atualizar`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include" as RequestCredentials,
      body: formData,
    });
    const json = await response.json();

    if (json.message) {
      Swal.fire({
        title:"Atualizar Reclamação",
        text: json.message,
        icon: getIconByStatus(response.status)
      }).then(() => {
        if (response.status === 200) {
          router.push(`/reclamacao/${reclamacaoId}`)
        }
      });
    }
  }

  return(
    <form onSubmit={handleSubmit} className="w-[560px] bg-white rounded-xl border-2 border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <H1>Atualizar Informações</H1>
      </div>

      <label className="block text-sm font-medium text-neutral-700 mt-3" htmlFor="titulo">Título</label>
      <input id="titulo" name="titulo" defaultValue={reclamacao?.titulo} className="mt-1 block w-full rounded-md border border-neutral-300 p-2" placeholder="Insira o título" />

      <label className="block text-sm font-medium text-neutral-700 mt-3" htmlFor="descricao">Descrição</label>
      <textarea id="descricao" name="descricao" defaultValue={reclamacao?.descricao} className="mt-1 block w-full rounded-md border border-neutral-300 p-2 h-28" placeholder="Insira a descrição" />

      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <label className="block text-sm font-medium text-neutral-700" htmlFor="cidade">Cidade</label>
          <input id="cidade" name="cidade" defaultValue={reclamacao?.cidade} className="mt-1 block w-full rounded-md border border-neutral-300 p-2" placeholder="Insira a cidade" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700" htmlFor="endereco">Endereço</label>
          <input id="endereco" name="endereco" defaultValue={reclamacao?.endereco ?? ''} className="mt-1 block w-full rounded-md border border-neutral-300 p-2" placeholder="Insira o endereço completo" />
        </div>
      </div>

      <div className="mt-6 flex gap-3 justify-center">
        <button type="button" onClick={() => router.push(`/reclamacao/${reclamacaoId}`)} className="w-1/2 rounded-full border border-neutral-300 py-2 text-neutral-700">Cancelar</button>
        <button type="submit" className="rounded-full bg-green-600 text-white py-2 w-1/2">Salvar Alterações</button>
      </div>
    </form>
  );
}