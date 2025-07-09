
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobForm } from '@/components/JobForm';
import { JobCard } from '@/components/JobCard';
import { useJobApplications } from '@/hooks/useJobApplications';
import { useTheme } from '@/hooks/useTheme';
import { JobStatus, STATUS_OPTIONS } from '@/types/job';
import { Plus, Search, Moon, Sun, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { applications, addApplication, updateApplication, deleteApplication } = useJobApplications();
  const { isDark, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'ALL'>('ALL');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.perfilVacante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.tecnologias.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddApplication = (newApp: any) => {
    addApplication(newApp);
    setShowForm(false);
    toast({
      title: "Postulación agregada",
      description: "La postulación se ha guardado correctamente.",
    });
  };

  const handleDeleteApplication = (id: string) => {
    deleteApplication(id);
    toast({
      title: "Postulación eliminada",
      description: "La postulación se ha eliminado correctamente.",
      variant: "destructive",
    });
  };

  const handleEditApplication = (application: any) => {
    // Por simplicidad, mostraremos un toast indicando que la funcionalidad está disponible
    toast({
      title: "Función de edición",
      description: "La función de edición estará disponible en una próxima versión.",
    });
  };

  const getStatusCount = (status: JobStatus) => {
    return applications.filter(app => app.status === status).length;
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-background p-4">
        <JobForm 
          onSubmit={handleAddApplication}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg p-2">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">JobFollower</h1>
                <p className="text-sm text-muted-foreground">Seguimiento de postulaciones laborales</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nueva Postulación
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {STATUS_OPTIONS.map((status) => (
            <div key={status.value} className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                <span className="text-sm font-medium">{status.label}</span>
              </div>
              <p className="text-2xl font-bold">{getStatusCount(status.value)}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por empresa, perfil o tecnologías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value: JobStatus | 'ALL') => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos los estados</SelectItem>
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

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {applications.length === 0 ? 'No hay postulaciones' : 'No se encontraron resultados'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {applications.length === 0 
                ? 'Comienza agregando tu primera postulación laboral'
                : 'Intenta modificar los filtros de búsqueda'
              }
            </p>
            {applications.length === 0 && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Primera Postulación
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((application) => (
              <JobCard
                key={application.id}
                application={application}
                onDelete={handleDeleteApplication}
                onEdit={handleEditApplication}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
