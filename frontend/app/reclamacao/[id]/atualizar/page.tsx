import "@/public/css/form.css";
import "./box.css";
import { notFound } from "next/navigation";
import getReclamacao from "../actions";
import { FormAtualizarReclamacao } from "./FormAtualizarReclamacao";
import DadosAtuaisReclamacao from "./DadosAtuaisReclamacao";

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const reclamacaoId = Number(id);
  if (!Number.isInteger(reclamacaoId)) {
    notFound();
  } 
  const response = await getReclamacao(reclamacaoId);
  if (response.status === 404) {
    notFound();
  }
  const reclamacao = response.data.reclamacao;

  return(
    <div className="flex align-center justify-center h-full gap-[20px]">
      <DadosAtuaisReclamacao reclamacao={reclamacao}/>
      <FormAtualizarReclamacao reclamacaoId={reclamacaoId}/>
    </div>
  );
}