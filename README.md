## Integrantes
- [Givanilson](https://github.com/Joyuv)  
- [Pedro Victor](https://github.com/ZagZx)  
- [Abraão](https://github.com/Abraao3)  
- [João Paulo](https://github.com/Paulinzz)  

## Problema escolhido 
Invisibilidade dos problemas corriqueiros do cidadão, por exemplo: Ruas esburacadas, falta decalçamento, cano estourado, etc.

## Objetivo do sistema
Levar as reclamações do povo a prefeitura. O aplicativo permitirá que o cidadão
abra uma reclamação descrevendo o problema.

## Público alvo
O cidadão.

## Funcionalidades
CRUD de reclamações, pesquisa por filtros das reclamações, gráficos dinâmicos de
taxa de reclamações resolvidas, contestamento de conclusão (Contestar a conclusão de uma
reclamação apresentando provas que não foi concluído), mapa estático da cidade (se possível
interativo com dados de reclamações por localidade).

## Rotas Principais
- /
- /reclamacoes
- /reclamacoes/resolvidas
- /reclamacoes/pendentes
- /reclamacoes/contestadas
- /reclamacao/adicionar
- /reclamacao/<reclamacao_id>
- /reclamacao/<reclamacao_id>/remover
- /reclamacao/<reclamacao_id>/atualizar
- /reclamacao/<reclamacao_id>/resolver
- /reclamacao/<reclamacao_id>/contestar
- /login
- /cadastro
- /logout
- /usuario/<usuario_id>/reclamacoes
- /usuario/<usuario_id>/atualizar/