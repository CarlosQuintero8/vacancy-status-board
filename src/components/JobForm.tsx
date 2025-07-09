
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobApplication, JobStatus, STATUS_OPTIONS } from '@/types/job';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface JobFormProps {
  onSubmit: (application: Omit<JobApplication, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const JobForm = ({ onSubmit, onCancel }: JobFormProps) => {
  const [formData, setFormData] = useState({
    perfilVacante: '',
    empresa: '',
    tecnologias: '',
    plataforma: '',
    link: '',
    fechaPostulacion: '',
    contactoReclutador: '',
    status: 'EN_PROCESO' as JobStatus,
  });

  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.perfilVacante || !formData.empresa) {
      return;
    }

    onSubmit({
      ...formData,
      fechaPostulacion: date ? format(date, 'yyyy-MM-dd') : '',
    });

    // Reset form
    setFormData({
      perfilVacante: '',
      empresa: '',
      tecnologias: '',
      plataforma: '',
      link: '',
      fechaPostulacion: '',
      contactoReclutador: '',
      status: 'EN_PROCESO',
    });
    setDate(undefined);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Nueva Postulación</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="perfilVacante">Perfil de la Vacante *</Label>
              <Input
                id="perfilVacante"
                value={formData.perfilVacante}
                onChange={(e) => handleInputChange('perfilVacante', e.target.value)}
                placeholder="ej. Frontend Developer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa *</Label>
              <Input
                id="empresa"
                value={formData.empresa}
                onChange={(e) => handleInputChange('empresa', e.target.value)}
                placeholder="ej. Tech Corp"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tecnologias">Tecnologías</Label>
            <Textarea
              id="tecnologias"
              value={formData.tecnologias}
              onChange={(e) => handleInputChange('tecnologias', e.target.value)}
              placeholder="ej. React, TypeScript, Node.js"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plataforma">Plataforma</Label>
              <Input
                id="plataforma"
                value={formData.plataforma}
                onChange={(e) => handleInputChange('plataforma', e.target.value)}
                placeholder="ej. LinkedIn, Indeed"
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha de Postulación</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link de la Vacante</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactoReclutador">Contacto con Reclutador</Label>
            <Textarea
              id="contactoReclutador"
              value={formData.contactoReclutador}
              onChange={(e) => handleInputChange('contactoReclutador', e.target.value)}
              placeholder="ej. Contacté via LinkedIn, email: recruiter@empresa.com"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={formData.status} onValueChange={(value: JobStatus) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Guardar Postulación
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
