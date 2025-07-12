
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JobApplication, STATUS_OPTIONS } from '@/types/job';
import { ExternalLink, Calendar, Building, Code, Users, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface JobCardProps {
  application: JobApplication;
  onDelete: (id: string) => void;
  onEdit: (application: JobApplication) => void;
}

export const JobCard = ({ application, onDelete, onEdit }: JobCardProps) => {
  const statusInfo = STATUS_OPTIONS.find(s => s.value === application.status);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-primary">{application.perfilVacante}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Building className="w-4 h-4" />
              <span>{application.empresa}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {statusInfo && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${statusInfo.color}`}></div>
                {statusInfo.label}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {application.tecnologias && (
          <div className="flex items-start gap-2">
            <Code className="w-4 h-4 mt-0.5 text-muted-foreground" />
            <span className="text-sm">{application.tecnologias}</span>
          </div>
        )}

        {application.plataforma && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{application.plataforma}</span>
          </div>
        )}

        {application.fechaPostulacion && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              {format(new Date(application.fechaPostulacion + 'T12:00:00'), "PPP", { locale: es })}
            </span>
          </div>
        )}

        {application.contactoReclutador && (
          <div className="text-sm text-muted-foreground">
            <strong>Contacto:</strong> {application.contactoReclutador}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {application.link && (
            <Button variant="outline" size="sm" asChild>
              <a href={application.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
          
          <Button variant="outline" size="sm" onClick={() => onEdit(application)}>
            <Edit className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(application.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
