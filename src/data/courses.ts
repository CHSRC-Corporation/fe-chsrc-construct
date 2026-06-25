/* =====================================================================
   Dados mock das trilhas de ensino (somente front-end neste momento).

   `youtubeId` deve apontar para o vídeo do YouTube "não listado" de cada
   aula — o embed por ID funciona normalmente para vídeos não listados,
   bastando ter o link. Por ora usamos um vídeo Creative Commons como
   placeholder, que deve ser substituído pelos IDs reais na integração.
   ===================================================================== */

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  youtubeId: string;
};

export type Track = {
  id: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
};

// Placeholder (Creative Commons — Blender Foundation). Trocar pelo ID real.
const PLACEHOLDER_VIDEO = 'Gsw6QCI0S5g';

export const tracks: Track[] = [
  {
    id: 'fundamentos',
    title: 'Fundamentos da Engenharia Civil',
    subtitle: 'Comece por aqui: a base que todo estudante precisa dominar.',
    lessons: [
      {
        id: 'intro-engenharia-civil',
        title: 'Introdução à Engenharia Civil',
        description:
          'O que faz um engenheiro civil e as áreas de atuação da profissão.',
        duration: '12 min',
        level: 'Iniciante',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'leitura-de-projetos',
        title: 'Leitura e Interpretação de Projetos',
        description:
          'Plantas, cortes e fachadas: como entender um projeto técnico.',
        duration: '18 min',
        level: 'Iniciante',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'materiais-de-construcao',
        title: 'Materiais de Construção',
        description:
          'Cimento, agregados, aço e madeira: propriedades e aplicações.',
        duration: '22 min',
        level: 'Iniciante',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'canteiro-e-seguranca',
        title: 'Canteiro de Obras e Segurança',
        description:
          'Organização do canteiro e normas essenciais de segurança (NRs).',
        duration: '16 min',
        level: 'Iniciante',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'topografia-basica',
        title: 'Topografia Básica',
        description:
          'Medições, nivelamento e levantamento de terrenos na prática.',
        duration: '20 min',
        level: 'Intermediário',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'desenho-tecnico',
        title: 'Desenho Técnico',
        description:
          'Normas ABNT, escalas e convenções do desenho de engenharia.',
        duration: '15 min',
        level: 'Iniciante',
        youtubeId: PLACEHOLDER_VIDEO,
      },
    ],
  },
  {
    id: 'estruturas',
    title: 'Estruturas e Cálculo',
    subtitle: 'Aprofunde-se no dimensionamento e na análise estrutural.',
    lessons: [
      {
        id: 'estatica-das-estruturas',
        title: 'Estática das Estruturas',
        description: 'Forças, momentos e equilíbrio de corpos rígidos.',
        duration: '24 min',
        level: 'Intermediário',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'resistencia-dos-materiais',
        title: 'Resistência dos Materiais',
        description:
          'Tensão, deformação e os esforços internos nas estruturas.',
        duration: '28 min',
        level: 'Intermediário',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'concreto-armado-1',
        title: 'Concreto Armado I',
        description:
          'Comportamento do concreto e do aço trabalhando em conjunto.',
        duration: '30 min',
        level: 'Avançado',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'fundacoes',
        title: 'Fundações',
        description:
          'Fundações rasas e profundas: quando e como utilizar cada tipo.',
        duration: '26 min',
        level: 'Avançado',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'analise-de-cargas',
        title: 'Análise de Cargas',
        description:
          'Cargas permanentes, acidentais e de vento sobre a estrutura.',
        duration: '21 min',
        level: 'Intermediário',
        youtubeId: PLACEHOLDER_VIDEO,
      },
      {
        id: 'dimensionamento-de-vigas',
        title: 'Dimensionamento de Vigas',
        description: 'Cálculo de vigas de concreto armado passo a passo.',
        duration: '27 min',
        level: 'Avançado',
        youtubeId: PLACEHOLDER_VIDEO,
      },
    ],
  },
];

/** Localiza uma aula pelo id, retornando também a trilha à qual pertence. */
export function findLesson(
  id: string | undefined
): { lesson: Lesson; track: Track } | undefined {
  if (!id) return undefined;
  for (const track of tracks) {
    const lesson = track.lessons.find((item) => item.id === id);
    if (lesson) return { lesson, track };
  }
  return undefined;
}
