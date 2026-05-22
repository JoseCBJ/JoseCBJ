import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface EvaluationDialogProps {
  open: boolean;
  onClose: () => void;
  professionalName?: string;
  appointmentDate?: string;
}

export function EvaluationDialog({ 
  open, 
  onClose, 
  professionalName = 'Dr. Carlos Eduardo',
  appointmentDate = '25/10/2025'
}: EvaluationDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Avaliar Atendimento</DialogTitle>
          <DialogDescription>
            {professionalName} • {appointmentDate}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>Como você avalia o atendimento?</Label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star 
                    className={`h-10 w-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              {rating === 0 && 'Selecione uma avaliação'}
              {rating === 1 && 'Muito insatisfeito'}
              {rating === 2 && 'Insatisfeito'}
              {rating === 3 && 'Regular'}
              {rating === 4 && 'Satisfeito'}
              {rating === 5 && 'Muito satisfeito'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comentário (opcional)</Label>
            <Textarea 
              id="comment"
              placeholder="Conte-nos sobre sua experiência..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>O que você gostaria de avaliar?</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="professional" defaultChecked />
                <span className="text-sm">Profissional de Saúde</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="service" />
                <span className="text-sm">Atendimento e Serviços</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="facility" />
                <span className="text-sm">Instalações</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onClose} disabled={rating === 0}>
            Enviar Avaliação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
