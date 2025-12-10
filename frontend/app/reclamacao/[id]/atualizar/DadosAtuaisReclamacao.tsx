"use client";

import toLocal from "@/lib/utils/localTime";
import { Reclamacao } from "@/types";

export default function DadosAtuaisReclamacao({ reclamacao }: {reclamacao: Reclamacao }) {
  return(
    <div className="flex flex-col gap-5 bg-gray-800 rounded-xl p-2 px-10">
      <h1 className="text-2xl">{reclamacao.titulo}</h1>
      <h3 className="text-xl">{reclamacao.descricao}</h3>
      <hr />
      <ul className="flex flex-col gap-2">
        <li>Cidade: {reclamacao.cidade}</li>
        <li>Endereço: {reclamacao.endereco}</li>
        <li>Status: {reclamacao.status}</li>
        <li>Autor: {reclamacao.autor}</li>
        <li>Data criada: {toLocal(reclamacao.dataCriacao)}</li>
        <li>Data resolvida: {toLocal(reclamacao.dataResolucao)}</li>
        <li>Data atualizada: {toLocal(reclamacao.dataAtualizacao)}</li>
      </ul>
    </div>
  );
}