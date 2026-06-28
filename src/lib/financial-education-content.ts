import type { FaqItem } from "@/lib/ai-enterprise";

export type EducationTopic = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  href: string;
  intent: string;
};

export const FINANCIAL_EDUCATION_TOPICS_EN: EducationTopic[] = [
  {
    id: "401k-rollover",
    title: "How to Roll Over a 401(k) When You Change Jobs",
    summary:
      "Leaving a job does not mean leaving your retirement savings behind — but doing nothing can cost you fees, limited choices, and missed protection. Learn the difference between a direct rollover, indirect rollover, and leaving assets in a former plan.",
    bullets: [
      "Direct rollover: funds move trustee-to-trustee — no tax withholding if done correctly.",
      "Indirect rollover: you receive a check and have 60 days to redeposit — 20% may be withheld.",
      "Compare fees, investment options, and whether principal protection or guaranteed income fits your timeline.",
    ],
    href: "/retirement-planning-pasadena",
    intent: "401k rollover advisor Pasadena",
  },
  {
    id: "living-benefits",
    title: "What Are Living Benefits on Life Insurance?",
    summary:
      "Living benefits let a life insurance policy pay you while you are still alive — for critical, chronic, or terminal illness. This is different from traditional death-only coverage and can protect income and mortgage payments during a health crisis.",
    bullets: [
      "Accelerated death benefit riders can advance part of the death benefit for qualifying diagnoses.",
      "Chronic illness riders may pay if you cannot perform two activities of daily living.",
      "Term and permanent policies may offer different rider options — education before quoting matters.",
    ],
    href: "/living-benefits-life-insurance-los-angeles",
    intent: "life insurance with living benefits Los Angeles",
  },
  {
    id: "emergency-fund",
    title: "How Much Emergency Fund Do You Really Need?",
    summary:
      "Most families aim for 3–6 months of essential expenses in liquid, accessible reserves. The right number depends on job stability, dual income, dependents, and existing insurance coverage — not a one-size-fits-all rule from social media.",
    bullets: [
      "Start with one month of expenses if saving feels impossible — progress beats perfection.",
      "High-yield savings accounts can help cash keep pace with inflation better than checking alone.",
      "Living benefits and disability strategies can complement — not replace — liquid reserves.",
    ],
    href: "/debt-free-wealth-strategy",
    intent: "emergency fund planning guide",
  },
  {
    id: "debt-order",
    title: "What Debt Should You Pay Off First?",
    summary:
      "High-interest consumer debt (credit cards, personal loans) usually costs more than potential investment growth. A structured cash flow plan can target toxic debt while still funding protection and long-term wealth accounts.",
    bullets: [
      "List all debts: balance, rate, minimum payment, and term.",
      "Avalanche method: highest rate first. Snowball method: smallest balance for momentum.",
      "Avoid pausing all wealth building — simultaneous growth strategies can work for some households.",
    ],
    href: "/debt-free-wealth-strategy",
    intent: "debt elimination strategy financial advisor",
  },
  {
    id: "life-insurance-amount",
    title: "How Much Life Insurance Do I Need?",
    summary:
      "A helpful starting point is 10–15× annual income for income replacement — but families with mortgages, business debt, or special-needs dependents often need more. Living benefits may reduce the gap between term coverage and long-term protection needs.",
    bullets: [
      "Human Life Value (HLV) considers future earnings, debts, and legacy goals — not just today’s bills.",
      "Mortgage protection is one slice of the picture; education and business continuity may add needs.",
      "Review beneficiaries whenever life changes: marriage, divorce, new child, or new home.",
    ],
    href: "/mortgage-protection-los-angeles",
    intent: "how much life insurance do I need",
  },
  {
    id: "estate-basics",
    title: "Estate Planning Basics: Trusts, Wills, and Beneficiaries",
    summary:
      "Probate delays and family conflict often come from missing documents — not from lack of wealth. Coordinating wills, trusts, and account beneficiaries helps assets transfer on your terms.",
    bullets: [
      "Beneficiary designations on 401(k)s and life policies override many will instructions.",
      "Trusts can help avoid probate for real estate and complex family situations.",
      "Business owners need buy-sell and key person planning alongside personal estate documents.",
    ],
    href: "/estate-business-planning-los-angeles",
    intent: "estate planning Los Angeles advisor",
  },
  {
    id: "calpers",
    title: "CalPERS & Public Employee Retirement: What to Know",
    summary:
      "Public employees in Pasadena and the San Gabriel Valley often balance CalPERS pensions with supplemental savings. Understanding pension estimates, survivor benefits, and rollover options helps avoid gaps in retirement income.",
    bullets: [
      "Request your CalPERS benefit estimate before making irreversible payout decisions.",
      "401(k) and 457 plans from prior employers may still need consolidation or protection.",
      "Guaranteed income strategies can complement — not replace — pension math.",
    ],
    href: "/retirement-planning-pasadena",
    intent: "CalPERS pension advisor Pasadena",
  },
  {
    id: "children-wealth",
    title: "Building Tax-Efficient Wealth for Children",
    summary:
      "Parents and grandparents often ask how to save for college or a child’s future without sacrificing flexibility. Cash value life insurance (IUL) strategies — including Freedom Financial Baby — are one education-first option to compare.",
    bullets: [
      "529 plans excel for qualified education expenses but have limited non-education uses.",
      "IUL-style strategies emphasize tax-advantaged growth and living benefits coordination.",
      "Start early — compound time matters more than starting with a large premium.",
    ],
    href: "/freedom-financial-baby",
    intent: "save for child tax free IUL",
  },
];

export const FINANCIAL_EDUCATION_TOPICS_ES: EducationTopic[] = [
  {
    id: "401k-rollover",
    title: "Cómo Hacer Rollover de un 401(k) al Cambiar de Empleo",
    summary:
      "Cambiar de trabajo no significa abandonar sus ahorros — pero no hacer nada puede costarle comisiones y opciones limitadas. Conozca la diferencia entre rollover directo, indirecto y dejar fondos en el plan anterior.",
    bullets: [
      "Rollover directo: fondos de custodio a custodio — sin retención si se hace correctamente.",
      "Rollover indirecto: recibe un cheque y tiene 60 días — puede retenerse el 20%.",
      "Compare comisiones, opciones y si protección de principal o ingreso garantizado encaja.",
    ],
    href: "/es/planificacion-de-jubilacion-los-angeles",
    intent: "rollover 401k asesor Pasadena",
  },
  {
    id: "living-benefits",
    title: "¿Qué Son los Beneficios en Vida del Seguro?",
    summary:
      "Los beneficios en vida permiten que una póliza pague mientras usted vive — por enfermedad crítica, crónica o terminal. Protege ingresos y pagos de hipoteca durante una crisis de salud.",
    bullets: [
      "Riders de beneficio acelerado pueden adelantar parte de la suma asegurada.",
      "Riders de enfermedad crónica pueden pagar si no puede realizar actividades diarias.",
      "Pólizas a término y permanentes ofrecen opciones distintas — eduquese antes de cotizar.",
    ],
    href: "/es/beneficios-en-vida-los-angeles",
    intent: "seguro vida beneficios en vida Los Angeles",
  },
  {
    id: "emergency-fund",
    title: "¿Cuánto Fondo de Emergencia Necesita?",
    summary:
      "Muchas familias apuntan a 3–6 meses de gastos esenciales en reservas líquidas. El número correcto depende de estabilidad laboral, ingresos duales, dependientes y seguros existentes.",
    bullets: [
      "Comience con un mes de gastos si ahorrar parece imposible.",
      "Cuentas de alto rendimiento pueden ayudar contra la inflación.",
      "Beneficios en vida complementan — no reemplazan — reservas líquidas.",
    ],
    href: "/es/estrategia-libre-de-deudas",
    intent: "guía fondo de emergencia",
  },
  {
    id: "debt-order",
    title: "¿Qué Deuda Debe Pagar Primero?",
    summary:
      "Deudas de alto interés suelen costar más que el crecimiento potencial de inversiones. Un plan de flujo de efectivo puede atacar deuda tóxica mientras financia protección y patrimonio.",
    bullets: [
      "Liste todas las deudas: saldo, tasa, pago mínimo y plazo.",
      "Método avalancha: tasa más alta primero. Bola de nieve: saldo menor para impulso.",
      "Evite pausar todo crecimiento patrimonial — estrategias simultáneas pueden funcionar.",
    ],
    href: "/es/estrategia-libre-de-deudas",
    intent: "estrategia eliminación deudas",
  },
  {
    id: "life-insurance-amount",
    title: "¿Cuánto Seguro de Vida Necesito?",
    summary:
      "Un punto de partida útil es 10–15× el ingreso anual — pero familias con hipoteca, deuda empresarial o dependientes especiales pueden necesitar más.",
    bullets: [
      "Valor Humano de Vida considera ingresos futuros, deudas y legado.",
      "Protección de hipoteca es una parte; educación y continuidad empresarial suman.",
      "Revise beneficiarios con cada cambio de vida.",
    ],
    href: "/es/proteccion-de-hipoteca-los-angeles",
    intent: "cuánto seguro de vida necesito",
  },
  {
    id: "estate-basics",
    title: "Planificación Patrimonial: Fideicomisos, Testamentos y Beneficiarios",
    summary:
      "Retrasos en sucesión y conflictos familiares suelen venir de documentos faltantes. Coordinar testamentos, fideicomisos y beneficiarios ayuda a transferir activos según sus deseos.",
    bullets: [
      "Designaciones de beneficiarios en 401(k) y pólizas pueden anular testamentos.",
      "Fideicomisos pueden evitar sucesión para bienes raíces.",
      "Dueños de negocios necesitan planes de salida y seguro de persona clave.",
    ],
    href: "/estate-business-planning-los-angeles",
    intent: "planificación patrimonial Los Angeles",
  },
  {
    id: "calpers",
    title: "CalPERS y Jubilación del Sector Público",
    summary:
      "Empleados públicos en Pasadena y el Valle de San Gabriel equilibran pensiones CalPERS con ahorro suplementario. Entender estimaciones y opciones de rollover evita brechas de ingreso.",
    bullets: [
      "Solicite su estimación CalPERS antes de decisiones irreversibles.",
      "401(k) y 457 de empleos anteriores pueden necesitar consolidación.",
      "Estrategias de ingreso garantizado complementan — no reemplazan — la pensión.",
    ],
    href: "/es/planificacion-de-jubilacion-los-angeles",
    intent: "asesor CalPERS Pasadena",
  },
  {
    id: "children-wealth",
    title: "Construir Riqueza Fiscalmente Eficiente para Niños",
    summary:
      "Padres y abuelos preguntan cómo ahorrar para el futuro de un niño. Futuro Financiero Infantil e IUL son opciones para comparar con educación primero.",
    bullets: [
      "Planes 529 son excelentes para educación calificada con usos limitados fuera de ella.",
      "IUL enfatiza crecimiento con ventajas fiscales y coordinación de beneficios en vida.",
      "Comience temprano — el tiempo compuesto importa más que una prima grande.",
    ],
    href: "/es/futuro-financiero-infantil",
    intent: "ahorro niños IUL",
  },
];

export const EDUCATION_HUB_FAQS_EN: FaqItem[] = [
  {
    question: "Is this financial education free?",
    answer:
      "Yes. Legacy in Motion publishes these guides to answer common client questions before any product conversation. A free private strategy session is available if you want personalized guidance.",
  },
  {
    question: "Does reading these guides obligate me to buy insurance?",
    answer:
      "No. Our education-first model means you understand options first. Products are discussed only when they fit your goals — never as a sales pitch.",
  },
  {
    question: "Can I get these guides explained in Spanish?",
    answer:
      "Yes. Visit /es/educacion-financiera for the full Spanish hub, or request a bilingual consultation at /request-callback.",
  },
];

export const EDUCATION_HUB_FAQS_ES: FaqItem[] = [
  {
    question: "¿Esta educación financiera es gratuita?",
    answer:
      "Sí. Legacy in Motion publica estas guías para responder preguntas comunes antes de cualquier conversación de productos. Hay sesión de estrategia gratuita si desea orientación personalizada.",
  },
  {
    question: "¿Leer estas guías me obliga a comprar seguros?",
    answer:
      "No. Nuestro modelo prioriza educación. Los productos se discuten solo cuando encajan con sus metas.",
  },
  {
    question: "¿Puedo recibir explicación en español?",
    answer:
      "Sí. Visite /es/educacion-financiera o solicite consulta bilingüe en /es/solicitar-llamada.",
  },
];
