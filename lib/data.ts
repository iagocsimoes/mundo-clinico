// ── Conteúdo da Landing Page — Imersão Virada Clínica ──────────────
// Edite aqui para atualizar a copy sem tocar nos componentes.

export const EVENT = {
  name: "Imersão Virada Clínica",
  tagline: "Gestão, Vendas e Resultado",
  date: "01 de agosto de 2026",
  dateShort: "01 AGO",
  weekday: "Sábado",
  time: "08h",
  venue: "Sede Enjoy Business",
  address: "Alça da Terceira Ponte, 245 — Praia da Costa, Vila Velha/ES",
  city: "Vila Velha/ES",
  seats: 100,
  // Troque pelos links reais de checkout / whatsapp quando disponíveis
  checkoutUrl: "#ingressos",
  sponsorUrl: "#patrocinio",
  whatsapp: "#",
};

// Lead do hero (referência de design aprovada pelo cliente)
export const HERO_LEAD =
  "Um dia intenso de conteúdo prático e networking qualificado para posicionar sua clínica, atrair pacientes particulares e construir crescimento previsível.";

// Marcas e parceiros confirmados — wordmarks até os logos oficiais chegarem
// (troque por <Image> quando os arquivos estiverem em public/img/partners/)
export const PARTNERS = [
  "Enjoy Business",
  "Saúde & Gestão",
  "Contabil Saúde",
  "Doctoralia Pro",
  "Clínica Expert",
  "SIS Saúde",
  "Teia Saúde",
];

// O que é a imersão — três entregas centrais
export const FEATURES = [
  {
    title: "Conteúdo aplicado",
    text: "Estratégias e protocolos que você implementa já na semana seguinte.",
  },
  {
    title: "Networking seletivo",
    text: "Conexões com quem também decidiu operar em outro nível.",
  },
  {
    title: "Resultados reais",
    text: "Mais rentabilidade, agenda valorizada e crescimento previsível.",
  },
];

// Onde acontece
export const VENUE = {
  title: "Ambiente premium para decisões extraordinárias.",
  bullets: [
    "Auditório moderno e confortável",
    "Estrutura completa para networking",
    "Gastronomia e hospitalidade Enjoy",
    "Estacionamento e fácil acesso",
  ],
  // Fotos do espaço: colocar em public/img/venue/ (1.jpg, 2.jpg, 3.jpg…)
  photos: [] as string[],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Sede Enjoy Business, Vila Velha, ES"),
};

// Depoimento (da referência aprovada pelo cliente — foto pendente)
export const TESTIMONIAL = {
  quote:
    "A Imersão Virada Clínica foi o ponto de virada do posicionamento da nossa clínica. Voltamos com clareza, estratégia e novos negócios.",
  name: "Dra. Juliana Ribeiro",
  role: "Dermatologista · Vitória/ES",
};

export const MOVEMENTS = [
  {
    n: "01",
    title: "Consciência",
    text: "Você enxerga com clareza o que está travando o crescimento. As causas reais, não os sintomas.",
  },
  {
    n: "02",
    title: "Visão",
    text: "Você vê que existe saída. Pelo olhar de quem já passou. Casos reais de quem travou e virou.",
  },
  {
    n: "03",
    title: "Decisão",
    text: "A imersão não termina em conteúdo. Termina em decisão. Você sai sabendo exatamente qual é o próximo passo.",
  },
];

export const AUDIENCE = [
  {
    title: "Para quem tem clínica ou consultório ativo",
    items: [
      "Tem estrutura montada e sente que o crescimento travou",
      "Trabalha muito e não vê o resultado financeiro que o esforço merece",
      "Depende de indicação e sabe que isso é frágil",
      "Quer posicionamento e previsibilidade, não mais volume de atendimentos",
    ],
  },
  {
    title: "Para quem quer construir um negócio de verdade",
    items: [
      "Entende que saber a técnica não é suficiente para escalar",
      "Quer gestão de pessoas, precificação e estratégia dentro do seu universo",
      "Busca um ambiente de alto nível para tomar decisões importantes",
    ],
  },
];

export type ScheduleSlot = {
  time: string;
  label: string;
  desc?: string;
  icon: "badge" | "star" | "mic" | "plate" | "glass" | "cheers" | "check";
  tag?: string;
};

export const SCHEDULE: ScheduleSlot[] = [
  { time: "08h00", label: "Credenciamento e ambientação", icon: "badge" },
  { time: "09h00", label: "Abertura oficial", icon: "star" },
  { time: "09h15", label: "Palestras e painéis", desc: "Bloco da manhã", icon: "mic" },
  {
    time: "12h00",
    label: "Almoço Buffet Aleixo",
    desc: "+ networking",
    icon: "plate",
    tag: "Experiência",
  },
  { time: "14h00", label: "Palestras e painéis", desc: "Bloco da tarde", icon: "mic" },
  {
    time: "17h00",
    label: "Beer Garden",
    desc: "Ativações e network experience",
    icon: "glass",
    tag: "Experiência",
  },
  {
    time: "19h00",
    label: "Happy Hour",
    desc: "Com palestrantes e membros OMC",
    icon: "cheers",
    tag: "Experiência",
  },
  { time: "21h00", label: "Encerramento", icon: "check" },
];

// Palestrantes — fotos individuais oficiais (800px, otimizadas de ~/Downloads)
export const SPEAKERS = [
  { name: "Matheus Fagundes", role: "O Mundo Clínico", img: "/img/speakers/matheus-fagundes.jpg" },
  { name: "Pereira Amorim", role: "Conselheiro Comercial", img: "/img/speakers/pereira-amorim.jpg" },
  { name: "Wander Miranda", role: "Enjoy", img: "/img/speakers/wander-miranda.jpg" },
  { name: "Mayana Rigo", role: "Gestão de Pessoas", img: "/img/speakers/mayana-rigo.jpg" },
  { name: "Alexandre Bittencourt", role: "Doctors Group", img: "/img/speakers/alexandre-bittencourt.jpg" },
  { name: "Juliana Malfacini", role: "Monetização de Negócios", img: "/img/speakers/juliana-malfacini.jpg" },
  { name: "Paulo Girelli", role: "O Mundo Clínico", img: "/img/speakers/paulo-girelli.jpg" },
];

export const STATS = [
  { n: "+1.000", l: "profissionais da saúde já passaram pelo ecossistema O Mundo Clínico" },
  { n: "+100", l: "negócios de saúde impactados diretamente" },
  { n: "100", l: "vagas para esta edição" },
];

export const TICKETS = [
  {
    tier: "Platinum",
    price: "997",
    lead: "Para quem quer o conteúdo e o ambiente.",
    items: ["Acesso a todas as palestras e painéis", "Kit do evento", "Almoço incluso"],
    cta: "Garantir ingresso Platinum",
    featured: false,
    note: null,
    whatsappUrl:
      "https://api.whatsapp.com/send/?phone=5527996074823&text=Ol%C3%A1!%20Decidi%20virar%20a%20chave%20na%20minha%20cl%C3%ADnica%20e%20quero%20garantir%20meu%20ingresso%20Platinum%20para%20a%20Imers%C3%A3o%20Virada%20Cl%C3%ADnica.",
  },
  {
    tier: "Diamond",
    price: "1.997",
    lead: "Para quem quer a experiência completa.",
    items: [
      "Acesso a todas as palestras e painéis",
      "Acesso ao Beer Garden",
      "Kit do evento",
      "Almoço Buffet Aleixo em área VIP",
    ],
    cta: "Garantir ingresso Diamond",
    featured: true,
    note: "Mais escolhido",
    whatsappUrl:
      "https://api.whatsapp.com/send/?phone=5527996074823&text=Ol%C3%A1!%20Decidi%20virar%20a%20chave%20na%20minha%20cl%C3%ADnica%20e%20quero%20garantir%20meu%20ingresso%20Diamond%20para%20a%20Imers%C3%A3o%20Virada%20Cl%C3%ADnica.",
  },
  {
    tier: "Experience",
    price: "2.297",
    lead: "Para quem quer o acesso máximo.",
    items: [
      "Acesso a todas as palestras e painéis",
      "Kit do evento + brinde exclusivo",
      "Almoço Buffet Aleixo em área VIP",
      "Networking com palestrantes",
      "Meet exclusivo com os fundadores do O Mundo Clínico",
      "Sessão de fotos exclusiva",
      "Happy Hour exclusivo com palestrantes e membros OMC (19h–21h)",
    ],
    cta: "Garantir ingresso Experience",
    featured: false,
    note: "Apenas 15 vagas · quando esgotar, não reabre",
    whatsappUrl:
      "https://api.whatsapp.com/send/?phone=5527996074823&text=Ol%C3%A1!%20Decidi%20virar%20a%20chave%20na%20minha%20cl%C3%ADnica%20e%20quero%20garantir%20meu%20ingresso%20Experience%20para%20a%20Imers%C3%A3o%20Virada%20Cl%C3%ADnica.",
  },
];

export const SPONSOR_BENEFITS = [
  "Logo nos telões internos e externos do evento",
  "Logo no totem das mesas",
  "Nome anunciado pela mestre de cerimônias",
  "Vídeo institucional da marca exibido no evento",
  "Lounge VIP exclusivo",
  "Mailing oficial do evento para toda a base",
  "Almoço exclusivo com Pereira Amorim e Wander Miranda",
  "Backdrop oficial do evento",
];

export const OBJECTIONS = [
  {
    q: "“Não tenho tempo para um dia inteiro fora do consultório.”",
    a: "Se a sua operação depende de você para funcionar, exatamente essa é a razão para estar lá. Um dia de clareza estratégica vale mais do que meses operando no automático.",
  },
  {
    q: "“Já fui em eventos assim que não agregaram nada.”",
    a: "São 100 profissionais da saúde curados, não 500 cadeiras em um auditório genérico. Conteúdo feito para o universo de quem tem estrutura e quer o próximo nível. A diferença está no que você vive dentro da sala.",
  },
  {
    q: "“Não sei se isso é para o meu momento.”",
    a: "Se você tem uma operação funcionando e sente que o crescimento travou, é exatamente para o seu momento. A imersão não foi feita para quem está começando, foi feita para quem está pronto para virar.",
  },
];

export const FAQ = [
  {
    q: "A imersão é para qualquer profissional da saúde?",
    a: "É para quem tem clínica, consultório ou operação de saúde ativa e quer construir um negócio de verdade. Não foi feita para quem está começando do zero, foi feita para quem já tem estrutura e quer o próximo nível.",
  },
  {
    q: "O que está incluso no ingresso?",
    a: "Depende do lote. O Platinum cobre conteúdo, almoço e kit. O Diamond adiciona Beer Garden e área VIP no almoço. O Experience inclui tudo isso mais networking com palestrantes, meet exclusivo com os fundadores do OMC, sessão de fotos e happy hour privado das 19h às 21h.",
  },
  {
    q: "Vou sair com algo concreto?",
    a: "Você sai com clareza de diagnóstico e com a decisão do próximo passo. A imersão foi estruturada para terminar em ação, não em anotação.",
  },
  {
    q: "Por que apenas 100 vagas?",
    a: "Porque a curadoria do público é parte do produto. O nível das conversas dentro do evento depende de quem está na sala.",
  },
  {
    q: "Como garanto minha vaga?",
    a: "Pelo botão de garantir vaga. O pagamento confirma a vaga. São 100 no total, 15 no Experience.",
  },
];
