"use client";

import toLocal from "@/lib/utils/localTime";
import { Reclamacao } from "@/types";
import clsx from "clsx";

export default function DadosAtuaisReclamacao({ reclamacao }: {reclamacao: Reclamacao }) {
  return(
    <div className="w-[600px] bg-white rounded-xl border-2 border-neutral-200 text-gray-600 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{reclamacao.titulo}</h1>
          <p className="text-sm text-neutral-500 mt-1">{reclamacao.descricao}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={clsx("text-white p-2 rounded-lg text-sm", {
            "bg-green-600": reclamacao.status === "Resolvida",
            "bg-yellow-600": reclamacao.status === "Pendente",
            "bg-red-600": reclamacao.status === "Contestada",
          })}>
            {reclamacao.status}
          </div>
          <p className="text-sm text-neutral-500">Criada: {toLocal(reclamacao.dataCriacao)}</p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm text-neutral-500">📍 Localização</h4>
          <p className="text-sm">{reclamacao.cidade}, RN</p>
          <p className="text-sm">{reclamacao.endereco ?? 'Localização não informada'}</p>
        </div>

        <div>
          <h4 className="text-sm text-neutral-500">ℹ️ Informações</h4>
          {/* <p className="text-sm">Autor: {reclamacao.autor}</p> */}
          {/* <p className="text-sm">Data criação: {toLocal(reclamacao.dataCriacao)}</p> */}
          <p className="text-sm">Data atualizada: {toLocal(reclamacao.dataAtualizacao)}</p>
        </div>
      </div>

      {reclamacao.fotos && reclamacao.fotos.length > 0 && (
        <>
          <hr className="my-4" />
          <h4 className="text-sm text-neutral-500 mb-2">📷 Fotos Anexadas</h4>
          <div className="flex gap-3">
            {reclamacao.fotos.map((f) => (
              <img key={f.id} src={process.env.NEXT_PUBLIC_BACKEND_URL + f.url} alt={f.nomeArquivo} className="w-[150px] h-[120px] object-cover rounded-md border" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}