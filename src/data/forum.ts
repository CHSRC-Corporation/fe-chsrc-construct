/* =====================================================================
   Dados mock do fórum da comunidade (somente front-end neste momento).
   Substituir por dados vindos da API na integração com o back-end.
   ===================================================================== */

export type Comment = {
  id: string;
  author: string;
  createdAt: string; // ISO
  body: string;
};

export type Post = {
  id: string;
  title: string;
  author: string;
  category: string;
  createdAt: string; // ISO
  excerpt: string;
  body: string[];
  comments: Comment[];
};

export const posts: Post[] = [
  {
    id: 'duvida-armadura-laje',
    title: 'Qual o cobrimento mínimo para armadura de laje?',
    author: 'Marina Alves',
    category: 'Estruturas',
    createdAt: '2026-06-22T14:30:00',
    excerpt:
      'Estou em dúvida sobre o cobrimento nominal para lajes em ambiente urbano. A NBR 6118 traz uma tabela, mas como vocês aplicam na prática?',
    body: [
      'Pessoal, estou revisando um projeto de laje maciça para uma residência em área urbana e fiquei na dúvida sobre o cobrimento nominal da armadura.',
      'A NBR 6118 traz a tabela por classe de agressividade ambiental, mas na prática como vocês definem? Alguém tem uma regra prática para CAA II?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Rafael Souza',
        createdAt: '2026-06-22T15:10:00',
        body: 'Para CAA II costumo adotar 25mm em lajes. Sempre confiro com o projeto estrutural e a tabela 7.2 da norma.',
      },
      {
        id: 'c2',
        author: 'Júlia Mendes',
        createdAt: '2026-06-22T16:02:00',
        body: 'Lembrando que o cobrimento é nominal = mínimo + tolerância de execução (Δc). Não esquece de somar o Δc!',
      },
    ],
  },
  {
    id: 'melhor-software-bim',
    title: 'Qual o melhor software BIM para começar?',
    author: 'Carlos Henrique',
    category: 'Software (CAD/BIM)',
    createdAt: '2026-06-21T09:15:00',
    excerpt:
      'Estou começando agora e quero aprender BIM. Vale mais a pena Revit, ArchiCAD ou começar pelo AutoCAD mesmo?',
    body: [
      'Sou estudante do 4º período e quero me aprofundar em BIM para o mercado.',
      'Vale mais a pena já ir direto pro Revit ou começo pelo AutoCAD para pegar a base de desenho técnico?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Marina Alves',
        createdAt: '2026-06-21T10:40:00',
        body: 'Revit é o mais pedido em vagas hoje. Mas saber AutoCAD ainda ajuda muito no dia a dia.',
      },
      {
        id: 'c2',
        author: 'Pedro Lima',
        createdAt: '2026-06-21T11:25:00',
        body: 'Comece pelo Revit. A lógica de modelagem paramétrica muda a cabeça e é o futuro da área.',
      },
      {
        id: 'c3',
        author: 'Ana Beatriz',
        createdAt: '2026-06-21T13:00:00',
        body: 'Concordo com o Revit, mas dá uma olhada também em ferramentas de compatibilização como o Navisworks.',
      },
    ],
  },
  {
    id: 'ensaio-spt-interpretacao',
    title: 'Como interpretar o resultado de um ensaio SPT?',
    author: 'Fernanda Dias',
    category: 'Geotecnia',
    createdAt: '2026-06-20T18:45:00',
    excerpt:
      'Recebi o boletim de sondagem da obra e queria entender melhor como o Nspt influencia na escolha da fundação.',
    body: [
      'Recebi o boletim de sondagem SPT do terreno e os valores de Nspt variam bastante com a profundidade.',
      'Como vocês usam esses números para decidir entre sapata e estaca? Tem algum valor de referência?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Carlos Henrique',
        createdAt: '2026-06-20T19:30:00',
        body: 'Nspt baixo nas primeiras camadas geralmente indica que você vai precisar buscar uma camada mais resistente com estaca.',
      },
    ],
  },
  {
    id: 'traco-concreto-fck25',
    title: 'Traço de concreto para fck 25 MPa em obra pequena',
    author: 'Pedro Lima',
    category: 'Materiais',
    createdAt: '2026-06-19T11:00:00',
    excerpt:
      'Em obras pequenas sem concreteira, vocês confiam no traço em volume ou sempre recomendam usinado?',
    body: [
      'Numa reforma pequena, sem acesso fácil a concreto usinado, surge sempre a dúvida do traço em obra.',
      'Vocês confiam no traço em volume (lata) para fck 25 ou recomendam sempre o usinado para garantir a resistência?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Fernanda Dias',
        createdAt: '2026-06-19T12:15:00',
        body: 'Para elementos estruturais eu sempre puxo pro usinado. O controle de resistência compensa o custo.',
      },
      {
        id: 'c2',
        author: 'Rafael Souza',
        createdAt: '2026-06-19T14:20:00',
        body: 'Se for em obra, pelo menos faça o traço em massa (peso), não em volume. A variação fica bem menor.',
      },
    ],
  },
  {
    id: 'carreira-pos-formatura',
    title: 'Vale a pena fazer pós logo após a formatura?',
    author: 'Ana Beatriz',
    category: 'Carreira',
    createdAt: '2026-06-18T08:30:00',
    excerpt:
      'Terminando a graduação esse ano e em dúvida se emendo uma especialização ou se busco experiência de obra primeiro.',
    body: [
      'Me formo no fim do ano e estou dividida entre emendar uma pós ou ganhar experiência de campo antes.',
      'Quem já passou por isso: o que agregou mais no início de carreira?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Pedro Lima',
        createdAt: '2026-06-18T09:45:00',
        body: 'Eu fui pra obra primeiro e não me arrependo. A pós rende muito mais quando você já tem repertório prático.',
      },
    ],
  },
  {
    id: 'nivelamento-topografico',
    title: 'Erro de fechamento em nivelamento geométrico',
    author: 'Rafael Souza',
    category: 'Topografia',
    createdAt: '2026-06-17T16:10:00',
    excerpt:
      'Fiz um nivelamento e deu um erro de fechamento acima do tolerável. Quais as causas mais comuns disso?',
    body: [
      'Realizei um nivelamento geométrico fechado e o erro ficou acima do tolerável para a classe do levantamento.',
      'Antes de refazer tudo, quais as causas mais comuns que vocês investigam primeiro?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Fernanda Dias',
        createdAt: '2026-06-17T17:00:00',
        body: 'Confere se a mira estava bem aprumada e se as distâncias de visada de ré e vante estavam equilibradas.',
      },
      {
        id: 'c2',
        author: 'Marina Alves',
        createdAt: '2026-06-17T18:12:00',
        body: 'Bolha do nível descalibrada também causa isso. Vale fazer a verificação do equipamento.',
      },
    ],
  },
  {
    id: 'patologia-fissuras',
    title: 'Fissuras a 45° na alvenaria: o que pode ser?',
    author: 'Júlia Mendes',
    category: 'Patologias',
    createdAt: '2026-06-16T13:20:00',
    excerpt:
      'Apareceram fissuras inclinadas próximas às aberturas. Estou suspeitando de recalque de fundação.',
    body: [
      'Numa vistoria encontrei fissuras inclinadas a aproximadamente 45° partindo dos cantos das janelas.',
      'Pela configuração, suspeito de recalque diferencial de fundação. Vocês investigariam o quê primeiro?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Carlos Henrique',
        createdAt: '2026-06-16T14:05:00',
        body: 'Fissura a 45° saindo do canto realmente sugere recalque. Vale instalar fissurômetro e monitorar a evolução.',
      },
    ],
  },
  {
    id: 'dimensionar-viga-baldrame',
    title: 'Como dimensionar viga baldrame em solo argiloso?',
    author: 'Lucas Pereira',
    category: 'Estruturas',
    createdAt: '2026-06-15T10:05:00',
    excerpt:
      'Solo com presença de argila expansiva. Quais cuidados no dimensionamento da viga baldrame?',
    body: [
      'Tenho um projeto em solo argiloso com indícios de expansividade.',
      'Que cuidados específicos vocês tomam no dimensionamento e na execução da viga baldrame nesse caso?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Júlia Mendes',
        createdAt: '2026-06-15T11:30:00',
        body: 'Argila expansiva pede atenção redobrada. Em alguns casos vale isolar a fundação do solo com camada de brita.',
      },
    ],
  },
  {
    id: 'orcamento-sinapi',
    title: 'Como usar a tabela SINAPI para orçamento?',
    author: 'Beatriz Rocha',
    category: 'Orçamento',
    createdAt: '2026-06-14T15:40:00',
    excerpt:
      'Primeira vez montando um orçamento com composições do SINAPI. Alguma dica para não errar nos insumos?',
    body: [
      'Estou montando meu primeiro orçamento usando as composições do SINAPI.',
      'Tem alguma dica para não me perder nos insumos e nas leis sociais? Qual planilha vocês usam de base?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Lucas Pereira',
        createdAt: '2026-06-14T16:50:00',
        body: 'Cuidado com a data-base e a desoneração. Use sempre a referência mais recente do mês do orçamento.',
      },
    ],
  },
  {
    id: 'concreto-protendido-intro',
    title: 'Por onde estudar concreto protendido?',
    author: 'Diego Martins',
    category: 'Estruturas',
    createdAt: '2026-06-13T09:00:00',
    excerpt:
      'Quero entrar na área de protendido mas sinto falta de material introdutório bom em português.',
    body: [
      'Tenho interesse em protensão mas a maioria do material que acho é muito avançado.',
      'Alguém indica uma sequência boa de estudo, do básico ao prático?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Beatriz Rocha',
        createdAt: '2026-06-13T10:20:00',
        body: 'Começa pelo conceito de pré e pós-tração, depois perdas de protensão. O resto fica mais fácil de encaixar.',
      },
    ],
  },
  {
    id: 'impermeabilizacao-laje',
    title: 'Melhor sistema de impermeabilização para laje exposta',
    author: 'Sofia Carvalho',
    category: 'Materiais',
    createdAt: '2026-06-12T14:00:00',
    excerpt:
      'Laje de cobertura exposta ao sol e chuva. Manta asfáltica ou membrana líquida? Prós e contras?',
    body: [
      'Tenho uma laje de cobertura totalmente exposta e preciso definir o sistema de impermeabilização.',
      'Vocês indicam manta asfáltica ou membrana líquida nesse cenário? Quais os prós e contras na prática?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Diego Martins',
        createdAt: '2026-06-12T15:10:00',
        body: 'Para laje exposta com tráfego, manta asfáltica com proteção mecânica costuma durar mais.',
      },
    ],
  },
  {
    id: 'estagio-construtora',
    title: 'Dicas para o primeiro estágio em construtora',
    author: 'Gabriel Nunes',
    category: 'Carreira',
    createdAt: '2026-06-11T08:10:00',
    excerpt:
      'Começo meu primeiro estágio de obra semana que vem. O que vocês gostariam de ter sabido no começo?',
    body: [
      'Semana que vem começo meu primeiro estágio numa construtora, direto no canteiro.',
      'O que vocês gostariam de ter sabido nesse início? Toda dica é bem-vinda!',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Sofia Carvalho',
        createdAt: '2026-06-11T09:25:00',
        body: 'Chega cedo, anda pela obra e pergunta muito pros mestres e encarregados. O conhecimento de campo deles é ouro.',
      },
    ],
  },
  {
    id: 'calculo-carga-vento',
    title: 'Cálculo de carga de vento pela NBR 6123',
    author: 'Henrique Castro',
    category: 'Estruturas',
    createdAt: '2026-06-10T17:30:00',
    excerpt:
      'Estou aplicando a NBR 6123 num galpão e me confundo nos fatores S1, S2 e S3. Alguém explica de forma simples?',
    body: [
      'Estou calculando a ação do vento num galpão metálico pela NBR 6123.',
      'Os fatores S1, S2 e S3 sempre me confundem. Alguém consegue explicar cada um de forma simples?',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Gabriel Nunes',
        createdAt: '2026-06-10T18:40:00',
        body: 'S1 é o topográfico, S2 leva em conta rugosidade/altura e S3 é o fator estatístico ligado ao uso da edificação.',
      },
    ],
  },
];

export function findPost(id: string | undefined): Post | undefined {
  if (!id) return undefined;
  return posts.find((post) => post.id === id);
}
