// Mock CID database - simula uma API ou banco de dados
export interface CIDEntry {
  code: string;
  description: string;
  category: string;
}

export const cidDatabase: CIDEntry[] = [
  // Transtornos do Desenvolvimento
  { code: 'F84.0', description: 'Autismo Infantil', category: 'Transtornos do Desenvolvimento' },
  { code: 'F84.1', description: 'Autismo Atípico', category: 'Transtornos do Desenvolvimento' },
  { code: 'F84.5', description: 'Síndrome de Asperger', category: 'Transtornos do Desenvolvimento' },
  { code: 'F80.0', description: 'Transtorno Específico da Articulação da Fala', category: 'Transtornos do Desenvolvimento' },
  { code: 'F80.1', description: 'Distúrbio Expressivo de Linguagem', category: 'Transtornos do Desenvolvimento' },
  { code: 'F80.2', description: 'Distúrbio Receptivo de Linguagem', category: 'Transtornos do Desenvolvimento' },
  { code: 'F81.0', description: 'Transtorno Específico de Leitura (Dislexia)', category: 'Transtornos do Desenvolvimento' },
  { code: 'F81.1', description: 'Transtorno Específico da Soletração', category: 'Transtornos do Desenvolvimento' },
  { code: 'F82', description: 'Transtorno Específico do Desenvolvimento Motor', category: 'Transtornos do Desenvolvimento' },
  
  // Deficiência Intelectual
  { code: 'F70', description: 'Deficiência Intelectual Leve', category: 'Deficiência Intelectual' },
  { code: 'F71', description: 'Deficiência Intelectual Moderada', category: 'Deficiência Intelectual' },
  { code: 'F72', description: 'Deficiência Intelectual Grave', category: 'Deficiência Intelectual' },
  { code: 'F73', description: 'Deficiência Intelectual Profunda', category: 'Deficiência Intelectual' },
  
  // Síndromes Genéticas
  { code: 'Q90', description: 'Síndrome de Down', category: 'Síndromes Genéticas' },
  { code: 'Q90.0', description: 'Trissomia 21 por Não-Disjunção Meiótica', category: 'Síndromes Genéticas' },
  { code: 'Q90.1', description: 'Trissomia 21 por Mosaicismo', category: 'Síndromes Genéticas' },
  { code: 'Q87.0', description: 'Síndromes de Malformação Congênita', category: 'Síndromes Genéticas' },
  { code: 'Q93.5', description: 'Outras Deleções Parciais de um Cromossomo', category: 'Síndromes Genéticas' },
  
  // Paralisia Cerebral
  { code: 'G80', description: 'Paralisia Cerebral', category: 'Paralisia Cerebral' },
  { code: 'G80.0', description: 'Paralisia Cerebral Espástica', category: 'Paralisia Cerebral' },
  { code: 'G80.1', description: 'Paralisia Cerebral Espástica Diplegica', category: 'Paralisia Cerebral' },
  { code: 'G80.2', description: 'Paralisia Cerebral Espástica Hemiplegica', category: 'Paralisia Cerebral' },
  { code: 'G80.3', description: 'Paralisia Cerebral Discinética', category: 'Paralisia Cerebral' },
  { code: 'G80.4', description: 'Paralisia Cerebral Atáxica', category: 'Paralisia Cerebral' },
  { code: 'G80.8', description: 'Outras Formas de Paralisia Cerebral', category: 'Paralisia Cerebral' },
  
  // TDAH e Transtornos de Comportamento
  { code: 'F90.0', description: 'Transtorno de Déficit de Atenção com Hiperatividade (TDAH)', category: 'Transtornos de Comportamento' },
  { code: 'F90.1', description: 'Transtorno de Conduta Hipercinético', category: 'Transtornos de Comportamento' },
  { code: 'F91.0', description: 'Distúrbio de Conduta Restrito ao Contexto Familiar', category: 'Transtornos de Comportamento' },
  { code: 'F91.1', description: 'Distúrbio de Conduta Não-Socializado', category: 'Transtornos de Comportamento' },
  
  // Epilepsia
  { code: 'G40', description: 'Epilepsia', category: 'Epilepsia' },
  { code: 'G40.0', description: 'Epilepsia e Síndromes Epilépticas Idiopáticas', category: 'Epilepsia' },
  { code: 'G40.1', description: 'Epilepsia e Síndromes Epilépticas Sintomáticas', category: 'Epilepsia' },
  { code: 'G40.3', description: 'Epilepsia e Síndromes Epilépticas Generalizadas Idiopáticas', category: 'Epilepsia' },
  
  // Microcefalia
  { code: 'Q02', description: 'Microcefalia', category: 'Malformações Congênitas' },
  
  // Hidrocefalia
  { code: 'Q03', description: 'Hidrocefalia Congênita', category: 'Malformações Congênitas' },
  { code: 'G91', description: 'Hidrocefalia', category: 'Malformações Congênitas' },
  
  // Espinha Bífida
  { code: 'Q05', description: 'Espinha Bífida', category: 'Malformações Congênitas' },
  { code: 'Q05.0', description: 'Espinha Bífida Cervical com Hidrocefalia', category: 'Malformações Congênitas' },
  
  // Outros
  { code: 'H54.0', description: 'Cegueira em Ambos os Olhos', category: 'Deficiências Sensoriais' },
  { code: 'H90', description: 'Perda de Audição por Transtorno de Condução', category: 'Deficiências Sensoriais' },
];

export function searchCID(query: string): CIDEntry[] {
  const lowerQuery = query.toLowerCase();
  return cidDatabase.filter(
    cid => 
      cid.code.toLowerCase().includes(lowerQuery) ||
      cid.description.toLowerCase().includes(lowerQuery) ||
      cid.category.toLowerCase().includes(lowerQuery)
  );
}

export function getCIDByCode(code: string): CIDEntry | undefined {
  return cidDatabase.find(cid => cid.code === code);
}
