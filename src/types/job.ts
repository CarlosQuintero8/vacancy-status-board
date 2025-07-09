
export type JobStatus = 'EN_PROCESO' | 'RECHAZADA' | 'ENTREVISTA' | 'PRUEBA_TECNICA';

export interface JobApplication {
  id: string;
  perfilVacante: string;
  empresa: string;
  tecnologias: string;
  plataforma: string;
  link: string;
  fechaPostulacion: string;
  contactoReclutador: string;
  status: JobStatus;
  createdAt: string;
}

export const STATUS_OPTIONS: { value: JobStatus; label: string; color: string }[] = [
  { value: 'EN_PROCESO', label: 'En Proceso', color: 'bg-blue-500' },
  { value: 'RECHAZADA', label: 'Rechazada', color: 'bg-red-500' },
  { value: 'ENTREVISTA', label: 'Entrevista', color: 'bg-green-500' },
  { value: 'PRUEBA_TECNICA', label: 'Prueba Técnica', color: 'bg-yellow-500' },
];
